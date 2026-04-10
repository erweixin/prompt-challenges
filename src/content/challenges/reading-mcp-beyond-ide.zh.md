---
id: reading-mcp-beyond-ide
locale: zh
title: 为什么 IDE 协作还不够
description: 代码库之外，模型还需要真实上下文、时效性与权限控制。
learningStage: mcp
learningOrder: 32
contentKind: reading
difficulty: medium
---

## Cursor 能解决什么

IDE 助手很擅长围绕**当前代码库**做阅读、修改、解释和验证。

## 但它天然不解决什么

- 外部知识库谁是最新版本
- 内部 API 哪些字段当前可用
- 文件系统 / 数据库 / SaaS 的权限边界
- 不同来源之间怎样统一接入

## 这就是 MCP 出场的原因

MCP 不是让模型“更聪明”，而是让系统把外部资源通过统一协议接进来。  
你可以把它理解为：给 Agent 一套可治理的“取上下文和用工具的方法”。

## 典型信号

如果你开始频繁说这些话，通常就该考虑 MCP：

- “我每次都要把同一堆资料贴进来。”
- “这个答案要基于最新工单/数据库状态。”
- “我希望模型看到的是允许范围内的数据，而不是整个系统。”
