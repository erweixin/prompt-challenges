import { Challenge } from '../types/challenge';
import Link from 'next/link';

interface ChallengeCardProps {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
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
  
  return (
    <Link href={`/challenge/${challenge.id}`} className="block">
      <div className={`border rounded-xl p-6 transition-all duration-200 ${colorClass.bg} ${colorClass.border} ${colorClass.hover} hover:shadow-lg`}>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{challenge.title}</h3>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${colorClass.bg} ${colorClass.text} ${colorClass.border}`}>
            {challenge.difficulty === 'warm' ? '简单' : 
             challenge.difficulty === 'medium' ? '中等' : 
             challenge.difficulty === 'hard' ? '困难' : '地狱'}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{challenge.description}</p>
      </div>
    </Link>
  );
} 