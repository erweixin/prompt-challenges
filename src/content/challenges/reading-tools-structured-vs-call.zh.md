---
id: reading-tools-structured-vs-call
locale: zh
title: 结构化输出，不等于真的调用了工具
description: 区分“输出 JSON”与“完成动作”。
learningStage: tools
learningOrder: 22
contentKind: reading
difficulty: medium
---

## 两件容易混淆的事

- **结构化输出**：模型把意图整理成 JSON / 表格 / 固定字段。
- **真实工具调用**：系统拿这些字段去查数据或执行动作。

## 为什么要分清

如果你只让模型输出 JSON，它并没有真的：

- 查到最新天气
- 改到代码库里的文件
- 订到会议室

它只是把“下一步该怎么做”表达清楚了。

## 实战上的意义

在课程里，先练结构化表达，是为了让你学会：

- 识别工具名
- 提取关键参数
- 为后续系统接线留接口

这也是你以后在 IDE 或 Agent 中写工作流的基础。
