# Prompt Challenges

<p align="center">
  <img src="https://your-logo-url-here.png" alt="Prompt Challenges Logo" width="300"/>
</p>

<p align="center">
  Collection of prompt engineering challenges to enhance your AI prompting skills
</p>

<p align="center">
  <a href="./README.zh.md">简体中文</a> | 
  <a href="./README.md">English</a>
</p>

## Introduction

Prompt Challenges is a collection of challenges designed to help you improve your AI prompt engineering skills. Similar to how the [Type Challenges](https://github.com/type-challenges/type-challenges) project explores the TypeScript type system, Prompt Challenges encourages you to master effective AI prompting techniques through practice.

## Challenge Difficulty

Challenges are categorized by difficulty levels:

- 🟢 Easy: Entry-level prompt tasks suitable for beginners
- 🟡 Medium: Requires some prompt engineering experience and techniques
- 🔴 Hard: Complex prompt tasks that require deep understanding of AI model behavior
- 🟣 Extreme: Highly challenging tasks requiring advanced prompt engineering skills and innovative thinking

## All Challenges

### 🟢 Easy
- [Text Summarization](./questions/warm/00-text-summary.md) - Create concise and comprehensive text summaries
- [Sentiment Analysis](./questions/warm/01-sentiment-analysis.md) - Accurately identify the sentiment of a text
- [Format Conversion](./questions/warm/02-format-conversion.md) - Convert text from one format to another

### 🟡 Medium
- [Role Playing](./questions/medium/00-role-playing.md) - Design expert role prompts
- [Reverse Thinking](./questions/medium/01-reverse-thinking.md) - Solve problems through reverse reasoning
- [Instruction Following](./questions/medium/02-instruction-following.md) - Ensure the model strictly follows complex instructions

### 🔴 Hard
- [Chain of Thought](./questions/hard/00-chain-of-thought.md) - Guide the model through multi-step reasoning
- [Prompt Injection Defense](./questions/hard/01-prompt-injection-defense.md) - Prevent malicious prompt hijacking
- [Counterfactual Reasoning](./questions/hard/02-counterfactual-reasoning.md) - Reason logically in hypothetical scenarios

### 🟣 Extreme
- [Self-Improving Prompt](./questions/extreme/00-self-improving-prompt.md) - Create prompts that can self-optimize
- [Adversarial Q&A](./questions/extreme/01-adversarial-qa.md) - Design prompts that can handle adversarial questions
- [Zero-Shot Tool Use](./questions/extreme/02-zero-shot-tool-use.md) - Make models learn to use new tools without examples

## How to Participate

1. Browse the [challenge list](./questions/README.en.md)
2. Choose a challenge that interests you
3. Read the requirements and write your prompt
4. Test your prompt with the appropriate AI model
5. Submit your solution to share with the community

## Learning Resources

- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [OpenAI Prompt Engineering Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)
- [AI Prompting Patterns](https://learnprompting.org/docs/category/-prompt-engineering-patterns)

## Contribution Guidelines

### Submit a New Challenge

1. Fork this repository
2. Create a new challenge file in the `questions` directory
3. Follow the format of existing challenges
4. Submit a Pull Request

### Contribute Solutions

1. Find a challenge you want to solve
2. Write your prompt solution
3. Share your solution in the discussion area of the corresponding challenge

## Example Challenge

### Easy Challenge: Text Summarization

**Goal**: Write a prompt that enables AI to accurately summarize any long text into 3-5 key points.

**Requirements**:
- Summaries must contain the main points of the original text
- Each key point must not exceed 15 words
- Be objective and not add information not present in the original text

**Prompt Template**:
```
[Your prompt]

Text: {text content}
```

## Community

- [discussions](https://github.com/erweixin/prompt-challenges/discussions)

## License

MIT