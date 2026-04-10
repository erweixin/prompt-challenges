---
id: practice-skills-dev-loop
locale: zh
title: 把“读需求 → 改代码 → 自测 → 汇报”写成 skill spec
description: 练习把开发协作套路沉淀成可复用说明。
learningStage: skills
learningOrder: 44
contentKind: practice
difficulty: hard
testCases:
  - description: 小型 bugfix
    inputText: "收到 bug 单后，需要先确认复现条件，再改代码、跑测试、写变更说明。"
    llmResult: "应覆盖触发条件、输入、步骤、验证、汇报格式与失败升级路径。"
promptTemplate: |
  场景：{inputText}
  你的 skill spec：{userPrompt}
---

## 任务

把一个常见开发循环写成 **Skill 式说明**。

## 至少包含

1. 触发条件
2. 输入材料
3. 4～7 个步骤
4. 验证方式
5. 汇报输出格式
6. 失败或阻塞时的升级路径

## 提醒

重点不是技术细节，而是让别人接手时不需要再猜你脑中的默认做法。
