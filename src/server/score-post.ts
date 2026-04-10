/**
 * 评分 API 核心逻辑（从原 Next route 迁移，去掉重型 logger）
 */

const DEFAULT_BASE_URL = 'https://api.deepseek.com/v1';

export interface ScoreRequestBody {
  userPrompt: string;
  question: string;
  inputText?: string;
  llmResult?: string;
  testCases?: Array<{
    inputText: string;
    llmResult: string;
    description?: string;
  }>;
  difficulty?: string;
  promptTemplate?: string;
  locale?: 'zh' | 'en';
}

interface AIResponse {
  score: number;
  feedback: string;
  suggestions: string;
  detailedScore?: {
    totalScore: number;
    clarity: number;
    completeness: number;
    operability: number;
    adaptability: number;
    innovation: number;
    feedback: string;
    suggestions: string[];
    testResults: Array<{
      testCaseIndex: number;
      score: number;
      feedback: string;
    }>;
    detailedAnalysis: string;
  };
  testCaseResults?: TestCaseResult[];
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

interface ScoreResponse {
  score: number;
  feedback: string;
  suggestions: string;
  detailedScore?: AIResponse['detailedScore'];
  testCaseResults?: TestCaseResult[];
}

function buildUnifiedScoringPrompt(
  userPrompt: string,
  question: string,
  testCases: Array<{ index: number; expectedOutput: string; actualOutput: string }>,
  difficulty: string,
  outputLanguage: 'zh' | 'en'
): string {
  const weights =
    {
      warm: { clarity: 0.3, completeness: 0.3, operability: 0.2, adaptability: 0.1, innovation: 0.1 },
      medium: { clarity: 0.25, completeness: 0.25, operability: 0.2, adaptability: 0.2, innovation: 0.1 },
      hard: { clarity: 0.2, completeness: 0.2, operability: 0.2, adaptability: 0.2, innovation: 0.2 },
      extreme: { clarity: 0.15, completeness: 0.15, operability: 0.2, adaptability: 0.25, innovation: 0.25 },
    }[difficulty] || {
      clarity: 0.25,
      completeness: 0.25,
      operability: 0.2,
      adaptability: 0.2,
      innovation: 0.1,
    };

  const testCasesText = testCases
    .map((tc) => `Case ${tc.index}: Expected "${tc.expectedOutput}" Actual "${tc.actualOutput}"`)
    .join('\n');

  const languageInstruction =
    outputLanguage === 'zh'
      ? 'IMPORTANT: Respond in Chinese (中文). All text content must be in Chinese.'
      : 'IMPORTANT: Respond in English. All text content must be in English.';

  return `Evaluate the quality of user prompt, difficulty: ${difficulty}

Question: ${question}
User prompt: ${userPrompt}

Test case results:
${testCasesText}

Scoring criteria (0-10 points):
- Clarity: Clear and unambiguous instructions
- Completeness: Covers all requirements  
- Operability: Model can execute accurately
- Adaptability: Handles different inputs
- Innovation: Uniqueness of solution

Weights: Clarity ${weights.clarity * 100}% Completeness ${weights.completeness * 100}% Operability ${weights.operability * 100}% Adaptability ${weights.adaptability * 100}% Innovation ${weights.innovation * 100}%

${languageInstruction}

Output:
{
  "score": weighted_total_score,
  "feedback": "overall_evaluation",
  "suggestions": "improvement_suggestions", 
  "detailedScore": {
    "totalScore": weighted_total_score,
    "clarity": score,
    "completeness": score,
    "operability": score,
    "adaptability": score,
    "innovation": score,
    "feedback": "detailed_feedback",
    "suggestions": ["suggestion1", "suggestion2"],
    "testResults": [{"testCaseIndex": 0, "score": score, "feedback": "feedback"}],
    "detailedAnalysis": "analysis_description"
  }
}`;
}

async function executeTestCases(
  apiKey: string,
  baseUrl: string,
  testCases: NonNullable<ScoreRequestBody['testCases']>,
  userPrompt: string,
  promptTemplate: string | undefined,
  locale: 'zh' | 'en'
): Promise<Array<{ index: number; inputText: string; expectedOutput: string; actualOutput: string }>> {
  const runOne = async (
    item: { inputText: string; llmResult: string; description?: string },
    index: number
  ) => {
    const testCasePrompt =
      locale === 'zh'
        ? `提示词: ${userPrompt}\n文本: ${item.inputText}${promptTemplate ? `\n${promptTemplate}` : ''}`
        : `Prompt: ${userPrompt}\nText: ${item.inputText}${promptTemplate ? `\n${promptTemplate}` : ''}`;

    try {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: testCasePrompt }],
          temperature: 0.1,
          max_tokens: 2000,
        }),
      });
      const data = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const actualOutput = data.choices?.[0]?.message?.content || '';
      return {
        index,
        inputText: item.inputText,
        expectedOutput: item.llmResult,
        actualOutput,
      };
    } catch {
      return {
        index,
        inputText: item.inputText,
        expectedOutput: item.llmResult,
        actualOutput: '',
      };
    }
  };

  return Promise.all(testCases.map((item, index) => runOne(item, index)));
}

function assembleResponse(aiResponse: AIResponse): ScoreResponse {
  return {
    score: aiResponse.score,
    feedback: aiResponse.feedback,
    suggestions: aiResponse.suggestions,
    detailedScore: aiResponse.detailedScore,
    testCaseResults: aiResponse.testCaseResults,
  };
}

