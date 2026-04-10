---
title: "Context Understanding"
difficulty: "medium"
tags: ["Context Understanding", "Dialogue Management", "Reasoning Ability"]
testCases:
  - description: "Reference Relationship Understanding"
    inputText: |
      Dialogue History:
      User: "How is the book I bought yesterday?"
      AI: "Do you mean 'Introduction to Artificial Intelligence'? This book is very comprehensive and suitable for beginners."
      User: "Yes, that's the one. What do you think of the third chapter?"

      Background Information: The user has previously asked for recommendations on introductory books on artificial intelligence, and the AI recommended 'Introduction to Artificial Intelligence'.

      Current Question: Analyze the specific meaning of the user's current question and how the AI should answer.
    llmResult: |
      Context Understanding Analysis:

      ## Dialogue History Analysis
      - The user asks about the book they bought yesterday, and the AI confirms it is 'Introduction to Artificial Intelligence'.
      - The AI gives a positive evaluation of the whole book, believing it is suitable for beginners.
      - The user is now asking about the specific content of the third chapter.

      ## Reference Relationship Recognition
      - "That one" refers to 'Introduction to Artificial Intelligence'.
      - "The third chapter" refers to the third chapter of 'Introduction to Artificial Intelligence'.

      ## Implicit Assumption
      - The user has already purchased this book.
      - The user may be reading or preparing to read the third chapter.
      - The user wants to know the specific content and quality of the third chapter.

      ## Reasoning Process
      Based on the AI's previous positive evaluation of the whole book and the user's attention to a specific chapter, it can be inferred that the user wants to know if the third chapter is equally excellent or if it has special learning value.

      ## Suggested Answer
      The AI should:
      1. Confirm that it understands the user is asking about the third chapter of 'Introduction to Artificial Intelligence'.
      2. Provide a specific overview of the content of the third chapter.
      3. Evaluate the quality and difficulty of the third chapter.
      4. Give learning suggestions (if applicable).

      ## Confidence: 95%
      Reason: The reference relationship is clear, the context information is sufficient, and the reasoning logic is clear.
  - description: "Implicit Assumption Recognition"
    inputText: |
      Dialogue History:
      User: "When can this project be completed?"
      AI: "Based on the current progress, it is expected to take 3 months."
      User: "That's too slow, can it be expedited?"
      AI: "Yes, but it requires more manpower."
      User: "The budget is not enough."

      Background Information: This is a software development project involving the development of multiple modules.

      Current Question: Analyze the user's implicit needs and possible solutions.
    llmResult: |
      Context Understanding Analysis:

      ## Dialogue History Analysis
      - The user asks about the project completion time, and the AI gives an estimate of 3 months.
      - The user thinks the time is too long and wants to speed up the progress.
      - The AI suggests adding more manpower, but the user says the budget is insufficient.

      ## Implicit Assumption Recognition
      - The user has clear time pressure or a deadline.
      - The user wants to speed up the progress without increasing the cost.
      - The user may be facing external pressure or competitive needs.

      ## Reasoning Process
      The user's need is to speed up the project progress under budget constraints, which requires finding optimization solutions that do not increase costs.

      ## Suggested Answer
      The AI should:
      1. Understand the user's budget constraints.
      2. Provide optimization solutions that do not increase costs:
         - Re-evaluate project priorities.
         - Simplify some functional modules.
         - Optimize the development process.
         - Extend working hours.
      3. Analyze the risks and benefits of various solutions.

      ## Confidence: 90%
      Reason: The implicit needs are clear, the constraints are clear, and the solution is feasible.
  - description: "Topic Transition Handling"
    inputText: |
      Dialogue History:
      User: "The weather is really nice today."
      AI: "Yes, it's sunny and suitable for outdoor activities."
      User: "By the way, I heard you've been learning new skills recently?"
      AI: "Yes, I'm learning multimodal AI technology."
      User: "That's great, I'd like to learn more about this field."

      Background Information: The user has some understanding of AI technology and has discussed related topics before.

      Current Question: Analyze the timing of the topic transition and the user's new needs.
    llmResult: |
      Context Understanding Analysis:

      ## Dialogue History Analysis
      - A natural transition from the weather topic to the AI learning topic.
      - The user shows interest in learning AI technology.
      - The user wants to learn about multimodal AI technology.

      ## Topic Transition Recognition
      - Timing of transition: The user actively introduces a new topic.
      - Method of transition: Using "By the way" as a transition.
      - Purpose of transition: The user has a specific learning need.

      ## Implicit Assumption
      - The user may be considering learning AI technology.
      - The user is particularly interested in multimodal AI.
      - The user wants to get learning guidance or suggestions.

      ## Reasoning Process
      The user's shift from small talk to a specific technical learning need indicates a practical learning motivation.

      ## Suggested Answer
      The AI should:
      1. Confirm that it understands the user's interest in multimodal AI.
      2. Provide an overview and importance of multimodal AI.
      3. Suggest a learning path and resources.
      4. Adjust the depth of explanation according to the user's background.

      ## Confidence: 88%
      Reason: The topic transition is natural, the user's needs are clear, and the background information is relevant.
  - description: "Omitted Information Supplement"
    inputText: |
      Dialogue History:
      User: "That meeting has been moved to tomorrow."
      AI: "Okay, I will adjust the schedule."
      User: "Remember to prepare the materials."
      AI: "No problem, I will prepare them."

      Background Information: The user and the AI have previously discussed an important client meeting that requires the preparation of presentation materials.

      Current Question: Analyze the specific information omitted in the dialogue to ensure accurate understanding.
    llmResult: |
      Context Understanding Analysis:

      ## Dialogue History Analysis
      - The user informs about the meeting time change.
      - The AI confirms that it will adjust the schedule.
      - The user reminds to prepare the materials.
      - The AI confirms that it will prepare them.

      ## Omitted Information Recognition
      - "That meeting" refers to the previously discussed client meeting.
      - "The materials" refer to the presentation materials for the client meeting.
      - The specific time and place of the meeting are omitted.
      - The specific content and requirements of the materials are omitted.

      ## Implicit Assumption
      - The meeting time has been changed from today to tomorrow.
      - The preparation of materials is crucial for the success of the meeting.
      - The AI is responsible for preparing the relevant materials.

      ## Reasoning Process
      Based on the background information, it can be inferred that this is an important client meeting that requires professional presentation materials.

      ## Suggested Answer
      The AI should:
      1. Confirm that it understands the meeting time change.
      2. Ask for the specific meeting time.
      3. Confirm the specific requirements for the materials.
      4. Provide the status of material preparation.

      ## Confidence: 92%
      Reason: The omitted information can be inferred from the background information, and the context is coherent.
  - description: "Context Change Adaptation"
    inputText: |
      Dialogue History:
      User: "How is this plan?"
      AI: "From a technical point of view, this plan is feasible."
      User: "I mean from a cost perspective."
      AI: "Ah, from a cost perspective, this plan may be over budget."

      Background Information: The user and the AI are discussing an implementation plan for a technology project.

      Current Question: Analyze the impact of context changes on the response requirements.
    llmResult: |
      Context Understanding Analysis:

      ## Dialogue History Analysis
      - The user asks for an evaluation of the plan, and the AI answers from a technical perspective.
      - The user explicitly asks to consider it from a cost perspective.
      - The AI adjusts its response angle and provides a cost analysis.

      ## Context Change Recognition
      - From technical feasibility to cost-effectiveness.
      - The user explicitly pointed out the deviation in the response angle.
      - The AI promptly adjusted the focus of its response.

      ## Implicit Assumption
      - The user is more concerned about cost than technical feasibility.
      - Budget constraints are a key factor in project decision-making.
      - The user wants to get a comprehensive evaluation.

      ## Reasoning Process
      The user's needs have shifted from technical feasibility to cost-effectiveness, indicating a change in decision-making criteria.

      ## Suggested Answer
      The AI should:
      1. Acknowledge the deviation in the previous response angle.
      2. Provide a detailed cost analysis.
      3. Consider cost optimization solutions.
      4. Balance technical feasibility and cost-effectiveness.

      ## Confidence: 95%
      Reason: The context change is clear, the adjustment is timely, and the understanding is accurate.
  - description: "Multi-turn Reasoning"
    inputText: |
      Dialogue History:
      User: "I want to learn programming."
      AI: "That's a great choice! Do you have a specific goal?"
      User: "I want to do web development."
      AI: "Then I suggest starting with HTML, CSS, and JavaScript."
      User: "How long will it take to learn these?"
      AI: "The basics will take about 2-3 months."
      User: "What about Python?"

      Background Information: The user is a programming beginner and is concerned about the time it takes to learn technology.

      Current Question: Analyze the reason why the user is asking about the learning time for Python and their possible intentions.
    llmResult: |
      Context Understanding Analysis:

      ## Dialogue History Analysis
      - The user shifts from general programming to web development.
      - The AI recommends a front-end technology stack.
      - The user is concerned about the learning time.
      - The user asks about the learning time for Python.

      ## Multi-turn Reasoning Process
      1. The user may have questions about the technology stack recommended by the AI.
      2. The user may want to know the role of Python in web development.
      3. The user may be considering learning Python as an alternative or supplement.
      4. The user may be interested in back-end development.

      ## Implicit Assumption
      - The user may have heard about the ease of learning Python.
      - The user may want to understand a more comprehensive technology stack.
      - The user may be interested in full-stack development.

      ## Reasoning Process
      Based on the user's concern about learning time and their inquiry about Python, it can be inferred that the user wants to find a more efficient learning path.

      ## Suggested Answer
      The AI should:
      1. Explain the role of Python in web development.
      2. Compare the learning curve of Python with other technologies.
      3. Suggest a learning path suitable for beginners.
      4. Consider the user's time and learning goals.

      ## Confidence: 85%
      Reason: The reasoning chain is long, but the logic is reasonable, and the user's intention is clear.
