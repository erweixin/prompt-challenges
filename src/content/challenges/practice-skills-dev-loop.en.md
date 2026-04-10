---
id: practice-skills-dev-loop
locale: en
title: Write a skill spec for “read requirements -> edit code -> self-test -> report”
description: Practice turning a common dev loop into a reusable Skill-style workflow.
learningStage: skills
learningOrder: 44
contentKind: practice
difficulty: hard
testCases:
  - description: Small bugfix
    inputText: "After receiving a bug ticket, confirm reproduction steps, edit code, run tests, and send a change summary."
    llmResult: "Should cover trigger conditions, inputs, steps, validation, report format, and escalation on failure."
promptTemplate: |
  Scenario: {inputText}
  Your skill spec: {userPrompt}
---

## Task

Write a **Skill-style spec** for the workflow above.

## Include at least

1. Trigger conditions
2. Inputs
3. 4 to 7 steps
4. Validation
5. Reporting format
6. Escalation when blocked or failing

## Reminder

The goal is not technical depth. The goal is to make your default workflow reusable by someone else.
