export const dynamic = 'force-dynamic';
export const revalidate = 0;

import ChallengeList from '../../components/ChallengeList';
import LearningResources from '../../components/LearningResources';
// import StatsSection from '../../components/StatsSection';
import { challenges } from '../../data/challenges';
import { getDictionary } from '../../utils/i18n';

export default function Home() {
  const dict = getDictionary('en');
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>🚀</span>
              <span>Improve Your AI Prompt Engineering Skills</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {dict.home.title}
              <span className="block text-4xl md:text-5xl text-blue-600 dark:text-blue-400 mt-2">
                {dict.home.subtitle}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              {dict.home.description}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a 
                href="#challenges" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {dict.home.getStarted}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a 
                href="https://github.com/erweixin/prompt-challenges" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
            
            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">12+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Challenges</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">4</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Difficulty Levels</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">2</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Free & Open</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {/* <StatsSection locale="en" /> */}

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.home.features.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Improve your prompt engineering skills through systematic challenges
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500 rounded-xl group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{dict.home.features.feature1.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{dict.home.features.feature1.description}</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-500 rounded-xl group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{dict.home.features.feature2.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{dict.home.features.feature2.description}</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-500 rounded-xl group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{dict.home.features.feature3.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{dict.home.features.feature3.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Challenges Section */}
      <div id="challenges" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Challenge Categories</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Choose your difficulty level and start improving your prompt engineering skills.
            </p>
            <div className="flex justify-center">
              <a 
                href="#challenges" 
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                {dict.home.viewAll}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
            <ChallengeList groups={challenges} locale="en" />
          </div>
        </div>
      </div>

      {/* Learning Resources Section */}
      <LearningResources locale="en" />

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Prompt Engineering Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our community and grow together with other learners
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#challenges" 
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Start Challenges
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a 
              href="https://github.com/erweixin/prompt-challenges/discussions" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Join Discussion
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 