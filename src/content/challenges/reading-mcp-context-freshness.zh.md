---
id: reading-mcp-context-freshness
locale: zh
title: MCP 关心的不是“更大上下文”，而是“对的上下文”
description: 学会从来源、时效、权限三件事看 MCP。
learningStage: mcp
learningOrder: 33
contentKind: reading
difficulty: medium
---

## 三个核心问题

设计 MCP 接入时，先别急着想“接多少”，先想：

1. **来源**：这份信息来自哪里，谁是 source of truth。
2. **时效**：模型读到的是实时、缓存，还是快照。
3. **权限**：谁可以看，谁可以写，谁只能请求审批。

## 为什么重要

很多错误不是模型推理错误，而是上下文本身有问题：

- 用了过期数据
- 混用了多个版本
- 给了过宽的访问权限

## 最小原则

先接能完成当前任务的最小资源集，而不是一口气暴露整个内部系统。
