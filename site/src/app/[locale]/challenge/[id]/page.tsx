import { getChallengeById, getChallengeContent, getAdjacentChallenges } from '../../../../utils/challenge-utils';
import { getFirstTestCase, extractQuestionRequirements } from '../../../../utils/challenge-parser';
import MarkdownRenderer from '../../../../components/MarkdownRenderer';
import PromptScorer from '../../../../components/PromptScorer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary } from '../../../../utils/i18n';

interface ChallengePageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function ChallengePage(props: ChallengePageProps) {
  const { locale, id } = await props.params;
  
  const challenge = getChallengeById(id);
  const dict = getDictionary(locale);
  const isEnglish = locale === 'en';
  
  if (!challenge) {
    notFound();
  }
  
  const content = await getChallengeContent(challenge.path, locale);
  const { prev, next } = getAdjacentChallenges(id);
  
  const displayTitle = isEnglish ? (challenge.titleEn || challenge.title) : challenge.title;
  const displayDescription = isEnglish ? (challenge.descriptionEn || challenge.description) : challenge.description;
  
  const prevTitle = prev && (isEnglish ? (prev.titleEn || prev.title) : prev.title);
  const nextTitle = next && (isEnglish ? (next.titleEn || next.title) : next.title);
  
  const difficultyConfig = {
    'warm': {
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      text: 'text-green-700 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800',
      badge: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
      icon: '🟢',
      gradient: 'from-green-400 to-emerald-500',
      shadow: 'shadow-green-100 dark:shadow-green-900/20'
    },
    'medium': {
      bg: 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
      text: 'text-yellow-700 dark:text-yellow-400',
      border: 'border-yellow-200 dark:border-yellow-800',
      badge: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
      icon: '🟡',
      gradient: 'from-yellow-400 to-orange-500',
      shadow: 'shadow-yellow-100 dark:shadow-yellow-900/20'
    },
    'hard': {
      bg: 'bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
      text: 'text-red-700 dark:text-red-400',
      border: 'border-red-200 dark:border-red-800',
      badge: 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
      icon: '🔴',
      gradient: 'from-red-400 to-pink-500',
      shadow: 'shadow-red-100 dark:shadow-red-900/20'
    },
    'extreme': {
      bg: 'bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20',
      text: 'text-purple-700 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800',
      badge: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white',
      icon: '🟣',
      gradient: 'from-purple-400 to-indigo-500',
      shadow: 'shadow-purple-100 dark:shadow-purple-900/20'
    }
  };
  
  const config = difficultyConfig[challenge.difficulty];

  // 使用解析工具获取测试数据
  const testCase = getFirstTestCase(content);
  const questionRequirements = extractQuestionRequirements(content);
  
  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
      {/* 顶部导航栏 - 减小高度和内边距 */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-12 sm:h-14">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link 
                href={`/${locale}`}
                className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-105 text-sm"
              >
                <div className="p-1 rounded-md bg-gray-100 dark:bg-gray-700 mr-1.5 sm:mr-2">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <span className="hidden sm:inline">{dict.common.backToList}</span>
              </Link>
              <div className="h-4 w-px bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600 dark:to-transparent"></div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full font-semibold ${config.badge} shadow-sm`}>
                  {dict.difficulty[challenge.difficulty]}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex items-center space-x-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <div className="p-1 rounded-md bg-blue-100 dark:bg-blue-900/30">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium hidden sm:inline">5-15 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 - 减小内边距和间距 */}
      <div className="mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 h-[calc(100vh-200px)] sm:h-[calc(100vh-250px)]">
          {/* 左侧：题目内容 - 减小边框和圆角 */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20 overflow-hidden flex flex-col">
            {/* 题目头部 - 减小内边距 */}
            <div className={`p-4 sm:p-6 lg:p-8 border-b border-gray-200/50 dark:border-gray-700/50 ${config.bg} relative overflow-hidden`}>
              {/* 简化背景装饰 */}
              <div className={`absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br ${config.gradient} opacity-10 rounded-full -translate-y-10 translate-x-10`}></div>
              
              <div className="relative">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-sm ${config.shadow}`}>
                    <span className="text-lg sm:text-xl lg:text-2xl">{config.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white truncate">
                      {displayTitle}
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
                      {dict.difficulty[challenge.difficulty]} • {isEnglish ? "Prompt Engineering Challenge" : "提示词工程挑战"}
                    </p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {displayDescription}
                </p>
              </div>
            </div>
            
            {/* 题目内容 - 减小内边距 */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <div className="prose prose-gray dark:prose-invert max-w-none prose-sm sm:prose-base">
                <div className="space-y-4 sm:space-y-6">
                  <MarkdownRenderer content={content} />
                </div>
              </div>
            </div>
            
            {/* 题目底部 - 减小内边距 */}
            <div className="p-3 sm:p-4 lg:p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-700/30 dark:to-gray-800/30">
              <div className="flex justify-between items-center">
                {prev ? (
                  <Link 
                    href={`/${locale}/challenge/${prev.id}`}
                    className="group inline-flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-105"
                  >
                    <div className="p-1 rounded-md bg-gray-100 dark:bg-gray-700 mr-1.5 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                    <span className="font-medium truncate max-w-24 sm:max-w-32 lg:max-w-40">{prevTitle}</span>
                  </Link>
                ) : (
                  <div></div>
                )}
                
                {next ? (
                  <Link 
                    href={`/${locale}/challenge/${next.id}`}
                    className="group inline-flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-105"
                  >
                    <span className="font-medium truncate max-w-24 sm:max-w-32 lg:max-w-40">{nextTitle}</span>
                    <div className="p-1 rounded-md bg-gray-100 dark:bg-gray-700 ml-1.5 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>

          {/* 右侧：输入和评分 - 减小边框和圆角 */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20 overflow-hidden flex flex-col">
            {/* 右侧头部 - 减小内边距 */}
            <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
              {/* 简化背景装饰 */}
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 to-purple-400 opacity-10 rounded-full -translate-y-8 translate-x-8"></div>
              
              <div className="relative">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      {isEnglish ? "Write Your Prompt" : "编写你的 Prompt"}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {isEnglish 
                        ? "Write your AI prompt based on the requirements"
                        : "根据题目要求，编写你的 AI 提示词"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 评分组件 - 减小内边距 */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 sm:p-6 lg:p-8">
                <PromptScorer 
                  question={questionRequirements}
                  inputText={testCase.inputText}
                  llmResult={testCase.llmResult}
                  locale={locale}
                />
              </div>
            </div>
            
            {/* 右侧底部 - 减小内边距 */}
            <div className="p-3 sm:p-4 lg:p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-700/30 dark:to-gray-800/30">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
                  {isEnglish ? "Need help? Join our community" : "需要帮助？加入我们的社区"}
                </p>
                <a 
                  href="https://github.com/erweixin/prompt-challenges/discussions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 hover:scale-105"
                >
                  <div className="p-1 rounded-md bg-blue-100 dark:bg-blue-900/30 mr-1.5">
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  {isEnglish ? "View Discussions" : "查看讨论"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 