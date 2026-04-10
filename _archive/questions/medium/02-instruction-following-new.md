---
title: "指令遵循"
difficulty: "medium"
tags: ["指令遵循", "规则应用", "格式控制"]
testCases:
  - description: "数据处理和格式化"
    inputText: |
      任务: 分析以下文本，提取所有人名和对应的年龄。将结果按年龄从大到小排序，以JSON格式输出。对于没有明确提及年龄的人，假定其年龄为30岁。如果有多人年龄相同，则按姓名字母顺序排序。只包含实际出现在文本中的人名，不要推测。输出中不要包含任何解释或说明。

      "张伟和他的妻子李娜（42岁）昨天参加了王刚的60岁生日派对。张伟比他妻子小5岁。王刚的女儿王小美也来了，她刚大学毕业。李娜的弟弟李强今年35岁，也是座上宾。"
    llmResult: |
      [
        {"name": "王刚", "age": 60},
        {"name": "李娜", "age": 42},
        {"name": "李强", "age": 35},
        {"name": "张伟", "age": 37},
        {"name": "王小美", "age": 30}
      ]
  - description: "条件文本生成"
    inputText: |
      任务: 写一篇不超过200字的短文，主题是"人工智能的未来"。文章必须包含至少3个专业术语，每个术语首次出现时必须用括号做简短解释。不能使用"发展"、"技术"和"创新"这三个词。文章的每个段落首字母连起来必须能拼成"AI"。最后增加一个总结句，但不要使用"总之"、"总结"或"最后"等明显的总结标志词。
    llmResult: |
      Artificial intelligence (AI) is reshaping our world in profound ways. Machine learning (ML) algorithms are becoming increasingly sophisticated, enabling computers to learn from data without explicit programming. Neural networks (NN) mimic the human brain's structure, allowing AI systems to recognize patterns and make decisions.

      Intelligent automation is transforming industries across the globe. From healthcare to transportation, AI-powered systems are enhancing efficiency and accuracy. The integration of natural language processing (NLP) enables seamless human-computer interaction.

      As we move forward, the ethical implications of AI become increasingly important. We must ensure that these powerful tools serve humanity's best interests while addressing potential risks and challenges.
  - description: "复杂规则应用"
    inputText: |
      任务: 你是一个邮件分类助手。根据以下规则对邮件进行分类，并按指定格式回复：

      规则1: 含有"urgent"、"asap"或"immediately"词语的邮件优先级为"高"
      规则2: 来自域名以"company.com"结尾的邮件归类为"内部"，其他为"外部"
      规则3: 邮件正文超过100字的标记为"需要详细阅读"
      规则4: 如果邮件同时符合规则1和来自CEO(邮箱ceo@company.com)，则无论其他规则如何，都标记为"立即处理"
      规则5: 包含附件的邮件添加标签"有附件"

      输出格式必须为: [优先级] | [来源] | [标签1, 标签2, ...]

      邮件:
      From: manager@company.com
      To: you@company.com
      Subject: Quarterly Report Review
      Attachments: report.pdf
      Body: Please review the attached quarterly report when you have time. We'll discuss it in next week's meeting.
    llmResult: |
      中 | 内部 | 需要详细阅读, 有附件
  - description: "多步骤指令执行"
    inputText: |
      任务: 请按照以下步骤处理数据：

      1. 将以下数字列表按升序排列：[23, 7, 45, 12, 89, 3, 67]
      2. 计算所有数字的平均值
      3. 找出最大值和最小值
      4. 计算最大值与最小值的差值
      5. 将结果以以下格式输出：
         排序后: [数字列表]
         平均值: [数值]
         最大值: [数值]
         最小值: [数值]
         差值: [数值]
    llmResult: |
      排序后: [3, 7, 12, 23, 45, 67, 89]
      平均值: 35.14
      最大值: 89
      最小值: 3
      差值: 86
  - description: "条件格式转换"
    inputText: |
      任务: 将以下文本转换为指定格式，遵循以下规则：

      1. 将所有数字用方括号包围
      2. 将所有人名用双引号包围
      3. 将时间用尖括号包围
      4. 如果某个词既是数字又是人名，优先按人名处理
      5. 保持原文的标点符号不变
      6. 输出格式：转换后的文本

      原文：张三在[2023]年[3]月[15]日花了[100]元买了[5]本书，其中[3]本是给李四的。
    llmResult: |
      转换后的文本："张三"在<[2023]年[3]月[15]日>花了[100]元买了[5]本书，其中[3]本是给"李四"的。
  - description: "优先级冲突处理"
    inputText: |
      任务: 根据以下优先级规则处理文本：

      规则1（最高优先级）：如果文本包含"紧急"，则输出"立即处理"
      规则2：如果文本包含"重要"，则输出"优先处理"
      规则3：如果文本包含"普通"，则输出"正常处理"
      规则4（最低优先级）：如果文本包含"延迟"，则输出"延后处理"

      如果多个规则同时适用，按优先级执行。如果都不适用，输出"待分类"。

      文本：这是一个重要的项目，但可以延迟处理。
    llmResult: |
      优先处理
  - description: "格式验证和修正"
    inputText: |
      任务: 验证并修正以下JSON格式，确保：

      1. 所有字符串用双引号包围
      2. 所有数字不加引号
      3. 布尔值使用true/false
      4. 数组和对象格式正确
      5. 移除多余的逗号
      6. 如果格式完全正确，输出"格式正确"

      输入：{name: '张三', age: "25", active: true, scores: [85, 90, "95"], address: {city: 北京, country: '中国'}}
    llmResult: |
      {
        "name": "张三",
        "age": 25,
        "active": true,
        "scores": [85, 90, 95],
        "address": {
          "city": "北京",
          "country": "中国"
        }
      }
