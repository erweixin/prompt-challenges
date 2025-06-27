'use client';

import { useState } from 'react';

interface TestCaseResult {
  testCaseIndex: number;
  inputText: string;
  expectedOutput: string;
  actualOutput: string;
  score: number;
  feedback: string;
  status: 'pass' | 'fail' | 'partial';
}

interface TestCaseResultsProps {
  testCases: TestCaseResult[];
  locale: string;
}

export default function TestCaseResults({ testCases, locale }: TestCaseResultsProps) {
  const [expandedCases, setExpandedCases] = useState<Set<number>>(new Set());

  const toggleCase = (index: number) => {
    const newExpanded = new Set(expandedCases);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCases(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'fail':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'fail':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'partial':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 dark:text-green-400';
    if (score >= 6) return 'text-blue-600 dark:text-blue-400';
    if (score >= 4) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // 计算统计信息
  const totalCases = testCases.length;
  const passedCases = testCases.filter(tc => tc.status === 'pass').length;
  const failedCases = testCases.filter(tc => tc.status === 'fail').length;
  const partialCases = testCases.filter(tc => tc.status === 'partial').length;
  const averageScore = testCases.reduce((sum, tc) => sum + tc.score, 0) / totalCases;

  return (
    <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-lg border border-indigo-200/20 dark:border-indigo-700/20 p-4 sm:p-6 relative overflow-hidden">
      <div className="relative">
        <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
          <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            {locale === 'zh' ? '测试用例执行结果' : 'Test Case Execution Results'}
          </h4>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              {totalCases}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {locale === 'zh' ? '总用例' : 'Total'}
            </div>
          </div>
          <div className="text-center p-3 bg-green-100/50 dark:bg-green-900/30 rounded-lg">
            <div className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400">
              {passedCases}
            </div>
            <div className="text-xs sm:text-sm text-green-600 dark:text-green-400">
              {locale === 'zh' ? '通过' : 'Passed'}
            </div>
          </div>
          <div className="text-center p-3 bg-yellow-100/50 dark:bg-yellow-900/30 rounded-lg">
            <div className="text-lg sm:text-xl font-bold text-yellow-600 dark:text-yellow-400">
              {partialCases}
            </div>
            <div className="text-xs sm:text-sm text-yellow-600 dark:text-yellow-400">
              {locale === 'zh' ? '部分' : 'Partial'}
            </div>
          </div>
          <div className="text-center p-3 bg-red-100/50 dark:bg-red-900/30 rounded-lg">
            <div className="text-lg sm:text-xl font-bold text-red-600 dark:text-red-400">
              {failedCases}
            </div>
            <div className="text-xs sm:text-sm text-red-600 dark:text-red-400">
              {locale === 'zh' ? '失败' : 'Failed'}
            </div>
          </div>
        </div>

        {/* 平均分 */}
        <div className="text-center mb-4">
          <div className={`text-2xl sm:text-3xl font-bold ${getScoreColor(averageScore * 10)}`}>
            {Math.round(averageScore * 10)}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {locale === 'zh' ? '平均分' : 'Average Score'}
          </div>
        </div>

        {/* 测试用例列表 */}
        <div className="space-y-3">
          {testCases.map((testCase, index) => (
            <div key={index} className="bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              {/* 测试用例头部 */}
              <div 
                className="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                onClick={() => toggleCase(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(testCase.status)}`}>
                      {getStatusIcon(testCase.status)}
                      <span>{testCase.status.toUpperCase()}</span>
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {locale === 'zh' ? `测试用例 ${testCase.testCaseIndex + 1}` : `Test Case ${testCase.testCaseIndex + 1}`}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm font-bold ${getScoreColor(testCase.score * 10)}`}>
                      {Math.round(testCase.score * 10)}
                    </span>
                    <svg 
                      className={`w-4 h-4 text-gray-500 transition-transform ${expandedCases.has(index) ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 测试用例详情 */}
              {expandedCases.has(index) && (
                <div className="border-t border-gray-200/50 dark:border-gray-700/50 p-3 space-y-3">
                  {/* 输入文本 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h6 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {locale === 'zh' ? '输入文本' : 'Input Text'}
                      </h6>
                      <button
                        onClick={() => copyToClipboard(testCase.inputText)}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        {locale === 'zh' ? '复制' : 'Copy'}
                      </button>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded p-2 text-xs text-gray-700 dark:text-gray-300">
                      {testCase.inputText}
                    </div>
                  </div>

                  {/* 预期输出 vs 实际输出 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h6 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {locale === 'zh' ? '预期输出' : 'Expected Output'}
                        </h6>
                        <button
                          onClick={() => copyToClipboard(testCase.expectedOutput)}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          {locale === 'zh' ? '复制' : 'Copy'}
                        </button>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/30 rounded p-2 text-xs text-gray-700 dark:text-gray-300">
                        {testCase.expectedOutput}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h6 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {locale === 'zh' ? '实际输出' : 'Actual Output'}
                        </h6>
                        <button
                          onClick={() => copyToClipboard(testCase.actualOutput)}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          {locale === 'zh' ? '复制' : 'Copy'}
                        </button>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/30 rounded p-2 text-xs text-gray-700 dark:text-gray-300">
                        {testCase.actualOutput}
                      </div>
                    </div>
                  </div>

                  {/* 反馈 */}
                  <div>
                    <h6 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      {locale === 'zh' ? '评价反馈' : 'Feedback'}
                    </h6>
                    <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded p-2 text-xs text-gray-700 dark:text-gray-300">
                      {testCase.feedback}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 