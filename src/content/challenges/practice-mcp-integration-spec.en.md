---
id: practice-mcp-integration-spec
locale: en
title: Write a minimal MCP integration spec for a knowledge base or API
description: Practice defining resource scope, permissions, freshness, and success conditions.
learningStage: mcp
learningOrder: 34
contentKind: practice
difficulty: hard
testCases:
  - description: Product knowledge base
    inputText: "Let a support agent read the product FAQ, but not payroll or legal docs."
    llmResult: "Should define allowed resources, denied scope, update cadence, available actions, and approval boundaries."
  - description: Ticket API
    inputText: "Let an engineering assistant read Jira tickets and summarize risks, but never edit tickets."
    llmResult: "Should specify read-only access, important fields, freshness expectations, fallback behavior, and output shape."
promptTemplate: |
  Scenario: {inputText}
  Your integration spec: {userPrompt}
---

## Task

Write a **minimal MCP integration spec** for the scenario above.

## Required parts

1. Allowed resources or endpoints
2. Explicitly forbidden resources or actions
3. Freshness expectations
4. Output or action capabilities
5. Failure handling

## Goal

Do not write implementation code. Write a spec a team could use to wire the connection safely.
