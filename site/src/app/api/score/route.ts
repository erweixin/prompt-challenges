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
}

interface TestResult {
  testCaseIndex: number;
  inputText: string;
  expectedOutput: string;
  score: number;
  feedback: string;
}

interface DetailedScore {
  总分: number;
  清晰度: number;      // 0-10
  完整性: number;      // 0-10  
  可操作性: number;    // 0-10
  适应性: number;      // 0-10
  创新性: number;      // 0-10
  反馈: string;
  优化建议: string[];
  测试结果: TestResult[];
  详细分析: string;
}

interface ScoreResponse {
  评分: number;
  反馈: string;
  优化意见: string;
  详细评分?: DetailedScore;
}

// 简单的评分缓存（生产环境建议使用Redis）
const scoreCache = new Map<string, { score: ScoreResponse; timestamp: number }>();
const CACHE_DURATION = 30 * 60 * 1000; // 30分钟

// 生成prompt的哈希值用于缓存
function generatePromptHash(userPrompt: string, question: string): string {
  return btoa(`${userPrompt}:${question}`).slice(0, 32);
}

// 检查缓存
function getCachedScore(hash: string): ScoreResponse | null {
  const cached = scoreCache.get(hash);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.score;
  }
  return null;
}

// 保存到缓存
function cacheScore(hash: string, score: ScoreResponse): void {
  scoreCache.set(hash, { score, timestamp: Date.now() });
  
  // 清理过期缓存
  if (scoreCache.size > 100) {
    const now = Date.now();
    for (const [key, value] of scoreCache.entries()) {
      if (now - value.timestamp > CACHE_DURATION) {
        scoreCache.delete(key);
      }
    }
  }
}

// 构建增强的评分prompt
function buildEnhancedScoringPrompt(
  userPrompt: string, 
  question: string, 
  testCases: Array<{inputText: string; llmResult: string; description?: string}>,
  difficulty: string = 'medium'
): string {
  const difficultyWeights = {
    'warm': { clarity: 0.3, completeness: 0.3, operability: 0.2, adaptability: 0.1, innovation: 0.1 },
    'medium': { clarity: 0.25, completeness: 0.25, operability: 0.2, adaptability: 0.2, innovation: 0.1 },
    'hard': { clarity: 0.2, completeness: 0.2, operability: 0.2, adaptability: 0.2, innovation: 0.2 },
    'extreme': { clarity: 0.15, completeness: 0.15, operability: 0.2, adaptability: 0.25, innovation: 0.25 }
  };
  
  const weights = difficultyWeights[difficulty as keyof typeof difficultyWeights] || difficultyWeights.medium;

  return `你是一个专业的Prompt Engineering评估专家，现在要对用户的prompt进行多维度评估。

## 评分维度说明

1. **清晰度 (0-10分)**: 指令是否明确、无歧义，模型能否准确理解意图
   - 9-10分: 指令极其清晰，无任何歧义
   - 7-8分: 指令清晰，可能有轻微歧义
   - 5-6分: 指令基本清晰，存在一些歧义
   - 3-4分: 指令不够清晰，存在明显歧义
   - 0-2分: 指令模糊，难以理解

2. **完整性 (0-10分)**: 是否覆盖了题目的所有要求
   - 9-10分: 完全覆盖所有要求，甚至超出预期
   - 7-8分: 覆盖大部分要求，遗漏较少
   - 5-6分: 覆盖基本要求，遗漏较多
   - 3-4分: 覆盖部分要求，遗漏严重
   - 0-2分: 几乎未覆盖要求

3. **可操作性 (0-10分)**: 模型能否准确执行指令
   - 9-10分: 指令极易执行，结果准确
   - 7-8分: 指令容易执行，结果较准确
   - 5-6分: 指令可执行，结果基本准确
   - 3-4分: 指令执行困难，结果不够准确
   - 0-2分: 指令难以执行，结果错误

4. **适应性 (0-10分)**: 对不同输入的适应能力
   - 9-10分: 极强的适应性，处理各种输入都很优秀
   - 7-8分: 良好的适应性，处理大部分输入较好
   - 5-6分: 一般适应性，处理常见输入尚可
   - 3-4分: 适应性较差，只能处理特定输入
   - 0-2分: 适应性很差，容易出错

5. **创新性 (0-10分)**: 解决方案的创造性和独特性
   - 9-10分: 极具创新性，解决方案独特且有效
   - 7-8分: 较有创新性，解决方案有新意
   - 5-6分: 有一定创新性，解决方案合理
   - 3-4分: 创新性不足，解决方案常规
   - 0-2分: 缺乏创新性，解决方案平庸

## 难度等级权重

当前难度: ${difficulty}
- 清晰度权重: ${weights.clarity * 100}%
- 完整性权重: ${weights.completeness * 100}%
- 可操作性权重: ${weights.operability * 100}%
- 适应性权重: ${weights.adaptability * 100}%
- 创新性权重: ${weights.innovation * 100}%

## 题目要求

${question}

## 用户作答的提示词

\`\`\`
${userPrompt}
\`\`\`

## 测试用例评估

${testCases.map((tc, i) => `
### 测试用例 ${i + 1}${tc.description ? ` - ${tc.description}` : ''}
**输入文本:**
\`\`\`
${tc.inputText}
\`\`\`

**期望输出:**
\`\`\`
${tc.llmResult}
\`\`\`
`).join('\n')}

