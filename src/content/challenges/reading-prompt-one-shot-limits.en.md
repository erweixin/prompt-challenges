---
id: reading-prompt-one-shot-limits
locale: en
title: Why one-shot queries get stuck
description: Move from search-like questions to task briefs with real context.
learningStage: prompt
learningOrder: 12
contentKind: reading
difficulty: warm
---

## The common trap

Many people use an LLM like a **search box that talks back**: ask once, get an answer, then patch it with follow-up questions.  
That works for tiny requests, but it breaks once the task hides constraints you never wrote down.

## Why it breaks

- Your assumptions stay in your head instead of in the prompt.
- You care about a **usable deliverable** while the model only sees “generate some text.”
- You want clarification first, but the model is rewarded for answering immediately.

## The upgrade

Turn a one-shot query into a minimal brief:

- What is the goal?
- What context matters?
- What must not be guessed?
- What should the output look like?
- What counts as done?

## Takeaway

Stage 0 is not about fancy prompt tricks. It is about moving hidden requirements from your head into the message.
