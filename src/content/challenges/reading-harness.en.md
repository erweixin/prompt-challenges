---
id: reading-harness
locale: en
title: Harness engineering — tame nondeterminism
description: Workflows, checks, and evals to keep LLM outputs within bounds.
learningStage: harness
learningOrder: 50
contentKind: reading
difficulty: medium
---

## Why harnesses

LLMs are **not** deterministic like classic software. Outputs can drift. A **harness** is the surrounding system: prompts, tools, validation, retries, human review, monitoring, regression sets.

## Start small

- Add an **acceptance checklist** (format, fields, forbidden content).
- Keep **good/bad examples** as you iterate.

## Read more

- [OpenAI on harness engineering](https://openai.com/index/harness-engineering/)
