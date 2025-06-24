'use client';

import { useState, useRef } from 'react';
import { CheckCircle, XCircle, Loader2, Star, RefreshCw, Type } from 'lucide-react';

interface ScoreResult {
  评分: number;
  反馈: string;
  优化意见: string;
}

interface PromptScorerProps {
  question: string;
  inputText: string;
  llmResult: string;
  locale?: 'en' | 'zh';
}

const translations = {
  en: {
    title: 'Prompt Scoring System',
    promptLabel: 'Your Prompt',
    promptPlaceholder: 'Enter your prompt here...',
    submitButton: 'Get Score',
    loading: 'Scoring...',
    streaming: 'AI is analyzing your prompt...',
    error: 'Error',
    scoreComplete: 'Score Complete',
    feedback: 'Feedback',
    suggestions: 'Improvement Suggestions',
    retry: 'Try Again',
    enterPromptError: 'Please enter your prompt',
    scoringError: 'An error occurred during scoring',
    streamingError: 'Streaming connection failed',
  },
  zh: {
    title: 'Prompt 评分系统',
    promptLabel: '你的 Prompt',
    promptPlaceholder: '请输入你的 prompt...',
    submitButton: '获取评分',
    loading: '评分中...',
    streaming: 'AI 正在分析你的 prompt...',
    error: '错误',
    scoreComplete: '评分完成',
    feedback: '反馈',
    suggestions: '优化建议',
    retry: '重新尝试',
    enterPromptError: '请输入你的 prompt',
    scoringError: '评分过程中出现错误',
    streamingError: '流式连接失败',
  }
};

export default function PromptScorer({ question, inputText, llmResult, locale = 'zh' }: PromptScorerProps) {
  const [userPrompt, setUserPrompt] = useState('');
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const t = translations[locale];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userPrompt.trim()) {
      setError(t.enterPromptError);
      return;
    }

    setIsLoading(true);
    setIsStreaming(true);
    setError(null);
    setScoreResult(null);
    setStreamingContent('');
    setAttempts(prev => prev + 1);

    // 创建新的 AbortController
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPrompt: userPrompt.trim(),
          question,
          inputText,
          llmResult,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Scoring failed');
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'partial') {
                setStreamingContent(prev => prev + data.content);
              } else if (data.type === 'complete') {
                setScoreResult(data.data);
                setIsStreaming(false);
                setIsLoading(false);
                return;
              } else if (data.type === 'error') {
                throw new Error(data.error);
              }
            } catch {
              // 忽略解析错误，继续处理
            }
          }
        }
      }

    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        // 用户取消了请求
        return;
      }
      setError(err instanceof Error ? err.message : t.scoringError);
      setIsStreaming(false);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsStreaming(false);
    setIsLoading(false);
    setStreamingContent('');
  };

  const handleRetry = () => {
    setError(null);
    setScoreResult(null);
    setStreamingContent('');
  };

  const renderStars = (score: number) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    }

    const emptyStars = 10 - Math.ceil(score);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      );
    }

    return stars;
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 dark:text-green-400';
    if (score >= 6) return 'text-yellow-600 dark:text-yellow-400';
    if (score >= 4) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 9) return locale === 'zh' ? '优秀！' : 'Excellent!';
    if (score >= 7) return locale === 'zh' ? '良好' : 'Good';
    if (score >= 5) return locale === 'zh' ? '一般' : 'Average';
    return locale === 'zh' ? '需要改进' : 'Needs Improvement';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {t.title}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="userPrompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.promptLabel}
          </label>
          <textarea
            id="userPrompt"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder={t.promptPlaceholder}
            className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            disabled={isLoading}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading || !userPrompt.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isStreaming ? t.streaming : t.loading}
              </>
            ) : (
              t.submitButton
            )}
          </button>
          
          {isStreaming && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              取消
            </button>
          )}
        </div>
      </form>

      {/* 流式内容显示 */}
      {isStreaming && streamingContent && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center mb-2">
            <Type className="w-4 h-4 text-blue-500 mr-2 animate-pulse" />
            <span className="text-blue-700 dark:text-blue-400 text-sm font-medium">
              AI 正在生成评分...
            </span>
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {streamingContent}
            <span className="animate-pulse">▋</span>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <XCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700 dark:text-red-400">{error}</span>
            </div>
            <button
              onClick={handleRetry}
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {scoreResult && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center mb-3">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-green-700 dark:text-green-400 font-medium">{t.scoreComplete}</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center mb-2">
                <span className={`text-lg font-bold mr-2 ${getScoreColor(scoreResult.评分)}`}>
                  {scoreResult.评分}/10
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {getScoreMessage(scoreResult.评分)}
                </span>
              </div>
              <div className="flex">
                {renderStars(scoreResult.评分)}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">{t.feedback}</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {scoreResult.反馈}
              </p>
            </div>

            {scoreResult.优化意见 && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{t.suggestions}</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {scoreResult.优化意见}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {attempts > 0 && !isLoading && !error && !scoreResult && (
        <div className="mt-4 text-center">
          <button
            onClick={handleRetry}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            {t.retry}
          </button>
        </div>
      )}
    </div>
  );
} 