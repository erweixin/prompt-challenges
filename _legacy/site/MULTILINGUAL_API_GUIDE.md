# 多语言评分API使用指南

## 概述

评分API现在支持多语言响应，通过统一的英文prompt和语言参数控制，返回中文或英文格式的评分结果。

## 功能特性

✅ **统一英文Prompt**: 所有AI调用使用英文prompt，确保稳定性
✅ **语言参数控制**: 通过`locale`参数指定输出语言
✅ **格式一致性**: 返回的JSON结构完全一致
✅ **向后兼容**: 默认使用中文，保持现有接口兼容性
✅ **错误信息国际化**: 错误信息支持中英文

## API接口

### 请求格式

```typescript
interface ScoreRequest {
  userPrompt: string;        // 用户提示词
  question: string;          // 题目描述
  inputText: string;         // 输入文本
  llmResult: string;         // LLM结果
  testCases?: Array<{        // 测试用例（可选）
    inputText: string;
    llmResult: string;
    description?: string;
  }>;
  difficulty?: string;       // 难度级别（可选）
  promptTemplate?: string;   // 提示词模板（可选）
  locale?: 'zh' | 'en';      // 语言参数（可选，默认'zh'）
}
```

### 响应格式

#### 中文响应 (locale: 'zh')
```json
{
  "评分": 8.5,
  "反馈": "这是一个很好的提示词，指令清晰明确...",
  "优化意见": "建议添加更多上下文信息...",
  "详细评分": {
    "总分": 8.5,
    "清晰度": 9.0,
    "完整性": 8.0,
    "可操作性": 8.5,
    "适应性": 8.0,
    "创新性": 9.0,
    "反馈": "详细的中文反馈...",
    "优化建议": ["建议1", "建议2"],
    "测试结果": [
      {
        "testCaseIndex": 0,
        "score": 8.5,
        "feedback": "测试用例反馈"
      }
    ],
    "详细分析": "详细的中文分析..."
  },
  "测试用例结果": [
    {
      "testCaseIndex": 0,
      "inputText": "输入文本",
      "expectedOutput": "期望输出",
      "actualOutput": "实际输出",
      "score": 8.5,
      "feedback": "反馈",
      "status": "pass"
    }
  ]
}
```

#### 英文响应 (locale: 'en')
```json
{
  "score": 8.5,
  "feedback": "This is a good prompt with clear instructions...",
  "suggestions": "Consider adding more context information...",
  "detailedScore": {
    "totalScore": 8.5,
    "clarity": 9.0,
    "completeness": 8.0,
    "operability": 8.5,
    "adaptability": 8.0,
    "innovation": 9.0,
    "feedback": "Detailed English feedback...",
    "suggestions": ["Suggestion 1", "Suggestion 2"],
    "testResults": [
      {
        "testCaseIndex": 0,
        "score": 8.5,
        "feedback": "Test case feedback"
      }
    ],
    "detailedAnalysis": "Detailed English analysis..."
  },
  "testCaseResults": [
    {
      "testCaseIndex": 0,
      "inputText": "Input text",
      "expectedOutput": "Expected output",
      "actualOutput": "Actual output",
      "score": 8.5,
      "feedback": "Feedback",
      "status": "pass"
    }
  ]
}
```

## 使用示例

### 1. 中文评分请求

```javascript
const response = await fetch('/api/score', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userPrompt: "请总结以下文本的主要内容",
    question: "文本摘要任务",
    inputText: "这是一个测试文本",
    llmResult: "测试文本的主要内容",
    testCases: [
      {
        inputText: "这是第一个测试用例",
        llmResult: "第一个测试用例的摘要"
      }
    ],
    difficulty: "medium",
    locale: "zh"  // 指定中文响应
  }),
});
```

### 2. 英文评分请求

```javascript
const response = await fetch('/api/score', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userPrompt: "Please summarize the main content of the following text",
    question: "Text summarization task",
    inputText: "This is a test text",
    llmResult: "Main content of the test text",
    testCases: [
      {
        inputText: "This is the first test case",
        llmResult: "Summary of the first test case"
      }
    ],
    difficulty: "medium",
    locale: "en"  // 指定英文响应
  }),
});
```

### 3. 默认语言请求（中文）

