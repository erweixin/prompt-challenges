---
id: practice-mcp-checklist
locale: en
title: Do we need MCP? A tiny checklist
description: Decide when wiring MCP is worth it.
learningStage: mcp
learningOrder: 31
contentKind: practice
difficulty: warm
testCases:
  - description: Good fit
    inputText: "Our internal wiki changes daily; answers must cite the latest page."
    llmResult: "Prefer MCP/tool fetch over pasting the whole wiki each time."
  - description: Skip
    inputText: "One-off question: explain photosynthesis in simple terms."
    llmResult: "MCP usually unnecessary; plain chat is enough."
promptTemplate: |
  User prompt: {userPrompt}
  Decide if the scenario needs MCP.
---

## Task

Write a short **system note** or **team blurb** teaching three yes/no checks before adopting MCP:

1. Does information **change often** or is it **too large** to paste?
2. Do we need **auditable access control**?
3. Is there a **graceful fallback** if the tool fails?

## Requirements

- Plain language for non-developers.
- Under each check, add **one line** example (MCP yes / no).

Paste your text into the scorer on the right—no code required.
