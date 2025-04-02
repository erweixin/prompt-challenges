# Reverse Thinking

## 🟡 Medium

### Challenge Description

Reverse thinking (also known as "backward reasoning" or "working backwards") is a problem-solving approach that starts from the desired outcome and works backward to determine the steps needed to reach it. Unlike forward thinking that progresses from a starting point to a goal, reverse thinking requires examining what conditions must be met to achieve the desired result. This challenge requires you to design a prompt that guides AI to effectively utilize reverse thinking for complex problem-solving.

### Challenge Goals

Write a prompt that enables AI to:
1. Work backward from a desired outcome to identify necessary steps or conditions
2. Analyze dependencies between different stages of a solution
3. Consider constraints and limitations that might affect the feasibility of certain paths
4. Generate multiple potential solution paths when working backward
5. Evaluate and prioritize the identified solution paths based on practicality and efficiency

### Requirements

- The prompt must explicitly instruct the AI to use reverse thinking methodology
- The reasoning must follow a clear logical order from the goal state to the initial state
- The prompt should encourage consideration of constraints and dependencies
- The prompt should guide the AI to assess the feasibility of each identified step
- The final output should present a coherent path from the initial state to the goal state (in forward order for clarity)

### Prompt Template

```
[Your prompt]

Goal: {describe the desired outcome}
Initial state: {describe the current situation}
Constraints: {list any limitations or requirements}
```

### Test Cases

**Case 1: Business Strategy**

```
Goal: Achieve a 20% market share in the competitive smartphone market within 2 years
Initial state: Currently a new company with innovative technology but 0% market share and limited capital
Constraints: Budget of $50 million for marketing and operations, cannot price below manufacturing cost, must maintain profitability by end of year 2
```

**Case 2: Personal Finance**

```
Goal: Save $50,000 for a house down payment in 3 years
Initial state: Currently have $5,000 in savings, $45,000 annual salary, $2,000 monthly expenses
Constraints: Cannot reduce essential expenses below $1,500 per month, cannot work more than 60 hours per week, must maintain $3,000 emergency fund
```

**Case 3: Software Development**

```
Goal: Develop and launch a mobile app that can process and analyze user-uploaded photos with AI within 6 months
Initial state: Have a team of 3 developers with web development experience but limited mobile or AI experience
Constraints: Maximum budget of $200,000, must comply with data privacy regulations, app must work on both iOS and Android
```

**Case 4: Education Planning**

```
Goal: Achieve fluency in Mandarin Chinese (HSK level 5) within 18 months
Initial state: Complete beginner with no prior knowledge of Chinese, working full-time (40 hours/week)
Constraints: Maximum 10 hours per week for study, budget of $3,000 for learning resources, no opportunity to live in a Chinese-speaking country
```

### Scoring Criteria and Automated Testing Methods

The prompt will be scored according to the following criteria:

1. **Reverse Reasoning Structure** (1 point)
   - Evaluation method: Check if reasoning starts from the goal state and works backward
   - Passing standard: Clear evidence of backward reasoning from the end goal through intermediate states to the initial state

2. **Step Completeness** (1 point)
   - Evaluation method: Count the number of necessary intermediate steps identified
   - Passing standard: Identifies at least 80% of critical steps needed to achieve the goal

3. **Constraint Integration** (1 point)
   - Evaluation method: Assess how well constraints are addressed in the solution
   - Passing standard: All constraints are explicitly considered, and the solution remains within their boundaries

4. **Dependency Analysis** (1 point)
   - Evaluation method: Check if dependencies between steps are correctly identified
   - Passing standard: Logical sequence shows proper understanding of which steps must precede others

5. **Feasibility Assessment** (1 point)
   - Evaluation method: Evaluate the practicality of the proposed solution path
   - Passing standard: Solution is realistic given the initial state, constraints, and timeline

### Automated Testing Process

1. For each test case, use your prompt with the specified goal, initial state, and constraints as input
2. Analyze the output for:
   - Evidence of backward reasoning methodology
   - Completeness of identified steps
   - Consideration of all constraints
   - Logical dependency analysis
   - Overall feasibility of the solution
3. Check for consistency between the reversed reasoning and the final forward path
4. Calculate final score (5 points maximum)

### Expected Output Example (for Case 4)

