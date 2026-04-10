---
id: reading-harness-after-skills
locale: en
title: Why a Skill is still not enough
description: A clear workflow can still drift; harnesses add checks, evals, and fallback behavior.
learningStage: harness
learningOrder: 52
contentKind: reading
difficulty: medium
---

## A Skill answers “how should this run?”

It can define the workflow clearly, but it does not guarantee stable execution.

## A harness answers “how do we know it stayed on track?”

You still need to define:

- which inputs must keep passing over time
- which failures happen most often
- whether failure should retry, degrade, or hand off to a person

## Common trap

“My prompt and Skill are detailed, so the system should be stable.”  
In reality, models, context, data, and tool behavior all change.

## So what is a harness?

Think of it as the **checking, evaluation, and fallback layer** around a Skill.
