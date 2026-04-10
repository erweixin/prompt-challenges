---
title: "Instruction Following"
difficulty: "medium"
tags: ["Instruction Following", "Rule Application", "Format Control"]
testCases:
  - description: "Data Processing and Formatting"
    inputText: |
      Task: Analyze the following text, extract all names and corresponding ages. Sort the results by age in descending order, and output in JSON format. For people whose age is not explicitly mentioned, assume their age is 30. If multiple people have the same age, sort them alphabetically by name. Only include names that actually appear in the text, do not infer. Do not include any explanations or notes in the output.

      "Zhang Wei and his wife Li Na (42 years old) attended Wang Gang's 60th birthday party yesterday. Zhang Wei is 5 years younger than his wife. Wang Gang's daughter Wang Xiaomei also came, she just graduated from college. Li Na's brother Li Qiang is 35 years old this year and was also a guest."
    llmResult: |
      [
        {"name": "Wang Gang", "age": 60},
        {"name": "Li Na", "age": 42},
        {"name": "Li Qiang", "age": 35},
        {"name": "Zhang Wei", "age": 37},
        {"name": "Wang Xiaomei", "age": 30}
      ]
  - description: "Conditional Text Generation"
    inputText: |
      Task: Write a short essay of no more than 200 words on the topic of "The Future of Artificial Intelligence". The essay must contain at least 3 professional terms, and each term must be briefly explained in parentheses when it first appears. The words "development", "technology", and "innovation" cannot be used. The first letter of each paragraph must spell out "AI". Finally, add a concluding sentence, but do not use obvious concluding markers such as "in conclusion", "to summarize", or "finally".
    llmResult: |
      Artificial intelligence (AI) is reshaping our world in profound ways. Machine learning (ML) algorithms are becoming increasingly sophisticated, enabling computers to learn from data without explicit programming. Neural networks (NN) mimic the human brain's structure, allowing AI systems to recognize patterns and make decisions.

      Intelligent automation is transforming industries across the globe. From healthcare to transportation, AI-powered systems are enhancing efficiency and accuracy. The integration of natural language processing (NLP) enables seamless human-computer interaction.

      As we move forward, the ethical implications of AI become increasingly important. We must ensure that these powerful tools serve humanity's best interests while addressing potential risks and challenges.
  - description: "Complex Rule Application"
    inputText: |
      Task: You are an email sorting assistant. Classify emails according to the following rules and reply in the specified format:

      Rule 1: Emails containing the words "urgent", "asap", or "immediately" have a priority of "High"
      Rule 2: Emails from domains ending in "company.com" are classified as "Internal", others as "External"
      Rule 3: Emails with a body of more than 100 words are marked as "Needs Detailed Reading"
      Rule 4: If an email meets both Rule 1 and is from the CEO (email ceo@company.com), it is marked as "Process Immediately" regardless of other rules
      Rule 5: Emails with attachments are tagged with "Has Attachment"

      The output format must be: [Priority] | [Source] | [Tag 1, Tag 2, ...]

      Email:
      From: manager@company.com
      To: you@company.com
      Subject: Quarterly Report Review
      Attachments: report.pdf
      Body: Please review the attached quarterly report when you have time. We'll discuss it in next week's meeting.
    llmResult: |
      Medium | Internal | Needs Detailed Reading, Has Attachment
  - description: "Multi-step Instruction Execution"
    inputText: |
      Task: Please process the data according to the following steps:

      1. Sort the following list of numbers in ascending order: [23, 7, 45, 12, 89, 3, 67]
      2. Calculate the average of all numbers
      3. Find the maximum and minimum values
      4. Calculate the difference between the maximum and minimum values
      5. Output the results in the following format:
         Sorted: [list of numbers]
         Average: [value]
         Maximum: [value]
         Minimum: [value]
         Difference: [value]
    llmResult: |
      Sorted: [3, 7, 12, 23, 45, 67, 89]
      Average: 35.14
      Maximum: 89
      Minimum: 3
      Difference: 86
  - description: "Conditional Format Conversion"
    inputText: |
      Task: Convert the following text to the specified format, following these rules:

      1. Enclose all numbers in square brackets
      2. Enclose all names in double quotes
      3. Enclose all times in angle brackets
      4. If a word is both a number and a name, prioritize treating it as a name
      5. Keep the original punctuation unchanged
      6. Output format: Converted text

      Original text: Zhang San spent 100 yuan on March 15, 2023 to buy 5 books, 3 of which were for Li Si.
    llmResult: |
      Converted text: "Zhang San" spent [100] yuan on <March 15, 2023> to buy [5] books, [3] of which were for "Li Si".
  - description: "Priority Conflict Resolution"
    inputText: |
      Task: Process the text according to the following priority rules:

      Rule 1 (Highest Priority): If the text contains "urgent", output "Process Immediately"
      Rule 2: If the text contains "important", output "Process with Priority"
      Rule 3: If the text contains "normal", output "Process Normally"
      Rule 4 (Lowest Priority): If the text contains "delay", output "Process Later"

      If multiple rules apply, execute according to priority. If none apply, output "To be classified".

      Text: This is an important project, but it can be delayed.
    llmResult: |
      Process with Priority
  - description: "Format Validation and Correction"
    inputText: |
      Task: Validate and correct the following JSON format, ensuring that:

      1. All strings are enclosed in double quotes
      2. All numbers are not quoted
      3. Boolean values use true/false
      4. The format of arrays and objects is correct
      5. Remove extra commas
      6. If the format is completely correct, output "Format correct"

      Input: {name: 'Zhang San', age: "25", active: true, scores: [85, 90, "95"], address: {city: Beijing, country: 'China'}}
    llmResult: |
      {
        "name": "Zhang San",
        "age": 25,
        "active": true,
        "scores": [85, 90, 95],
        "address": {
          "city": "Beijing",
          "country": "China"
        }
      }
