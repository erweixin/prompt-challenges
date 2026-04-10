---
id: practice-skills-prompt-vs-skill
locale: zh
title: 区分 prompt、template、skill、playbook
description: 练习给不同复杂度的任务选对抽象层。
learningStage: skills
learningOrder: 45
contentKind: practice
difficulty: medium
testCases:
  - description: 一次性改写
    inputText: "把这段文案改得更口语。"
    llmResult: "应判断更像 prompt，而不是完整 skill。"
  - description: 每周客服汇总
    inputText: "每周五拉取工单、归类问题、写周报并发给主管。"
    llmResult: "应判断至少是 skill 或 playbook，并说明原因。"
promptTemplate: |
  场景：{inputText}
  你的回答：{userPrompt}
---

## 任务

针对每个场景，判断它更适合用：

- prompt
- template
- skill
- playbook / SOP

## 要求

- 给出你的选择
- 用 2～4 句说明原因
- 如果它不适合更高层抽象，也要说明为什么
