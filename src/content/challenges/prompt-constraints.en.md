---
id: prompt-constraints
locale: en
title: Hard constraints on long context
description: Edit only part of a long text; keep facts and citations.
learningStage: prompt
learningOrder: 11
contentKind: practice
difficulty: medium
testCases:
  - description: Section-only edit
    inputText: "(Assume five sections.) Rewrite ONLY section 3 heading + first paragraph; leave everything else unchanged."
    llmResult: "Output states scope is section 3 only; other sections unchanged or explicitly noted untouched."
  - description: Keep citations
    inputText: "Polish the paragraph but keep every [1][2] citation marker positions and numbering intact."
    llmResult: "Markers remain complete and ordered; no new unsourced claims."
promptTemplate: |
  User prompt: {userPrompt}
  Task: {inputText}
---

## Scenario

You have a long document and need help revising **without** breaking other parts or **losing** numbers/citations.

## Requirements

Write a prompt that includes:

1. **Scope**: exactly what may change vs must stay (by section id, markers, or quoted spans).
2. **Fact rules**: how to treat numbers, names, citation tags.
3. **Output shape**: e.g., “return only section 3” or “return a bullet diff list.”
4. **If ambiguous**: ask clarifying questions instead of guessing.

## Check

Could someone follow your prompt **without collateral edits**?
