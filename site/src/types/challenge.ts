export type DifficultyLevel = 'warm' | 'medium' | 'hard' | 'extreme';

export interface Challenge {
  id: string;
  title: string;
  titleEn?: string;
  path: string;
  description: string;
  descriptionEn?: string;
  difficulty: DifficultyLevel;
  tags: string[];
  requirements: string[];
  testCases: TestCase[];
  scoringCriteria: ScoringCriterion[];
  promptTemplate?: string;
  expectedOutput?: string;
  solutionDiscussion?: string;
}

export interface ChallengeGroup {
  level: DifficultyLevel;
  label: string;
  emoji: string;
  challenges: Challenge[];
}

export interface TestCase {
  description: string;
  inputText: string;
  llmResult: string;
}

export interface ScoringCriterion {
  name: string;
  weight: number;
  description: string;
  evaluationMethod?: string;
  passCriteria?: string;
}

export interface ChallengeMetadata {
  title: string;
  difficulty: 'warm' | 'medium' | 'hard' | 'extreme';
  tags: string[];
  testCases: TestCase[];
  scoringCriteria: ScoringCriterion[];
  promptTemplate?: string;
  expectedOutput?: string;
  solutionDiscussion?: string;
}

export interface ParsedChallenge {
  metadata: ChallengeMetadata;
  content: string;
} 