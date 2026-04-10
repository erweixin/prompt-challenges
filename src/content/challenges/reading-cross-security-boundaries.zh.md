---
id: reading-cross-security-boundaries
locale: zh
title: 本地 Agent 的安全边界：文件、命令、密钥
description: 进入 OpenClaw 类工具前，先学会把权限拆开看。
learningStage: cross_cut
learningOrder: 61
contentKind: reading
difficulty: medium
---

## 三类高风险能力

1. **读写文件**
2. **执行命令**
3. **接触密钥、令牌、内部系统**

## 为什么本地 Agent 更敏感

聊天应用里，模型主要影响文本输出。  
本地 Agent 一旦连上文件系统、终端和外部账号，错误的代价会陡增。

## 基本治理动作

- 默认最小权限
- 高风险动作要求审批
- 第三方 Skills 当成不受信任代码看待
- 敏感环境分隔，尽量不要在主环境裸跑

## 学会这个之后

你才算真正从“会用 AI”进入“会管理 AI 系统”。
