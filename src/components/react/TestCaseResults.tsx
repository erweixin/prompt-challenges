import { useState } from 'react';

interface TestCaseResult {
  testCaseIndex: number;
  inputText: string;
  expectedOutput: string;
  actualOutput: string;
  score: number;
  feedback: string;
  status: 'pass' | 'fail' | 'partial';
}

interface TestCaseResultsProps {
  testCases: TestCaseResult[];
  locale: string;
}

export default function TestCaseResults({ testCases, locale }: TestCaseResultsProps) {
  const [expandedCases, setExpandedCases] = useState<Set<number>>(new Set());
  const isZh = locale === 'zh';

  const toggleCase = (index: number) => {
    const next = new Set(expandedCases);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setExpandedCases(next);
  };

  const badge = (status: string) => {
    const base = 'px-2 py-0.5 rounded text-xs font-medium';
    if (status === 'pass') return `${base} bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200`;
    if (status === 'fail') return `${base} bg-red-100 text-red-900 dark:bg-red-900/40 dark:text-red-200`;
    return `${base} bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200`;
  };

  const avg = testCases.length ? testCases.reduce((s, tc) => s + tc.score, 0) / testCases.length : 0;

  return (
    <div className="rounded-xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)] p-4 bg-white/50 dark:bg-stone-900/30">
      <h4 className="text-sm font-semibold mb-3 text-[var(--color-ink)] dark:text-stone-100">
        {isZh ? '测试用例结果' : 'Test case results'}
      </h4>
      <p className="text-xs text-[var(--color-ink-muted)] mb-4">
        {isZh ? '平均分（×10）' : 'Average (×10)'}: <strong>{Math.round(avg * 10)}</strong>
      </p>
      <ul className="space-y-2">
        {testCases.map((tc, index) => (
          <li
            key={index}
            className="rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggleCase(index)}
              className="w-full flex items-center justify-between px-3 py-2 text-left text-sm hover:bg-stone-50 dark:hover:bg-stone-800/50"
            >
              <span className="flex items-center gap-2">
                <span className={badge(tc.status)}>{tc.status}</span>
                <span>
                  {isZh ? `用例 ${tc.testCaseIndex + 1}` : `Case ${tc.testCaseIndex + 1}`}
                </span>
              </span>
              <span className="text-[var(--color-accent)] font-medium">{Math.round(tc.score * 10)}</span>
            </button>
            {expandedCases.has(index) && (
              <div className="px-3 py-2 text-xs space-y-2 border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-stone-50/80 dark:bg-stone-900/50">
                <div>
                  <div className="font-medium text-[var(--color-ink-muted)] mb-1">{isZh ? '输入' : 'Input'}</div>
                  <pre className="whitespace-pre-wrap text-[var(--color-ink)]">{tc.inputText}</pre>
                </div>
                <div>
                  <div className="font-medium text-[var(--color-ink-muted)] mb-1">{isZh ? '反馈' : 'Feedback'}</div>
                  <p>{tc.feedback}</p>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
