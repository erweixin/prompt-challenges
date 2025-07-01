import { NextRequest, NextResponse } from 'next/server';
import { logger, generateRequestId } from '@/utils/logger';
import { performanceMonitor, getMemoryUsage } from '@/utils/performance';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://api.deepseek.com/v1';

interface ScoreRequest {
  userPrompt: string;
  question: string;
  inputText: string;
  llmResult: string;
  testCases?: Array<{
    inputText: string;
    llmResult: string;
    description?: string;
  }>;
  difficulty?: string;
  promptTemplate?: string;
  locale?: 'zh' | 'en'; // 新增语言参数
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

// AI返回的统一格式
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

// 统一响应格式 - 始终使用英文key
interface ScoreResponse {
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

// 统一的英文评分prompt构建函数
function buildUnifiedScoringPrompt(
  userPrompt: string, 
  question: string, 
  testCases: Array<{index: number; expectedOutput: string; actualOutput: string}>,
  difficulty: string = 'medium',
  outputLanguage: 'zh' | 'en' = 'zh'
): string {
  const weights = {
    'warm': { clarity: 0.3, completeness: 0.3, operability: 0.2, adaptability: 0.1, innovation: 0.1 },
    'medium': { clarity: 0.25, completeness: 0.25, operability: 0.2, adaptability: 0.2, innovation: 0.1 },
    'hard': { clarity: 0.2, completeness: 0.2, operability: 0.2, adaptability: 0.2, innovation: 0.2 },
    'extreme': { clarity: 0.15, completeness: 0.15, operability: 0.2, adaptability: 0.25, innovation: 0.25 }
  }[difficulty] || { clarity: 0.25, completeness: 0.25, operability: 0.2, adaptability: 0.2, innovation: 0.1 };

  const testCasesText = testCases.map(tc => 
    `Case ${tc.index}: Expected "${tc.expectedOutput}" Actual "${tc.actualOutput}"`
  ).join('\n');

  const languageInstruction = outputLanguage === 'zh' 
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

Weights: Clarity ${weights.clarity*100}% Completeness ${weights.completeness*100}% Operability ${weights.operability*100}% Adaptability ${weights.adaptability*100}% Innovation ${weights.innovation*100}%

${languageInstruction}

Output JSON:
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

// 处理测试用例执行
async function executeTestCases(
  testCases: Array<{inputText: string; llmResult: string; description?: string}>,
  userPrompt: string,
  promptTemplate?: string,
  requestId?: string,
  locale: 'zh' | 'en' = 'zh'
): Promise<Array<{index: number; inputText: string; expectedOutput: string; actualOutput: string}>> {
  const testCasePromises = testCases.map(async (item, index) => {
    const testCaseStartTime = performance.now();
    
    try {
      // 根据 locale 构造 prompt
      const testCasePrompt = locale === 'zh'
        ? `提示词: ${userPrompt}\n文本: ${item.inputText}${promptTemplate ? `\n${promptTemplate}` : ''}`
        : `Prompt: ${userPrompt}\nText: ${item.inputText}${promptTemplate ? `\n${promptTemplate}` : ''}`;

      const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{
            role: 'user',
            content: testCasePrompt,
          }],
          temperature: 0.1,
          max_tokens: 2000,
        }),
      });

      const data = await response.json();
      const actualOutput = data.choices[0]?.message?.content || '';
      const testCaseDuration = performance.now() - testCaseStartTime;
      
      const success = response.ok && actualOutput;
      logger.testCaseExecution(
        requestId || 'unknown',
        index,
        success,
        testCaseDuration,
        { model: 'deepseek-chat' }
      );

      return {
        index,
        inputText: item.inputText,
        expectedOutput: item.llmResult,
        actualOutput,
      };
    } catch (error) {
      const testCaseDuration = performance.now() - testCaseStartTime;
      logger.testCaseExecution(
        requestId || 'unknown',
        index,
        false,
        testCaseDuration,
        { model: 'deepseek-chat' }
      );
      logger.error(`Test case ${index} execution failed`, { requestId }, error as Error);
      
      return {
        index,
        inputText: item.inputText,
        expectedOutput: item.llmResult,
        actualOutput: '',
      };
    }
  });

  return Promise.all(testCasePromises);
}

