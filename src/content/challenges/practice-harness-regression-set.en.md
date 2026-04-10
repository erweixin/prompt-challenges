---
id: practice-harness-regression-set
locale: en
title: Design a first regression set for a task
description: Turn “I know good output when I see it” into reusable test cases.
learningStage: harness
learningOrder: 54
contentKind: practice
difficulty: hard
testCases:
  - description: Support replies
    inputText: "The model drafts after-sales replies but sometimes forgets refund conditions."
    llmResult: "Should provide normal, boundary, and failure cases with matching rubrics."
  - description: Code change requests
    inputText: "An IDE assistant edits code from bug tickets, but sometimes changes too much."
    llmResult: "Should include regression cases, boundary conditions, non-regression checks, and review triggers."
promptTemplate: |
  Scenario: {inputText}
  Your regression plan: {userPrompt}
---

## Task

Design a **minimal regression set** for the scenario.

## Required parts

1. At least 2 normal cases
2. At least 2 boundary cases
3. At least 1 failure case
4. Acceptance criteria for each case type

## Goal

Someone else should be able to repeat your check and spot system drift.
