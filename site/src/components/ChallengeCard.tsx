import { Challenge } from '../types/challenge';
import Link from 'next/link';
import { getDictionary } from '../utils/i18n';

interface ChallengeCardProps {
  challenge: Challenge;
  locale: string;
}

export default function ChallengeCard({ challenge, locale }: ChallengeCardProps) {
  const dict = getDictionary(locale);
  
  // 根据语言选择标题和描述
  const displayTitle = locale === 'en' && challenge.titleEn ? challenge.titleEn : challenge.title;
  const displayDescription = locale === 'en' && challenge.descriptionEn ? challenge.descriptionEn : challenge.description;
  
  const difficultyConfig = {
    'warm': {
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-700 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800',
      hover: 'hover:bg-green-100 dark:hover:bg-green-900/30',
      badge: 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300',
      icon: '🟢',
      gradient: 'from-green-400 to-green-600'
    },
    'medium': {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      text: 'text-yellow-700 dark:text-yellow-400',
      border: 'border-yellow-200 dark:border-yellow-800',
      hover: 'hover:bg-yellow-100 dark:hover:bg-yellow-900/30',
      badge: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300',
      icon: '🟡',
      gradient: 'from-yellow-400 to-orange-500'
    },
    'hard': {
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: 'text-red-700 dark:text-red-400',
      border: 'border-red-200 dark:border-red-800',
      hover: 'hover:bg-red-100 dark:hover:bg-red-900/30',
      badge: 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300',
      icon: '🔴',
      gradient: 'from-red-400 to-red-600'
    },
    'extreme': {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      text: 'text-purple-700 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800',
      hover: 'hover:bg-purple-100 dark:hover:bg-purple-900/30',
      badge: 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300',
      icon: '🟣',
      gradient: 'from-purple-400 to-purple-600'
    }
  };
  
  const config = difficultyConfig[challenge.difficulty];
  const hrefPath = `/${locale}/challenge/${challenge.id}` as const;
  
  return (
    <Link 
      href={hrefPath}
      className="block h-full group"
    >
      <div className={`relative border rounded-xl p-6 h-full flex flex-col transition-all duration-300 ${config.bg} ${config.border} ${config.hover} hover:shadow-xl hover:scale-[1.02] overflow-hidden`}>
        {/* 背景装饰 */}
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${config.gradient} opacity-10 rounded-full -translate-y-10 translate-x-10`}></div>
        
        {/* 难度徽章 */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{config.icon}</span>
            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${config.badge}`}>
              {dict.difficulty[challenge.difficulty]}
            </span>
          </div>
          <div className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        {/* 标题 */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {displayTitle}
        </h3>
        
        {/* 描述 */}
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-grow mb-4">
          {displayDescription}
        </p>
        
        {/* 底部信息 */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>5-15 min</span>
          </div>
        </div>
        
        {/* 悬停时的边框效果 */}
        <div className={`absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-current group-hover:${config.text} opacity-0 group-hover:opacity-20 transition-all duration-300`}></div>
      </div>
    </Link>
  );
} 