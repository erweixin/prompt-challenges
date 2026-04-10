---
id: practice-prompt-brief-rewrite
locale: en
title: Rewrite a vague request into an executable brief
description: Convert a consumer-chat style ask into a scoped task with acceptance criteria.
learningStage: prompt
learningOrder: 15
contentKind: practice
difficulty: medium
testCases:
  - description: Marketing copy
    inputText: "Write something about our event."
    llmResult: "Should add audience, event facts, channel, length limits, CTA, and a definition of done."
  - description: Internal summary
    inputText: "Summarize the project's progress."
    llmResult: "Should define the audience, time range, structure, preserved facts, and the format for next steps."
promptTemplate: |
  Original request: {inputText}
  Your task: {userPrompt}
---

## Task

Rewrite the original sentence into a brief that **someone else could execute without more back-and-forth**.

## Required parts

1. Goal
2. Context / audience
3. At least 2 hard constraints
4. Output format
5. Acceptance criteria

## Extra rule

If the original request is missing key information, state the **reasonable defaults** you chose and keep going.