```
# Working Backward from Fluency in Mandarin

To achieve HSK level 5 (fluent) Mandarin Chinese within 18 months while working full-time, with constraints of 10 hours weekly study time and a $3,000 budget, I'll analyze this challenge from goal to starting point.

## Step 1: Defining the Goal State in Detail
HSK level 5 requires:
- Vocabulary of 2,500 words
- Ability to read Chinese newspapers and magazines
- Comprehension of Chinese films and TV programs
- Capacity to give a full-length speech in Chinese
- Understanding of complex grammatical structures

## Step 2: What Must Be True 1 Month Before Achieving HSK 5?
- Must have completed HSK 4 level material (~1,200 words)
- Must be practicing extended conversations regularly
- Must be consuming native Chinese content daily
- Must have developed systematic error correction methods
- Must be familiar with at least 2,000 characters

## Step 3: What Must Be True at 12 Months (Midpoint)?
- Must have completed HSK 3 level material (~600 words)
- Must be able to hold basic conversations about daily life
- Must have established consistent daily practice routines
- Must be using spaced repetition systems effectively
- Should have found language exchange partners

## Step 4: What Must Be True at 6 Months?
- Must have completed HSK 2 level material (~300 words)
- Must have mastered basic grammatical structures
- Must have developed proper pronunciation habits
- Must have established efficient learning systems
- Should be practicing basic dialogues regularly

## Step 5: What Must Be True at 3 Months?
- Must have completed HSK 1 level material (~150 words)
- Must have learned Pinyin system completely
- Must understand basic sentence structures
- Must have selected core learning resources
- Should have begun daily character writing practice

## Step 6: What Must Be True at 1 Month?
- Must have learned basic greetings and introductions
- Must have mastered Pinyin pronunciation foundations
- Must have established a consistent study schedule
- Must have acquired necessary learning resources
- Should have learned about 50-100 characters

## Step 7: What Must Be True at Day 1 (Starting Point)?
- Must select appropriate learning resources within budget
- Must establish a realistic 10-hour weekly schedule
- Must design an effective learning environment
- Must set up progress tracking mechanisms
- Should identify potential language exchange platforms

## Forward Path Action Plan

### Preparation Phase (Week 1-2):
1. Purchase core resources: structured textbook series ($150), spaced repetition software subscription ($60/year), graded readers ($100), audio programs ($100)
2. Set up dedicated study environment with minimal distractions
3. Establish daily schedule: 1 hour on weekdays, 2.5 hours each weekend day
4. Install language learning apps and tools (Pleco, Anki, HelloTalk)
5. Create progress tracking spreadsheet with weekly goals

### Foundations (Months 1-3):
1. Master Pinyin pronunciation system using audio guides (Week 1-3)
2. Learn first 150 characters and 150 vocabulary items (HSK 1)
3. Study basic grammar patterns (20 core structures)
4. Begin daily 15-minute character writing practice
5. Establish 10-minute daily audio immersion habit during commute

### Basic Conversations (Months 4-6):
1. Expand vocabulary to 300 words (HSK 2 level)
2. Begin weekly language exchange sessions (free, online)
3. Complete structured dialogues from textbook series
4. Increase audio immersion to 30 minutes daily
5. Begin reading simple graded readers

### Intermediate Development (Months 7-12):
1. Expand vocabulary to 600-1,000 words (HSK 3 level)
2. Hire online tutor twice monthly for conversation practice ($25/hour, $600 total)
3. Begin watching simple Chinese content with subtitles
4. Read intermediate graded readers regularly
5. Practice speaking by recording and critiquing own speech

### Advanced Progress (Months 13-18):
1. Expand vocabulary to 2,500 words (HSK 5 requirement)
2. Increase tutor sessions to weekly ($1,200 for remaining period)
3. Consume native Chinese content daily (news, videos)
4. Participate in language exchange sessions 3x weekly
5. Practice full-length presentations on various topics
6. Complete intensive grammar review focusing on complex structures

This plan maximizes the 10 weekly hours by strategically combining:
- Structured learning (4 hours)
- Practice and application (3 hours)
- Immersion and consumption (2 hours)
- Review and assessment (1 hour)

The $3,000 budget is allocated to:
- Core learning materials: $410
- Software and apps: $290
- Tutoring: $1,800
- Additional resources as needed: $500

This backward-planning approach ensures all prerequisites are strategically developed to achieve HSK level 5 fluency within the 18-month timeframe while respecting the time and budget constraints.
```

### Solution Discussion

[Click to view community solutions](https://github.com/erweixin/prompt-challenges/discussions/8)

---

Submit your solution and share your approach and techniques with the community! 