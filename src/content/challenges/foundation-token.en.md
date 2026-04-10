---
id: foundation-token
locale: en
title: Tokens and context windows
description: Why long chats “forget,” and why to chunk work.
learningStage: foundation
learningOrder: 2
contentKind: reading
difficulty: warm
---

## Goal

Understand **tokens** and the **context window** so you can plan prompts realistically.

## Tokens

Models process **tokens** (often subwords), not “characters.” Chinese may pack one or more characters per token; English may split words. Paste text into OpenAI’s tokenizer demo to see splits.

## Context window

There is a maximum number of tokens the model can attend to at once. Beyond that, early content may be dropped or summarized—classic “it forgot what we said.”

## What to do

- For long sources: **summarize first**, or split into rounds with only the needed excerpt each time.
- Keep critical constraints **near the end** of the user message (but still prefer a clear spec over tricks).

## Link

- [Tokenizer](https://platform.openai.com/tokenizer)
