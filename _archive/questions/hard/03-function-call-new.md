---
title: "Function Call"
difficulty: "hard"
tags: ["Function Calling", "Tool Use", "API Integration"]
testCases:
  - description: "Simple Calculator"
    inputText: "What is the result of 123 + 456?"
    llmResult: "[TOOL] calculator.add(123, 456) -> 579"
  - description: "Weather Query"
    inputText: "What's the weather like in London tomorrow?"
    llmResult: "[TOOL] weather.get_forecast('London', 'tomorrow') -> The weather in London tomorrow will be partly cloudy with a high of 18°C and a low of 12°C."
  - description: "Calendar Event Creation"
    inputText: "Schedule a meeting with John for next Monday at 10am to discuss the project proposal."
    llmResult: "[TOOL] calendar.create_event('Meeting with John', 'next Monday 10am', 'Discuss project proposal') -> Event created successfully."
  - description: "Multi-step Calculation"
    inputText: "What is the area of a circle with a radius of 5, and then what is the circumference?"
    llmResult: "[TOOL] calculator.circle_area(5) -> 78.54\n[TOOL] calculator.circle_circumference(5) -> 31.42"
scoringCriteria:
  - name: "Correct Tool Selection"
    weight: 1
    description: "Checks if the AI selects the correct tool for the given task."
    evaluationMethod: "Checks if the AI selects the correct tool for the given task."
    passCriteria: "The correct tool is selected for all test cases."
  - name: "Correct Parameter Extraction"
    weight: 1
    description: "Checks if the AI correctly extracts and formats parameters for the tool call."
    evaluationMethod: "Checks if the AI correctly extracts and formats parameters for the tool call."
    passCriteria: "All parameters are correctly extracted and formatted for all test cases."
  - name: "Handling of Multi-step Tasks"
    weight: 1
    description: "Checks if the AI can handle tasks that require multiple tool calls."
    evaluationMethod: "Checks if the AI can handle tasks that require multiple tool calls."
    passCriteria: "The AI correctly identifies and executes multiple tool calls in the correct order."
  - name: "Robustness to Ambiguity"
    weight: 1
    description: "Checks if the AI can handle ambiguous requests and ask clarifying questions if necessary."
    evaluationMethod: "Checks if the AI can handle ambiguous requests and ask clarifying questions if necessary."
    passCriteria: "The AI asks for clarification when the user's request is ambiguous."
  - name: "Graceful Failure"
    weight: 1
    description: "Checks if the AI can handle cases where a tool call fails."
    evaluationMethod: "Checks if the AI can handle cases where a tool call fails."
    passCriteria: "The AI provides a helpful error message when a tool call fails."
promptTemplate: |
  [Your Prompt]

  User: {User Input}
expectedOutput: |
  [TOOL] calculator.add(123, 456) -> 579
solutionDiscussion: "https://github.com/erweixin/prompt-challenges/discussions/15"
description: "Function calling allows AI to interact with external tools and APIs, greatly extending its capabilities. This challenge requires you to design a prompt that enables an AI to correctly understand a user's intent and translate it into a specific function call, including selecting the right tool and extracting the correct parameters."
---

# Function Call

## 🔴 Hard

### Challenge Description

Function calling allows AI to interact with external tools and APIs, greatly extending its capabilities. This challenge requires you to design a prompt that enables an AI to correctly understand a user's intent and translate it into a specific function call, including selecting the right tool and extracting the correct parameters.

### Challenge Goals

Write a prompt that enables AI to:
1.  Accurately identify the user's intent and map it to the correct tool or function.
2.  Correctly extract all necessary parameters from the user's query.
3.  Format the function call correctly according to the tool's specification.
4.  Handle multi-step tasks that require sequential tool calls.
5.  Gracefully handle ambiguous requests or missing information.

### Requirements

-   The prompt must clearly define the available tools and their functions.
-   The AI should be able to handle a variety of user inputs, from simple to complex.
-   The AI's output should be a well-formatted function call.
-   The prompt should encourage the AI to ask for clarification if the user's request is ambiguous.

### Prompt Template

```
[Your Prompt]

User: {User Input}
```

### Automated Testing Process

1.  For each test case, use your prompt and the user input as input.
2.  Analyze the output to see if the AI generated the correct function call.
3.  Check if the tool selection and parameter extraction are accurate.
4.  For multi-step tasks, check if the AI generates the correct sequence of function calls.
5.  Calculate the final score (out of 5 points).

### Expected Output Example (for Case 1)

```
[TOOL] calculator.add(123, 456) -> 579
```

---

Submit your solution and share your ideas and techniques with the community!
