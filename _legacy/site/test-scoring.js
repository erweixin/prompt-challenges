// 测试评分功能的脚本（支持流式处理）
// 使用方法: node test-scoring.js

const testScoring = async () => {
  const testData = {
    userPrompt: "你是一个有用的AI助手，请帮助用户解决问题。",
    question: "设计一个简单的AI助手prompt，要求友好、有帮助且专业。",
    inputText: "请帮我写一个Python函数来计算斐波那契数列。",
    llmResult: "好的，我来帮你写一个计算斐波那契数列的Python函数。这里有两种实现方式：递归和迭代。"
  };

  try {
    console.log('测试流式评分功能...');
    console.log('测试数据:', JSON.stringify(testData, null, 2));

    const response = await fetch('http://localhost:3000/api/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API 请求失败:', response.status, errorText);
      return;
    }

    if (!response.body) {
      console.error('没有响应体');
      return;
    }

    console.log('开始接收流式数据...\n');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let streamingContent = '';

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        console.log('\n流式传输完成');
        break;
      }

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            
            if (data.type === 'partial') {
              process.stdout.write(data.content);
              streamingContent += data.content;
            } else if (data.type === 'complete') {
              console.log('\n\n=== 最终评分结果 ===');
              console.log(`评分: ${data.data.评分}/10`);
              console.log(`反馈: ${data.data.反馈}`);
              if (data.data.优化意见) {
                console.log(`优化建议: ${data.data.优化意见}`);
              }
              return;
            } else if (data.type === 'error') {
              console.error('流式处理错误:', data.error);
              return;
            }
          } catch (parseError) {
            // 忽略解析错误，继续处理
          }
        }
      }
    }

  } catch (error) {
    console.error('测试失败:', error.message);
  }
};

// 检查是否在 Node.js 环境中
if (typeof window === 'undefined') {
  // Node.js 环境，需要安装 node-fetch
  const fetch = require('node-fetch');
  testScoring();
} else {
  // 浏览器环境
  console.log('请在 Node.js 环境中运行此脚本');
} 