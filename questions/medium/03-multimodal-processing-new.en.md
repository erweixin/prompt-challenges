---
title: "Multimodal Processing"
difficulty: "medium"
tags: ["Multimodal Processing", "Cross-modal Analysis", "Information Fusion"]
testCases:
  - description: "Product Review Analysis"
    inputText: |
      Text: "This phone takes great pictures, but the battery life is average."
      Image Description: "The phone screen displays a clear photo of a city at night, with vibrant colors and rich details."
      Audio Description: "The sound of the user pressing the shutter button, the shutter sound is crisp."
      Task: Analyze the user's overall evaluation of this phone, with a special focus on the camera function.
    llmResult: |
      Multimodal Analysis Result:

      ## Analysis of Each Modality
      **Text Modality**: The user has a positive evaluation of the phone's camera function, but is not satisfied with the battery life.
      **Image Modality**: The photo quality is indeed very high, with vibrant colors and rich details, which confirms the camera's performance.
      **Audio Modality**: The camera operation is smooth, and the shutter sound is crisp, indicating that the camera is responsive.

      ## Cross-modal Correlation
      - The image modality supports the positive evaluation of the camera function in the text.
      - The audio modality further confirms the smoothness of the camera operation.
      - The information from the three modalities is highly consistent regarding the camera function.

      ## Comprehensive Conclusion
      The user's evaluation of this phone's camera function is accurate. The photo quality is indeed excellent, and the operating experience is good. However, the battery life issue does exist and needs improvement. Overall, this is a phone with an excellent camera function but with room for improvement in battery life.

      ## Confidence: 90%
      Reason: The multimodal information is highly consistent, and the analysis result is reliable.
  - description: "News Event Understanding"
    inputText: |
      Text: "The stock market surged today, with tech stocks leading the gains. Investor sentiment is optimistic."
      Image Description: "Inside a stock exchange trading floor, a large screen displays rising green numbers, and traders look excited."
      Audio Description: "The noisy sound of the trading floor, with phones ringing constantly and people talking enthusiastically."
      Task: Analyze the current market sentiment and possible investment trends.
    llmResult: |
      Multimodal Analysis Result:

      ## Analysis of Each Modality
      **Text Modality**: The stock market is performing strongly, with tech stocks outperforming, and market sentiment is positive.
      **Image Modality**: The atmosphere on the trading floor is active, traders are in high spirits, and market confidence is sufficient.
      **Audio Modality**: Trading activity is frequent, market participation is high, and investors are highly motivated.

      ## Cross-modal Correlation
      - All three modalities point to positive market sentiment.
      - The image and audio modalities confirm the market activity described in the text.
      - The outperformance of tech stocks and the excitement of traders corroborate each other.

      ## Comprehensive Conclusion
      Current market sentiment is very optimistic, and investor confidence is sufficient. As the leading sector, tech stocks have attracted a lot of capital. Frequent trading activity indicates high market participation, and the upward trend may continue in the short term. However, it is necessary to be aware of the risk of an overheating market.

      ## Confidence: 95%
      Reason: The multimodal information is highly consistent, and the market sentiment is clear.
  - description: "Learning Scene Recognition"
    inputText: |
      Text: "The students are discussing a math problem, and the classroom atmosphere is lively."
      Image Description: "In the classroom, students are gathered in small groups, with math textbooks and calculators on their desks. Someone is writing a formula on the blackboard."
      Audio Description: "The sound of students discussing, with occasional laughter, and the teacher's voice guiding in the background."
      Task: Evaluate the current learning environment and student engagement.
    llmResult: |
      Multimodal Analysis Result:

      ## Analysis of Each Modality
      **Text Modality**: Students are actively participating in the discussion, and the classroom atmosphere is good.
      **Image Modality**: The learning environment is orderly, students are collaborating in groups, and learning tools are complete.
      **Audio Modality**: The student discussion is active, teacher-student interaction is good, and the learning atmosphere is relaxed.

      ## Cross-modal Correlation
      - All three modalities indicate high student engagement.
      - The group discussion format and the lively discussion sound corroborate each other.
      - The teacher's guiding voice indicates that the teaching guidance is in place.

      ## Comprehensive Conclusion
      This is a high-quality learning environment with high student engagement. The group discussion format promotes interaction among students, and the complete learning tools support learning activities. The teacher-student interaction is good, and the classroom atmosphere is both lively and orderly, which is conducive to deep learning.

      ## Confidence: 92%
      Reason: The multimodal information is consistent, and the evaluation of the learning environment is reliable.
  - description: "Emotional State Analysis"
    inputText: |
      Text: "I'm in a good mood today, I've completed all my planned tasks."
      Image Description: "A person is sitting in a cafe with a laptop in front of them, with a slight smile on their face. Sunlight is streaming through the window onto the table."
      Audio Description: "Soft background music in the cafe, the rhythmic sound of keyboard typing, and the occasional sound of a coffee cup being placed gently."
      Task: Analyze this person's current emotional state and possible psychological state.
    llmResult: |
      Multimodal Analysis Result:

      ## Analysis of Each Modality
      **Text Modality**: Clearly expresses a happy mood and a strong sense of accomplishment.
      **Image Modality**: The environment is comfortable, the expression is relaxed, and the work state is focused.
      **Audio Modality**: The environment is quiet and comfortable, the work rhythm is stable, and the mood is relaxed.

      ## Cross-modal Correlation
      - The textual expression is consistent with the facial expression.
      - The comfortable environment supports the positive mood.
      - The stable work rhythm reflects a good psychological state.

      ## Comprehensive Conclusion
      This person is currently in a positive psychological state, in a good mood, and has a sense of accomplishment. The work environment is comfortable, and the work state is focused and efficient. The overall psychological state is healthy, the mood is stable, and they are in a good state of life and work.

      ## Confidence: 88%
      Reason: The multimodal information is basically consistent, and the emotional state analysis is reliable.
  - description: "Modal Conflict Handling"
    inputText: |
      Text: "This movie is boring and a waste of time."
      Image Description: "An exciting fight scene is playing on the cinema screen, and the audience is watching intently."
      Audio Description: "The movie's soundtrack is passionate, the sound effects are stunning, and the audience is gasping in amazement."
      Task: Analyze this situation where the text and audiovisual information are inconsistent. What are the possible reasons?
    llmResult: |
      Multimodal Analysis Result:

      ## Analysis of Each Modality
      **Text Modality**: The personal subjective evaluation is negative, believing the movie is boring.
      **Image Modality**: The movie content is exciting, and the audience's attention is focused.
      **Audio Modality**: The movie is well-produced, and the audience's reaction is positive.

      ## Cross-modal Correlation
      - There is a clear conflict between the text and the audiovisual information.
      - The image and audio modalities support each other, indicating that the movie quality is high.
      - The textual evaluation may be due to personal subjective preference differences.

      ## Comprehensive Conclusion
      This inconsistency reflects the difference between personal subjective evaluation and objective facts. The movie itself is well-produced, the content is exciting, and the audience's reaction is positive. The textual evaluation may stem from personal preference, different expectations, or dissatisfaction with specific plots. It is necessary to distinguish between objective quality and subjective preference.

      ## Confidence: 85%
      Reason: The modal conflict was identified, and the analysis is reasonable.
  - description: "Environmental Assessment"
    inputText: |
      Text: "This park has a beautiful environment and is suitable for leisure."
      Image Description: "The park is shaded by green trees, with elderly people playing chess, children playing, and clean paths."
      Audio Description: "The sound of birds chirping is crisp, there is soft music in the distance, and people are talking in a gentle tone."
      Task: Evaluate the overall environmental quality of this park and the types of activities it is suitable for.
    llmResult: |
      Multimodal Analysis Result:

      ## Analysis of Each Modality
      **Text Modality**: The environmental evaluation is positive, and it is suitable for leisure activities.
      **Image Modality**: The natural environment is beautiful, the facilities are complete, and the crowd structure is diverse.
      **Audio Modality**: The environment is quiet and comfortable, the atmosphere is harmonious, and it is suitable for relaxation.

      ## Cross-modal Correlation
      - All three modalities point to a high-quality environment.
      - The crowd activities and the sound environment corroborate each other.
      - The natural environment and the leisure function are highly matched.

      ## Comprehensive Conclusion
      This is a high-quality park environment with a beautiful natural environment, complete facilities, and a harmonious atmosphere. It is suitable for various leisure activities, including walking, playing chess, children's games, and social gatherings. The quiet and comfortable environment makes it an ideal place for leisure.

      ## Confidence: 95%
      Reason: The multimodal information is highly consistent, and the environmental assessment is accurate.
