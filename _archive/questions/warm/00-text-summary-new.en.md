---
title: "Text Summarization"
difficulty: "warm"
tags: ["Text Processing", "Summarization", "Information Extraction"]
testCases:
  - description: "Tech Article"
    inputText: |
      Artificial intelligence (AI) is rapidly changing our world. From healthcare to transportation, AI applications are ubiquitous. In healthcare, AI can now help doctors diagnose diseases more accurately, even exceeding the capabilities of human experts in some areas. In the transportation sector, autonomous driving technology is developing rapidly and may completely change our way of travel in the coming years. However, the development of AI also brings some concerns. Issues such as data privacy, algorithmic bias, and job changes due to automation all require careful consideration and resolution. Nevertheless, the potential of AI is enormous, and if we can properly handle these challenges, AI will create a better future for humanity.
    llmResult: |
      AI changes healthcare, transport
      Assists doctors diagnose diseases
      Autonomous driving rapidly develops
      Concerns exist: privacy, bias
      Huge potential, needs proper handling
  - description: "History Article"
    inputText: |
      The Silk Road was an important trade route connecting East and West, beginning around 130 BC during the Han Dynasty. This route not only facilitated the exchange of goods but also promoted the spread of culture, religion, and technology. The Silk Road got its name from Chinese silk, one of the most popular trade goods at the time. In addition to silk, goods such as spices, gold, ivory, and glass were also traded along this route. The Silk Road spanned Asia, connecting regions such as China, India, Persia (modern-day Iran), the Arabian Peninsula, Turkey, Greece, and Italy. With the development of sea trade routes and the decline of the Mongol Empire, the Silk Road gradually lost its importance in the 14th to 15th centuries. However, its impact on world history is profound, promoting the development and exchange of human civilization.
    llmResult: |
      Connected East-West trade route
      Promoted culture, religion spread
      Main commodity: Chinese silk
      Spanned multiple Asian regions
      Profound impact on world history
  - description: "Academic Abstract"
    inputText: |
      This study investigated the effects of meditation practice on working memory and attention. Sixty participants were recruited and randomly divided into a meditation group and a control group. The meditation group performed 20 minutes of mindfulness meditation daily for 8 weeks, while the control group received an equal amount of rest time. All participants were evaluated before and after the intervention using working memory tests and sustained attention tasks. Results showed that the meditation group exhibited significant improvements in working memory capacity (p<0.01) and increased attention duration (p<0.05) compared to the control group. These findings suggest that mindfulness meditation can serve as an effective cognitive enhancement strategy, especially for tasks requiring high attention and memory abilities. Future research should explore the persistence of these effects and how meditation influences other cognitive functions.
    llmResult: |
      Meditation improves working memory
      Mindfulness enhances attention
      8-week intervention significantly effective
      Effective cognitive enhancement strategy
      Need to explore effect persistence
  - description: "Product Description"
    inputText: |
      Our smart home system integrates the latest Internet of Things technology, allowing you to control various devices in your home via your smartphone or voice commands. The system includes smart light bulbs, thermostats, security cameras, and smart locks, all seamlessly connected to a central control unit. Our proprietary algorithm learns your habits and automatically adjusts your home environment to improve energy efficiency. For example, the system can remember when you usually leave and return home, adjust the temperature in advance, or automatically turn on lights when it detects you approaching your door. Security features include real-time monitoring and abnormal activity notifications, allowing you to check on your home anytime, anywhere. The system also features an open API interface for integration with other popular smart home devices on the market. We offer professional installation services and 24/7 customer support to ensure your smart home experience is always smooth and worry-free.
    llmResult: |
      Smart home IoT system
      Learns habits, auto-adjusts
      Real-time security monitoring
      Open API for device integration
      Professional install, 24/7 support
  - description: "Explanation of Abstract Concept"
    inputText: |
      Quantum entanglement is one of the most surprising phenomena in quantum mechanics, describing a special connection between two or more particles where their quantum states cannot be described independently, no matter how far apart they are. When particles are entangled, a measurement on one particle immediately influences the state of the other, even if they are vastly separated. Einstein called this "spooky action at a distance" and questioned the completeness of quantum mechanics. However, Bell's inequalities and subsequent experiments have proven that quantum entanglement truly exists. This phenomenon challenges our classical understanding of locality and reality, while providing the foundation for fields such as quantum computing, quantum cryptography, and quantum communication. Quantum entanglement is not just a theoretical curiosity; today, it has become a core resource for cutting-edge quantum technologies.
    llmResult: |
      Quantum entanglement: special particle link
      Spooky action challenges classic view
      Bell's experiments prove existence
      Foundation for quantum technologies
      Core of cutting-edge tech
