import type { Locale } from '../i18n/ui';

export interface StageGuide {
  stage: string;
  before: string;
  after: string;
  outcome: string;
}

const guides: Record<Locale, Record<string, StageGuide>> = {
  zh: {
    foundation: {
      stage: 'foundation',
      before: '先别急着学技巧，先弄明白模型为什么会答偏、答漏、答得不稳定。',
      after: '这一段会带你认识 token、上下文窗口、模态和工具边界。',
      outcome: '学完后你能判断：问题到底出在提问、上下文，还是任务本来就该交给工具。',
    },
    prompt: {
      stage: 'prompt',
      before: '很多人会像用豆包那样，一次问一句，希望模型自己补全背景。',
      after: '这一段会把“随口一问”升级成可执行 brief：目标、背景、约束、输出、验收都写清楚。',
      outcome: '学完后你能把模糊请求改成清楚任务，也知道什么时候该先问清楚再生成。',
    },
    tools: {
      stage: 'tools',
      before: '当任务开始碰到天气、日程、数据库、代码库时，光聊天就不够了。',
      after: '这一段会教你区分：什么时候该继续对话，什么时候该查系统、调接口、跑动作。',
      outcome: '学完后你能像和 Cursor 配合一样，把范围、动作、参数和验证方式交代清楚。',
    },
    mcp: {
      stage: 'mcp',
      before: '如果你总在聊天框里手贴资料、补最新状态，这通常说明该换方法了。',
      after: '这一段会介绍怎样用标准化方式把文件、知识库、API 和权限边界接进工作流。',
      outcome: '学完后你能判断什么时候值得上 MCP，也知道最小接入要定义哪些资源和权限。',
    },
    skills: {
      stage: 'skills',
      before: '如果一件事每周都要重新解释一遍，就说明它该被沉淀下来了。',
      after: '这一段会把个人习惯整理成可复用的 Skill / SOP，写清输入、步骤、输出和出错处理。',
      outcome: '学完后你能把自己的协作套路整理成别人或 Agent 都能复用的说明。',
    },
    harness: {
      stage: 'harness',
      before: '只有提示词和流程还不够，真正上线后还会遇到漂移、漏字段和误触发。',
      after: '这一段会带你补上验收清单、样例集、回归检查和人工兜底。',
      outcome: '学完后你能为关键任务设计轻量 harness，知道怎么验收、回归和回退。',
    },
    cross_cut: {
      stage: 'cross_cut',
      before: '走到本地 Agent 这一步，重点已经不只是“会不会用”，而是“能不能管住”。',
      after: '这一段会把安全边界、审批、人类责任和长期使用习惯一起补齐。',
      outcome: '学完后你能沿着“豆包 → Cursor → OpenClaw”搭起一套长期可复用的个人工作流。',
    },
  },
  en: {
    foundation: {
      stage: 'foundation',
      before: 'Before chasing techniques, start by understanding why models drift, miss details, or answer unevenly.',
      after: 'This stage introduces tokens, context windows, modalities, and tool boundaries.',
      outcome: 'After this stage you can tell whether a problem comes from the prompt, the context, or the task actually needing tools.',
    },
    prompt: {
      stage: 'prompt',
      before: 'Many people start with one-shot chatbot questions and expect the model to fill in the missing background.',
      after: 'This stage turns casual asks into clear briefs with goals, context, constraints, outputs, and acceptance checks.',
      outcome: 'After this stage you can rewrite vague asks into clear tasks and know when clarification should come first.',
    },
    tools: {
      stage: 'tools',
      before: 'Once a task touches schedules, databases, APIs, or code, chat alone stops being enough.',
      after: 'This stage teaches the split between continuing the conversation and using systems, APIs, or actions.',
      outcome: 'After this stage you can scope work the way you would with Cursor: files, actions, parameters, and validation.',
    },
    mcp: {
      stage: 'mcp',
      before: 'If you keep pasting documents and status updates into chat, it is usually a sign the workflow needs better wiring.',
      after: 'This stage explains how files, knowledge bases, APIs, and permissions can be connected in a standard way.',
      outcome: 'After this stage you can decide when MCP is worth it and define a small, safe integration shape.',
    },
    skills: {
      stage: 'skills',
      before: 'If you keep re-explaining the same task, it is time to capture that workflow instead of repeating it.',
      after: 'This stage turns personal habits into reusable Skills / SOPs with inputs, steps, outputs, and failure handling.',
      outcome: 'After this stage you can package your collaboration habits into instructions that teammates or agents can reuse.',
    },
    harness: {
      stage: 'harness',
      before: 'A prompt and a workflow are still not enough once real usage starts exposing drift and edge cases.',
      after: 'This stage adds checklists, eval cases, regression sets, and human fallback where needed.',
      outcome: 'After this stage you can design lightweight harnesses for important tasks and reason about rollout safety.',
    },
    cross_cut: {
      stage: 'cross_cut',
      before: 'By the time you reach local agents, the question is no longer just “can I use this?” but “can I govern this safely?”',
      after: 'This stage connects safety boundaries, approvals, human responsibility, and long-term usage habits.',
      outcome: 'After this stage you can build a durable workflow from one-shot chat to Cursor-style collaboration to OpenClaw-style agents.',
    },
  },
};

export function getStageGuide(locale: string, stage: string): StageGuide | null {
  const l: Locale = locale === 'en' ? 'en' : 'zh';
  return guides[l][stage] ?? null;
}
