# Prompt Challenges

<p align="center">
  <img src="https://your-logo-url-here.png" alt="Prompt Challenges Logo" width="300"/>
</p>

<p align="center">
  收集和创建提示词挑战，提高你的 AI 提示词工程能力
</p>

<p align="center">
  <a href="./README.zh.md">简体中文</a> | 
  <a href="./README.md">English</a>
</p>

## 介绍

Prompt Challenges 是一系列旨在帮助你提高 AI 提示词工程（Prompt Engineering）能力的挑战。类似于 [Type Challenges](https://github.com/type-challenges/type-challenges) 项目对 TypeScript 类型系统的探索，Prompt Challenges 鼓励你通过实践来掌握高效的 AI 提示词编写技巧。

## 挑战难度

挑战按照难度分为以下几个级别：

- 🟢 简单: 入门级别的提示词任务，适合初学者
- 🟡 中等: 需要一些提示词工程经验和技巧
- 🔴 困难: 复杂的提示词任务，需要深入理解 AI 模型行为和提示词技巧
- 🟣 地狱: 极具挑战性的任务，需要高级提示词工程技能和创新思维

## 所有挑战

### 🟢 简单
- [文本摘要](./questions/warm/00-text-summary.md) - 创建简洁而全面的文本摘要
- [情感分析](./questions/warm/01-sentiment-analysis.md) - 准确识别文本的情感倾向
- [格式转换](./questions/warm/02-format-conversion.md) - 将文本从一种格式转换为另一种格式

### 🟡 中等
- [角色扮演](./questions/medium/00-role-playing.md) - 设计专家角色提示词
- [逆向思维](./questions/medium/01-reverse-thinking.md) - 通过反向推理解决问题
- [指令遵循](./questions/medium/02-instruction-following.md) - 确保模型严格按照复杂指令行事

### 🔴 困难
- [思维链](./questions/hard/00-chain-of-thought.md) - 引导模型进行多步推理
- [提示词注入防御](./questions/hard/01-prompt-injection-defense.md) - 防止提示词被恶意篡改
- [反事实推理](./questions/hard/02-counterfactual-reasoning.md) - 在假设情境下进行合理推理

### 🟣 地狱
- [自我改进提示词](./questions/extreme/00-self-improving-prompt.md) - 创建能够自我优化的提示词
- [多轮对抗问答](./questions/extreme/01-adversarial-qa.md) - 设计能够应对对抗性问题的提示词
- [零样本工具使用](./questions/extreme/02-zero-shot-tool-use.md) - 无需示例让模型学会使用新工具

## 如何参与

1. 浏览 [挑战列表](./questions/README.md)
2. 选择一个你感兴趣的挑战
3. 阅读挑战要求，编写你的提示词
4. 使用相应的 AI 模型测试你的提示词
5. 提交你的解决方案与社区分享

## 学习资源

- [提示词工程指南](https://www.promptingguide.ai/zh)
- [Prompt Engineering 最佳实践](https://platform.openai.com/docs/guides/prompt-engineering)
- [AI 提示词模式](https://learnprompting.org/docs/category/-prompt-engineering-patterns)

## 贡献指南

### 提交新的挑战

1. Fork 本仓库
2. 在 `questions` 目录下创建新的挑战文件
3. 遵循现有挑战的格式编写你的挑战
4. 提交 Pull Request

### 贡献解决方案

1. 找到你想要解决的挑战
2. 编写你的提示词解决方案
3. 在对应挑战的讨论区分享你的解决方案

## 挑战示例

### 简单挑战: 文本摘要

**目标**: 编写一个提示词，使 AI 能够将任何长文本准确地总结为 3-5 个关键点。

**要求**:
- 总结必须包含原文的主要观点
- 每个关键点不超过 15 个字
- 保持客观，不添加原文没有的信息

**提示模板**:
```
[你的提示词]

文本: {文本内容}
```

## 社区

- [discussions](https://github.com/erweixin/prompt-challenges/discussions)

## 许可

MIT 