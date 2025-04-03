export type DifficultyLevel = 'warm' | 'medium' | 'hard' | 'extreme';

export interface Challenge {
  id: string;
  title: string;
  titleEn?: string;
  path: string;
  description: string;
  descriptionEn?: string;
  difficulty: DifficultyLevel;
}

export interface ChallengeGroup {
  level: DifficultyLevel;
  label: string;
  emoji: string;
  challenges: Challenge[];
} 