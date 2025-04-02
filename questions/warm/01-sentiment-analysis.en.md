# Sentiment Analysis

## 🟢 Warm-up

### Challenge Description

Sentiment analysis is the process of detecting positive, negative, or neutral emotions in text data. This challenge requires you to design a prompt that guides AI to accurately analyze sentiment in various contexts, including understanding nuanced expressions, sarcasm, mixed sentiments, and domain-specific language.

### Challenge Goals

Write a prompt that enables AI to:
1. Accurately identify the overall sentiment (positive, negative, neutral, or mixed) in text
2. Detect nuanced emotional expressions beyond simple polarity
3. Understand contextual factors that influence sentiment interpretation
4. Recognize sarcasm, irony, and indirect sentiment expressions
5. Provide justification for sentiment classifications

### Requirements

- The prompt must guide AI to analyze texts of varying lengths and complexity
- Must enable detection of both explicit and implicit sentiment indicators
- Should identify sentiment intensity (slight, moderate, strong)
- Should recognize mixed or ambivalent sentiment when present
- Must provide reasoning for sentiment classification decisions

### Prompt Template

```
[Your prompt]

Text for sentiment analysis:
{text}
```

### Test Cases

**Case 1: Simple Review**

```
Text for sentiment analysis:
I absolutely loved this restaurant! The food was delicious, service was prompt, and the atmosphere was charming. Will definitely return soon.
```

**Case 2: Mixed Sentiment**

```
Text for sentiment analysis:
The hotel had a beautiful view and the staff was friendly, but the rooms were tiny and outdated. The breakfast was decent though overpriced for what was offered.
```

**Case 3: Sarcasm/Irony**

```
Text for sentiment analysis:
Oh great, my flight's delayed again. Just what I needed to make this perfect day even better. At least the airport has free WiFi so I can tell everyone about my wonderful travel experience.
```

**Case 4: Subtle Negative**

```
Text for sentiment analysis:
The meeting went as expected. Everyone listened to the presentation and asked the usual questions. The project timeline remains unchanged despite the concerns raised last month.
```

**Case 5: Domain-Specific (Financial)**

```
Text for sentiment analysis:
Q3 results fell short of analyst expectations with revenue declining 2.5% YoY. However, the company announced cost-cutting measures that should improve margins in the coming quarters, and the CEO expressed confidence in the new product pipeline scheduled for next year.
```

**Case 6: Ambiguous Context**

```
Text for sentiment analysis:
Well, that was certainly surprising. I never thought they would make such a bold decision. Everyone's going to be talking about this for weeks.
```

### Scoring Criteria and Automated Testing Methods

The prompt will be scored according to the following criteria:

1. **Accuracy** (1 point)
   - Evaluation method: Compare sentiment classifications with expert-labeled ground truth
   - Passing standard: At least 80% agreement with expert labels across test cases

2. **Nuance Detection** (1 point)
   - Evaluation method: Assess identification of sentiment intensity and subtle expressions
   - Passing standard: Correctly identifies intensity levels and recognizes implicit sentiment

3. **Context Handling** (1 point)
   - Evaluation method: Evaluate performance on domain-specific and contextually complex texts
   - Passing standard: Correctly interprets sentiment in domain-specific language and ambiguous contexts

4. **Sarcasm Recognition** (1 point)
   - Evaluation method: Test ability to detect sarcasm and irony
   - Passing standard: Correctly identifies true sentiment in at least 70% of sarcastic expressions

5. **Reasoning Quality** (1 point)
   - Evaluation method: Assess the quality and relevance of justifications provided
   - Passing standard: Explanations reference specific text elements and apply appropriate sentiment indicators

### Automated Testing Process

1. For each test case, use your prompt with the text as input
2. Analyze the output for:
   - Main sentiment classification (positive, negative, neutral, mixed)
   - Sentiment intensity indication
   - Specific emotional states identified
   - Reasoning provided for classification
3. Compare classifications against expert-labeled ground truth
4. Evaluate explanation quality based on specificity and relevance
5. Calculate final score (5 points maximum)

### Expected Output Example (for Case 2)

```
Sentiment: Mixed (Positive and Negative)
Intensity: Moderate

Positive aspects:
- "beautiful view" (strong positive regarding location)
- "staff was friendly" (moderate positive regarding service)
- "breakfast was decent" (mild positive regarding food)

Negative aspects:
- "rooms were tiny and outdated" (strong negative regarding accommodations)
- "overpriced for what was offered" (moderate negative regarding value)

Overall, this review expresses appreciation for certain aspects of the hotel experience (view, staff) while expressing dissatisfaction with others (room quality, value). The sentiment is truly mixed rather than neutral, as the reviewer has distinct positive and negative reactions to different aspects of their stay.
```

### Solution Discussion

[Click to view community solutions](https://github.com/erweixin/prompt-challenges/discussions/2)

---

Submit your solution and share your approach and techniques with the community! 