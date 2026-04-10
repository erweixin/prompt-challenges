---
id: tools-meeting-weather
locale: zh
title: 生活中「该用工具」的请求
description: 设计提示词，让模型在合适时输出结构化「函数调用」意图（可读 JSON 即可）。
learningStage: tools
learningOrder: 20
contentKind: practice
difficulty: medium
testCases:
  - description: 订会议室
    inputText: "帮我在下周三下午订一间能坐 8 人的会议室，要投影仪。"
    llmResult: "应识别为 calendar 或 room_booking 类工具，包含日期、人数、设备需求。"
  - description: 天气
    inputText: "我周六要去杭州出差，要不要带伞？"
    llmResult: "应识别需要 weather 类查询，包含城市与日期。"
promptTemplate: |
  可用工具（示例）：get_weather(city, date), book_room(date, capacity, needs_projector)
  用户提示词：{userPrompt}
---

## 目标

练习 **function calling 思维**：哪些话应该触发「查系统 / 算一下 / 订资源」，而不是纯闲聊。

## 要求

写系统提示词，约定：

- 当用户需要**真实世界数据或执行动作**时，输出**仅一段可解析 JSON**，字段包含 `name` 与 `arguments`。
- 否则用自然语言回答。

## 自测句

用左侧评分里的两条用户话试跑；检查 JSON 是否**工具名正确、参数可填**。
