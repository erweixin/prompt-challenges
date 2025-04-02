# Text Summarization

## 🟢 Warm-up

### Challenge Description

Text summarization is a fundamental natural language processing task that requires understanding content, identifying key points, and generating concise summaries. This challenge requires you to design a prompt that guides AI to produce high-quality summaries of various types of texts, preserving essential information while significantly reducing length.

### Challenge Goals

Write a prompt that enables AI to:
1. Identify and extract the most important information from a text
2. Create a concise summary that captures the core message and key points
3. Maintain factual accuracy while reducing length
4. Preserve the original tone and context
5. Adapt to different types of content (articles, research papers, stories, etc.)

### Requirements

- The summary must be significantly shorter than the original text (typically 10-20% of original length)
- Must preserve the most important information and key points
- Must maintain factual accuracy without introducing errors
- Should be coherent and readable as a standalone text
- Should adapt to the source material's domain and complexity

### Prompt Template

```
[Your prompt]

Text to summarize:
{text}

Desired length: {length}
```

### Test Cases

**Case 1: Technology Article**

```
Text to summarize:
Artificial Intelligence has been transforming industries at an unprecedented pace. Machine Learning algorithms, particularly deep neural networks, have demonstrated remarkable capabilities in pattern recognition tasks, often exceeding human performance in specific domains. This success has driven massive investment in AI research and applications, with global spending on AI systems expected to reach $97.9 billion by 2023, according to IDC forecasts.

However, challenges remain. AI systems still struggle with causality, common-sense reasoning, and adapting to new situations with limited data. Additionally, concerns about bias, transparency, and ethical implications have grown as AI deployment expands. Researchers are actively working on solutions, including explainable AI approaches that make algorithmic decisions more transparent, federated learning techniques that enhance privacy, and more data-efficient methods like few-shot learning.

The future direction of AI development appears to be moving toward more generalizable systems. While today's AI excels at narrow tasks, the field is gradually progressing toward Artificial General Intelligence (AGI) - systems that can perform any intellectual task that a human can do. Though estimates vary widely, most experts believe true AGI remains decades away, with significant conceptual and technical hurdles yet to be overcome.

Perhaps more importantly, the integration of AI into society raises profound questions about the future of work, privacy, security, and even the nature of human-machine relationships. How we navigate these challenges will be just as important as the technological progress itself in determining AI's ultimate impact.

Desired length: 2-3 sentences
```

**Case 2: Historical Article**

```
Text to summarize:
The Industrial Revolution, which began in Great Britain around 1760 and had spread to North America and Western Europe by the early 19th century, fundamentally altered human society and its relationship with the environment. Prior to this period, manufacturing was predominantly done in homes using hand tools and basic machinery. The development of new machines, methods, and techniques led to a shift toward powered, special-purpose machinery, factories, and mass production.

Several factors converged to enable this transformation in Britain: an established colonial empire providing raw materials and markets, political stability after the Glorious Revolution, a strong banking system, mineral resources (especially coal), and technological innovation. The mechanization of the textile industry was particularly significant, with inventions like the flying shuttle, spinning jenny, and power loom dramatically increasing productivity.

The revolution spread to other sectors as entrepreneurs and investors sought to apply similar principles elsewhere. The development of the steam engine by Thomas Newcomen and later improvements by James Watt provided reliable, powerful energy that could be deployed anywhere, freeing industry from geographic constraints previously imposed by water power.

Transportation was revolutionized as well, with the development of steam locomotives and railways, and later steamships. These innovations reduced transportation costs and times significantly, enabling the effective movement of raw materials and finished goods.

The social impacts were equally profound. Urbanization accelerated as people moved to cities seeking employment in factories. Working conditions were often harsh, with long hours, child labor, and dangerous conditions. The resulting social tensions led to new political movements, labor organizations, and eventually regulatory reforms.

The Industrial Revolution also marked the beginning of an unprecedented rise in human population and resource consumption, setting the stage for today's environmental challenges. It represented a fundamental inflection point in human history, when economic growth began to accelerate exponentially, reshaping society and humanity's impact on the planet.

Desired length: 3-4 sentences
```

