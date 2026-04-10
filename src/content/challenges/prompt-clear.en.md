---
id: prompt-clear-requirements
locale: en
title: Say what you need, clearly and precisely
description: Turn a vague one-liner into an executable, testable prompt.
learningStage: prompt
learningOrder: 10
contentKind: practice
difficulty: warm
testCases:
  - description: Vague ask
    inputText: "Write something for me."
    llmResult: "Should clarify genre, audience, length, key points, tone; output should be structured."
  - description: Specific context
    inputText: "Weekly update for my manager: three wins, one risk, each <= two lines."
    llmResult: "Bullets: three wins + one risk; formal concise tone; length controlled."
promptTemplate: |
  User prompt: {userPrompt}
  Complete the task related to the input text following the user prompt.
---

## Scenario

Someone says: “Write something for me.” You want the model to help, but you should not paste the vague line alone.

## Requirements

Write a **full prompt** (system + user is fine) so the model can:

1. Pin the **genre and purpose** (email, memo, talk track—state assumptions explicitly).
2. State **audience** and **tone**.
3. Add **length or format** constraints (bullets, word cap, headings if needed).
4. Add **acceptance criteria** (“done means …”).

## Self-check

- Does it cover at least four of: goal, audience, format, constraints, acceptance?
- Could a teammate run it **without follow-up questions**?
