---
id: foundation-modalities
locale: en
title: Modalities and tool boundaries
description: How text/image/audio/video reach the model; what tools add.
learningStage: foundation
learningOrder: 3
contentKind: reading
difficulty: warm
---

## Four input flavors

In most products the model ultimately consumes **text, images, audio, or video** (if enabled). Plugins, MCP, and function calls still boil down to **feeding results back** as one of those forms.

## Implications

- Need **fresh data** (weather, internal docs)? Use a **tool**—don’t assume the model “already knows.”
- **Exact math / DB queries** → tools; the model **interprets and orchestrates**.

## Check

- Which parts of your task are pure “continuation,” and which require a system?
