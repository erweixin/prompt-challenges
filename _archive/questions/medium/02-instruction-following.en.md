# Instruction Following

## 🟡 Medium

### Challenge Description

In prompt engineering, the ability to ensure that AI accurately understands and follows complex instructions is crucial. Especially in scenarios involving multi-step tasks, specific format requirements, or precise output control, the quality of instruction following directly impacts the results. This challenge requires you to design a prompt that enables AI to strictly adhere to a series of complex instructions, even when these instructions appear contradictory or have special execution orders.

### Challenge Goals

Write a prompt that enables AI to:
1. Accurately understand multi-step, multi-condition complex instructions
2. Execute instructions according to specified priority and order
3. Make reasonable judgments when instructions have ambiguities
4. Fully comply with format requirements and output limitations
5. Handle seemingly contradictory instructions (such as conditional rule exceptions)

### Requirements

- The prompt must include clear instruction hierarchy and priorities
- Output must strictly conform to specified formats
- Instructions should include some special conditions or exceptions
- The prompt should guide AI to make reasonable judgments in complex scenarios
- There should be a clear verification mechanism after task completion

### Prompt Template

```
[Your prompt]

Task: {task description}
```

### Test Cases

**Case 1: Data Processing and Formatting**

```
Task: Analyze the following text and extract all names and their corresponding ages. Sort the results by age in descending order and output in JSON format. For people whose ages are not explicitly mentioned, assume they are 30 years old. If multiple people have the same age, sort them alphabetically by name. Only include names that actually appear in the text, do not make assumptions. Do not include any explanations or comments in your output.

"Zhang Wei and his wife Li Na (42 years old) attended Wang Gang's 60th birthday party yesterday. Zhang Wei is 5 years younger than his wife. Wang Gang's daughter Wang Xiaomei also came; she just graduated from university. Li Na's younger brother Li Qiang, who is 35 this year, was also a guest."
```

**Case 2: Conditional Text Generation**

```
Task: Write a short article of no more than 200 words on the topic "The Future of Artificial Intelligence." The article must include at least 3 professional terms, each with a brief explanation in parentheses when first used. Do not use the words "development," "technology," or "innovation." The first letter of each paragraph, when combined, must spell "AI." Add a concluding sentence at the end, but do not use obvious conclusion signifiers like "in conclusion," "to summarize," or "finally."
```

**Case 3: Complex Rule Application**

```
Task: You are an email classification assistant. Classify the email according to the following rules and respond in the specified format:

Rule 1: Emails containing the words "urgent," "asap," or "immediately" have "High" priority
Rule 2: Emails from domains ending with "company.com" are classified as "Internal," others as "External"
Rule 3: Emails with body text exceeding 100 characters are marked as "Requires detailed reading"
Rule 4: If an email simultaneously meets Rule 1 and is from the CEO (email: ceo@company.com), then regardless of other rules, it is marked as "Process immediately"
Rule 5: Emails with attachments add the tag "Has attachments"

Output format must be: [Priority] | [Source] | [Tag1, Tag2, ...]

Email:
From: manager@company.com
To: you@company.com
Subject: Quarterly Report Review
Attachments: report.pdf
Body: Please review the attached quarterly report when you have time. We'll discuss it in next week's meeting.
```

### Scoring Criteria and Automated Testing Methods

The prompt will be scored according to the following criteria:

1. **Instruction Comprehension** (1 point)
   - Evaluation method: Check if AI correctly understands all aspects of the instructions
   - Passing standard: Demonstrates clear understanding of primary and secondary requirements

2. **Rule Application Accuracy** (1 point)
   - Evaluation method: Assess correct application of all rules, including exceptions
   - Passing standard: Correctly applies all rules in the correct priority order

3. **Format Compliance** (1 point)
   - Evaluation method: Verify strict adherence to output format requirements
   - Passing standard: Output exactly matches the specified format with no deviations

4. **Edge Case Handling** (1 point)
   - Evaluation method: Test how well the AI handles ambiguities and special cases
   - Passing standard: Makes reasonable judgments consistent with instruction intent

5. **Instruction Prioritization** (1 point)
   - Evaluation method: Check if AI correctly prioritizes conflicting instructions
   - Passing standard: Resolves conflicts based on explicit or implicit priority cues

### Automated Testing Process

1. For each test case, use your prompt with the specified task as input
2. Analyze the output for:
   - Compliance with formatting requirements
   - Correct application of rules and exceptions
   - Accurate handling of edge cases and ambiguities
   - Proper prioritization of conflicting instructions
3. Compare against reference outputs for each test case
4. Calculate final score (5 points maximum)

### Expected Output Example (for Case 1)

```json
[
  {"name": "Wang Gang", "age": 60},
  {"name": "Li Na", "age": 42},
  {"name": "Li Qiang", "age": 35},
  {"name": "Zhang Wei", "age": 37},
  {"name": "Wang Xiaomei", "age": 30}
]
```

### Solution Discussion

[Click to view community solutions](https://github.com/erweixin/prompt-challenges/discussions/6)

---

Submit your solution and share your approach and techniques with the community! 