// 统一响应组装 - 始终返回英文key
function assembleResponse(aiResponse: AIResponse): ScoreResponse {
  return {
    score: aiResponse.score,
    feedback: aiResponse.feedback,
    suggestions: aiResponse.suggestions,
    detailedScore: aiResponse.detailedScore,
    testCaseResults: aiResponse.testCaseResults
  };
}

// 组装完整的测试用例结果
function assembleTestCaseResults(
  testCaseData: Array<{index: number; inputText: string; expectedOutput: string; actualOutput: string}>,
  aiTestResults: Array<{testCaseIndex: number; score: number; feedback: string}>
): TestCaseResult[] {
  return testCaseData.map((tc, index) => {
    const aiResult = aiTestResults.find(r => r.testCaseIndex === index) || {
      testCaseIndex: index,
      score: 5,
      feedback: '未评估'
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

export async function POST(request: NextRequest) {
  const requestId = generateRequestId();
  const startTime = performance.now();
  
  // 获取请求信息
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  // 记录请求开始
  logger.apiRequest(requestId, 'POST', '/api/score', {
    userAgent,
    ip,
    testCaseCount: 0 // 稍后更新
  });

  try {
    const body: ScoreRequest = await request.json();
    const { userPrompt, question, testCases = [], promptTemplate, difficulty = 'medium', locale = 'zh' } = body;

    // 更新测试用例数量
    logger.info('Request body parsed', { 
      requestId, 
      testCaseCount: testCases.length,
      difficulty,
      userPromptLength: userPrompt.length,
      questionLength: question.length
    });

    if (!OPENROUTER_API_KEY) {
      logger.error('OpenRouter API key not configured', { requestId });
      const errorMessage = locale === 'zh' 
        ? 'OpenRouter API 密钥未配置'
        : 'OpenRouter API key not configured';
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    // 执行测试用例
    logger.info('Starting test case execution', { 
      requestId, 
      testCaseCount: testCases.length 
    });
    
    const testCaseData = await performanceMonitor.measureAsync(
      'executeTestCases',
      () => executeTestCases(testCases, userPrompt, promptTemplate, requestId, locale),
      { requestId, testCaseCount: testCases.length }
    );
    
    const testCaseMetric = performanceMonitor.getMetric('executeTestCases');
    logger.info('Test case execution completed', { 
      requestId, 
      duration: testCaseMetric?.duration,
      testCaseCount: testCases.length
    });

    // 构建简化的评分prompt
    const simplifiedTestCases = testCaseData.map(tc => ({
      index: tc.index,
      expectedOutput: tc.expectedOutput,
      actualOutput: tc.actualOutput,
    }));

    const scoringPrompt = buildUnifiedScoringPrompt(userPrompt, question, simplifiedTestCases, difficulty, locale);

    logger.info('Starting AI scoring', { 
      requestId, 
      difficulty,
      promptLength: scoringPrompt.length
    });

    // 调用AI进行评分
    const aiScoringStartTime = performance.now();
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
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

    const aiScoringDuration = performance.now() - aiScoringStartTime;
    
    if (!response.ok) {
      const errorData = await response.text();
      logger.aiModelCall(requestId, 'deepseek-chat', aiScoringDuration, false, { difficulty });
      logger.error('DeepSeek API error', { requestId }, new Error(errorData));
      const errorMessage = locale === 'zh' 
        ? '无法从AI模型获取评分'
        : 'Failed to get score from AI model';
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }
    
    logger.aiModelCall(requestId, 'deepseek-chat', aiScoringDuration, true, { difficulty });

    // 创建流式响应
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.error('No response body');
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
                  const aiResponse: AIResponse = JSON.parse(jsonMatch[0]);
                  
                  if (typeof aiResponse.score === 'number' && aiResponse.score >= 0 && aiResponse.score <= 10) {
                    // 统一组装响应
                    const scoreResult = assembleResponse(aiResponse);
                    
                    // 组装完整的测试用例结果
                    if (aiResponse.detailedScore?.testResults) {
                      scoreResult.testCaseResults = assembleTestCaseResults(
                        testCaseData,
                        aiResponse.detailedScore.testResults
                      );
                    }

                    // 记录评分结果
                    logger.scoringResult(requestId, aiResponse.score, difficulty, {
                      testCaseCount: testCases.length,
                      locale
                    });

                    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'complete', data: scoreResult })}\n\n`));
                  } else {
                    throw new Error('Invalid score value');
                  }
                } else {
                  throw new Error('No JSON found in response');
                }
              } catch (parseError) {
                console.error('Failed to parse AI response:', parseError);
                
                if (retryCount < maxRetries) {
                  retryCount++;
                  logger.warn(`Retrying score generation, attempt ${retryCount}`, { 
                    requestId, 
                    retryCount,
                    difficulty
                  });
                  
                  const simplePrompt = `Score (0-10): Question "${question}" User prompt "${userPrompt}" ${locale === 'zh' ? 'Respond in Chinese.' : 'Respond in English.'} Return JSON: {"score": score, "feedback": "feedback", "suggestions": "suggestions"}`;
                  
                  const retryResponse = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
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
                    const retryData = await retryResponse.json();
                    const retryContent = retryData.choices[0]?.message?.content;
                    if (retryContent) {
                      const retryMatch = retryContent.match(/\{[\s\S]*\}/);
                      if (retryMatch) {
                        const retryResult = JSON.parse(retryMatch[0]);
                        if (typeof retryResult.score === 'number') {
                          // 根据语言组装重试响应
                          const retryScoreResult = assembleResponse(retryResult);
                          
                          logger.scoringResult(requestId, retryResult.score, difficulty, {
                            testCaseCount: testCases.length,
                            retryCount,
                            locale
                          });
                          controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'complete', data: retryScoreResult })}\n\n`));
                          break;
                        }
                      }
                    }
                  }
                }
                
                const fallbackResult = {
                  score: 5,
                  feedback: locale === 'zh' ? 'AI 评分系统暂时无法解析结果，请稍后重试。' : 'AI scoring system unable to parse results, please try again later.',
                  suggestions: locale === 'zh' ? '建议检查 prompt 的完整性和清晰度。' : 'Please check the completeness and clarity of your prompt.'
                };
                controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'complete', data: fallbackResult })}\n\n`));
              }
              break;
            }

            // 处理流式数据
            const chunk = new TextDecoder().decode(value);
            const lines = chunk.split('\n');
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') continue;
                
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.choices && parsed.choices[0]?.delta?.content) {
                    const content = parsed.choices[0].delta.content;
                    fullResponse += content;
                    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'partial', content })}\n\n`));
                  }
                } catch {
                  // 忽略解析错误
                }
              }
            }
          }
        } catch (error) {
          logger.error('Stream processing error', { requestId }, error as Error);
          controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'error', error: 'Stream processing failed' })}\n\n`));
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
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    const totalDuration = performance.now() - startTime;
    const memoryUsage = getMemoryUsage();
    
    // 尝试从请求中获取locale，默认为中文
    let locale = 'zh';
    try {
      const body = await request.json();
      locale = body.locale || 'zh';
    } catch {
      // 如果无法解析请求体，使用默认值
    }
    
    logger.error('Score API error', { 
      requestId, 
      duration: totalDuration,
      memoryUsage: memoryUsage || undefined
    }, error as Error);
    
    const errorMessage = locale === 'zh' 
      ? '内部服务器错误'
      : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  } finally {
    const totalDuration = performance.now() - startTime;
    const memoryUsage = getMemoryUsage();
    
    logger.apiResponse(requestId, 200, totalDuration, {
      memoryUsage: memoryUsage || undefined,
      difficulty: 'medium' // 默认值，实际应该从请求中获取
    });
  }
} 