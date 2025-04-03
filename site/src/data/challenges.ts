import { ChallengeGroup } from '../types/challenge';

// 使用统一的path字段表示原始路径
// 英文版将使用在文件名后添加.en.md的命名方式
export const challenges: ChallengeGroup[] = [
  {
    level: 'warm',
    label: '简单',
    emoji: '🟢',
    challenges: [
      {
        id: 'text-summary',
        title: '文本摘要',
        titleEn: 'Text Summary',
        path: '/warm/00-text-summary.md',
        description: '创建简洁而全面的文本摘要',
        descriptionEn: 'Create concise and comprehensive text summaries',
        difficulty: 'warm'
      },
      {
        id: 'sentiment-analysis',
        title: '情感分析',
        titleEn: 'Sentiment Analysis',
        path: '/warm/01-sentiment-analysis.md',
        description: '准确识别文本的情感倾向',
        descriptionEn: 'Accurately identify the sentiment of text',
        difficulty: 'warm'
      },
      {
        id: 'format-conversion',
        title: '格式转换',
        titleEn: 'Format Conversion',
        path: '/warm/02-format-conversion.md',
        description: '将文本从一种格式转换为另一种格式',
        descriptionEn: 'Convert text from one format to another',
        difficulty: 'warm'
      }
    ]
  },
  {
    level: 'medium',
    label: '中等',
    emoji: '🟡',
    challenges: [
      {
        id: 'role-playing',
        title: '角色扮演',
        titleEn: 'Role Playing',
        path: '/medium/00-role-playing.md',
        description: '设计专家角色提示词',
        descriptionEn: 'Design expert role prompts',
        difficulty: 'medium'
      },
      {
        id: 'reverse-thinking',
        title: '逆向思维',
        titleEn: 'Reverse Thinking',
        path: '/medium/01-reverse-thinking.md',
        description: '通过反向推理解决问题',
        descriptionEn: 'Solve problems through reverse reasoning',
        difficulty: 'medium'
      },
      {
        id: 'instruction-following',
        title: '指令遵循',
        titleEn: 'Instruction Following',
        path: '/medium/02-instruction-following.md',
        description: '确保模型严格按照复杂指令行事',
        descriptionEn: 'Ensure models strictly follow complex instructions',
        difficulty: 'medium'
      }
    ]
  },
  {
    level: 'hard',
    label: '困难',
    emoji: '🔴',
    challenges: [
      {
        id: 'chain-of-thought',
        title: '思维链',
        titleEn: 'Chain of Thought',
        path: '/hard/00-chain-of-thought.md',
        description: '引导模型进行多步推理',
        descriptionEn: 'Guide models through multi-step reasoning',
        difficulty: 'hard'
      },
      {
        id: 'prompt-injection-defense',
        title: '提示词注入防御',
        titleEn: 'Prompt Injection Defense',
        path: '/hard/01-prompt-injection-defense.md',
        description: '防止提示词被恶意篡改',
        descriptionEn: 'Prevent prompts from being maliciously tampered with',
        difficulty: 'hard'
      },
      {
        id: 'counterfactual-reasoning',
        title: '反事实推理',
        titleEn: 'Counterfactual Reasoning',
        path: '/hard/02-counterfactual-reasoning.md',
        description: '在假设情境下进行合理推理',
        descriptionEn: 'Perform reasonable reasoning in hypothetical scenarios',
        difficulty: 'hard'
      }
    ]
  },
  {
    level: 'extreme',
    label: '地狱',
    emoji: '🟣',
    challenges: [
      {
        id: 'self-improving-prompt',
        title: '自我改进提示词',
        titleEn: 'Self-Improving Prompt',
        path: '/extreme/00-self-improving-prompt.md',
        description: '创建能够自我优化的提示词',
        descriptionEn: 'Create prompts that can self-optimize',
        difficulty: 'extreme'
      },
      {
        id: 'adversarial-qa',
        title: '多轮对抗问答',
        titleEn: 'Adversarial Q&A',
        path: '/extreme/01-adversarial-qa.md',
        description: '设计能够应对对抗性问题的提示词',
        descriptionEn: 'Design prompts that can handle adversarial questions',
        difficulty: 'extreme'
      },
      {
        id: 'zero-shot-tool-use',
        title: '零样本工具使用',
        titleEn: 'Zero-Shot Tool Use',
        path: '/extreme/02-zero-shot-tool-use.md',
        description: '无需示例让模型学会使用新工具',
        descriptionEn: 'Enable models to learn to use new tools without examples',
        difficulty: 'extreme'
      }
    ]
  }
]; 