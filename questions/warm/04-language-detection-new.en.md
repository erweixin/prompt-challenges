---
title: "Language Detection"
difficulty: "warm"
tags: ["Language Detection", "Multilingual Processing", "Natural Language Processing"]
testCases:
  - description: "Single Language Detection"
    inputText: |
      Hello, how are you today? I hope you're having a wonderful day.
    llmResult: |
      Language Detection Result:
      - Main Language: English (100%)
      - Confidence: 95%
      - Reason for Detection: Standard English greetings and daily expressions.
  - description: "Simplified Chinese Detection"
    inputText: |
      你好，今天天气怎么样？我希望你过得愉快。
    llmResult: |
      Language Detection Result:
      - Main Language: Simplified Chinese (100%)
      - Confidence: 95%
      - Reason for Detection: Standard Simplified Chinese greetings and daily expressions.
  - description: "Traditional Chinese Detection"
    inputText: |
      你好，今天天氣怎麼樣？我希望你過得愉快。
    llmResult: |
      Language Detection Result:
      - Main Language: Traditional Chinese (100%)
      - Confidence: 95%
      - Reason for Detection: Standard Chinese expressions using traditional characters.
  - description: "Mixed Multilingual"
    inputText: |
      Hello! 你好！Bonjour! こんにちは！Hola!
    llmResult: |
      Language Detection Result:
      - Main Language: English (20%)
      - Other Languages: Chinese (20%), French (20%), Japanese (20%), Spanish (20%)
      - Confidence: 85%
      - Reason for Detection: Contains greetings in five languages, with similar proportions for each.
  - description: "Includes Numbers and Symbols"
    inputText: |
      The price is $99.99 USD. 价格是99.99美元。Le prix est de 99,99 €.
    llmResult: |
      Language Detection Result:
      - Main Language: English (33%)
      - Other Languages: Chinese (33%), French (34%)
      - Confidence: 90%
      - Reason for Detection: Three languages expressing the same price information, including currency symbols.
  - description: "Dialects and Variations"
    inputText: |
      唔該晒！多謝你！Thank you very much!
    llmResult: |
      Language Detection Result:
      - Main Language: Cantonese (50%)
      - Other Languages: Chinese (25%), English (25%)
      - Confidence: 80%
      - Reason for Detection: Contains Cantonese dialect, standard Chinese, and English expressions of thanks.
  - description: "Special Characters and Emojis"
    inputText: |
      😊 Hello! 你好！🌟 Bonjour! こんにちは！✨
    llmResult: |
      Language Detection Result:
      - Main Language: English (25%)
      - Other Languages: Chinese (25%), French (25%), Japanese (25%)
      - Confidence: 85%
      - Reason for Detection: Mixed greetings in four languages, decorated with emojis.
  - description: "Code Mixed"
    inputText: |
      The function returns a value. 函数返回一个值。function getValue() { return value; }
    llmResult: |
      Language Detection Result:
      - Main Language: English (60%)
      - Other Languages: Chinese (20%), Code (20%)
      - Confidence: 90%
      - Reason for Detection: English and Chinese descriptions, includes a JavaScript code snippet.
scoringCriteria:
  - name: "Single Language Detection Accuracy"
    weight: 2
    description: "Checks if AI can correctly identify common languages."
    evaluationMethod: "Checks if AI can correctly identify common languages."
    passCriteria: "Correctly identifies in at least 3/4 single language test cases."
  - name: "Multilingual Mixed Processing"
    weight: 2
    description: "Evaluates the ability to identify multilingual texts."
    evaluationMethod: "Evaluates the ability to identify multilingual texts."
    passCriteria: "Can identify all main languages in mixed text."
  - name: "Dialect and Variant Identification"
    weight: 2
    description: "Checks if it can distinguish language variants."
    evaluationMethod: "Checks if it can distinguish language variants."
    passCriteria: "Can correctly distinguish between Simplified Chinese and Traditional Chinese variants, etc."
  - name: "Special Character Handling"
    weight: 2
    description: "Evaluates the processing of texts containing symbols, numbers, and emojis."
    evaluationMethod: "Evaluates the processing of texts containing symbols, numbers, and emojis."
    passCriteria: "Can correctly process texts containing special characters."
  - name: "Output Format Consistency"
    weight: 2
    description: "Checks if all outputs follow a consistent format."
    evaluationMethod: "Checks if all outputs follow a consistent format."
    passCriteria: "Format is completely uniform and easy for programs to parse."
promptTemplate: |
  [Your Prompt]

  Text: {Text Content}
expectedOutput: |
  Language Detection Result:
  - Main Language: English (40%)
  - Other Languages: Chinese (20%), French (20%), Japanese (20%)
  - Confidence: 85%
  - Reason for Detection: Contains greetings in English, Chinese, French, and Japanese, with similar proportions for each.
solutionDiscussion: "https://github.com/erweixin/prompt-challenges/discussions/13"
---

## Challenge Description

Language detection is a fundamental task in natural language processing, used to identify the language(s) used in text. This challenge requires you to write a prompt that enables AI to accurately identify the language of text, and handle cases involving multilingual mixtures, dialect variants, and special characters.

## Challenge Goals

Write a prompt that enables AI to:
1. Accurately identify the primary language of a text.
2. Detect various languages in mixed-language texts.
3. Identify dialects and variants (e.g., Simplified Chinese vs. Traditional Chinese).
4. Process texts containing special characters and symbols.
5. Provide a confidence score and a reason for the detection.

## Requirements

- The detection result must include the main language, confidence, and reason for detection.
- For multilingual texts, list all detected languages and their proportions.
- Confidence must be an integer from 0-100.
- The reason for detection must be concise (no more than 50 characters).
- The output format must be uniform and easy to parse.

## Prompt Template

```

[Your Prompt]

Text: {Text Content}

```

## Automated Testing Process

1. For each test case, use your prompt as input.
2. Analyze whether the output includes:
   - A list of detected languages.
   - A confidence score from 0-100.
   - A reason for detection of no more than 50 characters.
3. Compare the detection results with standard answers.
4. Check the accuracy of identifying various languages in multilingual texts.
5. Evaluate the handling of special characters and symbols.
6. Calculate the final score (out of 10 points).

## Expected Output Example (for Case 4)

```

Language Detection Result:

  - Main Language: English (40%)
  - Other Languages: Chinese (20%), French (20%), Japanese (20%)
  - Confidence: 85%
  - Reason for Detection: Contains greetings in English, Chinese, French, and Japanese, with similar proportions for each.

Detailed Analysis:

  - "Hello\!" - English
  - "你好！" - Chinese
  - "Bonjour\!" - French
  - "こんにちは！" - Japanese

<!-- end list -->

```

---

Submit your solution and share your ideas and techniques with the community!