function assembleTestCaseResults(
  testCaseData: Array<{ index: number; inputText: string; expectedOutput: string; actualOutput: string }>,
  aiTestResults: Array<{ testCaseIndex: number; score: number; feedback: string }>
): TestCaseResult[] {
  return testCaseData.map((tc, index) => {
    const aiResult = aiTestResults.find((r) => r.testCaseIndex === index) || {
      testCaseIndex: index,
      score: 5,
      feedback: '未评估',
    };
    const status = aiResult.score >= 8 ? 'pass' : aiResult.score >= 4 ? 'partial' : 'fail';
    return {
      testCaseIndex: tc.index,
      inputText: tc.inputText,
      expectedOutput: tc.expectedOutput,
      actualOutput: tc.actualOutput,
      score: aiResult.score,
      feedback: aiResult.feedback,
      status,
    };
  });
}

export async function handleScorePost(
  request: Request,
  options: { apiKey: string; baseUrl?: string }
): Promise<Response> {
  const baseUrl = options.baseUrl || DEFAULT_BASE_URL;
  const apiKey = options.apiKey;

  let locale: 'zh' | 'en' = 'zh';

  try {
    const body = (await request.json()) as ScoreRequestBody;
    locale = body.locale === 'en' ? 'en' : 'zh';

    const {
      userPrompt,
      question,
      testCases = [],
      promptTemplate,
      difficulty = 'medium',
    } = body;

    if (!apiKey) {
      const msg = locale === 'zh' ? 'OpenRouter API 密钥未配置' : 'OpenRouter API key not configured';
      return new Response(JSON.stringify({ error: msg }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const testCaseData = await executeTestCases(apiKey, baseUrl, testCases, userPrompt, promptTemplate, locale);

    const simplifiedTestCases = testCaseData.map((tc) => ({
      index: tc.index,
      expectedOutput: tc.expectedOutput,
      actualOutput: tc.actualOutput,
    }));

    const scoringPrompt = buildUnifiedScoringPrompt(
      userPrompt,
      question,
      simplifiedTestCases,
      difficulty,
      locale
    );

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: scoringPrompt }],
        temperature: 0.1,
        max_tokens: 1500,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorMessage =
        locale === 'zh' ? '无法从AI模型获取评分' : 'Failed to get score from AI model';
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.error(new Error('No response body'));
          return;
        }

        let fullResponse = '';
        let retryCount = 0;
        const maxRetries = 2;

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              try {
                const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                  const aiResponse = JSON.parse(jsonMatch[0]) as AIResponse;

                  if (typeof aiResponse.score === 'number' && aiResponse.score >= 0 && aiResponse.score <= 10) {
                    const scoreResult = assembleResponse(aiResponse);

                    if (aiResponse.detailedScore?.testResults) {
                      scoreResult.testCaseResults = assembleTestCaseResults(
                        testCaseData,
                        aiResponse.detailedScore.testResults
                      );
                    }

                    controller.enqueue(
                      new TextEncoder().encode(
                        `data: ${JSON.stringify({ type: 'complete', data: scoreResult })}\n\n`
                      )
                    );
                  } else {
                    throw new Error('Invalid score value');
                  }
                } else {
                  throw new Error('No JSON found in response');
                }
              } catch {
                if (retryCount < maxRetries) {
                  retryCount++;
                  const simplePrompt = `Score (0-10): Question "${question}" User prompt "${userPrompt}" ${locale === 'zh' ? 'Respond in Chinese.' : 'Respond in English.'} Return JSON: {"score": score, "feedback": "feedback", "suggestions": "suggestions"}`;

                  const retryResponse = await fetch(`${baseUrl}/chat/completions`, {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${apiKey}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      model: 'deepseek-chat',
                      messages: [{ role: 'user', content: simplePrompt }],
                      temperature: 0.1,
                      max_tokens: 300,
                      stream: false,
                    }),
                  });

                  if (retryResponse.ok) {
                    const retryData = (await retryResponse.json()) as {
                      choices?: Array<{ message?: { content?: string } }>;
                    };
                    const retryContent = retryData.choices?.[0]?.message?.content;
                    if (retryContent) {
                      const retryMatch = retryContent.match(/\{[\s\S]*\}/);
                      if (retryMatch) {
                        const retryResult = JSON.parse(retryMatch[0]) as AIResponse;
                        if (typeof retryResult.score === 'number') {
                          const retryScoreResult = assembleResponse(retryResult);
                          controller.enqueue(
                            new TextEncoder().encode(
                              `data: ${JSON.stringify({ type: 'complete', data: retryScoreResult })}\n\n`
                            )
                          );
                          break;
                        }
                      }
                    }
                  }
                }

                const fallbackResult = {
                  score: 5,
                  feedback:
                    locale === 'zh'
                      ? 'AI 评分系统暂时无法解析结果，请稍后重试。'
                      : 'AI scoring system unable to parse results, please try again later.',
                  suggestions:
                    locale === 'zh'
                      ? '建议检查 prompt 的完整性和清晰度。'
                      : 'Please check the completeness and clarity of your prompt.',
                };
                controller.enqueue(
                  new TextEncoder().encode(`data: ${JSON.stringify({ type: 'complete', data: fallbackResult })}\n\n`)
                );
              }
              break;
            }

            const chunk = new TextDecoder().decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') continue;

                try {
                  const parsed = JSON.parse(data) as {
                    choices?: Array<{ delta?: { content?: string } }>;
                  };
                  if (parsed.choices?.[0]?.delta?.content) {
                    const content = parsed.choices[0].delta.content;
                    fullResponse += content;
                    controller.enqueue(
                      new TextEncoder().encode(`data: ${JSON.stringify({ type: 'partial', content })}\n\n`)
                    );
                  }
                } catch {
                  /* ignore line */
                }
              }
            }
          }
        } catch {
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ type: 'error', error: 'Stream processing failed' })}\n\n`)
          );
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch {
    const errorMessage = locale === 'zh' ? '内部服务器错误' : 'Internal server error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