scoringCriteria:
  - name: "Instruction Comprehension"
    weight: 1
    description: "Check if the AI correctly understands all aspects of the instructions"
    evaluationMethod: "Check if the AI correctly understands all aspects of the instructions"
    passCriteria: "Demonstrates a clear understanding of both primary and secondary requirements"
  - name: "Rule Application Accuracy"
    weight: 1
    description: "Evaluate the correct application of all rules, including exceptions"
    evaluationMethod: "Evaluate the correct application of all rules, including exceptions"
    passCriteria: "All rules are applied correctly and in the right order of precedence"
  - name: "Format Compliance"
    weight: 1
    description: "Verify strict adherence to the output format requirements"
    evaluationMethod: "Verify strict adherence to the output format requirements"
    passCriteria: "The output perfectly matches the specified format with no deviations"
  - name: "Edge Case Handling"
    weight: 1
    description: "Test how the AI handles ambiguous and special cases"
    evaluationMethod: "Test how the AI handles ambiguous and special cases"
    passCriteria: "Makes reasonable judgments that are consistent with the intent of the instructions"
  - name: "Instruction Prioritization"
    weight: 1
    description: "Check if the AI correctly prioritizes conflicting instructions"
    evaluationMethod: "Check if the AI correctly prioritizes conflicting instructions"
    passCriteria: "Resolves conflicts based on explicit or implicit priority cues"
promptTemplate: |
  [Your prompt here]

  Task: {Task description}
expectedOutput: |
  [
    {"name": "Wang Gang", "age": 60},
    {"name": "Li Na", "age": 42},
    {"name": "Li Qiang", "age": 35},
    {"name": "Zhang Wei", "age": 37},
    {"name": "Wang Xiaomei", "age": 30}
  ]
solutionDiscussion: "https://github.com/erweixin/prompt-challenges/discussions/6"
---

## Challenge Description

In prompt engineering, ensuring that the AI accurately understands and follows complex instructions is crucial. Especially in multi-step tasks, scenarios with specific formatting requirements, or where precise control over the output is needed, the quality of instruction following directly impacts the result. This challenge requires you to design a prompt that enables the AI to strictly follow a series of complex instructions, even if they seem contradictory or have a special execution order.

## Challenge Goals

Write a prompt that enables the AI to:
1. Accurately understand multi-step, multi-conditional complex instructions
2. Execute instructions in the specified priority and order
3. Make reasonable judgments when instructions are unclear
4. Fully comply with formatting requirements and output restrictions
5. Handle seemingly contradictory instructions (e.g., conditional rule exceptions)

## Requirements

- The prompt must contain a clear hierarchy and priority of instructions
- The output must strictly conform to the specified format
- The instructions should include some special conditions or exceptions
- The prompt should be able to guide the AI to make reasonable judgments in complex scenarios
- There should be a clear verification mechanism after the task is completed

## Prompt Template

```
[Your prompt here]

Task: {Task description}
```

## Automated Testing Process

1. For each test case, use your prompt with the specified task as input
2. Analyze the output for:
   - Compliance with formatting requirements
   - Correct application of rules and exceptions
   - Accurate handling of edge cases and ambiguities
   - Appropriate prioritization of conflicting instructions
3. Compare with the reference output for each test case
4. Calculate a final score (out of 5)

## Expected Output Example (for Case 1)

```json
[
  {"name": "Wang Gang", "age": 60},
  {"name": "Li Na", "age": 42},
  {"name": "Li Qiang", "age": 35},
  {"name": "Zhang Wei", "age": 37},
  {"name": "Wang Xiaomei", "age": 30}
]
```

---

Submit your solution and share your ideas and techniques with the community!