## 评估要求

1. 对每个测试用例进行单独评估，给出该用例的得分和反馈
2. 基于所有测试用例的表现，给出五个维度的评分
3. 根据难度等级权重计算加权总分
4. 提供具体的改进建议，帮助用户提升prompt质量
5. 给出详细的分析说明

## 输出格式

请严格按照以下JSON格式输出，不要包含任何其他内容：

\`\`\`json
{
  "评分": 加权总分,
  "反馈": "总体评价和建议",
  "优化意见": "具体的改进建议",
  "详细评分": {
    "总分": 加权总分,
    "清晰度": 清晰度得分,
    "完整性": 完整性得分,
    "可操作性": 可操作性得分,
    "适应性": 适应性得分,
    "创新性": 创新性得分,
    "反馈": "详细反馈",
    "优化建议": ["建议1", "建议2", "建议3"],
    "测试结果": [
      {
        "testCaseIndex": 0,
        "inputText": "测试输入1",
        "expectedOutput": "期望输出1",
        "score": 该用例得分,
        "feedback": "该用例反馈"
      }
    ],
    "详细分析": "详细的分析说明"
  }
}
\`\`\``;
}

export async function POST(request: NextRequest) {
  try {
    const body: ScoreRequest = await request.json();
    const { userPrompt, question, inputText, llmResult, testCases = [], difficulty = 'medium' } = body;

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'OpenRouter API key not configured' },
        { status: 500 }
      );
    }

    // 检查缓存
    // const promptHash = generatePromptHash(userPrompt, question);
    // const cachedScore = getCachedScore(promptHash);
    // if (cachedScore) {
    //   return NextResponse.json(cachedScore);
    // }

    // 构建测试用例数组
    const allTestCases = testCases.length > 0 ? testCases : [{
      inputText,
      llmResult,
      description: '默认测试用例'
    }];

    // 构建增强的评分prompt
    const scoringPrompt = buildEnhancedScoringPrompt(userPrompt, question, allTestCases, difficulty);

    // 调用 DeepSeek API 进行流式处理
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: scoringPrompt,
          },
        ],
        temperature: 0.1,
        max_tokens: 2000,
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
              // 处理完整的响应
              try {
                const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                  const scoreResult: ScoreResponse = JSON.parse(jsonMatch[0]);
                  
                  // 验证评分结果
                  if (typeof scoreResult.评分 === 'number' && scoreResult.评分 >= 0 && scoreResult.评分 <= 10) {
                    // 缓存结果
                    cacheScore(promptHash, scoreResult);
                    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'complete', data: scoreResult })}\n\n`));
                  } else {
                    throw new Error('Invalid score value');
                  }
                } else {
                  throw new Error('No JSON found in response');
                }
              } catch (parseError) {
                console.error('Failed to parse AI response:', parseError);
                
                // 重试机制
                if (retryCount < maxRetries) {
                  retryCount++;
                  console.log(`Retrying score generation, attempt ${retryCount}`);
                  
                  // 简化prompt重试
                  const simplePrompt = `请对以下prompt进行评分（0-10分）：

题目要求：${question}

用户prompt：${userPrompt}

请返回JSON格式：{"评分": 分数, "反馈": "反馈内容", "优化意见": "优化建议"}`;
                  
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
                      max_tokens: 500,
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
                          cacheScore(promptHash, retryResult);
                          controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'complete', data: retryResult })}\n\n`));
                          break;
                        }
                      }
                    }
                  }
                }
                
                // 如果重试失败，返回fallback结果
                const fallbackResult: ScoreResponse = {
                  评分: 5,
                  反馈: 'AI 评分系统暂时无法解析结果，请稍后重试。',
                  优化意见: '建议检查 prompt 的完整性和清晰度。'
                };
                cacheScore(promptHash, fallbackResult);
                controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'complete', data: fallbackResult })}\n\n`));
              }
              break;
            }

            // 解码并处理流式数据
            const chunk = new TextDecoder().decode(value);
            const lines = chunk.split('\n');
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                  continue;
                }
                
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.choices && parsed.choices[0]?.delta?.content) {
                    const content = parsed.choices[0].delta.content;
                    fullResponse += content;
                    
                    // 发送部分内容到前端
                    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'partial', content })}\n\n`));
                  }
                } catch {
                  // 忽略解析错误，继续处理
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