**Case 3: Academic Abstract**

```
Text to summarize:
Abstract:
The prevalence of misinformation in contemporary society has significant implications for democracy, public health, and social cohesion. This study examines the cognitive, social, and technological factors that contribute to the spread and acceptance of false information. Through a meta-analysis of 83 studies (N = 42,634) conducted between 2012 and 2023, we identify six key mechanisms that influence misinformation susceptibility: cognitive biases, motivated reasoning, social identity dynamics, media literacy deficits, algorithmic amplification, and network structure effects.

Our findings suggest that cognitive factors alone cannot explain misinformation phenomena; rather, the interaction between individual psychology, social context, and technological architecture creates complex feedback loops that can either amplify or mitigate false beliefs. Importantly, our analysis reveals that interventions targeting multiple levels simultaneously (individual, social, and technological) show significantly greater efficacy (d = 0.68) than single-level approaches (d = 0.32).

The study further demonstrates that susceptibility to misinformation is not simply a function of education or partisan identity, as commonly assumed. Instead, contextual factors, including trust in institutions, epistemic certainty, and exposure diversity, moderate the relationship between individual differences and misinformation acceptance. These findings challenge simplistic narratives about the causes of and solutions to the misinformation problem.

Based on these results, we propose an integrated framework for understanding and addressing misinformation, emphasizing the need for coordinated interventions across cognitive, social, and technological domains. We conclude by discussing the implications for platform governance, media literacy education, and the promotion of epistemic humility in public discourse.

Desired length: 2-3 sentences
```

**Case 4: Product Description**

```
Text to summarize:
Introducing the XDR-5000 Noise-Canceling Wireless Headphones, the ultimate audio companion for discerning listeners who demand uncompromising sound quality and comfort.

Engineered with our proprietary SoundPure™ technology, the XDR-5000 delivers an immersive listening experience with deep, rich bass, crystal-clear midranges, and pristine highs across the full audio spectrum (20Hz-40kHz). The adaptive 40mm Neodymium drivers automatically calibrate based on your unique hearing profile and the specific audio content you're enjoying, whether it's classical music, heavy bass, podcasts, or films.

The advanced Active Noise Cancellation (ANC) system utilizes a six-microphone array to continuously monitor your environment 50,000 times per second, generating precisely calibrated anti-noise signals that effectively eliminate up to 98% of ambient sounds across both low and high frequencies. Transparency Mode allows you to instantly tune back into your surroundings without removing your headphones.

With comfort as a priority, the XDR-5000 features memory foam ear cushions wrapped in breathable, protein leather that contours to your ears, while the adjustable headband distributes weight evenly to prevent pressure points during extended listening sessions. The lightweight yet durable construction (just 255g) combines aircraft-grade aluminum with high-impact composite materials that withstand daily use.

Battery life exceeds industry standards with up to 36 hours of continuous playback with ANC enabled (48 hours with ANC off), and the quick-charge feature provides 5 hours of listening from just 10 minutes of charging. The headphones support Bluetooth 5.2 with multipoint connectivity, allowing you to seamlessly switch between devices, and the included 3.5mm cable offers a wired option for audiophiles or when battery power is unavailable.

The intuitive touch controls on the ear cup allow for easy volume adjustment, track navigation, and call management, while the built-in voice assistant compatibility works with Siri, Google Assistant, and Alexa. The companion app provides additional customization options, including a 10-band equalizer, ANC intensity adjustments, and firmware updates.

The XDR-5000 headphones come in four sophisticated colorways (Midnight Black, Platinum Silver, Navy Blue, and Ivory White) and include a premium hard-shell travel case, charging cable, audio cable, and airline adapter.

Elevate your listening experience with the XDR-5000 – where superior sound meets unmatched comfort and convenience.

Desired length: 50-75 words
```

**Case 5: Abstract Concept**

