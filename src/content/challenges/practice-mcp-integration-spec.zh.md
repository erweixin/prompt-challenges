---
id: practice-mcp-integration-spec
locale: zh
title: 为一个知识库或 API 写最小 MCP 接入说明
description: 练习定义资源范围、权限、时效与成功条件。
learningStage: mcp
learningOrder: 34
contentKind: practice
difficulty: hard
testCases:
  - description: 产品知识库
    inputText: "让客服 Agent 读取产品 FAQ，但不能读内部薪资和法务文档。"
    llmResult: "应定义允许资源、拒绝范围、更新频率、可执行动作与审批边界。"
  - description: 工单 API
    inputText: "让工程助手读取 Jira 工单并汇总风险，但不能改票。"
    llmResult: "应说明只读权限、关键字段、时效要求、失败回退和输出格式。"
promptTemplate: |
  场景：{inputText}
  你的接入说明：{userPrompt}
---

## 任务

为上面的场景写一份 **最小 MCP 接入说明**。

## 必须包含

1. 可访问的资源 / 接口
2. 明确禁止的资源或动作
3. 数据时效要求
4. 输出或可执行能力
5. 失败时如何处理

## 目标

不是写技术实现细节，而是写出一个团队能据此落地接线的说明。