scoringCriteria:
  - name: "Appropriate Number of Key Points"
    weight: 1
    description: "Evaluation Method: Check if the number of output key points is within the 3-5 range."
    evaluationMethod: "Check if the number of output key points is within the 3-5 range."
    passCriteria: "All test cases generate 3-5 key points."
  - name: "Length Control"
    weight: 1
    description: "Evaluation Method: Check if each key point does not exceed 15 characters."
    evaluationMethod: "Check if each key point does not exceed 15 characters."
    passCriteria: "All key points are within 15 characters."
  - name: "Information Accuracy"
    weight: 1
    description: "Evaluation Method: Check if key points contain the main information of the article and do not include information not present in the original text."
    evaluationMethod: "Check if key points contain the main information of the article and do not include information not present in the original text."
    passCriteria: "All key points can be traced to corresponding information sources in the original text."
  - name: "Comprehensiveness"
    weight: 1
    description: "Evaluation Method: Check if key points cover the main aspects of the article and do not miss important information."
    evaluationMethod: "Check if key points cover the main aspects of the article and do not miss important information."
    passCriteria: "At least one key point corresponds to the core idea of each article."
  - name: "Conciseness and Clarity"
    weight: 1
    description: "Evaluation Method: Check if key points are clear, concise, and easy to understand."
    evaluationMethod: "Check if key points are clear, concise, and easy to understand."
    passCriteria: "Key points can convey clear meaning independently without additional explanation."
promptTemplate: |
  [Your Prompt]

  Text: {Text Content}
expectedOutput: |
  1. AI changes healthcare, transport
  2. Assists doctors diagnose diseases
  3. Autonomous driving rapidly develops
  4. Concerns exist: privacy, bias
  5. Huge potential, needs proper handling
solutionDiscussion: "https://github.com/erweixin/prompt-challenges/discussions/1"
description: "In an age of information overload, we often need to quickly grasp the core content of articles. This challenge requires you to write a prompt that enables AI to accurately summarize any long text into 3-5 key points, with each key point being no more than 15 characters long."
---

# Text Summarization

## 🟢 Easy

### Challenge Description

In an age of information overload, we often need to quickly grasp the core content of articles. This challenge requires you to write a prompt that enables AI to accurately summarize any long text into 3-5 key points, with each key point being no more than 15 characters long.

### Challenge Goals

Write a prompt that enables AI to:
1. Extract the main points and key information from the text.
2. Condense this information into 3-5 concise bullet points.
3. Remain objective, adding no information not present in the original text.
4. Be applicable to texts of various topics and fields.

### Requirements

- The summary must contain the main points of the original text.
- Each key point must be no more than 15 characters long.
- Key points must cover the most important information in the article.
- Remain objective, adding no information not present in the original text.

### Prompt Template

```

[Your Prompt]

Text: {Text Content}

```

### Test Cases

**Case 1: Tech Article**

```

Text: Artificial intelligence (AI) is rapidly changing our world. From healthcare to transportation, AI applications are ubiquitous. In healthcare, AI can now help doctors diagnose diseases more accurately, even exceeding the capabilities of human experts in some areas. In the transportation sector, autonomous driving technology is developing rapidly and may completely change our way of travel in the coming years. However, the development of AI also brings some concerns. Issues such as data privacy, algorithmic bias, and job changes due to automation all require careful consideration and resolution. Nevertheless, the potential of AI is enormous, and if we can properly handle these challenges, AI will create a better future for humanity.

```

**Case 2: History Article**

```

Text: The Silk Road was an important trade route connecting East and West, beginning around 130 BC during the Han Dynasty. This route not only facilitated the exchange of goods but also promoted the spread of culture, religion, and technology. The Silk Road got its name from Chinese silk, one of the most popular trade goods at the time. In addition to silk, goods such as spices, gold, ivory, and glass were also traded along this route. The Silk Road spanned Asia, connecting regions such as China, India, Persia (modern-day Iran), the Arabian Peninsula, Turkey, Greece, and Italy. With the development of sea trade routes and the decline of the Mongol Empire, the Silk Road gradually lost its importance in the 14th to 15th centuries. However, its impact on world history is profound, promoting the development and exchange of human civilization.

```

