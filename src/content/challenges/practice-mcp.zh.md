---
id: practice-mcp-checklist
locale: zh
title: 要不要接 MCP？自检清单
description: 用几条判断题理清何时值得上 MCP。
learningStage: mcp
learningOrder: 31
contentKind: practice
difficulty: warm
testCases:
  - description: 场景判断
    inputText: "团队知识库每天更新，希望助手回答时引用最新页面。"
    llmResult: "倾向接 MCP/工具拉取最新内容，而不是每次整库粘贴。"
  - description: 反例
    inputText: "偶尔问一次『什么是光合作用』科普。"
    llmResult: "一般不需要 MCP；直接对话即可。"
promptTemplate: |
  用户提示词：{userPrompt}
  请根据用户提示词分析输入场景是否需要 MCP。
---

## 任务

写一段 **系统提示** 或 **给同事的说明**，教大家用下面三张「判断题」决定要不要上 MCP：

1. 信息是否 **频繁变化** 或 **太大** 不适合手贴？
2. 是否需要 **可审计的权限**（谁能访问哪类资源）？
3. 失败时能否 **降级**（例如只读摘要、提示用户手动确认）？

## 要求

- 语言简洁，适合非开发者阅读。
- 每条判断题下给 **一行例子**（要 / 不要 MCP）。

## 提交

把你的说明粘贴到右侧评分框；无需写代码。
