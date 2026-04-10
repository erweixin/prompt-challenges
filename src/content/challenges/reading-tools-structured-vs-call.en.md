---
id: reading-tools-structured-vs-call
locale: en
title: Structured output is not the same as a real tool call
description: Separate “return JSON” from “actually did the thing.”
learningStage: tools
learningOrder: 22
contentKind: reading
difficulty: medium
---

## Two different things

- **Structured output**: the model formats intent as JSON, a table, or named fields
- **Real tool use**: the surrounding system uses those fields to fetch data or perform an action

## Why the distinction matters

If the model only returns JSON, it did **not** actually:

- fetch the latest weather
- edit your repository
- book the room

It only described the next step clearly.

## Why we still practice it

Structured output is where you learn to:

- identify the right tool
- extract required parameters
- leave a clean interface for later automation

That same skill carries into IDE agents and local agents.
