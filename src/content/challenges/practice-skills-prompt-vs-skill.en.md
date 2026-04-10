---
id: practice-skills-prompt-vs-skill
locale: en
title: Distinguish prompt, template, Skill, and playbook
description: Practice choosing the right abstraction level for a task.
learningStage: skills
learningOrder: 45
contentKind: practice
difficulty: medium
testCases:
  - description: One-off rewrite
    inputText: "Make this marketing copy more conversational."
    llmResult: "Should classify it as closer to a prompt than a full Skill."
  - description: Weekly support summary
    inputText: "Every Friday, pull tickets, group issues, write a summary, and send it to a manager."
    llmResult: "Should classify it as at least a Skill or playbook and explain why."
promptTemplate: |
  Scenario: {inputText}
  Your answer: {userPrompt}
---

## Task

For each scenario, decide whether it is best represented as a:

- prompt
- template
- Skill
- playbook / SOP

## Requirements

- State your choice
- Explain the reason in 2 to 4 sentences
- If it does not deserve a higher abstraction level, say why
