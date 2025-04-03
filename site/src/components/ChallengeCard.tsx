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
  
  const difficultyColors = {
    'warm': {
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-700 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800',
      hover: 'hover:bg-green-100 dark:hover:bg-green-900/30'
    },
    'medium': {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      text: 'text-yellow-700 dark:text-yellow-400',
      border: 'border-yellow-200 dark:border-yellow-800',
      hover: 'hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
    },
    'hard': {
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: 'text-red-700 dark:text-red-400',
      border: 'border-red-200 dark:border-red-800',
      hover: 'hover:bg-red-100 dark:hover:bg-red-900/30'
    },
    'extreme': {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      text: 'text-purple-700 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800',
      hover: 'hover:bg-purple-100 dark:hover:bg-purple-900/30'
    }
  };
  
  const colorClass = difficultyColors[challenge.difficulty];
  const hrefPath = `/${locale}/challenge/${challenge.id}` as const;
  
  return (
    <Link 
      href={hrefPath}
      className="block h-full"
    >
      <div className={`border rounded-xl p-6 h-full flex flex-col transition-all duration-200 ${colorClass.bg} ${colorClass.border} ${colorClass.hover} hover:shadow-lg`}>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{displayTitle}</h3>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${colorClass.bg} ${colorClass.text} ${colorClass.border} flex-shrink-0 ml-2`}>
            {dict.difficulty[challenge.difficulty]}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-grow">{displayDescription}</p>
      </div>
    </Link>
  );
} 