---
title: "Sentiment Analysis"
difficulty: "warm"
tags: ["Sentiment Analysis", "Text Classification", "Natural Language Processing"]
testCases:
  - description: "Product Review - Positive"
    inputText: |
      This phone offers great value for money, excellent screen display, and clear photos. However, battery life is average, and charging speed is a bit slow. Overall, I am very satisfied with the purchase.
    llmResult: |
      Sentiment Analysis Result:
      - Sentiment: Positive
      - Intensity: 4
      - Keywords/Phrases: "great value for money", "excellent screen display", "clear photos", "very satisfied with the purchase"
      - Brief Explanation: Pros clearly outweigh cons, generally satisfied.
  - description: "News Commentary - Negative"
    inputText: |
      The government's decision this time is disappointing; it completely failed to consider the interests of ordinary people. The policy was rushed, lacking in-depth research, and will likely cause more social problems.
    llmResult: |
      Sentiment Analysis Result:
      - Sentiment: Negative
      - Intensity: 4
      - Keywords/Phrases: "disappointing", "failed to consider the interests of ordinary people", "rushed", "lacking in-depth research", "cause more social problems"
      - Brief Explanation: Strong dissatisfaction and concern about government decision.
  - description: "Neutral Statement"
    inputText: |
      According to the latest data, GDP grew by 3.2% in the first quarter of this year, slightly higher than the same period last year, but lower than market expectations. Analysts believe this data reflects the current complex economic situation.
    llmResult: |
      Sentiment Analysis Result:
      - Sentiment: Neutral
      - Intensity: 2
      - Keywords/Phrases: "GDP grew by 3.2%", "slightly higher than same period last year", "lower than market expectations", "complex economic situation"
      - Brief Explanation: Objective statement of economic data, no clear emotional倾向.
  - description: "Mixed Emotions"
    inputText: |
      The film's visual effects were stunning, with excellent special effects, but the plot development was slow and the characterization shallow. The acting was decent, and the music was good, but the overall experience was mediocre.
    llmResult: |
      Sentiment Analysis Result:
      - Sentiment: Neutral
      - Intensity: 3
      - Keywords/Phrases: "visual effects were stunning", "excellent special effects", "plot development was slow", "characterization shallow", "overall experience was mediocre"
      - Brief Explanation: Pros and cons coexist, overall a neutral evaluation.
  - description: "Subtle Emotion"
    inputText: |
      The meeting proceeded as planned, with participants discussing all agenda items. Some offered constructive suggestions, while others expressed concerns. We agreed to meet again next week to continue discussing these issues.
    llmResult: |
      Sentiment Analysis Result:
      - Sentiment: Neutral
      - Intensity: 2
      - Keywords/Phrases: "proceeded as planned", "constructive suggestions", "expressed concerns", "continue discussing"
      - Brief Explanation: Objective description of meeting process, subtle emotional tone.
  - description: "Strong Positive Emotion"
    inputText: |
      I simply can't express how much I love this product! It has completely changed my life and solved all my problems. Using it every day brings me immense joy; it's absolutely the most perfect design I've ever seen! Highly recommend it to everyone!
    llmResult: |
      Sentiment Analysis Result:
      - Sentiment: Positive
      - Intensity: 5
      - Keywords/Phrases: "can't express how much I love", "completely changed my life", "solved all my problems", "immense joy", "most perfect design", "highly recommend"
      - Brief Explanation: Extremely excited and satisfied, highly recommended.
  - description: "Strong Negative Emotion"
    inputText: |
      This was the worst service I've ever experienced! The staff were extremely rude and completely disregarded customer needs. I waited two hours only to get the wrong product, and then they refused a refund. I will never patronize them again and strongly advise everyone to stay away from this company!
    llmResult: |
      Sentiment Analysis Result:
      - Sentiment: Negative
      - Intensity: 5
      - Keywords/Phrases: "worst service I've ever experienced", "extremely rude", "completely disregarded customer needs", "wrong product", "refused a refund", "will never patronize again", "strongly advise everyone to stay away"
      - Brief Explanation: Extremely angry and disappointed, strong condemnation.
