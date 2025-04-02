import { getChallengeById, getChallengeContent, getAdjacentChallenges } from '../../../utils/challenge-utils';
import MarkdownRenderer from '../../../components/MarkdownRenderer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ChallengePageProps {
  params: {
    id: string;
  };
}

export default async function ChallengePage({ params }: ChallengePageProps) {
  const challenge = getChallengeById(params.id);
  
  if (!challenge) {
    notFound();
  }
  
  const content = await getChallengeContent(challenge.path);
  const { prev, next } = getAdjacentChallenges(params.id);
  
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
          >
            <span className="mr-2">←</span>
            返回挑战列表
          </Link>
        </div>
        
        <div className={`mb-8 p-6 rounded-xl ${colorClass.bg} ${colorClass.border}`}>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{challenge.title}</h1>
            <span className={`text-sm px-3 py-1 rounded-full font-medium ${colorClass.bg} ${colorClass.text} ${colorClass.border}`}>
              {challenge.difficulty === 'warm' ? '简单' : 
               challenge.difficulty === 'medium' ? '中等' : 
               challenge.difficulty === 'hard' ? '困难' : '地狱'}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">{challenge.description}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
          <MarkdownRenderer content={content} />
        </div>
        
        <div className="flex justify-between mt-8 mb-8 gap-4">
          {prev ? (
            <Link 
              href={`/challenge/${prev.id}`}
              className={`flex items-center p-4 rounded-xl ${difficultyColors[prev.difficulty].bg} ${difficultyColors[prev.difficulty].border} ${difficultyColors[prev.difficulty].text} transition-all duration-200 hover:shadow-md hover:translate-x-[-2px] flex-1`}
            >
              <span className="mr-3 text-lg">←</span>
              <div>
                <div className="text-xs opacity-80 mb-1">上一个挑战</div>
                <div className="font-medium">{prev.title}</div>
              </div>
            </Link>
          ) : (
            <div className="flex-1"></div>
          )}
          
          {next ? (
            <Link 
              href={`/challenge/${next.id}`}
              className={`flex items-center justify-end p-4 rounded-xl ${difficultyColors[next.difficulty].bg} ${difficultyColors[next.difficulty].border} ${difficultyColors[next.difficulty].text} transition-all duration-200 hover:shadow-md hover:translate-x-[2px] flex-1`}
            >
              <div className="text-right">
                <div className="text-xs opacity-80 mb-1">下一个挑战</div>
                <div className="font-medium">{next.title}</div>
              </div>
              <span className="ml-3 text-lg">→</span>
            </Link>
          ) : (
            <div className="flex-1"></div>
          )}
        </div>
        
        <div className="mt-8">
          <div className={`p-6 rounded-xl ${colorClass.bg} ${colorClass.border}`}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">提交你的解决方案</h2>
            <p className="text-gray-600 dark:text-gray-400">
              在这个版本中，暂不支持直接提交解决方案。你可以在本地编写你的解决方案，并在相应的挑战文件夹中创建一个新文件。
            </p>
            <div className="mt-4">
              <a 
                href="https://github.com/erweixin/prompt-challenges" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
              >
                查看 GitHub 仓库
                <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 