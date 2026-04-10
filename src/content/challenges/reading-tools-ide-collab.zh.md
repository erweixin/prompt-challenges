---
id: reading-tools-ide-collab
locale: zh
title: 进入 Cursor 前，先学会怎样给 IDE 助手下任务
description: 把“帮我改代码”改成“读哪里、改什么、怎么验”。
learningStage: tools
learningOrder: 23
contentKind: reading
difficulty: medium
---

## IDE 协作和普通聊天的差别

在 Cursor 这类工具里，模型不是只写一段回答，而是在一个**真实代码库**里协作。  
因此任务描述必须更像工作单，而不是随口一句话。

## 一个可执行的编程请求通常包含

- **范围**：哪些文件或模块相关
- **目标**：修 bug、补测试、加字段、重构哪一段
- **限制**：不要动哪些接口、不要改行为、兼容什么版本
- **验证**：跑哪些测试、看什么输出、如何判断完成

## 先读后改

如果你不能确定改动范围，先让助手：

1. 阅读相关文件
2. 总结现状
3. 提出修改点
4. 再开始写

这就是从“聊天”走向“协作”的关键变化。