scoringCriteria:
  - name: "Reference Relationship Understanding"
    weight: 2
    description: "Check if the AI can correctly understand pronouns and omitted information"
    evaluationMethod: "Check if the AI can correctly understand pronouns and omitted information"
    passCriteria: "Can accurately identify the specific content referred to by 'that one', 'this', etc."
  - name: "Implicit Assumption Recognition"
    weight: 2
    description: "Evaluate if the AI can recognize implicit assumptions in the dialogue"
    evaluationMethod: "Evaluate if the AI can recognize implicit assumptions in the dialogue"
    passCriteria: "Can understand the user's needs and constraints that are not explicitly stated but are implied"
  - name: "Topic Transition Handling"
    weight: 2
    description: "Check if the AI can recognize and handle topic transitions"
    evaluationMethod: "Check if the AI can recognize and handle topic transitions"
    passCriteria: "Can adapt to topic changes and adjust the focus of the response"
  - name: "Contextual Reasoning Ability"
    weight: 2
    description: "Evaluate the ability to make reasonable inferences based on the context"
    evaluationMethod: "Evaluate the ability to make reasonable inferences based on the context"
    passCriteria: "Can draw reasonable conclusions based on historical information"
  - name: "Contextual Adaptability"
    weight: 2
    description: "Check if the AI can adapt to different contextual requirements"
    evaluationMethod: "Check if the AI can adapt to different contextual requirements"
    passCriteria: "Can adjust the angle and depth of the response according to context changes"
