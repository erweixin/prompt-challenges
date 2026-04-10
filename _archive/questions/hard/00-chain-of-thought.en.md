# Chain of Thought

## 🔴 Hard

### Challenge Description

In solving complex tasks, explicitly demonstrating reasoning steps often leads to better outcomes. Chain of Thought (CoT) prompting guides AI to break down complex reasoning problems into logical steps, showing its "thinking process" before arriving at a final answer. This challenge requires you to design a prompt that encourages AI to demonstrate step-by-step reasoning when solving problems that require logical thinking, calculations, or complex analysis.

### Challenge Goals

Write a prompt that enables AI to:
1. Break down complex problems into logical steps
2. Explicitly show reasoning for each step
3. Consider multiple possibilities when appropriate
4. Apply relevant domain knowledge
5. Reach well-supported conclusions

### Requirements

- The prompt must encourage step-by-step reasoning rather than jumping directly to answers
- Must be adaptable to different types of problems (mathematical, logical, analytical)
- Should guide AI to consider multiple approaches or possibilities when relevant
- Must help AI organize thoughts in a coherent sequence
- Should encourage verification of intermediate steps and final answers

### Prompt Template

```
[Your prompt]

Question: {question}
```

### Test Cases

**Case 1: Logical Reasoning Problem**

```
Question: In a small town, there are three neighbors: Adams, Brown, and Clark. One is a doctor, one is an engineer, and one is a teacher. From the following clues, determine each person's profession:
1. The engineer and the teacher are not related.
2. Adams is neither the engineer nor the teacher.
3. The doctor is Brown's sister.
```

**Case 2: Probability Problem**

```
Question: A standard deck of cards has 52 cards divided into 4 suits (hearts, diamonds, clubs, and spades), each with 13 cards (Ace, 2-10, Jack, Queen, King). If you draw 3 cards randomly without replacement, what is the probability of getting exactly 2 hearts?
```

**Case 3: Market Analysis**

```
Question: A company is considering launching a new premium subscription service priced at $15/month. Currently, they have 100,000 users on their free tier, and market research suggests that 5% would upgrade to the premium tier. However, the research also indicates that for every 1% increase in price above $15, the conversion rate drops by 0.5 percentage points. If the company wants to maximize revenue from premium subscriptions, what price should they set?
```

**Case 4: Mathematical Optimization**

```
Question: A farmer has 200 meters of fencing and wants to create a rectangular enclosure adjacent to a river. If the side along the river doesn't need fencing, what should the dimensions of the rectangle be to maximize the enclosed area?
```

**Case 5: Environmental Decision-Making**

```
Question: A city is considering three approaches to reduce carbon emissions:
- Option A: Invest $10 million in public transportation, which would reduce emissions by 30,000 tons annually.
- Option B: Invest $8 million in renewable energy, which would reduce emissions by 25,000 tons annually.
- Option C: Invest $5 million in building efficiency upgrades, which would reduce emissions by 15,000 tons annually.

The city has a budget of $15 million. What combination of options would maximize emission reduction?
```

**Case 6: Legal Reasoning**

```
Question: In a civil case, the plaintiff must prove their case by a "preponderance of evidence" (more likely than not, or >50% certainty). Consider the following scenario:

A patient sues a doctor for malpractice, claiming the doctor's negligence caused their injury. The evidence shows:
- Expert testimony states that in similar cases, negligence is the cause of injury 70% of the time.
- The doctor's records show they followed standard procedures but missed one recommended check.
- The patient had a pre-existing condition that could explain the injury in 40% of similar cases.

Based on this information, should the court find in favor of the plaintiff?
```

### Scoring Criteria and Automated Testing Methods

The prompt will be scored according to the following criteria:

1. **Step Breakdown Quality** (1 point)
   - Evaluation method: Check if the AI breaks down problems into appropriate steps
   - Passing standard: At least 4 distinct, logical steps in the reasoning process

2. **Logical Clarity** (1 point)
   - Evaluation method: Assess whether each step follows logically from previous steps
   - Passing standard: No logical jumps or disconnected reasoning

3. **Multi-Path Consideration** (1 point)
   - Evaluation method: Check if the AI considers alternative approaches or possibilities when relevant
   - Passing standard: Explores at least two potential paths when the problem allows multiple approaches

4. **Knowledge Application** (1 point)
   - Evaluation method: Evaluate whether the AI correctly applies domain-specific knowledge
   - Passing standard: Demonstrates accurate application of formulas, principles, or domain concepts

5. **Conclusion Integrity** (1 point)
   - Evaluation method: Assess if the final answer is well-supported by the preceding chain of thought
   - Passing standard: Conclusion directly follows from the reasoning steps and addresses the original question

### Automated Testing Process

1. For each test case, use your prompt with the question as input
2. Analyze the output for:
   - Number and appropriateness of reasoning steps
   - Logical coherence between steps
   - Consideration of alternative approaches
   - Accurate application of domain knowledge
   - Connection between reasoning and final answer
3. Compare against expert-generated reasoning paths
4. Check final answer correctness
5. Calculate final score (5 points maximum)

### Expected Output Example (for Case 2)

```
To find the probability of getting exactly 2 hearts from drawing 3 cards from a standard deck, I need to work through this step by step:

Step 1: Understand what we're looking for.
- We need exactly 2 hearts in our 3-card draw
- This means we need 2 hearts and 1 non-heart

Step 2: Calculate the total possible outcomes (denominator).
- Drawing 3 cards from 52 cards without replacement
- Total number of possible 3-card combinations = C(52,3) = 52!/(3!×49!) = (52×51×50)/(3×2×1) = 22,100

Step 3: Calculate the favorable outcomes (numerator).
- We need to select 2 hearts from 13 hearts: C(13,2) = 13!/(2!×11!) = (13×12)/(2×1) = 78 ways to select 2 hearts
- We also need to select 1 non-heart from 39 non-hearts: C(39,1) = 39 ways to select 1 non-heart
- By multiplication principle, total favorable outcomes = 78 × 39 = 3,042

Step 4: Calculate the probability.
- Probability = Favorable outcomes / Total outcomes = 3,042 / 22,100
- Simplifying: 3,042 / 22,100 = 0.1377 (approximately)

Therefore, the probability of drawing exactly 2 hearts when drawing 3 cards from a standard deck is approximately 0.1377 or about 13.77%.

To verify: I can also think about this using the hypergeometric distribution formula directly:
P(X=2) = [C(13,2) × C(39,1)] / C(52,3), which gives the same result.
```

### Solution Discussion

[Click to view community solutions](https://github.com/erweixin/prompt-challenges/discussions/7)

---

Submit your solution and share your approach and techniques with the community! 