```javascript
const response = await fetch('/api/score', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userPrompt: "请总结以下文本的主要内容",
    question: "文本摘要任务",
    inputText: "这是一个测试文本",
    llmResult: "测试文本的主要内容",
    difficulty: "medium"
    // 不指定locale，默认使用中文
  }),
});
```

## 流式响应处理

API使用Server-Sent Events (SSE) 返回流式响应：

```javascript
const reader = response.body.getReader();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = new TextDecoder().decode(value);
  const lines = chunk.split('\n');
  
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = line.slice(6);
      if (data === '[DONE]') continue;
      
      try {
        const parsed = JSON.parse(data);
        if (parsed.type === 'partial') {
          // 处理部分响应
          console.log('Partial:', parsed.content);
        } else if (parsed.type === 'complete') {
          // 处理完整响应
          if (locale === 'zh') {
            console.log('评分:', parsed.data.评分);
            console.log('反馈:', parsed.data.反馈);
          } else {
            console.log('Score:', parsed.data.score);
            console.log('Feedback:', parsed.data.feedback);
          }
        }
      } catch (e) {
        // 忽略解析错误
      }
    }
  }
}
```

## 错误处理

### 错误响应格式

```json
{
  "error": "错误信息"
}
```

### 多语言错误信息

- **中文错误**: "OpenRouter API 密钥未配置", "无法从AI模型获取评分", "内部服务器错误"
- **英文错误**: "OpenRouter API key not configured", "Failed to get score from AI model", "Internal server error"

### 错误处理示例

```javascript
try {
  const response = await fetch('/api/score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userPrompt: "测试提示词",
      question: "测试题目",
      inputText: "测试输入",
      llmResult: "测试输出",
      locale: "zh"
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('API错误:', errorData.error);
    return;
  }

  // 处理成功响应...
} catch (error) {
  console.error('请求错误:', error.message);
}
```

## 技术实现

### 核心原理

1. **统一英文Prompt**: 所有AI调用使用英文prompt模板
2. **语言指令**: 在prompt中明确指定输出语言
3. **响应组装**: 后端根据语言参数组装最终响应格式
4. **格式转换**: 将AI返回的统一格式转换为目标语言格式

### Prompt模板示例

```javascript
// 英文prompt模板
const prompt = `Evaluate the quality of user prompt, difficulty: ${difficulty}

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

Weights: Clarity ${weights.clarity*100}% Completeness ${weights.completeness*100}% ...

${languageInstruction}  // 语言指令

Output JSON:
{
  "score": weighted_total_score,
  "feedback": "overall_evaluation",
  "suggestions": "improvement_suggestions",
  ...
}`;
```

### 语言指令

- **中文**: `IMPORTANT: Respond in Chinese (中文). All text content must be in Chinese.`
- **英文**: `IMPORTANT: Respond in English. All text content must be in English.`

## 最佳实践

### 1. 语言选择

- 根据用户界面语言选择对应的locale参数
- 默认使用中文，确保向后兼容性
- 在错误处理中考虑语言一致性

### 2. 响应处理

- 根据locale参数判断响应格式
- 使用类型检查确保响应格式正确
- 处理流式响应时注意数据完整性

### 3. 错误处理

- 提供多语言错误信息
- 在catch块中处理网络错误
- 记录详细的错误日志

### 4. 性能优化

- 使用流式响应减少等待时间
- 合理设置超时时间
- 监控API调用性能

## 测试

### 运行测试

```bash
# 启动开发服务器
npm run dev

# 在另一个终端运行测试
node test-multilingual-api.js
```

### 测试覆盖

- ✅ 中文响应格式验证
- ✅ 英文响应格式验证
- ✅ 默认语言（中文）验证
- ✅ 错误信息多语言验证
- ✅ 流式响应处理验证

## 更新日志

### v2.0.0 - 多语言支持
- ✅ 添加locale参数支持
- ✅ 实现统一英文prompt
- ✅ 支持中英文响应格式
- ✅ 多语言错误信息
- ✅ 向后兼容性保证

### 后续计划
- 🔄 支持更多语言（日语、韩语等）
- 🔄 添加语言检测功能
- 🔄 优化prompt模板
- 🔄 增加更多评分维度 