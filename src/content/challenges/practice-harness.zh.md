---
id: practice-harness-rubric
locale: zh
title: 给关键任务做一页「验收清单」
description: 用可观察条件逼近可靠输出（Harness 入门）。
learningStage: harness
learningOrder: 51
contentKind: practice
difficulty: medium
testCases:
  - description: 清单可执行
    inputText: "模型要生成客户邮件草稿，可能多语言。"
    llmResult: "清单含：语言与称呼、必填字段、禁用承诺、长度上限、敏感词检查等可勾选项。"
promptTemplate: |
  用户提示词：{userPrompt}
  场景：{inputText}
---

## 任务

选一个 **出错成本高** 的场景（对外邮件、费用说明、医疗/法律相关表述等——可虚构公司名），写 **8～12 条** 验收清单，用于人工或模型自检。

## 要求

- 每条用 **可观察** 描述（能回答「是/否」），避免「写得专业一点」这类空话。
- 至少 **2 条** 针对 **幻觉风险**（未证实数据、编造链接等）。
- 至少 **1 条** 针对 **格式**（JSON/Markdown/主题行等）。

## 用法提示

清单可贴在提示词末尾：「逐条自检后再输出终稿。」
