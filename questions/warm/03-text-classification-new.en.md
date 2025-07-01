---
title: "Text Classification"
difficulty: "warm"
tags: ["Text Classification", "Machine Learning", "Natural Language Processing"]
testCases:
  - description: "News Classification"
    inputText: |
      Text: Apple today released the new iPhone, featuring the latest A17 chip with 30% performance improvement and improved battery life.
      Categories: ["Technology", "Finance", "Sports", "Entertainment", "Politics", "Health"]
    llmResult: |
      Classification Result:
      - Category: Technology
      - Confidence: 95%
      - Explanation: Involves Apple's new product release and technical specifications.
  - description: "Product Review Classification"
    inputText: |
      Text: This shampoo is just okay, the scent is fine, but my hair feels dry after washing, and it's a bit pricey. Won't repurchase.
      Categories: ["Positive Review", "Negative Review", "Neutral Review", "Mixed Review"]
    llmResult: |
      Classification Result:
      - Category: Negative Review
      - Confidence: 85%
      - Explanation: Overall review leans negative, explicitly states no repurchase.
  - description: "Academic Paper Classification"
    inputText: |
      Text: This study experimentally verified the effectiveness of deep learning in image recognition tasks, with a 15% improvement in accuracy compared to traditional methods.
      Categories: ["Computer Science", "Medicine", "Economics", "Psychology", "Physics", "Chemistry"]
    llmResult: |
      Classification Result:
      - Category: Computer Science
      - Confidence: 90%
      - Explanation: Involves deep learning and image recognition technology.
  - description: "Social Media Content Classification"
    inputText: |
      Text: The weather is great today, went hiking with friends and saw a beautiful sunset, feeling so happy!
      Categories: ["Life Sharing", "Work Related", "Study Notes", "Entertainment Activities", "Shopping Experience", "Health and Fitness"]
    llmResult: |
      Classification Result:
      - Category: Life Sharing
      - Confidence: 80%
      - Explanation: Shares personal life experiences and feelings.
  - description: "Ambiguous Content Classification"
    inputText: |
      Text: Regarding this issue, we need further discussion and analysis, and possibly more data support.
      Categories: ["Technical Discussion", "Business Decision", "Academic Research", "Daily Conversation", "News Report"]
    llmResult: |
      Classification Result:
      - Category: Technical Discussion
      - Confidence: 60%
      - Explanation: Content is vague, leans towards technical discussion but uncertain.
  - description: "Multi-topic Mixed Classification"
    inputText: |
      Text: The dishes at this restaurant are delicious, prices are reasonable, and the ambiance is good. However, parking is difficult, so it's recommended to book in advance.
      Categories: ["Food Recommendation", "Transportation", "Shopping Experience", "Entertainment Activities", "Life Services"]
    llmResult: |
      Classification Result:
      - Category: Food Recommendation
      - Confidence: 75%
      - Explanation: Primarily evaluates restaurant dishes, with additional information.
  - description: "Specialized Field Classification"
    inputText: |
      Text: According to the latest market research data, new energy vehicle sales increased by 45% year-on-year, and are expected to maintain growth momentum next year.
      Categories: ["Automotive Industry", "Energy and Environment", "Market Analysis", "Policy and Regulations", "Technological Innovation"]
    llmResult: |
      Classification Result:
      - Category: Market Analysis
      - Confidence: 85%
      - Explanation: Includes market data and growth forecast analysis.
scoringCriteria:
  - name: "Classification Accuracy"
    weight: 2
    description: "Checks if AI can correctly identify the main topic and category of the text."
    evaluationMethod: "Checks if AI can correctly identify the main topic and category of the text."
    passCriteria: "Correctly classify in at least 6/7 test cases."
  - name: "Confidence Reasonableness"
    weight: 2
    description: "Evaluates if the confidence score aligns with the clarity of the text."
    evaluationMethod: "Evaluates if the confidence score aligns with the clarity of the text."
    passCriteria: "Clear text confidence >80%, ambiguous text confidence <70%."
  - name: "Explanation Quality"
    weight: 2
    description: "Checks if the explanation accurately points out the key features of the classification."
    evaluationMethod: "Checks if the explanation accurately points out the key features of the classification."
    passCriteria: "Explanation is concise and directly points to the classification basis."
  - name: "Boundary Case Handling"
    weight: 2
    description: "Evaluates the ability to handle ambiguous or multi-topic texts."
    evaluationMethod: "Evaluates the ability to handle ambiguous or multi-topic texts."
    passCriteria: "Can reasonably handle boundary cases and explain uncertainty."
  - name: "Output Format Consistency"
    weight: 2
    description: "Checks if all outputs follow a consistent format."
    evaluationMethod: "Checks if all outputs follow a consistent format."
    passCriteria: "Format is completely uniform and easy for programs to parse."
promptTemplate: |
  [Your Prompt]

  Text: {Text Content}
expectedOutput: |
  Classification Result:
  - Category: Technology
  - Confidence: 95%
  - Explanation: Involves Apple's new product release and technical specifications.
solutionDiscussion: "https://github.com/erweixin/prompt-challenges/discussions/12"
---

## Challenge Description

Text classification is a fundamental task in natural language processing, used to assign text to predefined categories. This challenge requires you to write a prompt that enables AI to accurately classify text into specified categories and provide a confidence score for the classification.

## Challenge Goals

Write a prompt that enables AI to:
1. Accurately identify the topic and content features of the text.
2. Correctly classify the text into the specified categories.
3. Provide a confidence score for the classification (0-100%).
4. Explain the main basis for the classification.
5. Handle ambiguous or boundary case texts.

## Requirements

- The classification result must include the category, confidence, and explanation.
- Confidence must be an integer from 0-100.
- The explanation must be concise (no more than 30 characters).
- For ambiguous text, select the most appropriate category and explain the uncertainty.
- The output format must be uniform and easy to parse.

## Prompt Template

```

[Your Prompt]

Text: {Text Content}

```

## Automated Testing Process

1. For each test case, use your prompt as input.
2. Analyze whether the output includes:
   - A clear classification result.
   - A confidence score from 0-100.
   - An explanation of no more than 30 characters.
3. Compare the classification result with expert-annotated standard answers.
4. Check the relevance of confidence to text clarity.
5. Evaluate the relevance and accuracy of the explanation.
6. Calculate the final score (out of 10 points).

## Expected Output Example (for Case 1)

```

Classification Result:

  - Category: Technology
  - Confidence: 95%
  - Explanation: Involves Apple's new product release and technical specifications.

Reason: The text explicitly mentions Apple's new iPhone release, including technical details like the A17 chip and performance data, typical of technology news.

```

---

Submit your solution and share your ideas and techniques with the community!