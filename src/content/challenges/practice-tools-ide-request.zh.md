---
id: practice-tools-ide-request
locale: zh
title: 给 IDE 助手写一段可执行编程请求
description: 练习 Cursor 式协作：范围、目标、限制、验证一步写清。
learningStage: tools
learningOrder: 24
contentKind: practice
difficulty: hard
testCases:
  - description: 修复表单 bug
    inputText: "登录表单在手机号为空时也能提交，请让 AI 帮我修一下。"
    llmResult: "应包含相关文件范围、预期行为、不要影响其他登录方式、并要求补至少一种验证。"
  - description: 新增列表字段
    inputText: "把订单列表加上付款状态。"
    llmResult: "应说明读哪些文件、字段来源、UI 展示限制、兼容现有接口、以及如何验证。"
promptTemplate: |
  用户任务：{inputText}
  你的提示词：{userPrompt}
---

## 任务

把上面的开发需求改写成一段给 IDE 助手的请求。

## 必须覆盖

1. 先读哪些文件或模块
2. 要完成的改动目标
3. 不该被破坏的行为或接口
4. 至少一种验证方式

## 加分点

- 要求助手先总结现状，再动手改。
- 要求输出修改说明，而不是只给结果。
