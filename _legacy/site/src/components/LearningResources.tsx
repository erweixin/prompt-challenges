import { getDictionary } from '../utils/i18n';

interface LearningResourcesProps {
  locale: string;
}

const learningResources = {
  guides: [
    {
      title: 'GPT-4.1 Prompting Guide',
      url: 'https://cookbook.openai.com/examples/gpt4-1_prompting_guide',
      description: 'OpenAI 官方的 GPT-4.1 提示词指南',
      icon: '📖'
    },
    {
      title: 'Prompt Engineering',
      url: 'https://www.kaggle.com/whitepaper-prompt-engineering',
      description: 'Kaggle 上的提示词工程白皮书',
      icon: '📊'
    },
    {
      title: '提示词工程指南',
      url: 'https://www.promptingguide.ai/zh',
      description: '中文提示词工程指南',
      icon: '🇨🇳'
    }
  ],
  bestPractices: [
    {
      title: 'Prompt Engineering 最佳实践',
      url: 'https://platform.openai.com/docs/guides/prompt-engineering',
      description: 'OpenAI 平台的提示词工程最佳实践',
      icon: '⭐'
    },
    {
      title: 'AI 提示词模式',
      url: 'https://learnprompting.org/docs/category/-prompt-engineering-patterns',
      description: 'Learn Prompting 的提示词模式集合',
      icon: '🔧'
    }
  ],
  patterns: [
    {
      title: 'Chain of Thought Prompting',
      url: 'https://arxiv.org/abs/2201.11903',
      description: '思维链提示词研究论文',
      icon: '🧠'
    },
    {
      title: 'Few-Shot Learning',
      url: 'https://arxiv.org/abs/2005.14165',
      description: '少样本学习在提示词中的应用',
      icon: '🎯'
    }
  ],
  research: [
    {
      title: 'Attention Is All You Need',
      url: 'https://arxiv.org/abs/1706.03762',
      description: 'Transformer 架构的经典论文',
      icon: '📄'
    },
    {
      title: 'Language Models are Few-Shot Learners',
      url: 'https://arxiv.org/abs/2005.14165',
      description: 'GPT-3 论文，理解大语言模型能力',
      icon: '🔬'
    }
  ]
};

export default function LearningResources({ locale }: LearningResourcesProps) {
  const dict = getDictionary(locale);
  
  const resourceCategories = [
    {
      key: 'guides',
      title: dict.home.resources.books,
      resources: learningResources.guides,
      color: 'blue'
    },
    {
      key: 'bestPractices',
      title: dict.home.resources.courses,
      resources: learningResources.bestPractices,
      color: 'green'
    },
    {
      key: 'patterns',
      title: dict.home.resources.tools,
      resources: learningResources.patterns,
      color: 'purple'
    },
    {
      key: 'research',
      title: dict.home.resources.community,
      resources: learningResources.research,
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        text: 'text-blue-700 dark:text-blue-400',
        hover: 'hover:bg-blue-100 dark:hover:bg-blue-900/30'
      },
      green: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-200 dark:border-green-800',
        text: 'text-green-700 dark:text-green-400',
        hover: 'hover:bg-green-100 dark:hover:bg-green-900/30'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        border: 'border-purple-200 dark:border-purple-800',
        text: 'text-purple-700 dark:text-purple-400',
        hover: 'hover:bg-purple-100 dark:hover:bg-purple-900/30'
      },
      orange: {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        border: 'border-orange-200 dark:border-orange-800',
        text: 'text-orange-700 dark:text-orange-400',
        hover: 'hover:bg-orange-100 dark:hover:bg-orange-900/30'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {dict.home.resources.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {dict.home.resources.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {resourceCategories.map((category) => {
            const colorClasses = getColorClasses(category.color);
            return (
              <div key={category.key} className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
                <div className="space-y-3">
                  {category.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block p-4 rounded-lg border transition-all duration-200 ${colorClasses.bg} ${colorClasses.border} ${colorClasses.hover} hover:shadow-md`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xl flex-shrink-0">{resource.icon}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                            {resource.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {resource.description}
                          </p>
                        </div>
                        <span className="text-gray-400 dark:text-gray-500 text-sm">↗</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 