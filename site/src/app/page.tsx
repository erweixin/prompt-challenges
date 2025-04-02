import ChallengeList from '../components/ChallengeList';
import { challenges } from '../data/challenges';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              提升你的 AI 提示词工程能力
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              通过实践来掌握高效的 AI 提示词编写技巧，从简单到复杂，循序渐进地提升你的能力。
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="#challenges" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                开始挑战
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <span className="text-blue-600 dark:text-blue-400 text-xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">循序渐进</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">从简单的文本摘要到复杂的反事实推理，每个挑战都经过精心设计，确保你的技能稳步提升。</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <span className="text-green-600 dark:text-green-400 text-xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">实践导向</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">每个挑战都基于真实场景，让你在实践中学习和成长，掌握实用的提示词工程技巧。</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <span className="text-purple-600 dark:text-purple-400 text-xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">社区支持</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">加入活跃的社区，与其他学习者交流经验，分享解决方案，共同进步。</p>
            </div>
          </div>
        </div>
      </div>

      {/* Challenges Section */}
      <div id="challenges" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">挑战列表</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              从简单到地狱难度，每个挑战都是你提升提示词工程能力的阶梯。
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
            <ChallengeList groups={challenges} />
          </div>
        </div>
      </div>
    </div>
  );
}
