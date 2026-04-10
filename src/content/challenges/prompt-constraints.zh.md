---
id: prompt-constraints
locale: zh
title: 长背景下的硬约束
description: 在已有长文中只改一部分、保留事实与引用。
learningStage: prompt
learningOrder: 11
contentKind: practice
difficulty: medium
testCases:
  - description: 只改第三节
    inputText: "（假设全文有五节）请只重写第三节的小标题与首段，其它节一字不动。"
    llmResult: "输出应明确声明仅修改第三节；其余章节与原文一致或标明未改动。"
  - description: 保留数据出处
    inputText: "润色下列段落，但保留所有 [1][2] 引用标记的位置与编号不变。"
    llmResult: "润色后引用标记仍完整、顺序不乱、未新增无来源结论。"
promptTemplate: |
  用户提示词：{userPrompt}
  输入任务：{inputText}
---

## 情境

你有一段长背景（报告、合同、会议纪要），需要模型帮忙改写，但**不能动**某些部分或**不能丢**引用与数字。

## 要求

写一版提示词，必须包含：

1. **范围**：明确「改哪里 / 不改哪里」（可用章节号、段落标记或引号包裹原文）。
2. **事实约束**：数字、日期、人名、引用标记如何处理。
3. **输出格式**：例如「仅输出第三节全文」或「输出 diff 列表」等，任选一种合理约定。
4. **若信息不足**：要求模型先列出澄清问题，而不是瞎改。

## 自评

别人能否照你的提示词执行而**不误伤**其它段落？