promptTemplate: |
  [Your prompt here]

  Dialogue History:
  {Dialogue history}

  Background Information:
  {Background information}

  Current Question:
  {Current question}
expectedOutput: |
  Context Understanding Analysis:

  ## Dialogue History Analysis
  - The user asks about the book they bought yesterday, and the AI confirms it is 'Introduction to Artificial Intelligence'.
  - The AI gives a positive evaluation of the whole book, believing it is suitable for beginners.
  - The user is now asking about the specific content of the third chapter.

  ## Reference Relationship Recognition
  - "That one" refers to 'Introduction to Artificial Intelligence'.
  - "The third chapter" refers to the third chapter of 'Introduction to Artificial Intelligence'.

  ## Implicit Assumption
  - The user has already purchased this book.
  - The user may be reading or preparing to read the third chapter.
  - The user wants to know the specific content and quality of the third chapter.

  ## Reasoning Process
  Based on the AI's previous positive evaluation of the whole book and the user's attention to a specific chapter, it can be inferred that the user wants to know if the third chapter is equally excellent or if it has special learning value.

  ## Suggested Answer
  The AI should:
  1. Confirm that it understands the user is asking about the third chapter of 'Introduction to Artificial Intelligence'.
  2. Provide a specific overview of the content of the third chapter.
  3. Evaluate the quality and difficulty of the third chapter.
  4. Give learning suggestions (if applicable).

  ## Confidence: 95%
  Reason: The reference relationship is clear, the context information is sufficient, and the reasoning logic is clear.
