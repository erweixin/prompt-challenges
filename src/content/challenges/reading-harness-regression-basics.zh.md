---
id: reading-harness-regression-basics
locale: zh
title: 从手工验收到轻量回归集
description: 用样例、rubric 和失败样本把可靠性做成日常动作。
learningStage: harness
learningOrder: 53
contentKind: reading
difficulty: medium
---

## 轻量回归集至少有三类样本

- **正常样本**：系统应该顺利通过
- **边界样本**：容易漏字段、超长度、缺上下文
- **失败样本**：用来验证系统会不会乱答、乱做

## Rubric 要写成什么样

不是“看起来不错”，而是：

- 是否保留了关键事实
- 是否遗漏了必填字段
- 是否触发了不该触发的动作
- 是否把高风险结果交给了人审批

## 从哪里开始

先收 5～10 个最常见输入，建立你自己的第一版回归集，再慢慢扩。