**Case 3: Academic Abstract**

```

Text: This study investigated the effects of meditation practice on working memory and attention. Sixty participants were recruited and randomly divided into a meditation group and a control group. The meditation group performed 20 minutes of mindfulness meditation daily for 8 weeks, while the control group received an equal amount of rest time. All participants were evaluated before and after the intervention using working memory tests and sustained attention tasks. Results showed that the meditation group exhibited significant improvements in working memory capacity (p\<0.01) and increased attention duration (p\<0.05) compared to the control group. These findings suggest that mindfulness meditation can serve as an effective cognitive enhancement strategy, especially for tasks requiring high attention and memory abilities. Future research should explore the persistence of these effects and how meditation influences other cognitive functions.

```

**Case 4: Product Description**

```

Text: Our smart home system integrates the latest Internet of Things technology, allowing you to control various devices in your home via your smartphone or voice commands. The system includes smart light bulbs, thermostats, security cameras, and smart locks, all seamlessly connected to a central control unit. Our proprietary algorithm learns your habits and automatically adjusts your home environment to improve energy efficiency. For example, the system can remember when you usually leave and return home, adjust the temperature in advance, or automatically turn on lights when it detects you approaching your door. Security features include real-time monitoring and abnormal activity notifications, allowing you to check on your home anytime, anywhere. The system also features an open API interface for integration with other popular smart home devices on the market. We offer professional installation services and 24/7 customer support to ensure your smart home experience is always smooth and worry-free.

```

**Case 5: Explanation of Abstract Concept**

```

Text: Quantum entanglement is one of the most surprising phenomena in quantum mechanics, describing a special connection between two or more particles where their quantum states cannot be described independently, no matter how far apart they are. When particles are entangled, a measurement on one particle immediately influences the state of the other, even if they are vastly separated. Einstein called this "spooky action at a distance" and questioned the completeness of quantum mechanics. However, Bell's inequalities and subsequent experiments have proven that quantum entanglement truly exists. This phenomenon challenges our classical understanding of locality and reality, while providing the foundation for fields such as quantum computing, quantum cryptography, and quantum communication. Quantum entanglement is not just a theoretical curiosity; today, it has become a core resource for cutting-edge quantum technologies.

```

### Scoring Criteria and Automated Testing Methods

Prompts will be scored based on the following criteria:

1.  **Appropriate Number of Key Points** (1 point)
    * Evaluation Method: Check if the number of output key points is within the 3-5 range.
    * Pass Criteria: All test cases generate 3-5 key points.

2.  **Length Control** (1 point)
    * Evaluation Method: Check if each key point does not exceed 15 characters.
    * Pass Criteria: All key points are within 15 characters.

3.  **Information Accuracy** (1 point)
    * Evaluation Method: Check if key points contain the main information of the article and do not include information not present in the original text.
    * Pass Criteria: All key points can be traced to corresponding information sources in the original text.

4.  **Comprehensiveness** (1 point)
    * Evaluation Method: Check if key points cover the main aspects of the article and do not miss important information.
    * Pass Criteria: At least one key point corresponds to the core idea of each article.

5.  **Conciseness and Clarity** (1 point)
    * Evaluation Method: Check if key points are clear, concise, and easy to understand.
    * Pass Criteria: Key points can convey clear meaning independently without additional explanation.

### Automated Testing Process

1.  For each test case, use your prompt and the original text as input.
2.  Analyze the number of output key points and the character count of each point.
3.  Use a text similarity algorithm to compare the relevance of key points to key paragraphs in the original text.
4.  Use a predefined list of core article ideas to check if the key points cover these ideas.
5.  Calculate the final score (out of 5 points).

### Expected Output Example (for Case 1)

```

1.  AI changes healthcare, transport
2.  Assists doctors diagnose diseases
3.  Autonomous driving rapidly develops
4.  Concerns exist: privacy, bias
5.  Huge potential, needs proper handling

<!-- end list -->

```

### Solution Discussion

[Click to view community solutions](https://github.com/erweixin/prompt-challenges/discussions/1)

---

Submit your solution and share your ideas and techniques with the community!