import type { Locale } from '../i18n/ui';

export interface ResourceItem {
  title: string;
  href: string;
  description: string;
}

export interface ResourceGroup {
  title: string;
  items: ResourceItem[];
}

const groups: Record<Locale, ResourceGroup[]> = {
  zh: [
    {
      title: '从单轮查询到结构化提示',
      items: [
        {
          title: 'OpenAI 提示工程指南',
          href: 'https://platform.openai.com/docs/guides/prompt-engineering',
          description: '官方提示写法总览。适合在阶段 0 后读，补“目标/约束/输出/验收”结构。',
        },
        {
          title: 'Prompt Engineering Guide（中文）',
          href: 'https://www.promptingguide.ai/zh',
          description: '系统化梳理常见模式。适合在阶段 0 中段补知识地图。',
        },
        {
          title: 'Kaggle 提示工程白皮书',
          href: 'https://www.kaggle.com/whitepaper-prompt-engineering',
          description: '偏教材式总览。适合在阶段 0 结束后查漏补缺。',
        },
      ],
    },
    {
      title: '从聊天到工具 / 函数调用',
      items: [
        {
          title: 'OpenAI Function Calling',
          href: 'https://platform.openai.com/docs/guides/function-calling',
          description: '官方工具调用说明。适合阶段 1 开始时读，建立“聊天 vs 动作”分界。',
        },
        {
          title: 'OpenAI Structured Outputs',
          href: 'https://platform.openai.com/docs/guides/structured-outputs',
          description: '理解结构化输出与真工具调用的区别。适合阶段 1 中段。',
        },
        {
          title: 'OpenAI Tokenizer',
          href: 'https://platform.openai.com/tokenizer',
          description: '观察长上下文如何膨胀。适合阶段 0 到阶段 1 之间回看。',
        },
      ],
    },
    {
      title: '从 IDE 协作到代码代理',
      items: [
        {
          title: 'Cursor Docs',
          href: 'https://docs.cursor.com/zh',
          description: '官方文档。适合阶段 1 后阅读，观察 IDE 协作如何围绕代码库与回合推进。',
        },
        {
          title: 'Cursor Rules & Concepts',
          href: 'https://docs.cursor.com/ai-features/rules',
          description: '看清规则、范围与协作约束。适合把个人提示升级为 IDE 工作流时阅读。',
        },
        {
          title: 'Cursor Guides',
          href: 'https://docs.cursor.com/guides/overview',
          description: '官方工作流指南。适合阶段 1 末尾，过渡到 Agent 式任务拆解。',
        },
      ],
    },
    {
      title: 'MCP 与本地 Agent',
      items: [
        {
          title: 'Model Context Protocol',
          href: 'https://modelcontextprotocol.io/',
          description: 'MCP 官方入口。适合阶段 2 开始时读，理解资源、工具与权限边界。',
        },
        {
          title: 'OpenClaw Docs',
          href: 'https://docs.openclaw.ai/',
          description: '本地 Agent 文档。适合阶段 2 后半段，观察消息入口、会话、工具和治理如何组合。',
        },
        {
          title: 'OpenClaw 官网',
          href: 'https://openclaw.ai/',
          description: '产品与能力概览。适合阶段 2 后快速建立“本地 Agent”直觉。',
        },
      ],
    },
    {
      title: 'Skills / Playbooks / SOP',
      items: [
        {
          title: 'Anthropic：Build effective agents',
          href: 'https://www.anthropic.com/engineering/building-effective-agents',
          description: '高质量工作流设计文章。适合阶段 3 读，理解何时把提示升级为可复用流程。',
        },
        {
          title: 'Cursor Docs：Background Agents',
          href: 'https://docs.cursor.com/background-agent/overview',
          description: '观察 Skill、规则、后台执行如何连起来。适合阶段 3 后半段。',
        },
        {
          title: 'OpenClaw Skills',
          href: 'https://docs.openclaw.ai/skills',
          description: '了解本地 Agent 的技能扩展方式。适合阶段 3 配合课程实操。',
        },
      ],
    },
    {
      title: 'Harness / Evals / Reliability',
      items: [
        {
          title: 'OpenAI：Harness engineering（中文）',
          href: 'https://openai.com/zh-Hans-CN/index/harness-engineering/',
          description: '为什么要做验收、回归与围栏。适合阶段 4 刚开始阅读。',
        },
        {
          title: 'OpenAI：Harness engineering（English）',
          href: 'https://openai.com/index/harness-engineering/',
          description: '英文原文。适合阶段 4 深挖工程化思路。',
        },
        {
          title: 'OpenAI Evals design guide',
          href: 'https://platform.openai.com/docs/guides/evals',
          description: '如何设计样例集与评估标准。适合阶段 4 中后段。',
        },
      ],
    },
    {
      title: '安全、权限与治理',
      items: [
        {
          title: 'MCP Security Best Practices',
          href: 'https://modelcontextprotocol.io/docs/concepts/security',
          description: '看清 MCP 里的信任边界。适合阶段 2 末尾与阶段 6 一起阅读。',
        },
        {
          title: 'OpenAI Safety best practices',
          href: 'https://platform.openai.com/docs/guides/safety-best-practices',
          description: '官方安全建议。适合开始接真实工具前阅读。',
        },
        {
          title: 'OpenClaw Security',
          href: 'https://docs.openclaw.ai/security',
          description: '本地 Agent 的 token、allowlist 与执行风险。适合阶段 6 对照课程复盘。',
        },
      ],
    },
  ],
  en: [
    {
      title: 'From one-shot queries to structured prompts',
      items: [
        {
          title: 'OpenAI prompt engineering',
          href: 'https://platform.openai.com/docs/guides/prompt-engineering',
          description: 'Official prompt design guide. Best after Stage 0 when you need clearer structure and constraints.',
        },
        {
          title: 'Prompting Guide',
          href: 'https://www.promptingguide.ai/',
          description: 'A broad map of prompting patterns. Best mid-Stage 0 as supporting reference.',
        },
        {
          title: 'Kaggle prompt engineering whitepaper',
          href: 'https://www.kaggle.com/whitepaper-prompt-engineering',
          description: 'A textbook-style overview. Best after Stage 0 to fill in gaps.',
        },
      ],
    },
    {
      title: 'From chat to tools / function calling',
      items: [
        {
          title: 'OpenAI function calling',
          href: 'https://platform.openai.com/docs/guides/function-calling',
          description: 'Official guide to tool invocation. Best at the start of Stage 1.',
        },
        {
          title: 'OpenAI structured outputs',
          href: 'https://platform.openai.com/docs/guides/structured-outputs',
          description: 'Useful for separating structured replies from actual tool use. Best mid-Stage 1.',
        },
        {
          title: 'OpenAI Tokenizer',
          href: 'https://platform.openai.com/tokenizer',
          description: 'See how context grows and why long chats become expensive. Best between Stage 0 and Stage 1.',
        },
      ],
    },
    {
      title: 'From IDE collaboration to code agents',
      items: [
        {
          title: 'Cursor docs',
          href: 'https://docs.cursor.com/',
          description: 'Official docs for codebase-aware collaboration. Best after Stage 1 basics.',
        },
        {
          title: 'Cursor rules',
          href: 'https://docs.cursor.com/ai-features/rules',
          description: 'Helpful for understanding scoped collaboration, rules, and guardrails in an IDE.',
        },
        {
          title: 'Cursor guides',
          href: 'https://docs.cursor.com/guides/overview',
          description: 'Workflow-oriented docs for moving from prompts to codebase tasks.',
        },
      ],
    },
    {
      title: 'MCP and local agents',
      items: [
        {
          title: 'Model Context Protocol',
          href: 'https://modelcontextprotocol.io/',
          description: 'The official MCP hub. Best at the start of Stage 2.',
        },
        {
          title: 'OpenClaw docs',
          href: 'https://docs.openclaw.ai/',
          description: 'Official local-agent docs covering gateway, tools, sessions, and security. Best after Stage 2 basics.',
        },
        {
          title: 'OpenClaw website',
          href: 'https://openclaw.ai/',
          description: 'A product-level overview to build intuition for local agents.',
        },
      ],
    },
    {
      title: 'Skills / playbooks / SOPs',
      items: [
        {
          title: 'Anthropic: Building effective agents',
          href: 'https://www.anthropic.com/engineering/building-effective-agents',
          description: 'A strong workflow design reference. Best in Stage 3 when prompts start turning into reusable procedures.',
        },
        {
          title: 'Cursor background agents',
          href: 'https://docs.cursor.com/background-agent/overview',
          description: 'Useful for connecting rules, repeatable workflows, and delegated tasks.',
        },
        {
          title: 'OpenClaw skills',
          href: 'https://docs.openclaw.ai/skills',
          description: 'Shows how local-agent capabilities get extended through reusable skills.',
        },
      ],
    },
    {
      title: 'Harness / evals / reliability',
      items: [
        {
          title: 'OpenAI: Harness engineering',
          href: 'https://openai.com/index/harness-engineering/',
          description: 'Why wrappers, checks, and evals matter. Best at the start of Stage 4.',
        },
        {
          title: 'OpenAI evals guide',
          href: 'https://platform.openai.com/docs/guides/evals',
          description: 'Useful for designing regression sets and acceptance criteria in Stage 4.',
        },
      ],
    },
    {
      title: 'Safety, permissions, and governance',
      items: [
        {
          title: 'MCP security',
          href: 'https://modelcontextprotocol.io/docs/concepts/security',
          description: 'A practical look at trust boundaries for connected context and tools.',
        },
        {
          title: 'OpenAI safety best practices',
          href: 'https://platform.openai.com/docs/guides/safety-best-practices',
          description: 'Read before connecting real data or real actions.',
        },
        {
          title: 'OpenClaw security',
          href: 'https://docs.openclaw.ai/security',
          description: 'Best for Stage 6 when you start reasoning about local-agent permissions and execution risk.',
        },
      ],
    },
  ],
};

export function getLearningResourceGroups(locale: string): ResourceGroup[] {
  const l: Locale = locale === 'en' ? 'en' : 'zh';
  return groups[l];
}
