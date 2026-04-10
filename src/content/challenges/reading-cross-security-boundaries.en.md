---
id: reading-cross-security-boundaries
locale: en
title: "Local agent safety boundaries: files, commands, and secrets"
description: Before using OpenClaw-style tools, learn to separate permission risks clearly.
learningStage: cross_cut
learningOrder: 61
contentKind: reading
difficulty: medium
---

## Three high-risk capability classes

1. **Reading and writing files**
2. **Executing commands**
3. **Touching secrets, tokens, or internal systems**

## Why local agents feel different

In a chat app, the model mostly changes text output.  
Once a local agent can access your filesystem, terminal, and external accounts, mistakes become much more expensive.

## Basic governance habits

- default to least privilege
- require approval for risky actions
- treat third-party Skills as untrusted code
- isolate sensitive environments whenever possible

## The real shift

This is where “using AI” becomes “operating an AI system safely.”
