---
id: practice-harness-rollback-guard
locale: zh
title: 写一页“上线前检查 + 失败后回退”守则
description: 练习给真实工作流加上放行条件与兜底策略。
learningStage: harness
learningOrder: 55
contentKind: practice
difficulty: hard
testCases:
  - description: 对外邮件生成
    inputText: "模型自动生成客户邮件，若内容错误会造成投诉。"
    llmResult: "应写出上线前检查项、人工审批点、失败回退与暂停条件。"
promptTemplate: |
  场景：{inputText}
  你的守则：{userPrompt}
---

## 任务

针对上面的高风险流程，写一页简单守则。

## 必须包含

1. 上线前至少 5 条检查项
2. 哪些结果必须人工审批
3. 失败后如何回退或停用
4. 谁来接手异常情况

## 风格

写得像团队内部操作说明，不要写成空泛口号。
