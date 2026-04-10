---
id: reading-harness-after-skills
locale: zh
title: 为什么有了 Skill 还不够
description: 好流程也会漂移，Harness 是把流程包进验收与回归里。
learningStage: harness
learningOrder: 52
contentKind: reading
difficulty: medium
---

## Skill 解决的是“怎么做”

它能把步骤写清楚，但不能保证每次执行都稳定。

## Harness 解决的是“怎么确认它没跑偏”

你需要额外定义：

- 哪些输入样例必须长期通过
- 哪些错误最常见
- 失败时是重试、降级还是交给人

## 一个常见误区

“我的提示词和 Skill 都写全了，所以应该稳定。”  
现实里，模型、上下文、数据源、工具响应都会变化。

## 所以 Harness 是什么

可以把它理解为：围绕 Skill 的 **检查层、评估层、回退层**。
