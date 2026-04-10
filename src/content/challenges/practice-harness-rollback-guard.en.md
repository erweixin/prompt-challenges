---
id: practice-harness-rollback-guard
locale: en
title: Write a one-page “pre-launch checks + rollback on failure” rulebook
description: Practice adding release gates and fallback rules to a real workflow.
learningStage: harness
learningOrder: 55
contentKind: practice
difficulty: hard
testCases:
  - description: Customer emails
    inputText: "The model drafts customer emails automatically, and mistakes could trigger complaints."
    llmResult: "Should define pre-launch checks, human approval points, rollback rules, and stop conditions."
promptTemplate: |
  Scenario: {inputText}
  Your rulebook: {userPrompt}
---

## Task

Write a short internal rulebook for the high-risk workflow above.

## Required parts

1. At least 5 pre-launch checks
2. Which outputs require human approval
3. How to roll back or pause on failure
4. Who takes over unusual cases

## Style

Write it like a team operating guide, not a generic slogan.
