---
id: practice-harness-regression-set
locale: zh
title: 给一个任务设计第一版回归样例集
description: 练习把“经验判断”落成可重复的测试样例。
learningStage: harness
learningOrder: 54
contentKind: practice
difficulty: hard
testCases:
  - description: 客服回复
    inputText: "模型负责生成售后回复，偶尔会漏掉退款条件。"
    llmResult: "应给出正常/边界/失败样例，并写出对应 rubric。"
  - description: 代码修改请求
    inputText: "IDE 助手会根据 bug 单改代码，但有时会改超范围。"
    llmResult: "应包含回归样例、边界条件、非回归要求与人工复核触发条件。"
promptTemplate: |
  场景：{inputText}
  你的回归集方案：{userPrompt}
---

## 任务

为场景设计一版 **最小回归样例集**。

## 必须包含

1. 至少 2 个正常样例
2. 至少 2 个边界样例
3. 至少 1 个失败样例
4. 每类样例对应的验收标准

## 目标

让别人可以按你的方案重复检查系统是否退化。