solutionDiscussion: "https://github.com/erweixin/prompt-challenges/discussions/15"
---

## Challenge Description

Context understanding is a key ability for AI systems to understand dialogue history, background information, and implicit meanings. This challenge requires you to design a prompt that enables the AI to accurately understand complex contextual information, including dialogue history, background knowledge, implicit assumptions, and context changes.

## Challenge Goals

Write a prompt that enables the AI to:
1. Accurately understand dialogue history and contextual information
2. Identify implicit assumptions and background knowledge
3. Handle context changes and topic transitions
4. Understand reference relationships and omitted information
5. Make reasonable inferences and supplement based on the context

## Requirements

- The prompt must be able to handle complex dialogue history
- It should be able to identify and utilize background information
- For ambiguous or omitted information, it should be able to infer based on the context
- The output should include the understanding and reasoning process of the context
- The processing should be clear and traceable

## Prompt Template

```
[Your prompt here]

Dialogue History:
{Dialogue history}

Background Information:
{Background information}

Current Question:
{Current question}
```

## Automated Testing Process

1. For each test case, use your prompt as input
2. Analyze whether the output contains:
   - Analysis of context understanding
   - Recognition of implicit information
   - Reasoning process based on context
   - Accurate understanding of the current question
3. Evaluate the accuracy of context understanding
4. Check the reasonableness of the reasoning process
5. Verify the adaptability to context changes
6. Calculate the final score (out of 10)

## Expected Output Example (for Case 1)

```
Context Understanding Analysis:

## Dialogue History Analysis
- The user asks about the book they bought yesterday, and the AI confirms it is 'Introduction to Artificial Intelligence'.
- The AI gives a positive evaluation of the whole book, believing it is suitable for beginners.
- The user is now asking about the specific content of the third chapter.

## Reference Relationship Recognition
- "That one" refers to 'Introduction to Artificial Intelligence'.
- "The third chapter" refers to the third chapter of 'Introduction to Artificial Intelligence'.

## Implicit Assumption
- The user has already purchased this book.
- The user may be reading or preparing to read the third chapter.
- The user wants to know the specific content and quality of the third chapter.

## Reasoning Process
Based on the AI's previous positive evaluation of the whole book and the user's attention to a specific chapter, it can be inferred that the user wants to know if the third chapter is equally excellent or if it has special learning value.

## Suggested Answer
AI should:
1. Confirm that it understands the user is asking about the third chapter of 'Introduction to Artificial Intelligence'.
2. Provide a specific overview of the content of the third chapter.
3. Evaluate the quality and difficulty of the third chapter.
4. Give learning suggestions (if applicable).

## Confidence: 95%
Reason: The reference relationship is clear, the context information is sufficient, and the reasoning logic is clear.
```

---

Submit your solution and share your ideas and techniques with the community!
