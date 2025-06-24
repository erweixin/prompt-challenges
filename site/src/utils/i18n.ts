// 创建中英文翻译词典

const dictionaries = {
  en: {
    // 通用
    common: {
      backToList: 'Back to List',
      submitSolution: 'Submit Solution',
      readMore: 'Read More',
      challenges: 'Challenges',
      nextChallenge: 'Next Challenge',
      previousChallenge: 'Previous Challenge',
      viewOnGitHub: 'View on GitHub',
      submitInfo: 'Submit Info',
    },
    // 难度
    difficulty: {
      warm: 'Warm',
      medium: 'Medium',
      hard: 'Hard',
      extreme: 'Extreme',
    },
    // 主页
    home: {
      title: 'Prompt Challenges',
      subtitle: 'Level up your AI prompt engineering skills',
      description: 'Learn and practice AI prompt engineering by solving real challenges. From beginner to expert, progressively improve your skills.',
      getStarted: 'Get Started',
      viewAll: 'View All',
      learnMore: 'Learn More',
      features: {
        title: 'Why Choose Prompt Challenges?',
        feature1: {
          title: 'Real Projects',
          description: 'Challenges based on real scenarios to master practical prompt techniques'
        },
        feature2: {
          title: 'Instant Feedback',
          description: 'AI scoring system provides detailed feedback and improvement suggestions'
        },
        feature3: {
          title: 'Progressive Learning',
          description: 'From simple to complex, progressively improve your skills'
        },
        feature4: {
          title: 'Community Support',
          description: 'Join an active community to share experiences and solutions'
        }
      },
      stats: {
        title: 'Community Stats',
        challenges: 'Challenges',
        users: 'Active Users',
        solutions: 'Solutions',
        languages: 'Languages'
      },
      resources: {
        title: 'Learning Resources',
        description: 'Help you better master prompt engineering',
        books: 'Recommended Books',
        courses: 'Online Courses',
        tools: 'Useful Tools',
        community: 'Community Discussions'
      },
    },
    scorer: {
      yourPrompt: 'Your Prompt',
      enterPrompt: 'Enter your AI prompt below',
      promptPlaceholder: 'Write your prompt here...',
      scorePrompt: 'Score Prompt',
      scoring: 'Scoring...',
      error: 'Error occurred during scoring',
      scoreOutOf: 'Score out of 100',
      excellent: 'Excellent!',
      good: 'Good job!',
      fair: 'Fair attempt',
      needsImprovement: 'Needs improvement',
      poor: 'Poor',
      feedback: 'Feedback',
      tips: 'Tips for Better Prompts',
      tip1: 'Be specific and clear about what you want',
      tip2: 'Provide context and examples when helpful',
      tip3: 'Use appropriate tone and style for your audience',
      tip4: 'Test and iterate to improve your results'
    }
  },
  zh: {
    // 通用
    common: {
      backToList: '返回列表',
      submitSolution: '提交解答',
      readMore: '阅读更多',
      challenges: '挑战',
      nextChallenge: '下一题',
      previousChallenge: '上一题',
      viewOnGitHub: '在 GitHub 上查看',
      submitInfo: '提交信息',
    },
    // 难度
    difficulty: {
      warm: '入门',
      medium: '中等',
      hard: '困难',
      extreme: '极难',
    },
    // 主页
    home: {
      title: 'Prompt Challenges',
      subtitle: '提升你的 AI 提示词工程技能',
      description: '通过解决实际挑战来学习和练习 AI 提示词工程。从入门到专家，逐步提升你的技能。',
      getStarted: '开始挑战',
      viewAll: '查看全部',
      learnMore: '了解更多',
      features: {
        title: '为什么选择 Prompt Challenges？',
        feature1: {
          title: '实际项目',
          description: '基于真实场景的挑战，让你掌握实用的提示词技巧'
        },
        feature2: {
          title: '即时反馈',
          description: 'AI 评分系统提供详细的反馈和改进建议'
        },
        feature3: {
          title: '渐进学习',
          description: '从简单到复杂，循序渐进地提升技能'
        },
        feature4: {
          title: '社区支持',
          description: '加入活跃的社区，分享经验和解决方案'
        }
      },
      stats: {
        title: '社区数据',
        challenges: '挑战数量',
        users: '活跃用户',
        solutions: '提交解答',
        languages: '支持语言'
      },
      resources: {
        title: '学习资源',
        description: '帮助你更好地掌握提示词工程',
        books: '推荐书籍',
        courses: '在线课程',
        tools: '实用工具',
        community: '社区讨论'
      },
    },
    scorer: {
      yourPrompt: '你的 Prompt',
      enterPrompt: '在下方输入你的 AI 提示词',
      promptPlaceholder: '在这里编写你的 prompt...',
      scorePrompt: '给 Prompt 评分',
      scoring: '评分中...',
      error: '评分过程中出现错误',
      scoreOutOf: '满分 100 分',
      excellent: '优秀！',
      good: '做得很好！',
      fair: '一般',
      needsImprovement: '需要改进',
      poor: '较差',
      feedback: '反馈',
      tips: '提示词编写技巧',
      tip1: '明确具体地表达你的需求',
      tip2: '在需要时提供上下文和示例',
      tip3: '根据受众使用适当的语气和风格',
      tip4: '测试并迭代以改进结果'
    }
  },
};

export const getDictionary = (locale: string) => {
  return dictionaries[locale as keyof typeof dictionaries] || dictionaries.en;
};

// 根据语言获取挑战内容的函数
export const getChallengeContentPath = (locale: string, originalPath: string): string => {
  if (locale === 'en') {
    // 英文路径格式：/warm/00-text-summary.en.md
    const lastDotIndex = originalPath.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      // 插入.en到扩展名前面
      return originalPath.substring(0, lastDotIndex) + '.en' + originalPath.substring(lastDotIndex);
    }
    return originalPath;
  } else if (locale === 'zh') {
    // 中文路径格式：/warm/zh/00-text-summary.md
    const parts = originalPath.split('/');
    // 检查是否有足够的部分来构建新路径
    if (parts.length >= 2) {
      const difficulty = parts[0]; // 例如 "warm"
      const filename = parts[parts.length - 1]; // 例如 "00-text-summary.md"
      // 构建中文路径
      return `${difficulty}/zh/${filename}`;
    }
  }
  
  // 默认使用原始路径
  return originalPath;
};