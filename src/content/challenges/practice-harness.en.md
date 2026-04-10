---
id: practice-harness-rubric
locale: en
title: A one-page acceptance checklist
description: Observable checks to tighten LLM outputs (harness basics).
learningStage: harness
learningOrder: 51
contentKind: practice
difficulty: medium
testCases:
  - description: Actionable checks
    inputText: "Draft customer emails; may be multilingual."
    llmResult: "Checklist covers language/tone, required fields, banned promises, length caps, sensitive wording, etc."
promptTemplate: |
  User prompt: {userPrompt}
  Scenario: {inputText}
---

## Task

Pick a **high-stakes** scenario (customer email, pricing note, etc.—use fake company names). Write **8–12** acceptance checks for human or model self-review.

## Requirements

- Each item must be **observable** (yes/no), not vibes like “sound professional.”
- At least **2 items** target **hallucination risk** (unverified numbers, fake links).
- At least **1 item** targets **format** (subject line, JSON, markdown headings).

## Tip

Append to prompts: “Run the checklist mentally before the final answer.”
