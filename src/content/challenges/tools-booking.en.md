---
id: tools-meeting-weather
locale: en
title: Everyday requests that deserve tools
description: Shape prompts so the model emits structured tool intent (JSON is fine).
learningStage: tools
learningOrder: 20
contentKind: practice
difficulty: medium
testCases:
  - description: Room booking
    inputText: "Book a room next Wednesday afternoon for 8 people with a projector."
    llmResult: "Should map to calendar/room tool with date, capacity, equipment flag."
  - description: Weather
    inputText: "I'm traveling to Hangzhou on Saturday—do I need an umbrella?"
    llmResult: "Should trigger weather lookup with city and date."
promptTemplate: |
  Tools (example): get_weather(city, date), book_room(date, capacity, needs_projector)
  User prompt: {userPrompt}
---

## Goal

Practice **function-calling thinking**: when to hit a system vs chat.

## Requirements

Write a system prompt that:

- If the user needs **real-world data or an action**, return **only JSON** with `name` and `arguments`.
- Otherwise answer in natural language.

## Try it

Run the two user lines from scoring; JSON should have a **sensible tool name and fillable args**.
