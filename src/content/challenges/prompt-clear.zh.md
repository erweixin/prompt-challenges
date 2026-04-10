---
id: prompt-clear-requirements
locale: zh
title: 把需求说清楚、说精确
description: 面对模糊一句话，写出可执行、可验收的提示词。
learningStage: prompt
learningOrder: 10
contentKind: practice
difficulty: warm
testCases:
  - description: 模糊请求
    inputText: "帮我写个东西。"
    llmResult: "应追问或默认：文体、受众、长度、要点、语气；输出应有结构（标题/段落/列表之一）。"
  - description: 指定场景
    inputText: "给老板写周报，三条成果一条风险，各不超过两行。"
    llmResult: "输出含：三条成果 bullet、一条风险 bullet；语气正式、简洁；总长度受控。"
promptTemplate: |
  用户提示词：{userPrompt}
  请根据用户提示词完成上述输入文本相关任务。
---

## 情境

同事发来一句：「帮我写个东西。」你要用大模型帮忙，但不能把模糊原句直接扔给模型。

## 要求

写一版**系统提示 + 用户消息亦可**的完整提示词，使模型能够：

1. 明确**文体与用途**（邮件 / 小结 / 发言稿等，可自行合理假设并写进提示里）。
2. 写清**受众**与**语气**。
3. 给出**长度或格式**约束（例如条数、字数上限、是否需要小标题）。
4. 列出**验收标准**（怎样算「可以用」）。

## 自评检查

- 是否包含「目标、受众、格式、约束、验收」五类信息中的至少四类？
- 别人读你的提示，能否**不追问**就开写？
