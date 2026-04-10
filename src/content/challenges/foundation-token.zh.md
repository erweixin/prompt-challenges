---
id: foundation-token
locale: zh
title: Token 与上下文窗口
description: 为什么「太长」会忘、为什么要分段任务。
learningStage: foundation
learningOrder: 2
contentKind: reading
difficulty: warm
---

## 目标

理解 **token** 和 **上下文窗口** 如何影响你的写作方式。

## Token 是什么

模型不是按「字」读，而是按 **token**（常见是子词片段）处理。中文往往 **一字或多字** 合为一个 token，英文可能是单词的一部分。你可以在 OpenAI 的 Tokenizer 页面粘贴文本，直观看到切分结果。

## 上下文窗口

模型一次能「同时看见」的 token 总量有限，这就是 **上下文窗口**。超过上限时，最早的内容会被丢弃或压缩，表现为「忘了前面说过什么」。

## 怎么用

- 长材料：**摘要后再问**，或分多轮、每轮只带必要片段。
- 重要约束写在 **靠近结尾** 的用户消息里，往往更稳（但不要依赖这一点替代清晰结构）。

## 链接

- [Tokenizer](https://platform.openai.com/tokenizer)
