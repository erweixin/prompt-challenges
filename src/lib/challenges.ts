import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/ui';

export type ChallengeEntry = CollectionEntry<'challenges'>;

export async function getChallengesForLocale(locale: Locale): Promise<ChallengeEntry[]> {
  const all = await getCollection('challenges');
  return all
    .filter((e) => e.data.locale === locale)
    .sort((a, b) => a.data.learningOrder - b.data.learningOrder);
}

export function groupByStage(entries: ChallengeEntry[]): Map<string, ChallengeEntry[]> {
  const m = new Map<string, ChallengeEntry[]>();
  for (const e of entries) {
    const k = e.data.learningStage;
    if (!m.has(k)) m.set(k, []);
    m.get(k)!.push(e);
  }
  for (const arr of m.values()) {
    arr.sort((a, b) => a.data.learningOrder - b.data.learningOrder);
  }
  return m;
}

const stageOrder = [
  'foundation',
  'prompt',
  'tools',
  'mcp',
  'skills',
  'harness',
  'cross_cut',
] as const;

export function orderedStages(): readonly string[] {
  return stageOrder;
}

export function getAdjacentByOrder(
  entries: ChallengeEntry[],
  currentId: string
): { prev: ChallengeEntry | null; next: ChallengeEntry | null } {
  const sorted = [...entries].sort((a, b) => a.data.learningOrder - b.data.learningOrder);
  const i = sorted.findIndex((e) => e.data.id === currentId);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? sorted[i - 1]! : null,
    next: i < sorted.length - 1 ? sorted[i + 1]! : null,
  };
}
