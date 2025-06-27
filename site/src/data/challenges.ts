import { ChallengeGroup } from '../types/challenge';

// 使用统一的path字段表示原始路径
// 英文版将使用在文件名后添加.en.md的命名方式
// 新格式文件使用.md后缀
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
        path: '/warm/00-text-summary-new.md',
        description: '创建简洁而全面的文本摘要',
        descriptionEn: 'Create concise and comprehensive text summaries',
        difficulty: 'warm',
        tags: ['文本摘要', '信息提取', '自然语言处理'],
        requirements: ['生成简洁的摘要', '保留关键信息', '确保准确性'],
        testCases: [],
        scoringCriteria: []
      },
      {
        id: 'sentiment-analysis',
        title: '情感分析',
        titleEn: 'Sentiment Analysis',
        path: '/warm/01-sentiment-analysis-new.md',
        description: '准确识别文本的情感倾向',
        descriptionEn: 'Accurately identify the sentiment of text',
        difficulty: 'warm',
        tags: ['情感分析', '文本分类', '自然语言处理'],
        requirements: ['识别情感倾向', '判断情感强度', '提取关键词'],
        testCases: [],
        scoringCriteria: []
      },
      {
        id: 'format-conversion',
        title: '格式转换',
        titleEn: 'Format Conversion',
        path: '/warm/02-format-conversion-new.md',
        description: '将文本从一种格式转换为另一种格式',
        descriptionEn: 'Convert text from one format to another',
        difficulty: 'warm',
        tags: ['数据转换', '格式处理', '结构化数据'],
        requirements: ['保持数据完整性', '符合目标格式', '处理复杂结构'],
        testCases: [],
        scoringCriteria: []
      },
      {
        id: 'text-classification',
        title: '文本分类',
        titleEn: 'Text Classification',
        path: '/warm/03-text-classification.md',
        description: '将文本准确分类到预定义类别',
        descriptionEn: 'Accurately classify text into predefined categories',
        difficulty: 'warm',
        tags: ['文本分类', '机器学习', '自然语言处理'],
        requirements: ['准确分类', '处理边界情况', '提供分类理由'],
        testCases: [],
        scoringCriteria: []
      },
      {
        id: 'language-detection',
        title: '语言检测',
        titleEn: 'Language Detection',
        path: '/warm/04-language-detection.md',
        description: '识别文本使用的语言类型',
        descriptionEn: 'Identify the language of given text',
        difficulty: 'warm',
        tags: ['语言检测', '多语言处理', '自然语言处理'],
        requirements: ['准确识别语言', '处理混合语言', '提供置信度'],
        testCases: [],
        scoringCriteria: []
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
        difficulty: 'medium',
        tags: ['角色扮演', '专家系统', '提示词设计'],
        requirements: ['定义专家角色', '设定专业背景', '保持角色一致性'],
        testCases: [],
        scoringCriteria: []
      },
      {
        id: 'reverse-thinking',
        title: '逆向思维',
        titleEn: 'Reverse Thinking',
        path: '/medium/01-reverse-thinking.md',
        description: '通过反向推理解决问题',
        descriptionEn: 'Solve problems through reverse reasoning',
        difficulty: 'medium',
        tags: ['逆向思维', '逻辑推理', '问题解决'],
        requirements: ['反向分析问题', '逆向推理过程', '验证解决方案'],
        testCases: [],
        scoringCriteria: []
      },
      {
        id: 'instruction-following',
        title: '指令遵循',
        titleEn: 'Instruction Following',
        path: '/medium/02-instruction-following.md',
        description: '确保模型严格按照复杂指令行事',
        descriptionEn: 'Ensure models strictly follow complex instructions',
        difficulty: 'medium',
        tags: ['指令遵循', '约束控制', '精确执行'],
        requirements: ['严格遵循指令', '处理复杂约束', '避免偏离'],
        testCases: [],
        scoringCriteria: []
      },
      {
        id: 'multimodal-processing',
        title: '多模态处理',
        titleEn: 'Multimodal Processing',
        path: '/medium/03-multimodal-processing.md',
        description: '处理文本和图像的多模态信息',
        descriptionEn: 'Process multimodal information including text and images',
        difficulty: 'medium',
        tags: ['多模态', '图像理解', '跨模态推理'],
        requirements: ['理解图像内容', '关联文本信息', '综合分析'],
        testCases: [],
        scoringCriteria: []
      },
      {
        id: 'context-understanding',
        title: '上下文理解',
        titleEn: 'Context Understanding',
        path: '/medium/04-context-understanding.md',
        description: '深入理解文本的上下文关系',
        descriptionEn: 'Deeply understand contextual relationships in text',
        difficulty: 'medium',
        tags: ['上下文理解', '语义分析', '关系推理'],
        requirements: ['理解上下文', '识别隐含关系', '推理逻辑'],
        testCases: [],
        scoringCriteria: []
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
        difficulty: 'hard',
        tags: ['思维链', '多步推理', '逻辑思维'],
        requirements: ['分步推理', '展示思考过程', '验证推理逻辑'],
        testCases: [],
        scoringCriteria: []
      },
      {
        id: 'prompt-injection-defense',
        title: '提示词注入防御',
        titleEn: 'Prompt Injection Defense',
        path: '/hard/01-prompt-injection-defense.md',
        description: '防止提示词被恶意篡改',
        descriptionEn: 'Prevent prompts from being maliciously tampered with',
        difficulty: 'hard',
        tags: ['安全防护', '提示词注入', '对抗攻击'],
        requirements: ['检测恶意输入', '防御注入攻击', '保持功能正常'],
        testCases: [],
        scoringCriteria: []
      },
      {
        id: 'counterfactual-reasoning',
        title: '反事实推理',
        titleEn: 'Counterfactual Reasoning',
        path: '/hard/02-counterfactual-reasoning.md',
        description: '在假设情境下进行合理推理',
        descriptionEn: 'Perform reasonable reasoning in hypothetical scenarios',
        difficulty: 'hard',
        tags: ['反事实推理', '假设分析', '逻辑推理'],
        requirements: ['理解假设情境', '进行合理推理', '保持逻辑一致'],
        testCases: [],
        scoringCriteria: []
      },
      {
        id: 'function-call',
        title: '函数调用',
        titleEn: 'Function Call',
        path: '/hard/03-function-call.md',
        description: '设计能够调用外部函数的提示词',
        descriptionEn: 'Design prompts that can call external functions',
        difficulty: 'hard',
        tags: ['函数调用', '工具使用', 'API集成'],
        requirements: ['正确调用函数', '处理参数', '解析结果'],
        testCases: [],
        scoringCriteria: []
      },
      {
        id: 'multilingual-processing',
        title: '多语言处理',
        titleEn: 'Multilingual Processing',
        path: '/hard/03-multilingual-processing.md',
        description: '处理多种语言的文本内容',
        descriptionEn: 'Process text content in multiple languages',
        difficulty: 'hard',
        tags: ['多语言', '跨语言理解', '翻译处理'],
        requirements: ['理解多语言', '跨语言推理', '保持语义一致'],
        testCases: [],
        scoringCriteria: []
      },
      {
        id: 'knowledge-reasoning',
        title: '知识推理',
        titleEn: 'Knowledge Reasoning',
        path: '/hard/04-knowledge-reasoning.md',
        description: '基于知识库进行复杂推理',
        descriptionEn: 'Perform complex reasoning based on knowledge base',
        difficulty: 'hard',
        tags: ['知识推理', '知识图谱', '复杂推理'],
        requirements: ['利用知识库', '进行复杂推理', '验证推理结果'],
        testCases: [],
        scoringCriteria: []
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
        difficulty: 'extreme',
        tags: ['自我改进', '元学习', '提示词优化'],
        requirements: ['自我评估', '自动优化', '持续改进'],
        testCases: [],
        scoringCriteria: []
      },
      {
        id: 'adversarial-qa',
        title: '多轮对抗问答',
        titleEn: 'Adversarial Q&A',
        path: '/extreme/01-adversarial-qa.md',
        description: '设计能够应对对抗性问题的提示词',
        descriptionEn: 'Design prompts that can handle adversarial questions',
        difficulty: 'extreme',
        tags: ['对抗攻击', '鲁棒性', '安全问答'],
        requirements: ['识别对抗问题', '保持回答质量', '防御攻击'],
        testCases: [],
        scoringCriteria: []
      },
      {
        id: 'zero-shot-tool-use',
        title: '零样本工具使用',
        titleEn: 'Zero-Shot Tool Use',
        path: '/extreme/02-zero-shot-tool-use.md',
        description: '无需示例让模型学会使用新工具',
        descriptionEn: 'Enable models to learn to use new tools without examples',
        difficulty: 'extreme',
        tags: ['零样本学习', '工具使用', '元学习'],
        requirements: ['理解工具功能', '零样本使用', '正确调用'],
        testCases: [],
        scoringCriteria: []
      },
      {
        id: 'agent',
        title: '智能代理',
        titleEn: 'Intelligent Agent',
        path: '/extreme/03-agent.md',
        description: '创建具有自主决策能力的AI代理',
        descriptionEn: 'Create AI agents with autonomous decision-making capabilities',
        difficulty: 'extreme',
        tags: ['智能代理', '自主决策', '任务规划'],
        requirements: ['自主决策', '任务规划', '环境适应'],
        testCases: [],
        scoringCriteria: []
      },
      {
        id: 'multi-agent-collaboration',
        title: '多代理协作',
        titleEn: 'Multi-Agent Collaboration',
        path: '/extreme/03-multi-agent-collaboration.md',
        description: '设计多个AI代理的协作系统',
        descriptionEn: 'Design collaborative systems with multiple AI agents',
        difficulty: 'extreme',
        tags: ['多代理', '协作系统', '分布式AI'],
        requirements: ['代理协作', '任务分配', '冲突解决'],
        testCases: [],
        scoringCriteria: []
      },
      {
        id: 'creative-reasoning',
        title: '创造性推理',
        titleEn: 'Creative Reasoning',
        path: '/extreme/04-creative-reasoning.md',
        description: '引导模型进行创造性思维和推理',
        descriptionEn: 'Guide models through creative thinking and reasoning',
        difficulty: 'extreme',
        tags: ['创造性思维', '创新推理', '发散思维'],
        requirements: ['创造性思考', '创新解决方案', '逻辑合理性'],
        testCases: [],
        scoringCriteria: []
      },
      {
        id: 'rate-the-prompt',
        title: '提示词评分',
        titleEn: 'Rate the Prompt',
        path: '/extreme/04-rate-the-prompt.md',
        description: '让AI评估和优化提示词质量',
        descriptionEn: 'Enable AI to evaluate and optimize prompt quality',
        difficulty: 'extreme',
        tags: ['提示词评估', '质量优化', '元评估'],
        requirements: ['评估提示词', '提供改进建议', '量化评分'],
        testCases: [],
        scoringCriteria: []
      }
    ]
  }
]; 