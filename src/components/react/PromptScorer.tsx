import { useState } from 'react';
import { jsonrepair } from 'jsonrepair';
import { getScorerDict } from '../../i18n/scorer';
import TestCaseResults from './TestCaseResults';

interface TestCase {
  inputText: string;
  llmResult: string;
  description?: string;
}

interface TestCaseResult {
  testCaseIndex: number;
  inputText: string;
  expectedOutput: string;
  actualOutput: string;
  score: number;
  feedback: string;
  status: 'pass' | 'fail' | 'partial';
}

interface TestResult {
  testCaseIndex: number;
  inputText: string;
  expectedOutput: string;
  score: number;
  feedback: string;
}

interface DetailedScore {
  totalScore: number;
  clarity: number;
  completeness: number;
  operability: number;
  adaptability: number;
  innovation: number;
  feedback: string;
  suggestions: string[];
  testResults: TestResult[];
  detailedAnalysis: string;
}

interface PromptScorerProps {
  testCases?: TestCase[];
  difficulty?: string;
  locale: string;
  description?: string;
  promptTemplate?: string;
}

export default function PromptScorer({
  testCases = [],
  promptTemplate,
  difficulty = 'medium',
  locale,
  description,
}: PromptScorerProps) {
  const practiceEnabled = false;
  const [prompt, setPrompt] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [detailedScore, setDetailedScore] = useState<DetailedScore | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [streamingContent, setStreamingContent] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [testCaseResults, setTestCaseResults] = useState<TestCaseResult[]>([]);
  const dict = getScorerDict(locale);

  const tryParseJSON = (content: string) => {
    try {
      let c = content;
      if (c.startsWith('```json')) c = c.slice(7);
      if (c.endsWith('```')) c = c.slice(0, -3);
      return JSON.parse(jsonrepair(c));
    } catch {
      return null;
    }
  };

  const extractScoreInfo = (parsedData: Record<string, unknown>) => {
    if (typeof parsedData.score === 'number') setScore(Math.round(parsedData.score * 10));
    if (typeof parsedData.feedback === 'string') setFeedback(parsedData.feedback);
    if (parsedData.detailedScore && typeof parsedData.detailedScore === 'object') {
      setDetailedScore(parsedData.detailedScore as DetailedScore);
    }
    const sug = parsedData.suggestions;
    if (Array.isArray(sug)) setSuggestions(sug as string[]);
    else if (typeof sug === 'string') setSuggestions([sug]);
    const tcr = parsedData.testCaseResults;
    if (Array.isArray(tcr)) setTestCaseResults(tcr as TestCaseResult[]);
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setScore(null);
    setDetailedScore(null);
    setFeedback('');
    setStreamingContent('');
    setSuggestions([]);
    setTestCaseResults([]);

    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPrompt: prompt,
          question: description ?? '',
          promptTemplate,
          testCases: testCases.length > 0 ? testCases : undefined,
          difficulty,
          locale: locale === 'en' ? 'en' : 'zh',
        }),
      });

      if (!response.ok) {
        setFeedback(dict.error);
        setIsLoading(false);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        setFeedback(dict.error);
        setIsLoading(false);
        return;
      }

      let fullResponse = '';
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            const finalParsed = tryParseJSON(fullResponse);
            if (finalParsed) extractScoreInfo(finalParsed);
            else if (fullResponse) setFeedback(fullResponse);
            break;
          }
          const chunk = new TextDecoder().decode(value);
          for (const line of chunk.split('\n')) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data) as {
                type?: string;
                content?: string;
                data?: Record<string, unknown>;
                error?: string;
              };
              if (parsed.type === 'partial' && parsed.content) {
                fullResponse += parsed.content;
                if (fullResponse.length > 12) setStreamingContent(fullResponse);
                const partial = tryParseJSON(fullResponse);
                if (partial) {
                  extractScoreInfo(partial);
                  setStreamingContent('');
                }
              } else if (parsed.type === 'complete' && parsed.data) {
                extractScoreInfo(parsed.data);
                setStreamingContent('');
              } else if (parsed.type === 'error') {
                setFeedback(parsed.error || dict.error);
                setStreamingContent('');
              }
            } catch {
              /* ignore */
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    } catch {
      setFeedback(dict.error);
    } finally {
      setIsLoading(false);
    }
  };

  const scoreMsg =
    score == null
      ? ''
      : score >= 90
        ? dict.excellent
        : score >= 80
          ? dict.good
          : score >= 70
            ? dict.fair
            : score >= 60
              ? dict.needsImprovement
              : dict.poor;

  return (
    <div className="space-y-5">
      {!practiceEnabled && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-4 text-sm text-amber-950 dark:border-amber-800/60 dark:bg-amber-950/30 dark:text-amber-100">
          <p className="font-semibold">{dict.practiceComingSoonTitle}</p>
          <p className="mt-2 leading-relaxed">{dict.practiceComingSoonBody}</p>
          <p className="mt-2 text-xs text-amber-800 dark:text-amber-200">{dict.practiceComingSoonHint}</p>
        </div>
      )}

      <div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={dict.promptPlaceholder}
          className={`w-full min-h-[8rem] rounded-lg border px-3 py-2 text-sm ${
            practiceEnabled
              ? 'border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-white dark:bg-stone-900/50 text-[var(--color-ink)] dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40'
              : 'border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800/60 text-stone-400 dark:text-stone-500 cursor-not-allowed'
          }`}
          disabled={isLoading || !practiceEnabled}
        />
        <div className="text-right text-xs text-[var(--color-ink-muted)] mt-1">{prompt.length} / 2000</div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!prompt.trim() || isLoading || !practiceEnabled}
        className={`w-full rounded-lg py-2.5 text-sm font-medium ${
          practiceEnabled
            ? 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed'
            : 'bg-stone-300 text-stone-600 dark:bg-stone-700 dark:text-stone-300 cursor-not-allowed'
        }`}
      >
        {practiceEnabled ? (isLoading ? dict.scoring : dict.scorePrompt) : dict.practiceComingSoonTitle}
      </button>

      {practiceEnabled && streamingContent && isLoading && (
        <div className="rounded-lg border border-dashed border-[var(--color-border)] p-3 text-sm text-[var(--color-ink-muted)] whitespace-pre-wrap">
          {streamingContent}
        </div>
      )}

      {practiceEnabled && score !== null && (
        <div className="rounded-xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)] p-4 text-center">
          <p className="text-sm text-[var(--color-ink-muted)]">{dict.scoreOutOf}</p>
          <p className="text-3xl font-semibold text-[var(--color-accent)] mt-1">{score}</p>
          <p className="text-sm font-medium mt-2 text-[var(--color-ink)] dark:text-stone-100">{scoreMsg}</p>
        </div>
      )}

      {practiceEnabled && detailedScore && (
        <div className="rounded-xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)] p-4 text-sm">
          <p className="font-medium mb-2 text-[var(--color-ink)] dark:text-stone-100">
            {locale === 'zh' ? '维度' : 'Dimensions'}
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>Clarity: {detailedScore.clarity}</div>
            <div>Complete: {detailedScore.completeness}</div>
            <div>Operate: {detailedScore.operability}</div>
            <div>Adapt: {detailedScore.adaptability}</div>
            <div>Innovate: {detailedScore.innovation}</div>
          </div>
        </div>
      )}

      {practiceEnabled && testCaseResults.length > 0 && <TestCaseResults testCases={testCaseResults} locale={locale} />}

      {practiceEnabled && feedback && !streamingContent && (
        <div className="rounded-lg border border-[var(--color-border)] p-3 text-sm text-[var(--color-ink)]">
          {feedback}
        </div>
      )}

      {practiceEnabled && suggestions.length > 0 && (
        <div className="rounded-lg border border-[var(--color-border)] p-3 text-sm">
          <p className="font-medium mb-2">{dict.tip5}</p>
          <ul className="list-disc pl-4 space-y-1 text-[var(--color-ink-muted)]">
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] p-3 text-xs text-[var(--color-ink-muted)]">
        <p className="font-medium text-[var(--color-ink)] dark:text-stone-200 mb-2">{dict.tips}</p>
        <ul className="space-y-1 list-disc pl-4">
          <li>{dict.tip1}</li>
          <li>{dict.tip2}</li>
          <li>{dict.tip3}</li>
          <li>{dict.tip4}</li>
        </ul>
      </div>
    </div>
  );
}
