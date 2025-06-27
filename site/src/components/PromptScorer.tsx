'use client';

import { useState } from 'react';
import { getDictionary } from '../utils/i18n';
import TestCaseResults from './TestCaseResults';

interface TestCase {
  inputText: string;
  llmResult: string;
  description?: string;
}

interface TestCaseResult {
  testCaseIndex: number;
  inputText: string;
  expectedOutput: string;
  actualOutput: string;
  score: number;
  feedback: string;
  status: 'pass' | 'fail' | 'partial';
}

interface TestResult {
  testCaseIndex: number;
  inputText: string;
  expectedOutput: string;
  score: number;
  feedback: string;
}

interface DetailedScore {
  总分: number;
  清晰度: number;
  完整性: number;
  可操作性: number;
  适应性: number;
  创新性: number;
  反馈: string;
  优化建议: string[];
  测试结果: TestResult[];
  详细分析: string;
}

interface PromptScorerProps {
  // question: string;
  // inputText: string;
  // llmResult: string;
  testCases?: TestCase[];
  difficulty?: string;
  locale: string;
  description?: string;
  promptTemplate?: string;
}

export default function PromptScorer({ 
  // question, 
  // inputText, 
  // llmResult, 
  testCases = [], 
  promptTemplate,
  difficulty = 'medium',
  locale,
  description
}: PromptScorerProps) {
  const [prompt, setPrompt] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [detailedScore, setDetailedScore] = useState<DetailedScore | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [streamingContent, setStreamingContent] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<Record<string, number> | null>(null);
  const [testCaseResults, setTestCaseResults] = useState<TestCaseResult[]>([]);
  const dict = getDictionary(locale);

  // 智能JSON解析函数
  const tryParseJSON = (content: string) => {
    try {
      // 尝试找到完整的JSON对象
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // 提取评分信息
  const extractScoreInfo = (parsedData: {
    ['评分']: string,
    ['反馈']: string,
    ['详细评分']: DetailedScore,
    ['优化意见']: string,
    ['测试用例结果']?: TestCaseResult[]
  }) => {
    if (typeof parsedData.评分 === 'number') {
      setScore(Math.round(parsedData.评分 * 10));
    }
    
    if (parsedData.反馈) {
      setFeedback(parsedData.反馈);
    }
    
    if (parsedData.详细评分) {
      setDetailedScore(parsedData.详细评分);
    }
    
    if (parsedData.优化意见) {
      setSuggestions([parsedData.优化意见]);
    }

    if (parsedData.测试用例结果) {
      setTestCaseResults(parsedData.测试用例结果);
    }
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setScore(null);
    setDetailedScore(null);
    setFeedback('');
    setStreamingContent('');
    setSuggestions([]);
    setAnalysis(null);
    setTestCaseResults([]);
    
    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPrompt: prompt,
          question: description,
          promptTemplate,
          // inputText,
          // llmResult,
          testCases: testCases.length > 0 ? testCases : undefined,
          difficulty,
          // description
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
      let hasParsedJSON = false;
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            // 流结束，最终尝试解析
            if (!hasParsedJSON) {
              const finalParsed = tryParseJSON(fullResponse);
              if (finalParsed) {
                extractScoreInfo(finalParsed);
                hasParsedJSON = true;
              } else {
                // 如果无法解析JSON，显示原始内容作为反馈
                setFeedback(fullResponse || '无法解析评分结果');
              }
            }
            break;
          }

          // 解码并处理流式数据
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
                  setStreamingContent(fullResponse);
                  
                  // 尝试解析累积的内容
                  if (!hasParsedJSON) {
                    const parsedData = tryParseJSON(fullResponse);
                    if (parsedData) {
                      extractScoreInfo(parsedData);
                      hasParsedJSON = true;
                      // 清除流式内容，显示解析后的结果
                      setStreamingContent('');
                    }
                  }
                } else if (parsed.type === 'complete' && parsed.data) {
                  // 处理完整结果
                  extractScoreInfo(parsed.data);
                  hasParsedJSON = true;
                  setStreamingContent('');
                } else if (parsed.type === 'error') {
                  setFeedback(parsed.error || '评分过程中出现错误');
                  setStreamingContent('');
                }
              } catch (error) {
                console.log(error);
                // 忽略解析错误，继续处理
              }
            }
          }
        }
      } catch (streamError) {
        console.error('Stream processing error:', streamError);
        setFeedback('处理流式响应时出错');
        setStreamingContent('');
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

  const getDimensionColor = (score: number) => {
    if (score >= 8) return 'text-green-600 dark:text-green-400';
    if (score >= 6) return 'text-blue-600 dark:text-blue-400';
    if (score >= 4) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Input Section - 减小间距 */}
      <div className="space-y-3 sm:space-y-4">
        {/* <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              {dict.scorer.yourPrompt || 'Your Prompt'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {dict.scorer.enterPrompt || 'Enter your AI prompt below'}
            </p>
          </div>
        </div> */}
        
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={dict.scorer.promptPlaceholder || "Write your prompt here..."}
            className="w-full h-24 sm:h-32 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 dark:text-white bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-lg sm:rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:ring-blue-400/50 dark:focus:border-blue-400 resize-none transition-all duration-200 backdrop-blur-sm"
            disabled={isLoading}
          />
          <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-xs text-gray-400 dark:text-gray-500">
            {prompt.length} / 2000
          </div>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={!prompt.trim() || isLoading}
          className="cursor-pointer w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>{dict.scorer.scoring || 'Scoring...'}</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{dict.scorer.scorePrompt || 'Score Prompt'}</span>
            </>
          )}
        </button>
      </div>

      {/* Results Section - 减小间距 */}
      {(score !== null || feedback || suggestions.length > 0 || analysis || detailedScore || streamingContent) && (
        <div className="space-y-3 sm:space-y-4 animate-in slide-in-from-bottom-4 duration-500">
          {/* Streaming Content Display */}
          {streamingContent && isLoading && (
            <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-lg border border-blue-200/20 dark:border-blue-700/20 p-4 sm:p-6 relative overflow-hidden">
              <div className="relative">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    {locale === 'zh' ? 'AI 正在分析中...' : 'AI is analyzing...'}
                  </h4>
                </div>
                <div className="prose prose-sm prose-gray dark:prose-invert max-w-none">
                  <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {streamingContent}
                    <span className="inline-block w-2 h-4 bg-blue-500 animate-pulse ml-1"></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Score Display - 减小边框和圆角 */}
          {score !== null && (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20 p-4 sm:p-6">
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${getScoreBg(score)} shadow-lg`}>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      {getScoreMessage(score)}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {dict.scorer.scoreOutOf || 'Score out of 100'}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto relative">
                    {/* Circular Progress */}
                    <svg className="w-24 h-24 sm:w-32 sm:h-32 transform -rotate-90" viewBox="0 0 32 32">
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
                      <span className={`text-2xl sm:text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Score Analysis */}
          {detailedScore && (
            <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-lg border border-indigo-200/20 dark:border-indigo-700/20 p-4 sm:p-6 relative overflow-hidden">
              <div className="relative">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    {locale === 'zh' ? '详细评分分析' : 'Detailed Score Analysis'}
                  </h4>
                </div>
                
                {/* Score Dimensions */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                  <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <div className={`text-lg sm:text-xl font-bold ${getDimensionColor(detailedScore.清晰度)}`}>
                      {detailedScore.清晰度}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {locale === 'zh' ? '清晰度' : 'Clarity'}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <div className={`text-lg sm:text-xl font-bold ${getDimensionColor(detailedScore.完整性)}`}>
                      {detailedScore.完整性}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {locale === 'zh' ? '完整性' : 'Completeness'}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <div className={`text-lg sm:text-xl font-bold ${getDimensionColor(detailedScore.可操作性)}`}>
                      {detailedScore.可操作性}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {locale === 'zh' ? '可操作性' : 'Operability'}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <div className={`text-lg sm:text-xl font-bold ${getDimensionColor(detailedScore.适应性)}`}>
                      {detailedScore.适应性}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {locale === 'zh' ? '适应性' : 'Adaptability'}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <div className={`text-lg sm:text-xl font-bold ${getDimensionColor(detailedScore.创新性)}`}>
                      {detailedScore.创新性}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {locale === 'zh' ? '创新性' : 'Innovation'}
                    </div>
                  </div>
                </div>

                {/* Detailed Analysis */}
                {detailedScore.详细分析 && (
                  <div className="mb-4">
                    <h5 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2">
                      {locale === 'zh' ? '详细分析' : 'Detailed Analysis'}
                    </h5>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {detailedScore.详细分析}
                    </p>
                  </div>
                )}

                {/* Test Results */}
                {detailedScore.测试结果 && detailedScore.测试结果.length > 0 && (
                  <div>
                    <h5 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2">
                      {locale === 'zh' ? '测试用例结果' : 'Test Case Results'}
                    </h5>
                    <div className="space-y-2">
                      {detailedScore.测试结果.map((result, index) => (
                        <div key={index} className="p-2 bg-white/30 dark:bg-gray-800/30 rounded-md">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                              {locale === 'zh' ? `测试用例 ${result.testCaseIndex + 1}` : `Test Case ${result.testCaseIndex + 1}`}
                            </span>
                            <span className={`text-xs sm:text-sm font-bold ${getDimensionColor(result.score * 10)}`}>
                              {Math.round(result.score * 10)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {result.feedback}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Test Case Results */}
          {testCaseResults.length > 0 && (
            <TestCaseResults testCases={testCaseResults} locale={locale} />
          )}
          
          {/* Feedback - 减小边框和圆角 */}
          {feedback && !streamingContent && (
            <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-lg border border-blue-200/20 dark:border-blue-700/20 p-4 sm:p-6 relative overflow-hidden">
              <div className="relative">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    {dict.scorer.feedback || 'Feedback'}
                  </h4>
                </div>
                <div className="prose prose-sm prose-gray dark:prose-invert max-w-none">
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{feedback}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Suggestions - 减小边框和圆角 */}
          {suggestions.length > 0 && (
            <div className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-lg border border-green-200/20 dark:border-green-700/20 p-4 sm:p-6 relative overflow-hidden">
              <div className="relative">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    {dict.scorer.tip5 || 'Tips for Better Prompts'}
                  </h4>
                </div>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  {suggestions.map((tip, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500 mt-1.5 sm:mt-2 flex-shrink-0"></div>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Analysis - 减小边框和圆角 */}
          {analysis && (
            <div className="bg-gradient-to-r from-yellow-50/50 to-orange-50/50 dark:from-yellow-900/20 dark:to-orange-900/20 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-lg border border-yellow-200/20 dark:border-yellow-700/20 p-4 sm:p-6 relative overflow-hidden">
              <div className="relative">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    {isLoading ? '分析中...' : '详细评分分析'}
                  </h4>
                </div>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  {Object.entries(analysis).map(([k, v]) => (
                    <li key={k} className="flex items-start space-x-2">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-yellow-500 mt-1.5 sm:mt-2 flex-shrink-0"></div>
                      <span>{k}: <span className="font-bold">{v}</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tips Section - 减小边框和圆角 */}
      <div className="bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-900/20 dark:to-orange-900/20 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-lg border border-amber-200/20 dark:border-amber-700/20 p-4 sm:p-6 relative overflow-hidden">
        {/* Background decoration - 简化装饰 */}
        <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-orange-400 opacity-10 rounded-full -translate-y-4 translate-x-4 sm:-translate-y-6 sm:translate-x-6"></div>
        
        <div className="relative">
          <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
            <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              {dict.scorer.tips || 'Tips for Better Prompts'}
            </h4>
          </div>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start space-x-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-500 mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span>{dict.scorer.tip1 || 'Be specific and clear about what you want'}</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-500 mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span>{dict.scorer.tip2 || 'Provide context and examples when helpful'}</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-500 mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span>{dict.scorer.tip3 || 'Use appropriate tone and style for your audience'}</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-500 mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span>{dict.scorer.tip4 || 'Test and iterate to improve your results'}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 