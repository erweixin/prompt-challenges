import type { Locale } from './ui';

const dict = {
  zh: {
    error: '评分时出错',
    scoreOutOf: '满分 100',
    excellent: '非常好',
    good: '不错',
    fair: '尚可',
    needsImprovement: '还需加强',
    poor: '建议重写',
    yourPrompt: '你的提示词',
    enterPrompt: '在下方输入你的提示词',
    promptPlaceholder: '在此写下你的提示词…',
    scorePrompt: '提交评分',
    scoring: '评分中…',
    feedback: '反馈',
    tips: '写好提示词的小习惯',
    tip1: '目标要具体，避免「随便写写」',
    tip2: '补上背景、受众和格式要求',
    tip3: '说明语气、长度与禁忌',
    tip4: '先小范围试跑，再迭代',
    tip5: '改进建议',
  },
  en: {
    error: 'Something went wrong while scoring',
    scoreOutOf: 'Out of 100',
    excellent: 'Excellent',
    good: 'Good job',
    fair: 'Fair',
    needsImprovement: 'Needs work',
    poor: 'Try again',
    yourPrompt: 'Your prompt',
    enterPrompt: 'Write your prompt below',
    promptPlaceholder: 'Write your prompt here…',
    scorePrompt: 'Score prompt',
    scoring: 'Scoring…',
    feedback: 'Feedback',
    tips: 'Habits for better prompts',
    tip1: 'State a concrete outcome',
    tip2: 'Add context, audience, and format',
    tip3: 'Specify tone, length, and constraints',
    tip4: 'Iterate on a small example first',
    tip5: 'Suggestions',
  },
} as const;

export function getScorerDict(locale: string) {
  return locale === 'en' ? dict.en : dict.zh;
}
