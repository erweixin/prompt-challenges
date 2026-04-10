---
title: "多语言处理"
difficulty: "hard"
tags: ["多语言", "翻译", "文化差异"]
testCases:
  - description: "文学翻译"
    inputText: |
      源语言: 中文
      目标语言: 英语
      文本内容: "春江潮水连海平，海上明月共潮生。滟滟随波千万里，何处春江无月明。"
      任务要求: 将这首古诗翻译成英语，保持诗歌的意境和韵律感。
    llmResult: |
      多语言处理结果:

      ## 原文分析
      - 语言: 中文古诗
      - 主题: 春江夜景
      - 风格: 古典诗歌，意境优美
      - 韵律: 七言绝句

      ## 翻译结果
      "Spring river tides merge with the sea level,
      The bright moon on the sea rises with the tides.
      Sparkling waves flow for thousands of miles,
      Where is the spring river without moonlight?"

      ## 翻译分析
      - **语义准确性**: 95% - 准确传达了原文的意境
      - **韵律保持**: 90% - 保持了诗歌的节奏感
      - **文化适应性**: 85% - 适当调整了表达方式以适应英语习惯

      ## 文化背景
      这首诗描绘了春江夜景的壮美，体现了中国古典诗歌“情景交融”的特点。翻译时保持了原文的意境和美感。

      ## 质量评估
      - 整体质量: 优秀
      - 建议改进: 可以进一步优化韵律的英语表达
      - 适用场景: 文学翻译、文化交流
  - description: "技术文档翻译"
    inputText: |
      源语言: 英语
      目标语言: 中文
      文本内容: "The API endpoint requires authentication using OAuth 2.0. You must include a valid access token in the Authorization header. The response will be in JSON format with UTF-8 encoding."
      任务要求: 将技术文档翻译成中文，保持技术术语的准确性。
    llmResult: |
      多语言处理结果:

      ## 原文分析
      - 语言: 英语
      - 主题: API认证说明
      - 风格: 技术文档，简洁明了

      ## 翻译结果
      "该API端点需要使用OAuth 2.0进行认证。您必须在Authorization请求头中包含一个有效的访问令牌。响应将采用UTF-8编码的JSON格式。"

      ## 翻译分析
      - **语义准确性**: 100% - 完全传达了原文的技术要求
      - **术语准确性**: 100% - 所有技术术语均使用了标准翻译
      - **流畅度**: 95% - 语句通顺，符合中文技术文档的表达习惯

      ## 质量评估
      - 整体质量: 优秀
      - 适用场景: 技术文档翻译、软件本地化
  - description: "文化特定表达"
    inputText: |
      源语言: 日语
      目标语言: 中文
      文本内容: "お疲れ様でした。今日も一日お世話になりました。"
      任务要求: 翻译这个日语表达，解释其文化背景和适用场合。
    llmResult: |
      多语言处理结果:

      ## 原文分析
      - 语言: 日语
      - 主题: 日常问候
      - 风格: 礼貌、正式

      ## 翻译结果
      "您辛苦了。今天一天也承蒙您照顾了。"

      ## 文化背景
      "お疲れ様でした" (Otsukaresama deshita) 是日语中非常常见的表达，用于感谢他人的辛劳，通常在一天工作结束或共同完成某项任务后使用。"お世話になりました" (Osewa ni narimashita) 则表示“承蒙关照”，用于感谢对方一直以来的帮助和支持。两者结合使用，表达了非常诚挚的谢意和敬意。

      ## 适用场合
      - 工作结束后对同事或上级说
      - 项目完成后对合作伙伴说
      - 对帮助过自己的人表示感谢

      ## 质量评估
      - 整体质量: 优秀
      - 文化适应性: 100% - 准确解释了文化内涵
  - description: "多语言混合文本"
    inputText: |
      源语言: 混合语言
      目标语言: 中文
      文本内容: "Hello! 你好！Bonjour! こんにちは！Hola! 今天天气真不错！"
      任务要求: 识别文本中的所有语言，并提供中文翻译和解释。
    llmResult: |
      多语言处理结果:

      ## 语言识别
      - **Hello!**: 英语
      - **你好！**: 中文
      - **Bonjour!**: 法语
      - **こんにちは！**: 日语
      - **Hola!**: 西班牙语
      - **今天天气真不错！**: 中文

      ## 中文翻译
      - **Hello!**: 你好！
      - **Bonjour!**: 你好！
      - **こんにちは！**: 你好！
      - **Hola!**: 你好！

      ## 解释
      这段文本混合了英语、中文、法语、日语和西班牙语五种语言的问候语，最后一句是中文陈述句。

      ## 质量评估
      - 整体质量: 优秀
      - 识别准确性: 100%
  - description: "语义一致性比较"
    inputText: |
      源语言: 中文
      目标语言: 英语
      文本内容: "这个项目很有挑战性，但我觉得我们可以完成它。"
      任务要求: 提供多种英语翻译版本，比较其语义差异和适用场景。
    llmResult: |
      多语言处理结果:

      ## 翻译版本
      1.  **Version A:** "This project is challenging, but I think we can complete it."
      2.  **Version B:** "This project is quite demanding, but I believe we can pull it off."
      3.  **Version C:** "Although the project is tough, I'm confident in our ability to finish it."

      ## 语义差异比较
      - **Version A:** 最直接的翻译，语气中性，适用于一般书面或口头交流。
      - **Version B:** 使用了 "demanding" 和 "pull it off"，语气更口语化、更生动，带有一点非正式的团队合作感。适用于团队内部沟通。
      - **Version C:** 使用了 "tough" 和 "confident"，强调了克服困难的信心，语气更坚定、更正式。适用于向上级汇报或在正式场合发言。

      ## 适用场景
      - **A:** 通用场景
      - **B:** 团队内部、非正式沟通
      - **C:** 正式场合、向上级汇报

      ## 质量评估
      - 整体质量: 优秀
      - 分析深度: 100% - 准确分析了细微的语义和语用差异
