# Counterfactual Reasoning

## 🔴 Hard

### Challenge Description

Counterfactual reasoning is the ability to think about "what if" scenarios that require reasoning in hypothetical situations different from reality. This ability is essential for decision analysis, scientific exploration, and innovative thinking. This challenge requires you to design a prompt that enables AI to engage in reasonable, consistent, and deep reasoning in hypothetical counterfactual scenarios while avoiding contradictions or departures from basic logical rules.

### Challenge Goals

Write a prompt that enables AI to:
1. Understand and accept counterfactual hypothetical conditions
2. Derive reasonable consequences while maintaining basic physical and logical laws
3. Identify which domains would be affected by the counterfactual hypothesis and which would not
4. Consider multi-order impacts (i.e., chain reactions of the counterfactual hypothesis)
5. Maintain internal consistency in reasoning and avoid self-contradictions

### Requirements

- The prompt must clearly define the boundaries and constraints of the counterfactual hypothesis
- Reasoning must maintain logical consistency within the changed world rules
- Must consider the impact of the counterfactual hypothesis across multiple domains (e.g., social, scientific, cultural)
- Avoid meaningless "everything would change" style reasoning
- Distinguish between direct impacts and derivative effects

### Prompt Template

```
[Your prompt]

Counterfactual hypothesis: {hypothetical situation}
Question: {specific question}
```

### Test Cases

**Case 1: Historical Counterfactual**

```
Counterfactual hypothesis: Suppose that internet technology had matured and become widely available by 1950.
Question: How would this have affected international relations and information dissemination during the Cold War? Consider changes in power balance between nations, propaganda strategies, and public awareness.
```

**Case 2: Physical Rule Counterfactual**

```
Counterfactual hypothesis: Suppose Earth's gravity suddenly decreased to half its current strength, but all other natural laws remained unchanged.
Question: How would this affect human architecture, transportation systems, and forms of movement? Specifically analyze potential changes in urban planning, building heights, and transportation vehicles.
```

**Case 3: Biological Counterfactual**

```
Counterfactual hypothesis: Suppose humans evolved the ability to photosynthesize like plants, obtaining part of their energy needs from sunlight.
Question: How would this change human dietary habits, living patterns, and social structures? Consider the impact on resource allocation, work scheduling, and the effects of climate change on human society.
```

### Scoring Criteria and Automated Testing Methods

The prompt will be scored according to the following criteria:

1. **Hypothesis Integration** (1 point)
   - Evaluation method: Check if the counterfactual premise is fully accepted and integrated
   - Passing standard: Reasoning fully incorporates the hypothesis without ignoring or rejecting it

2. **Logical Consistency** (1 point)
   - Evaluation method: Assess whether conclusions follow logically from the premise
   - Passing standard: No contradictions within the reasoning chain or with established facts not affected by the counterfactual

3. **Scope Awareness** (1 point)
   - Evaluation method: Evaluate understanding of which domains would change and which would remain unaffected
   - Passing standard: Clearly distinguishes between areas affected by the counterfactual and those that would remain constant

4. **Multi-order Reasoning** (1 point)
   - Evaluation method: Check if reasoning includes secondary and tertiary effects
   - Passing standard: Identifies and explains at least three levels of consequences (primary, secondary, tertiary)

5. **Domain Knowledge Application** (1 point)
   - Evaluation method: Assess application of relevant knowledge from multiple domains
   - Passing standard: Applies accurate knowledge from at least three relevant domains (e.g., physics, economics, social science)

### Automated Testing Process

1. For each test case, use your prompt with the specified counterfactual hypothesis and question as input
2. Analyze the output for:
   - Complete acceptance of the counterfactual premise
   - Logical consistency within the altered framework
   - Clear distinction between affected and unaffected domains
   - Presence of multi-level consequence analysis
   - Application of relevant domain knowledge
3. Check for logical contradictions or unjustified conclusions
4. Calculate final score (5 points maximum)

### Expected Output Example (for Case 2)

```
In a world where Earth's gravity suddenly decreased to half its current strength (approximately 4.9 m/s² instead of 9.8 m/s²), while all other natural laws remained constant, human-built environments and transportation would undergo profound transformations.

Architecture would experience revolutionary changes:
- Building materials: The reduced load-bearing requirements would allow for dramatically lighter construction materials. Steel and concrete usage would decrease, while lightweight materials like aluminum alloys, carbon composites, and engineered wood would become more prevalent.
- Height potential: Structures could reach much greater heights with the same materials. The current tallest building, the Burj Khalifa (828m), could theoretically extend to roughly 1.6-2km with similar structural techniques, as compression forces would be halved.
- Interior design: Ceiling heights would likely increase dramatically as the material costs of vertical space decreased. Multi-level open atriums would become common even in residential buildings.
- Foundation requirements: Foundations could be significantly less robust, reducing construction costs and allowing building on previously unsuitable terrain.

Transportation systems would transform:
- Road design: Roads could be built with steeper gradients as vehicles could climb more easily. Highway banking on curves could be less pronounced due to reduced lateral forces.
- Vehicle engineering: Vehicles would require significantly smaller engines for the same performance, as mass-related energy requirements for acceleration and climbing would halve. Suspension systems would be redesigned for the lower gravitational forces.
- New transportation modes: Personal flight would become much more feasible with lower power requirements. Jetpacks, personal flying platforms, and small aircraft would become practical for daily commuting, leading to a three-dimensional transportation network in cities.
- Public transit: Elevated transportation systems like monorails and aerial tramways would proliferate due to lower construction and operational costs.

Urban planning would evolve toward:
- Vertical development: Cities would grow significantly taller rather than wider, with "vertical neighborhoods" becoming the norm.
- Aerial connectivity: Buildings would connect at multiple levels via skyways, creating a 3D urban grid rather than the primarily 2D layout we have today.
- Lower infrastructure costs: Utilities, bridges, and tunnels would all require less structural support, allowing more extensive networks for the same cost.
- New recreational spaces: Vast indoor volumes could be economically climate-controlled, allowing for indoor parks and public spaces of unprecedented scale.

Human movement patterns would also change dramatically:
- Jumping and falling: Humans could easily jump 4-5 meters high and fall from much greater heights without injury. This would change how spaces are designed and navigated.
- Strength-to-weight advantage: People could lift twice as much, affecting everything from sports to manual labor practices.
- Athletic records: All athletic records involving overcoming gravity (high jump, pole vault, etc.) would more than double.

These changes would develop incrementally as society adapted to the new environmental constant, with early retrofitting of existing structures eventually giving way to entirely new architectural paradigms optimized for the lower gravitational environment.
```

### Solution Discussion

[Click to view community solutions](https://github.com/erweixin/prompt-challenges/discussions/9)

---

Submit your solution and share your approach and techniques with the community! 