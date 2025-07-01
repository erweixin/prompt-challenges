---
title: "语言检测"
difficulty: "warm"
tags: ["语言检测", "多语言处理", "自然语言处理"]
testCases:
  - description: "单一语言检测"
    inputText: |
      Hello, how are you today? I hope you're having a wonderful day.
    llmResult: |
      语言检测结果:
      - 主要语言: 英语 (100%)
      - 置信度: 95%
      - 检测理由: 标准英语问候语和日常表达
  - description: "中文检测"
    inputText: |
      你好，今天天气怎么样？我希望你过得愉快。
    llmResult: |
      语言检测结果:
      - 主要语言: 简体中文 (100%)
      - 置信度: 95%
      - 检测理由: 标准简体中文问候语和日常表达
  - description: "繁体中文检测"
    inputText: |
      你好，今天天氣怎麼樣？我希望你過得愉快。
    llmResult: |
      语言检测结果:
      - 主要语言: 繁体中文 (100%)
      - 置信度: 95%
      - 检测理由: 使用繁体字符的标准中文表达
  - description: "多语言混合"
    inputText: |
      Hello! 你好！Bonjour! こんにちは！Hola!
    llmResult: |
      语言检测结果:
      - 主要语言: 英语 (20%)
      - 其他语言: 中文 (20%), 法语 (20%), 日语 (20%), 西班牙语 (20%)
      - 置信度: 85%
      - 检测理由: 包含五种语言的问候语，每种语言占比相近
  - description: "包含数字和符号"
    inputText: |
      The price is $99.99 USD. 价格是99.99美元。Le prix est de 99,99 €.
    llmResult: |
      语言检测结果:
      - 主要语言: 英语 (33%)
      - 其他语言: 中文 (33%), 法语 (34%)
      - 置信度: 90%
      - 检测理由: 三种语言表达相同价格信息，包含货币符号
  - description: "方言和变体"
    inputText: |
      唔該晒！多謝你！Thank you very much!
    llmResult: |
      语言检测结果:
      - 主要语言: 粤语 (50%)
      - 其他语言: 中文 (25%), 英语 (25%)
      - 置信度: 80%
      - 检测理由: 包含粤语方言、标准中文和英语的感谢表达
  - description: "特殊字符和表情"
    inputText: |
      😊 Hello! 你好！🌟 Bonjour! こんにちは！✨
    llmResult: |
      语言检测结果:
      - 主要语言: 英语 (25%)
      - 其他语言: 中文 (25%), 法语 (25%), 日语 (25%)
      - 置信度: 85%
      - 检测理由: 四种语言问候语混合，包含表情符号装饰
  - description: "代码混合"
    inputText: |
      The function returns a value. 函数返回一个值。function getValue() { return value; }
    llmResult: |
      语言检测结果:
      - 主要语言: 英语 (60%)
      - 其他语言: 中文 (20%), 代码 (20%)
      - 置信度: 90%
      - 检测理由: 英语和中文描述，包含JavaScript代码片段
scoringCriteria:
  - name: "单一语言检测准确性"
    weight: 2
    description: "检查AI是否能正确识别常见语言"
    evaluationMethod: "检查AI是否能正确识别常见语言"
    passCriteria: "在至少3/4个单一语言测试用例中正确识别"
  - name: "多语言混合处理"
    weight: 2
    description: "评估对多语言文本的识别能力"
    evaluationMethod: "评估对多语言文本的识别能力"
    passCriteria: "能识别出混合文本中的所有主要语言"
  - name: "方言和变体识别"
    weight: 2
    description: "检查是否能区分语言变体"
    evaluationMethod: "检查是否能区分语言变体"
    passCriteria: "能正确区分简体中文和繁体中文等变体"
  - name: "特殊字符处理"
    weight: 2
    description: "评估对包含符号、数字、表情的文本处理"
    evaluationMethod: "评估对包含符号、数字、表情的文本处理"
    passCriteria: "能正确处理包含特殊字符的文本"
  - name: "输出格式一致性"
    weight: 2
    description: "检查所有输出是否遵循一致的格式"
    evaluationMethod: "检查所有输出是否遵循一致的格式"
    passCriteria: "格式完全统一，便于程序解析"
promptTemplate: |
  [你的提示词]

  文本: {文本内容}
expectedOutput: |
  语言检测结果:
  - 主要语言: 英语 (40%)
  - 其他语言: 中文 (20%), 法语 (20%), 日语 (20%)
  - 置信度: 85%
  - 检测理由: 包含英语、中文、法语、日语的问候语，每种语言占比相近
solutionDiscussion: "https://github.com/erweixin/prompt-challenges/discussions/13"
---

## 挑战描述

语言检测是自然语言处理的基础任务，用于识别文本使用的语言。本挑战要求你编写一个提示词，使 AI 能够准确识别文本的语言，并处理多语言混合、方言变体和特殊字符等情况。

## 挑战目标

编写一个提示词，使 AI 能够：
1. 准确识别文本的主要语言
2. 检测多语言混合文本中的各种语言
3. 识别方言和变体（如简体中文vs繁体中文）
4. 处理包含特殊字符和符号的文本
5. 提供检测的置信度和理由

## 要求

- 检测结果必须包含主要语言、置信度和检测理由
- 对于多语言文本，应列出所有检测到的语言及其比例
- 置信度必须是0-100的整数
- 检测理由必须简洁明了（不超过50字）
- 输出格式必须统一且易于解析

## 提示模板

```
[你的提示词]

文本: {文本内容}
```

## 自动测试流程

1. 对每个测试用例，使用你的提示词作为输入
2. 分析输出中是否包含：
   - 检测到的语言列表
   - 0-100的置信度评分
   - 不超过50字的检测理由
3. 将检测结果与标准答案比较
4. 检查多语言文本中各种语言的识别准确性
5. 评估特殊字符和符号的处理效果
6. 计算最终得分(满分10分)

## 期望输出示例 (针对案例4)

```
语言检测结果:
- 主要语言: 英语 (40%)
- 其他语言: 中文 (20%), 法语 (20%), 日语 (20%)
- 置信度: 85%
- 检测理由: 包含英语、中文、法语、日语的问候语，每种语言占比相近

详细分析:
- "Hello!" - 英语
- "你好！" - 中文
- "Bonjour!" - 法语  
- "こんにちは！" - 日语
```

---

提交你的解决方案，与社区分享你的思路和技巧！ 