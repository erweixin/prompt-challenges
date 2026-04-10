export type Locale = 'zh' | 'en';

export const ui = {
  zh: {
    siteTitle: '大模型学习路径',
    siteTagline: '从类豆包的单轮查询，到 Cursor 式 IDE 协作，再到 OpenClaw 类本地 Agent 治理',
    navChallenges: '全部练习',
    navResources: '学习资源',
    navPath: '学习路径',
    ctaStart: '开始学习',
    ctaGithub: 'GitHub',
    pathIntro:
      '这不是一堆零散提示词技巧，而是一条按心智升级设计的路径：先学会把问题说清楚，再学会让模型配合工具与代码库，最后学会为本地 Agent 设计 MCP、Skills 与安全边界。',
    stageFoundation: '预备：认识大模型',
    stagePrompt: '阶段 0：把话说清楚',
    stageTools: '阶段 1：工具与函数调用',
    stageMcp: '阶段 2：MCP',
    stageSkills: '阶段 3：Skills',
    stageHarness: '阶段 4：Harness',
    stageCross: '横切技巧',
    difficulty: { warm: '入门', medium: '中等', hard: '进阶', extreme: '深入' },
    kindReading: '读本',
    kindPractice: '练习',
    backHome: '返回首页',
    prev: '上一节',
    next: '下一节',
    challengeMeta: '学习路径',
    writePrompt: '写下你的提示词',
    writePromptHint: '根据左侧要求编写；可先在 ChatGPT / Claude 里试写再粘贴。',
    needApiKey: '服务端未配置 API 密钥，无法自动评分。请在本地 .dev.vars 或 Cloudflare 环境变量中设置 OPENROUTER_API_KEY。',
    resourcesTitle: '延伸阅读',
    resourcesSectionTitle: '学习资源',
    resourcesSectionIntro:
      '资源按学习阶段排序：先补结构化提示，再补工具与 IDE 协作，最后进入 MCP、本地 Agent、Skills、Harness 与安全治理。本站题目为原创路径，外链主要指向官方文档。',
  },
  en: {
    siteTitle: 'LLM Learning Path',
    siteTagline: 'From one-shot chatbot queries to Cursor-style IDE collaboration and OpenClaw-style local agent governance',
    navChallenges: 'All challenges',
    navResources: 'Resources',
    navPath: 'Learning path',
    ctaStart: 'Start learning',
    ctaGithub: 'GitHub',
    pathIntro:
      'This path is not a pile of isolated prompt tricks. It is a staged upgrade: first write clear requests, then collaborate with tools and a codebase, then design MCP, Skills, and safety boundaries for local agents.',
    stageFoundation: 'Foundation: how LLMs work',
    stagePrompt: 'Stage 0: clear requests',
    stageTools: 'Stage 1: tools & function calling',
    stageMcp: 'Stage 2: MCP',
    stageSkills: 'Stage 3: Skills',
    stageHarness: 'Stage 4: Harness',
    stageCross: 'Cross-cutting tips',
    difficulty: { warm: 'Warm-up', medium: 'Medium', hard: 'Hard', extreme: 'Deep' },
    kindReading: 'Reading',
    kindPractice: 'Practice',
    backHome: 'Home',
    prev: 'Previous',
    next: 'Next',
    challengeMeta: 'Path',
    writePrompt: 'Your prompt',
    writePromptHint: 'Follow the brief on the left; you can draft in any chat app and paste here.',
    needApiKey: 'API key not configured on the server. Set OPENROUTER_API_KEY in .dev.vars or Cloudflare.',
    resourcesTitle: 'Further reading',
    resourcesSectionTitle: 'Learning resources',
    resourcesSectionIntro:
      'Resources are grouped by the learning sequence: structured prompting first, then tools and IDE collaboration, then MCP, local agents, Skills, harnesses, and safety. On-site lessons are original; external links are mostly official docs.',
  },
} as const;

export function useUi(locale: string) {
  const l = locale === 'en' ? 'en' : 'zh';
  return ui[l];
}

export function stageLabel(locale: string, stage: string): string {
  const t = useUi(locale);
  const map: Record<string, keyof typeof ui.zh> = {
    foundation: 'stageFoundation',
    prompt: 'stagePrompt',
    tools: 'stageTools',
    mcp: 'stageMcp',
    skills: 'stageSkills',
    harness: 'stageHarness',
    cross_cut: 'stageCross',
  };
  const key = map[stage];
  return key ? (t[key] as string) : stage;
}
