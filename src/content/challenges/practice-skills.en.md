---
id: practice-skills-sop
locale: en
title: Turn a repeating workflow into a Skill-style spec
description: Steps, I/O, failures, and acceptance criteria.
learningStage: skills
learningOrder: 41
contentKind: practice
difficulty: medium
testCases:
  - description: Structure
    inputText: "Every Friday I roll up tickets and email my lead."
    llmResult: "Covers inputs, numbered steps, output format, failure cases, and a clear done definition."
promptTemplate: |
  User prompt: {userPrompt}
  Scenario: {inputText}
---

## Task

Pick something you **repeat weekly/monthly** (status email, reconciliation, templated replies) and write a **Skill-style playbook** someone else could run.

## Required sections

1. **Name + purpose** (one line)
2. **Inputs** (what info, where it lives)
3. **Steps** (3–7 numbered steps)
4. **Output** (format, filename, recipient)
5. **Failures** (common blockers + what to do)
6. **Acceptance** (what “done” means)

No real integration needed—focus on **repeatability and handoff**.
