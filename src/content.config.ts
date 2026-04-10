import { defineCollection, z } from 'astro:content';

const testCaseSchema = z.object({
  description: z.string().optional(),
  inputText: z.string(),
  llmResult: z.string(),
});

const challenges = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    locale: z.enum(['zh', 'en']),
    title: z.string(),
    description: z.string(),
    learningStage: z.enum([
      'foundation',
      'prompt',
      'tools',
      'mcp',
      'skills',
      'harness',
      'cross_cut',
    ]),
    learningOrder: z.number(),
    contentKind: z.enum(['reading', 'practice']),
    difficulty: z.enum(['warm', 'medium', 'hard', 'extreme']),
    promptTemplate: z.string().optional(),
    testCases: z.array(testCaseSchema).optional(),
  }),
});

export const collections = { challenges };