scoringCriteria:
  - name: "Sentiment Tendency Identification Accuracy"
    weight: 1
    description: "Checks if AI can correctly identify the main sentiment tendency of the text (positive/negative/neutral)."
    evaluationMethod: "Checks if AI can correctly identify the main sentiment tendency of the text (positive/negative/neutral)."
    passCriteria: "Correctly identify sentiment tendency in at least 6/7 test cases."
  - name: "Reasonableness of Sentiment Intensity Judgment"
    weight: 1
    description: "Evaluates if the AI's judged sentiment intensity aligns with the text content."
    evaluationMethod: "Evaluates if the AI's judged sentiment intensity aligns with the text content."
    passCriteria: "Intensity score differs from expected score by no more than 1 point."
  - name: "Relevance of Keyword Extraction"
    weight: 1
    description: "Checks if extracted keywords indeed reflect emotional expression."
    evaluationMethod: "Checks if extracted keywords indeed reflect emotional expression."
    passCriteria: "Extract at least 3 emotionally relevant keywords/phrases."
  - name: "Conciseness of Analysis and Reasonableness of Explanation"
    weight: 1
    description: "Evaluates the conciseness of the explanation (no more than 20 characters) and its reasonableness."
    evaluationMethod: "Evaluates the conciseness of the explanation (no more than 20 characters) and its reasonableness."
    passCriteria: "Explanation is concise and directly points out the emotional source."
  - name: "Consistency of Output Format"
    weight: 1
    description: "Checks if all outputs follow a consistent format."
    evaluationMethod: "Checks if all outputs follow a consistent format."
    passCriteria: "Output format is identical for all cases."
promptTemplate: |
  [Your Prompt]

  Text: {Text Content}
expectedOutput: |
  Sentiment Analysis Result:
  - Sentiment: Positive
  - Intensity: 4
  - Keywords/Phrases: "great value for money", "excellent screen display", "clear photos", "very satisfied with the purchase"
  - Brief Explanation: Pros clearly outweigh cons, generally satisfied.
solutionDiscussion: "https://github.com/erweixin/prompt-challenges/discussions/2"
---

## Challenge Description

Sentiment analysis is a fundamental task in natural language processing, used to determine the emotional tone expressed in text. This challenge requires you to write a prompt that enables AI to accurately analyze the sentiment expressed in a text, providing the sentiment category and intensity.

## Challenge Goals

Write a prompt that enables AI to:
1. Identify the sentiment (positive, negative, or neutral) in the text.
2. Determine the sentiment intensity (on a scale of 1-5, where 1 is weakest and 5 is strongest).
3. Extract keywords or phrases that express the sentiment.
4. Provide a brief explanation of the analysis (no more than 20 characters).

## Requirements

- The analysis result must include sentiment, intensity, keywords, and a brief explanation.
- Sentiment can only be positive, negative, or neutral.
- Sentiment intensity must be an integer from 1 to 5.
- The analysis must be based on the text content, without subjective assumptions.
- The output format must be uniform and concise.

## Prompt Template

```

[Your Prompt]

Text: {Text Content}

```

## Automated Testing Process

1. For each test case, use your prompt as input.
2. Analyze whether the output includes:
   - Clearly identified sentiment (positive/negative/neutral).
   - An integer intensity rating from 1-5.
   - At least 3 keywords or phrases.
   - An explanation of no more than 20 characters.
3. Compare the output with expert-annotated standard answers.
4. Check for consistency in output format across different test cases.
5. Calculate the final score (out of 5 points).

## Expected Output Example (for Case 1)

```

Sentiment Analysis Result:

  - Sentiment: Positive
  - Intensity: 4
  - Keywords/Phrases: "great value for money", "excellent screen display", "clear photos", "very satisfied with the purchase"
  - Brief Explanation: Pros clearly outweigh cons, generally satisfied.

Note: Although minor drawbacks like average battery life and slow charging were mentioned, positive reviews dominated, and overall satisfaction was expressed at the end.

```

---

Submit your solution and share your ideas and techniques with the community!