scoringCriteria:
  - name: "Multimodal Recognition Capability"
    weight: 2
    description: "Check if the AI can correctly identify and process information from different modalities"
    evaluationMethod: "Check if the AI can correctly identify and process information from different modalities"
    passCriteria: "Can accurately identify key information in text, image, and audio descriptions"
  - name: "Cross-modal Correlation Analysis"
    weight: 2
    description: "Evaluate if the AI can understand the correlation between information from different modalities"
    evaluationMethod: "Evaluate if the AI can understand the correlation between information from different modalities"
    passCriteria: "Can discover complementary, supporting, or conflicting relationships between modalities"
  - name: "Comprehensive Analysis Quality"
    weight: 2
    description: "Check the depth and accuracy of the comprehensive analysis"
    evaluationMethod: "Check the depth and accuracy of the comprehensive analysis"
    passCriteria: "The analysis result reflects a comprehensive understanding of multimodal information"
  - name: "Conflict Handling Capability"
    weight: 2
    description: "Evaluate the identification and handling of modal conflicts"
    evaluationMethod: "Evaluate the identification and handling of modal conflicts"
    passCriteria: "Can identify conflicts and provide reasonable explanations"
  - name: "Output Structure Clarity"
    weight: 2
    description: "Check if the output is well-structured and easy to understand"
    evaluationMethod: "Check if the output is well-structured and easy to understand"
    passCriteria: "The output includes analysis of each modality and a comprehensive conclusion, with clear logic"