scoringCriteria:
  - name: "指令理解"
    weight: 1
    description: "检查AI是否正确理解所有指令方面"
    evaluationMethod: "检查AI是否正确理解所有指令方面"
    passCriteria: "展示对主要和次要要求的清晰理解"
  - name: "规则应用准确性"
    weight: 1
    description: "评估所有规则（包括例外）的正确应用"
    evaluationMethod: "评估所有规则（包括例外）的正确应用"
    passCriteria: "按正确的优先顺序正确应用所有规则"
  - name: "格式合规性"
    weight: 1
    description: "验证严格遵守输出格式要求"
    evaluationMethod: "验证严格遵守输出格式要求"
    passCriteria: "输出完全匹配指定格式，无偏差"
  - name: "边缘情况处理"
    weight: 1
    description: "测试AI如何处理模糊和特殊情况"
    evaluationMethod: "测试AI如何处理模糊和特殊情况"
    passCriteria: "做出与指令意图一致的合理判断"
  - name: "指令优先级处理"
    weight: 1
    description: "检查AI是否正确优先处理冲突指令"
    evaluationMethod: "检查AI是否正确优先处理冲突指令"
    passCriteria: "基于明确或隐含的优先级提示解决冲突"
promptTemplate: |
  [你的提示词]

  任务: {任务描述}
expectedOutput: |
  [
    {"name": "王刚", "age": 60},
    {"name": "李娜", "age": 42},
    {"name": "李强", "age": 35},
    {"name": "张伟", "age": 37},
    {"name": "王小美", "age": 30}
  ]
solutionDiscussion: "https://github.com/erweixin/prompt-challenges/discussions/6"
---

## 挑战描述

在提示词工程中，确保 AI 准确理解并遵循复杂指令的能力至关重要。特别是在多步骤任务、特定格式要求或需要精确控制输出的场景下，指令遵循的质量直接影响结果。本挑战要求你设计一个提示词，使 AI 能够严格按照一系列复杂指令行事，即使这些指令看似矛盾或有特殊的执行顺序。

## 挑战目标

编写一个提示词，使 AI 能够：
1. 准确理解多步骤、多条件的复杂指令
2. 按照指定的优先级和顺序执行指令
3. 在指令有不明确之处时做出合理的判断
4. 完全遵循格式要求和输出限制
5. 处理看似矛盾的指令（如有条件的规则例外）

## 要求

- 提示词必须包含清晰的指令层次和优先级
- 输出必须严格符合指定格式
- 指令中应包含一些特殊条件或例外情况
- 提示词应能指导 AI 在复杂场景中做出合理判断
- 任务完成后应有明确的验证机制

## 提示模板

```
[你的提示词]

任务: {任务描述}
```

## 自动测试流程

1. 对于每个测试案例，将您的提示词与指定任务作为输入使用
2. 分析输出：
   - 符合格式要求
   - 正确应用规则和例外
   - 准确处理边缘情况和模糊性
   - 适当优先处理冲突指令
3. 与每个测试案例的参考输出进行比较
4. 计算最终得分（最高5分）

## 预期输出示例（针对案例1）

```json
[
  {"name": "王刚", "age": 60},
  {"name": "李娜", "age": 42},
  {"name": "李强", "age": 35},
  {"name": "张伟", "age": 37},
  {"name": "王小美", "age": 30}
]
```

---

提交你的解决方案，与社区分享你的思路和技巧！ 