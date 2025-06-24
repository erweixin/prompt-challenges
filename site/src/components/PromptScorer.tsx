'use client';

import { useState } from 'react';
import { getDictionary } from '../utils/i18n';

interface PromptScorerProps {
  question: string;
  inputText: string;
  llmResult: string;
  locale: string;
}

export default function PromptScorer({ question, inputText, llmResult, locale }: PromptScorerProps) {
  const [prompt, setPrompt] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<Record<string, number> | null>(null);
  const dict = getDictionary(locale);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setScore(null);
    setFeedback('');
    setSuggestions([]);
    setAnalysis(null);
    
    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPrompt: prompt,
          question,
          inputText,
          llmResult,
        }),
      });
      
      if (!response.ok) {
        setFeedback(dict.scorer.error || 'Error scoring prompt');
        return;
      }

      // 处理流式响应
      const reader = response.body?.getReader();
      if (!reader) {
        setFeedback(dict.scorer.error || 'No response body');
        return;
      }

      let fullResponse = '';
      let partialFeedback = '';
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            // 流结束，尝试解析完整结果
            try {
              const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                const scoreResult = JSON.parse(jsonMatch[0]);
                
                if (typeof scoreResult.评分 === 'number') {
                  // 将10分制转换为100分制
                  setScore(Math.round(scoreResult.评分 * 10));
                  setFeedback(scoreResult.反馈 || '');
                  
                  // 处理优化意见
                  if (scoreResult.优化意见) {
                    setSuggestions([scoreResult.优化意见]);
                  }
                } else {
                  setFeedback('评分结果格式错误');
                }
              } else {
                setFeedback('无法解析评分结果');
              }
            } catch (parseError) {
              console.error('Failed to parse final response:', parseError);
              setFeedback('解析评分结果时出错');
            }
            break;
          }

          // 解码流式数据
          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;
              
              try {
                const parsed = JSON.parse(data);
                
                if (parsed.type === 'partial' && parsed.content) {
                  // 处理部分内容
                  fullResponse += parsed.content;
                  partialFeedback += parsed.content;
                  setFeedback(partialFeedback);
                } else if (parsed.type === 'complete' && parsed.data) {
                  // 处理完整结果
                  const scoreResult = parsed.data;
                  console.log(scoreResult);
                  if (typeof scoreResult.评分 === 'number') {
                    setScore(Math.round(scoreResult.评分 * 10));
                    setFeedback(scoreResult.反馈 || '');
                    
                    if (scoreResult.优化意见) {
                      setSuggestions([scoreResult.优化意见]);
                    }
                  }
                } else if (parsed.type === 'error') {
                  setFeedback(parsed.error || '评分过程中出现错误');
                }
              } catch (e) {
                // 忽略解析错误，继续处理
              }
            }
          }
        }
      } catch (streamError) {
        console.error('Stream processing error:', streamError);
        setFeedback('处理流式响应时出错');
      } finally {
        reader.releaseLock();
      }
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      setFeedback(dict.scorer.error || 'Error scoring prompt');
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 80) return 'text-blue-600 dark:text-blue-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    if (score >= 60) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-gradient-to-r from-green-500 to-emerald-500';
    if (score >= 80) return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    if (score >= 70) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    if (score >= 60) return 'bg-gradient-to-r from-orange-500 to-red-500';
    return 'bg-gradient-to-r from-red-500 to-pink-500';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return dict.scorer.excellent || 'Excellent!';
    if (score >= 80) return dict.scorer.good || 'Good job!';
    if (score >= 70) return dict.scorer.fair || 'Fair attempt';
    if (score >= 60) return dict.scorer.needsImprovement || 'Needs improvement';
    return dict.scorer.poor || 'Poor';
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {dict.scorer.yourPrompt || 'Your Prompt'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {dict.scorer.enterPrompt || 'Enter your AI prompt below'}
            </p>
          </div>
        </div>
        
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={dict.scorer.promptPlaceholder || "Write your prompt here..."}
            className="w-full h-32 px-4 py-3 text-gray-900 dark:text-white bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:ring-blue-400/50 dark:focus:border-blue-400 resize-none transition-all duration-200 backdrop-blur-sm"
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-gray-500">
            {prompt.length} / 2000
          </div>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={!prompt.trim() || isLoading}
          className="cursor-pointer w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>{dict.scorer.scoring || 'Scoring...'}</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{dict.scorer.scorePrompt || 'Score Prompt'}</span>
            </>
          )}
        </button>
      </div>

      {/* Results Section */}
      {(score !== null || feedback || suggestions.length > 0 || analysis) && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
          {/* 数据流可视化 */}
          {/* <div className="bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow border p-4">
            <div className="mb-2 font-bold text-gray-700 dark:text-gray-200">{locale === 'zh' ? '数据流信息' : 'Submit Info'}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1"><b>输入 Input:</b> {inputText}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1"><b>你的 Prompt:</b> {prompt}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1"><b>期望输出 Expected:</b> {llmResult}</div>
          </div> */}
          {/* Score Display */}
          {score !== null && (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <div className={`p-3 rounded-2xl ${getScoreBg(score)} shadow-lg`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {getScoreMessage(score)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {dict.scorer.scoreOutOf || 'Score out of 100'}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-32 h-32 mx-auto relative">
                    {/* Circular Progress */}
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 32 32">
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${(score / 100) * 88} 88`}
                        strokeLinecap="round"
                        className={`${getScoreColor(score)} transition-all duration-1000 ease-out`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Feedback */}
          {feedback && (
            <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-200/20 dark:border-blue-700/20 p-6 relative overflow-hidden">
              <div className="relative">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {dict.scorer.feedback || 'Feedback'}
                  </h4>
                </div>
                <div className="prose prose-sm prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{feedback}</p>
                </div>
              </div>
            </div>
          )}
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-xl rounded-2xl shadow-xl border border-green-200/20 dark:border-green-700/20 p-6 relative overflow-hidden">
              <div className="relative">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {dict.scorer.tips5 || 'Tips for Better Prompts'}
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {suggestions.map((tip, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {/* Analysis */}
          {analysis && (
            <div className="bg-gradient-to-r from-yellow-50/50 to-orange-50/50 dark:from-yellow-900/20 dark:to-orange-900/20 backdrop-blur-xl rounded-2xl shadow-xl border border-yellow-200/20 dark:border-yellow-700/20 p-6 relative overflow-hidden">
              <div className="relative">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {isLoading ? '分析中...' : '详细评分分析'}
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {Object.entries(analysis).map(([k, v]) => (
                    <li key={k} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                      <span>{k}: <span className="font-bold">{v}</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-900/20 dark:to-orange-900/20 backdrop-blur-xl rounded-2xl shadow-xl border border-amber-200/20 dark:border-amber-700/20 p-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 opacity-10 rounded-full -translate-y-6 translate-x-6"></div>
        
        <div className="relative">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {dict.scorer.tips || 'Tips for Better Prompts'}
            </h4>
          </div>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
              <span>{dict.scorer.tip1 || 'Be specific and clear about what you want'}</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
              <span>{dict.scorer.tip2 || 'Provide context and examples when helpful'}</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
              <span>{dict.scorer.tip3 || 'Use appropriate tone and style for your audience'}</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
              <span>{dict.scorer.tip4 || 'Test and iterate to improve your results'}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 