promptTemplate: |
  [Your prompt here]

  Input Content:
  Text: {Text content}
  Image Description: {Image description}
  Audio Description: {Audio description}
  Task: {Specific task}
expectedOutput: |
  Multimodal Analysis Result:

  ## Analysis of Each Modality
  **Text Modality**: The user has a positive evaluation of the phone's camera function, but is not satisfied with the battery life.
  **Image Modality**: The photo quality is indeed very high, with vibrant colors and rich details, which confirms the camera's performance.
  **Audio Modality**: The camera operation is smooth, and the shutter sound is crisp, indicating that the camera is responsive.

  ## Cross-modal Correlation
  - The image modality supports the positive evaluation of the camera function in the text.
  - The audio modality further confirms the smoothness of the camera operation.
  - The information from the three modalities is highly consistent regarding the camera function.

  ## Comprehensive Conclusion
  The user's evaluation of this phone's camera function is accurate. The photo quality is indeed excellent, and the operating experience is good. However, the battery life issue does exist and needs improvement. Overall, this is a phone with an excellent camera function but with room for improvement in battery life.

  ## Confidence: 90%
  Reason: The multimodal information is highly consistent, and the analysis result is reliable.
solutionDiscussion: "https://github.com/erweixin/prompt-challenges/discussions/14"
---

## Challenge Description

Multimodal processing refers to the ability to simultaneously process multiple types of data, such as text, images, and audio. This challenge requires you to design a prompt that enables the AI to understand and process input containing multiple modalities of information for cross-modal analysis and reasoning.

## Challenge Goals

Write a prompt that enables the AI to:
1. Identify different modal information in the input (text, image descriptions, audio descriptions, etc.)
2. Understand the correlation and complementary relationship between different modal information
3. Conduct comprehensive analysis based on multimodal information
4. Generate cross-modal reasoning and conclusions
5. Handle cases where modal information is missing or inconsistent

## Requirements

- The prompt must be able to handle combined input of multiple modalities
- The analysis result should reflect a comprehensive understanding of multimodal information
- For modal conflicts, it should be able to identify and handle them reasonably
- The output should include analysis of each modality and a comprehensive conclusion
- The processing should be clear and traceable

## Prompt Template

```
[Your prompt here]

Input Content:
Text: {Text content}
Image Description: {Image description}
Audio Description: {Audio description}
Task: {Specific task}
```

## Automated Testing Process

1. For each test case, use your prompt as input
2. Analyze whether the output contains:
   - Separate analysis of each modal information
   - Cross-modal correlation analysis
   - Comprehensive conclusion
3. Evaluate the accuracy and depth of the analysis
4. Check the reasonableness of conflict handling
5. Verify the clarity of the output structure
6. Calculate the final score (out of 10)

## Expected Output Example (for Case 1)

```
Multimodal Analysis Result:

## Analysis of Each Modality
**Text Modality**: The user has a positive evaluation of the phone's camera function, but is not satisfied with the battery life.
**Image Modality**: The photo quality is indeed very high, with vibrant colors and rich details, which confirms the camera's performance.
**Audio Modality**: The camera operation is smooth, and the shutter sound is crisp, indicating that the camera is responsive.

## Cross-modal Correlation
- The image modality supports the positive evaluation of the camera function in the text.
- The audio modality further confirms the smoothness of the camera operation.
- The information from the three modalities is highly consistent regarding the camera function.

## Comprehensive Conclusion
  The user's evaluation of this phone's camera function is accurate. The photo quality is indeed excellent, and the operating experience is good. However, the battery life issue does exist and needs improvement. Overall, this is a phone with an excellent camera function but with room for improvement in battery life.

## Confidence: 90%
Reason: The multimodal information is highly consistent, and the analysis result is reliable.
```

---

Submit your solution and share your ideas and techniques with the community!
