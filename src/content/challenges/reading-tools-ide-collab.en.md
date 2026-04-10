---
id: reading-tools-ide-collab
locale: en
title: Before Cursor, learn how to assign work to an IDE assistant
description: Turn “fix this code” into scope, goal, constraints, and validation.
learningStage: tools
learningOrder: 23
contentKind: reading
difficulty: medium
---

## IDE collaboration is different from ordinary chat

In Cursor-style tools, the model is not just writing an answer. It is collaborating inside a **real codebase**.  
That means your request should sound more like a work item than a casual sentence.

## A workable coding request usually includes

- **Scope**: which files or modules matter
- **Goal**: fix a bug, add a field, refactor, write tests
- **Constraints**: what must not change, what must stay compatible
- **Validation**: which tests or checks should confirm completion

## Read before write

If the scope is unclear, ask the assistant to:

1. inspect relevant files
2. summarize the current behavior
3. propose the change
4. then implement it

That is the key shift from chatting to collaborating.
