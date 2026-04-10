---
id: practice-skills-sop
locale: zh
title: 把重复流程写成 Skill 式说明
description: 步骤、输入输出、异常与验收写清楚。
learningStage: skills
learningOrder: 41
contentKind: practice
difficulty: medium
testCases:
  - description: 结构完整
    inputText: "我每周五要汇总本周工单发给组长。"
    llmResult: "应包含：输入（数据来源）、步骤（提取/分类/模板）、输出格式、异常（缺字段）、验收（组长一眼能批）。"
promptTemplate: |
  用户提示词：{userPrompt}
  场景：{inputText}
---

## 任务

选一个你 **每周或每月重复做** 的事（写周报、对账、回复某类邮件等），写一份 **Skill 式说明**，让同事或未来的你能照做。

## 结构（必须出现）

1. **名称与目的**（一句话）
2. **输入**（需要哪些信息 / 从哪取）
3. **步骤**（编号列表，3～7 步）
4. **输出**（格式、文件名、发送给谁）
5. **异常**（常见卡点怎么处理）
6. **验收**（怎样算完成）

## 提示

不必真接入系统；重点是 **可重复、可交接**。
