---
id: practice-prompt-brief-rewrite
locale: zh
title: 把一句模糊请求改成可执行 brief
description: 从一句“像豆包那样的提问”改写成带验收的任务说明。
learningStage: prompt
learningOrder: 15
contentKind: practice
difficulty: medium
testCases:
  - description: 营销文案
    inputText: "帮我写个活动介绍。"
    llmResult: "应补出目标受众、活动信息、渠道、篇幅限制、行动号召与验收方式。"
  - description: 内部总结
    inputText: "整理一下这个项目的进展。"
    llmResult: "应补出阅读对象、时间范围、结构、必须保留的事实与下一步动作格式。"
promptTemplate: |
  用户原始请求：{inputText}
  你的任务：{userPrompt}
---

## 任务

把一条模糊原句改写成 **别人拿去就能执行** 的 brief。

## 必须包含

1. 目标
2. 背景 / 受众
3. 至少 2 条硬约束
4. 输出格式
5. 验收标准

## 额外要求

- 如果原句里存在关键缺口，要写出你采用的**合理默认值**。
- 不要写成长篇解释，直接给可执行版本。
