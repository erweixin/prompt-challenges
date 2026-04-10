---
id: reading-mcp-context-freshness
locale: en
title: MCP is about the right context, not just more context
description: Think in terms of source, freshness, and permissions.
learningStage: mcp
learningOrder: 33
contentKind: reading
difficulty: medium
---

## Three core questions

Before connecting anything through MCP, ask:

1. **Source**: where does this information come from?
2. **Freshness**: is the model seeing live data, cached data, or a snapshot?
3. **Permissions**: who can read, write, or only request approval?

## Why this matters

Many failures are not reasoning failures. They come from bad context:

- stale data
- mixed versions of truth
- overly broad access

## Start small

Expose the smallest resource set that can solve the current task.  
Do not connect the whole internal system just because you can.
