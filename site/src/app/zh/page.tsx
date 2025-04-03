export const dynamic = 'force-dynamic';
export const revalidate = 0;

import ChallengeList from '../../components/ChallengeList';
import { challenges } from '../../data/challenges';
import { getDictionary } from '../../utils/i18n';

export default function Home() {
  const dict = getDictionary('zh');
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {dict.home.hero.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              {dict.home.hero.description}
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="#challenges" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                {dict.home.hero.startChallenge}
                <span>→</span>
              </a>
              <a 
                href="https://github.com/erweixin/prompt-challenges" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <span className="text-xl">🔗</span>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <span className="text-blue-600 dark:text-blue-400 text-xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{dict.home.features.progressive.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">{dict.home.features.progressive.description}</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <span className="text-green-600 dark:text-green-400 text-xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{dict.home.features.practical.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">{dict.home.features.practical.description}</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <span className="text-purple-600 dark:text-purple-400 text-xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{dict.home.features.community.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">{dict.home.features.community.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Challenges Section */}
      <div id="challenges" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{dict.home.challengeSection.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {dict.home.challengeSection.description}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
            <ChallengeList groups={challenges} locale="zh" />
          </div>
        </div>
      </div>
    </div>
  );
}