```
Text to summarize:
Consciousness remains one of the most profound mysteries in science and philosophy, defying straightforward explanation despite centuries of inquiry. At its core, consciousness refers to subjective experience – the feeling of being a particular organism with a unique perspective on the world. The "hard problem" of consciousness, as philosopher David Chalmers articulated, is explaining why physical processes in the brain give rise to subjective experience at all.

Various philosophical approaches have attempted to address this conundrum. Dualists like René Descartes propose that consciousness exists in a separate, non-physical realm from the material body. Materialists counter that consciousness is entirely reducible to physical processes in the brain, though they often struggle to explain how these processes create subjective experience. Panpsychists suggest that consciousness might be a fundamental property of the universe, present in some form at all levels of reality.

From a scientific perspective, researchers have made significant progress in identifying neural correlates of consciousness – brain activities that correspond to conscious experiences. Advanced neuroimaging techniques reveal distinct patterns of brain activity associated with different states of consciousness, from alert wakefulness to deep sleep, anesthesia, and various disorders of consciousness. Integrated Information Theory, Global Workspace Theory, and Higher-Order Theories represent attempts to develop scientific frameworks for understanding how neural activity generates conscious experience.

The study of consciousness has profound implications beyond pure academic interest. It informs ethical questions about artificial intelligence, animal welfare, end-of-life care, and altered states of consciousness. If we could precisely identify the neural requirements for consciousness, we might better understand which entities possess subjective experience and deserve moral consideration.

Consciousness also intersects with quantum physics in intriguing ways. The measurement problem in quantum mechanics – the question of how quantum superpositions collapse into definite states upon observation – has led some theorists to propose that consciousness plays a role in the fundamental nature of reality. While controversial, these theories highlight the profound interconnections between our understanding of mind and matter.

Despite remarkable advances, a complete explanation of consciousness may require conceptual breakthroughs beyond our current paradigms. The persistent gap between our understanding of physical processes and the reality of subjective experience suggests that consciousness may represent a unique kind of phenomenon requiring novel explanatory frameworks that bridge the sciences and humanities.

Desired length: 100 words
```

### Scoring Criteria and Automated Testing Methods

The prompt will be scored according to the following criteria:

1. **Key Point Extraction** (1 point)
   - Evaluation method: Check if the summary contains the most important information and central ideas
   - Passing standard: At least 80% of key points identified by expert summarizers are included

2. **Length Control** (1 point)
   - Evaluation method: Assess whether the summary adheres to the specified length constraints
   - Passing standard: Within 10% of the requested length (word or sentence count)

3. **Information Accuracy** (1 point)
   - Evaluation method: Check for factual errors or misrepresentations compared to the source
   - Passing standard: No significant factual errors or misrepresentations

4. **Comprehensiveness** (1 point)
   - Evaluation method: Evaluate whether the summary provides a complete overview despite brevity
   - Passing standard: Covers all major aspects or sections of the original text in proportion to their importance

5. **Coherence and Clarity** (1 point)
   - Evaluation method: Assess readability, logical flow, and understandability of the summary as a standalone text
   - Passing standard: The summary can be understood without reference to the original text and maintains coherent flow

### Automated Testing Process

1. For each test case, use your prompt with the text and desired length as input
2. Analyze the output for:
   - Presence of key information points (compared to expert-extracted points)
   - Adherence to length constraints
   - Factual accuracy (compared to source text)
   - Coverage of main sections/topics from the original
   - Readability metrics and coherence
3. Compare against summaries created by professional editors
4. Calculate final score (5 points maximum)

### Expected Output Example (for Case 1)

```
AI has rapidly transformed industries through advances in machine learning, particularly neural networks, though challenges remain in areas like causality and ethical implementation. While current AI systems excel at narrow tasks, the field is progressing toward more general systems, raising profound questions about the future of work, privacy, and human-machine relationships as AI becomes increasingly integrated into society.
```

### Solution Discussion

[Click to view community solutions](https://github.com/erweixin/prompt-challenges/discussions/1)

---

Submit your solution and share your approach and techniques with the community! 