import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://api.deepseek.com/v1';

interface ScoreRequest {
  userPrompt: string;
  question: string;
  inputText: string;
  llmResult: string;
}

interface ScoreResponse {
  评分: number;
  反馈: string;
  优化意见: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ScoreRequest = await request.json();
    const { userPrompt, question, inputText, llmResult } = body;

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'OpenRouter API key not configured' },
        { status: 500 }
      );
    }

    // 构建评分 prompt
    const scoringPrompt = `你是一个 prompt 评分专家，现在要作为一个 prompt 评比的评委，你要根据<题目要求>和<用户作答的提示词>，给出一个对<用户作答的提示词>的评分和反馈。
      - 评分标准是满分10分，分数越高表示提示词越符合要求，完全不符合要求的为 0 分。
      - 如果有硬要求没有实现，则分别减一分，最低分为 0 分。
      - 评分时要考虑提示词的清晰度、完整性、可操作性和对目标任务的适应性。
      - 反馈要具体指出提示词的优点和改进建议，帮助用户提升提示词质量。
      - 如果提示词已经非常优秀，可以直接给出满分10分，优化意见可以为空。
      - 输出的长度不超过 500 字。
      - 返回内容格式为 json 如下：
      {
        评分: {分数},
        反馈: {具体反馈内容},
        优化意见: {具体优化建议}
      }

      ### 题目要求

      ${question}

      ### 用户作答的提示词

      \`${userPrompt}\`

      ### 使用<用户作答的提示词>的测试用例以及结果

      inputText: """${inputText}"""

      ### 在测试以上{{inputText}}时大模型返回的内容如下

      ${llmResult}`;

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
        max_tokens: 1000,
        stream: true, // 启用流式处理
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
                    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'complete', data: scoreResult })}\n\n`));
                  } else {
                    throw new Error('Invalid score value');
                  }
                } else {
                  throw new Error('No JSON found in response');
                }
              } catch (parseError) {
                console.error('Failed to parse AI response:', parseError);
                const fallbackResult = {
                  评分: 5,
                  反馈: 'AI 评分系统暂时无法解析结果，请稍后重试。',
                  优化意见: '建议检查 prompt 的完整性和清晰度。'
                };
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
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (e) {
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