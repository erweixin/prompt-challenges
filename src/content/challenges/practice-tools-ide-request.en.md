---
id: practice-tools-ide-request
locale: en
title: Write an executable coding request for an IDE assistant
description: Practice Cursor-style collaboration with scope, goal, constraints, and validation.
learningStage: tools
learningOrder: 24
contentKind: practice
difficulty: hard
testCases:
  - description: Fix a form bug
    inputText: "The login form still submits when the phone field is empty. Ask AI to fix it."
    llmResult: "Should define likely file scope, expected behavior, non-regression constraints, and at least one validation step."
  - description: Add a list field
    inputText: "Add payment status to the order list."
    llmResult: "Should specify which files to inspect, where the field should come from, UI constraints, compatibility, and how to verify."
promptTemplate: |
  User task: {inputText}
  Your prompt: {userPrompt}
---

## Task

Rewrite the request into something an IDE assistant could act on directly.

## Required parts

1. Which files or modules to inspect first
2. The intended change
3. Behaviors or interfaces that must not break
4. At least one validation step

## Bonus

- Ask the assistant to summarize the current state before editing
- Ask for a change summary, not just the final output
