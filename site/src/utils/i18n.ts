// 创建中英文翻译词典

const dictionaries = {
  en: {
    // 通用
    common: {
      backToList: 'Back to Challenge List',
      submitSolution: 'Submit Your Solution',
      readMore: 'Read More',
      challenges: 'Challenges',
      nextChallenge: 'Next Challenge',
      previousChallenge: 'Previous Challenge',
      viewOnGitHub: 'View on GitHub',
      submitInfo: 'In this version, direct submission of solutions is not supported. You can write your solution locally and create a new file in the corresponding challenge folder.',
    },
    // 难度
    difficulty: {
      warm: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      extreme: 'Extreme',
    },
    // 主页
    home: {
      hero: {
        title: 'Improve Your AI Prompt Engineering Skills',
        description: 'Master efficient AI prompt writing techniques through practice, progressing from simple to complex challenges to enhance your skills.',
        startChallenge: 'Start Challenges',
      },
      features: {
        progressive: {
          title: 'Progressive Learning',
          description: 'From simple text summaries to complex counterfactual reasoning, each challenge is carefully designed to steadily improve your skills.',
        },
        practical: {
          title: 'Practice-Oriented',
          description: 'Each challenge is based on real-world scenarios, allowing you to learn and grow through practice while mastering practical prompt engineering techniques.',
        },
        community: {
          title: 'Community Support',
          description: 'Join an active community to exchange experiences with other learners, share solutions, and grow together.',
        },
      },
      challengeSection: {
        title: 'Challenge List',
        description: 'From easy to extreme difficulty, each challenge is a step towards improving your prompt engineering skills.',
      },
    },
  },
  zh: {
    // 通用
    common: {
      backToList: '返回挑战列表',
      submitSolution: '提交你的解决方案',
      readMore: '阅读更多',
      challenges: '挑战列表',
      nextChallenge: '下一个挑战',
      previousChallenge: '上一个挑战',
      viewOnGitHub: '查看 GitHub 仓库',
      submitInfo: '在这个版本中，暂不支持直接提交解决方案。你可以在本地编写你的解决方案，并在相应的挑战文件夹中创建一个新文件。',
    },
    // 难度
    difficulty: {
      warm: '简单',
      medium: '中等',
      hard: '困难',
      extreme: '地狱',
    },
    // 主页
    home: {
      hero: {
        title: '提升你的 AI 提示词工程能力',
        description: '通过实践来掌握高效的 AI 提示词编写技巧，从简单到复杂，循序渐进地提升你的能力。',
        startChallenge: '开始挑战',
      },
      features: {
        progressive: {
          title: '循序渐进',
          description: '从简单的文本摘要到复杂的反事实推理，每个挑战都经过精心设计，确保你的技能稳步提升。',
        },
        practical: {
          title: '实践导向',
          description: '每个挑战都基于真实场景，让你在实践中学习和成长，掌握实用的提示词工程技巧。',
        },
        community: {
          title: '社区支持',
          description: '加入活跃的社区，与其他学习者交流经验，分享解决方案，共同进步。',
        },
      },
      challengeSection: {
        title: '挑战列表',
        description: '从简单到地狱难度，每个挑战都是你提升提示词工程能力的阶梯。',
      },
    },
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