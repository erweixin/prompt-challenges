import { NextRequest, NextResponse } from 'next/server';

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

interface DetailedScore {
  总分: number;
  清晰度: number;
  完整性: number;
  可操作性: number;
  适应性: number;
  创新性: number;
  反馈: string;
  优化建议: string[];
  测试结果: Array<{
    testCaseIndex: number;
    score: number;
    feedback: string;
  }>;
  详细分析: string;
}

interface ScoreResponse {
  评分: number;
  反馈: string;
  优化意见: string;
  详细评分?: DetailedScore;
  测试用例结果?: TestCaseResult[];
}

// 简化的评分prompt构建函数
function buildSimplifiedScoringPrompt(
  userPrompt: string, 
  question: string, 
  testCases: Array<{index: number; expectedOutput: string; actualOutput: string}>,
  difficulty: string = 'medium'
): string {
  const weights = {
    'warm': { clarity: 0.3, completeness: 0.3, operability: 0.2, adaptability: 0.1, innovation: 0.1 },
    'medium': { clarity: 0.25, completeness: 0.25, operability: 0.2, adaptability: 0.2, innovation: 0.1 },
    'hard': { clarity: 0.2, completeness: 0.2, operability: 0.2, adaptability: 0.2, innovation: 0.2 },
    'extreme': { clarity: 0.15, completeness: 0.15, operability: 0.2, adaptability: 0.25, innovation: 0.25 }
  }[difficulty] || { clarity: 0.25, completeness: 0.25, operability: 0.2, adaptability: 0.2, innovation: 0.1 };

  return `评估用户prompt质量，难度:${difficulty}

题目: ${question}
用户prompt: ${userPrompt}

测试用例结果:
${testCases.map(tc => `用例${tc.index}: 预期"${tc.expectedOutput}" 实际"${tc.actualOutput}"`).join('\n')}

评分标准(0-10分):
- 清晰度: 指令明确无歧义
- 完整性: 覆盖题目要求
- 可操作性: 模型能准确执行
- 适应性: 处理不同输入能力
- 创新性: 解决方案独特性

权重: 清晰度${weights.clarity*100}% 完整性${weights.completeness*100}% 可操作性${weights.operability*100}% 适应性${weights.adaptability*100}% 创新性${weights.innovation*100}%

输出JSON:
{
  "评分": 加权总分,
  "反馈": "总体评价",
  "优化意见": "改进建议",
  "详细评分": {
    "总分": 加权总分,
    "清晰度": 分数,
    "完整性": 分数,
    "可操作性": 分数,
    "适应性": 分数,
    "创新性": 分数,
    "反馈": "详细反馈",
    "优化建议": ["建议1", "建议2"],
    "测试结果": [{"testCaseIndex": 0, "score": 分数, "feedback": "反馈"}],
    "详细分析": "分析说明"
  }
}`;
}

// 处理测试用例执行
async function executeTestCases(
  testCases: Array<{inputText: string; llmResult: string; description?: string}>,
  userPrompt: string,
  promptTemplate?: string
): Promise<Array<{index: number; inputText: string; expectedOutput: string; actualOutput: string}>> {
  const testCasePromises = testCases.map(async (item, index) => {
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
          content: `提示词: ${userPrompt}\n文本: ${item.inputText}${promptTemplate ? `\n${promptTemplate}` : ''}`,
        }],
        temperature: 0.1,
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    const actualOutput = data.choices[0]?.message?.content || '';

    return {
      index,
      inputText: item.inputText,
      expectedOutput: item.llmResult,
      actualOutput,
    };
  });

  return Promise.all(testCasePromises);
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
  try {
    const body: ScoreRequest = await request.json();
    const { userPrompt, question, testCases = [], promptTemplate, difficulty = 'medium' } = body;

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'OpenRouter API key not configured' },
        { status: 500 }
      );
    }

    // 执行测试用例
    const testCaseData = await executeTestCases(testCases, userPrompt, promptTemplate);

    // 构建简化的评分prompt
    const simplifiedTestCases = testCaseData.map(tc => ({
      index: tc.index,
      expectedOutput: tc.expectedOutput,
      actualOutput: tc.actualOutput,
    }));

    const scoringPrompt = buildSimplifiedScoringPrompt(userPrompt, question, simplifiedTestCases, difficulty);

    // 调用AI进行评分
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

    if (!response.ok) {
      const errorData = await response.text();
      console.error('DeepSeek API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get score from AI model' },
        { status: 500 }
      );
    }

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
                  const scoreResult: ScoreResponse = JSON.parse(jsonMatch[0]);
                  
                  if (typeof scoreResult.评分 === 'number' && scoreResult.评分 >= 0 && scoreResult.评分 <= 10) {
                    // 组装完整的测试用例结果
                    if (scoreResult.详细评分?.测试结果) {
                      scoreResult.测试用例结果 = assembleTestCaseResults(
                        testCaseData,
                        scoreResult.详细评分.测试结果
                      );
                    }

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
                  console.log(`Retrying score generation, attempt ${retryCount}`);
                  
                  const simplePrompt = `评分(0-10): 题目"${question}" 用户prompt"${userPrompt}" 返回JSON: {"评分": 分数, "反馈": "反馈", "优化意见": "建议"}`;
                  
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
                        if (typeof retryResult.评分 === 'number') {
                          controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'complete', data: retryResult })}\n\n`));
                          break;
                        }
                      }
                    }
                  }
                }
                
                const fallbackResult: ScoreResponse = {
                  评分: 5,
                  反馈: 'AI 评分系统暂时无法解析结果，请稍后重试。',
                  优化意见: '建议检查 prompt 的完整性和清晰度。'
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
          console.error('Stream processing error:', error);
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
    console.error('Score API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 