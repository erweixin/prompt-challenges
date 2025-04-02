# Role-Playing

## 🟠 Medium

### Challenge Description

The ability to adopt specific personas with appropriate knowledge, tone, and response patterns is a key aspect of AI versatility. This challenge requires you to design a prompt that guides AI to effectively role-play as various professionals, adopting their knowledge base, communication style, and ethical boundaries. Well-executed role-playing enhances user experience and enables more specialized interactions.

### Challenge Goals

Write a prompt that enables AI to:
1. Accurately embody the knowledge domain of the specified professional
2. Adopt appropriate vocabulary, terminology, and communication style
3. Maintain appropriate professional ethical boundaries
4. Balance technical precision with accessible explanations
5. Provide responses that reflect the professional's unique perspective and approach

### Requirements

- The prompt must adapt to different professional roles without requiring re-prompting
- Must guide AI to access appropriate domain knowledge
- Should set appropriate ethical boundaries for specific professions
- Must balance technical accuracy with clear communication
- Should enable consistent persona maintenance throughout the conversation

### Prompt Template

```
[Your prompt]

Role: {professional role}
User query: {query}
```

### Test Cases

**Case 1: Psychological Counselor**

```
Role: Licensed psychological counselor
User query: I've been feeling very anxious lately, especially in social situations. Sometimes I even get panic attacks. What techniques can I use to manage this anxiety?
```

**Case 2: Financial Advisor**

```
Role: Financial advisor
User query: I'm 35 years old and finally have some savings ($15,000). I want to start investing for retirement but I'm not sure where to begin. What would you recommend?
```

**Case 3: Nutritionist**

```
Role: Registered nutritionist
User query: I'm trying to build muscle but also lose some fat. What should my diet look like, and should I be taking any supplements?
```

**Case 4: Pediatrician**

```
Role: Pediatrician
User query: My 2-year-old has had a fever of 101°F (38.3°C) for about 24 hours and seems more tired than usual. When should I be concerned enough to bring them to the doctor?
```

**Case 5: History Professor**

```
Role: History professor specializing in ancient civilizations
User query: How did the political structures of ancient Rome and ancient China differ, and what factors contributed to these differences?
```

**Case 6: Legal Advisor**

```
Role: Corporate legal counsel
User query: Our small business is considering hiring independent contractors instead of employees to save costs. What legal risks should we be aware of?
```

**Case 7: AI Researcher**

```
Role: AI ethics researcher
User query: What are the most pressing ethical concerns regarding large language models like GPT-4, and how might we address them?
```

### Scoring Criteria and Automated Testing Methods

The prompt will be scored according to the following criteria:

1. **Role Accuracy** (1 point)
   - Evaluation method: Check if responses reflect accurate domain knowledge of the profession
   - Passing standard: At least 90% of factual claims align with professional consensus in the field

2. **Professional Depth** (1 point)
   - Evaluation method: Assess whether responses demonstrate specialized knowledge and thinking patterns
   - Passing standard: Includes profession-specific frameworks, approaches and terminology

3. **Ethical Boundary Awareness** (1 point)
   - Evaluation method: Evaluate whether responses respect professional ethical boundaries
   - Passing standard: Maintains appropriate scope of practice and includes necessary disclaimers

4. **Accessibility and Clarity** (1 point)
   - Evaluation method: Check if technical information is explained in an accessible way
   - Passing standard: Technical concepts are explained in plain language with appropriate analogies or examples

5. **Relevance and Specificity** (1 point)
   - Evaluation method: Assess whether advice is tailored to the specific query context
   - Passing standard: Responses address the specific situation rather than providing only generic information

### Automated Testing Process

1. For each test case, use your prompt with the specified role and query as input
2. Analyze the output for:
   - Factual accuracy within the domain (compared to expert resource database)
   - Presence of profession-specific terminology and frameworks
   - Inclusion of appropriate ethical boundaries and disclaimers
   - Balance of technical and accessible language
   - Specificity to the query context
3. Compare against expert-generated responses in the same domain
4. Calculate final score (5 points maximum)

### Expected Output Example (for Case 3)

```
As a registered nutritionist, I understand your goal of simultaneous muscle building and fat loss. This approach, often called "body recomposition," requires specific nutritional strategies.

First, regarding your overall diet structure:

1. Caloric intake: You'll need a slight caloric deficit for fat loss, but not so severe that it prevents muscle growth. I typically recommend a modest deficit of 300-500 calories below maintenance for most clients pursuing body recomposition.

2. Protein intake: This is critical for your goals. Aim for 1.6-2.2g of protein per kg of body weight daily. Distribute this evenly across meals (4-5 meals with 20-40g protein each).

3. Carbohydrates: Contrary to popular belief, you'll need adequate carbs to fuel effective workouts. Focus on timing them around your training sessions. Aim for 3-5g/kg body weight, with higher amounts on training days.

4. Fats: Maintain at least 0.5-0.8g/kg body weight to support hormonal function, especially testosterone which is important for muscle building.

Regarding your question about supplements:

The core supplements with research support are:
- Protein powder (whey or plant-based): Convenient for meeting protein targets
- Creatine monohydrate (3-5g daily): Well-researched for muscle growth
- Vitamin D: If blood levels are low (worth testing)

Other supplements like BCAAs, pre-workouts, and fat burners have less robust evidence and I'd recommend focusing on diet fundamentals first.

Important considerations:
- Meal timing: Try to consume protein within 2 hours pre/post workout
- Hydration: Adequate water intake supports both goals
- Recovery: Nutrition works synergistically with adequate sleep and recovery

I would need more information about your specific body metrics, activity level, and any dietary restrictions to provide more personalized recommendations. Also, consider that true body recomposition is typically slower than either muscle gain or fat loss phases done separately.

Remember that this advice is general in nature. Individual needs vary based on genetics, activity levels, medical conditions, and other factors.
```

### Solution Discussion

[Click to view community solutions](https://github.com/erweixin/prompt-challenges/discussions/5)

---

Submit your solution and share your approach and techniques with the community! 