scoringCriteria:
  - name: "翻译准确性"
    weight: 2
    description: "检查翻译是否准确传达了原文的语义"
    evaluationMethod: "检查翻译是否准确传达了原文的语义"
    passCriteria: "翻译结果与原文语义高度一致"
  - name: "文化适应性"
    weight: 2
    description: "评估对文化特定表达的处理能力"
    evaluationMethod: "评估对文化特定表达的处理能力"
    passCriteria: "能识别并适当处理文化差异"
  - name: "语言风格保持"
    weight: 2
    description: "检查是否保持了原文的风格和语调"
    evaluationMethod: "检查是否保持了原文的风格和语调"
    passCriteria: "翻译结果与原文风格一致"
  - name: "多语言处理能力"
    weight: 2
    description: "评估对多语言混合文本的处理"
    evaluationMethod: "评估对多语言混合文本的处理"
    passCriteria: "能准确识别和处理多种语言"
  - name: "语义一致性分析"
    weight: 2
    description: "检查对语义差异的分析能力"
    evaluationMethod: "检查对语义差异的分析能力"
    passCriteria: "能识别和解释不同翻译版本的差异"
promptTemplate: |
  [你的提示词]

  {文本内容}
expectedOutput: |
  多语言处理结果:

  ## 原文分析
  - 语言: 中文古诗
  - 主题: 春江夜景
  - 风格: 古典诗歌，意境优美
  - 韵律: 七言绝句

  ## 翻译结果
  "Spring river tides merge with the sea level,
  The bright moon on the sea rises with the tides.
  Sparkling waves flow for thousands of miles,
  Where is the spring river without moonlight?"

  ## 翻译分析
  - **语义准确性**: 95% - 准确传达了原文的意境
  - **韵律保持**: 90% - 保持了诗歌的节奏感
  - **文化适应性**: 85% - 适当调整了表达方式以适应英语习惯

  ## 文化背景
  这首诗描绘了春江夜景的壮美，体现了中国古典诗歌“情景交融”的特点。翻译时保持了原文的意境和美感。

  ## 质量评估
  - 整体质量: 优秀
  - 建议改进: 可以进一步优化韵律的英语表达
  - 适用场景: 文学翻译、文化交流
solutionDiscussion: "https://github.com/erweixin/prompt-challenges/discussions/16"
description: "多语言处理是AI系统处理不同语言文本并保持语义一致性的高级能力。本挑战要求你设计一个提示词，使AI能够准确理解、翻译和比较多种语言的文本，处理语言间的文化差异和表达习惯。"
---

# 多语言处理

## 🔴 困难

### 挑战描述

多语言处理是AI系统处理不同语言文本并保持语义一致性的高级能力。本挑战要求你设计一个提示词，使AI能够准确理解、翻译和比较多种语言的文本，处理语言间的文化差异和表达习惯。

### 挑战目标

编写一个提示词，使 AI 能够：
1. 准确识别和理解多种语言的文本内容
2. 进行高质量的跨语言翻译和转换
3. 处理语言间的文化差异和表达习惯
4. 比较不同语言版本的语义一致性
5. 处理多语言混合文本和代码切换

### 要求

- 提示词必须能处理多种主要语言
- 翻译应保持原文的语义和风格
- 应能识别和处理文化特定的表达
- 对于多语言混合文本，应能分别处理
- 输出应包含语言分析和翻译质量评估

### 提示模板

```
[你的提示词]

{测试用例文本内容}
```

### 自动测试流程

1. 对每个测试用例，使用你的提示词作为输入
2. 分析输出是否包含：
   - 准确的翻译结果
   - 文化背景解释（如适用）
   - 语言分析
   - 翻译质量评估
3. 评估翻译的准确性和流畅性
4. 检查文化适应的合理性
5. 验证多语言处理的效果
6. 计算最终得分(满分10分)

### 期望输出示例 (针对案例1)

```
多语言处理结果:

## 原文分析
- 语言: 中文古诗
- 主题: 春江夜景
- 风格: 古典诗歌，意境优美
- 韵律: 七言绝句

## 翻译结果
"Spring river tides merge with the sea level,
The bright moon on the sea rises with the tides.
Sparkling waves flow for thousands of miles,
Where is the spring river without moonlight?"

## 翻译分析
- **语义准确性**: 95% - 准确传达了原文的意境
- **韵律保持**: 90% - 保持了诗歌的节奏感
- **文化适应性**: 85% - 适当调整了表达方式以适应英语习惯

## 文化背景
这首诗描绘了春江夜景的壮美，体现了中国古典诗歌“情景交融”的特点。翻译时保持了原文的意境和美感。

## 质量评估
- 整体质量: 优秀
- 建议改进: 可以进一步优化韵律的英语表达
- 适用场景: 文学翻译、文化交流
```

---

提交你的解决方案，与社区分享你的思路和技巧！
