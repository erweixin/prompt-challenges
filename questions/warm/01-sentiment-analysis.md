# 情感分析

## 🟢 简单

### 挑战描述

情感分析是自然语言处理中的一项基础任务，用于判断文本表达的情感倾向。本挑战要求你编写一个提示词，使 AI 能够准确地分析出文本中表达的情感，并给出情感类别和情感强度。

### 挑战目标

编写一个提示词，使 AI 能够：
1. 识别文本中的情感倾向（积极、消极或中性）
2. 判断情感的强度（1-5分，其中1分为最弱，5分为最强）
3. 提取表达情感的关键词或短语
4. 对分析结果给出简短的解释（不超过20字）

### 要求

- 分析结果必须包含情感倾向、强度、关键词和简短解释
- 情感倾向只能是积极、消极或中性之一
- 情感强度必须是1-5的整数
- 分析必须基于文本内容，不添加主观臆断
- 输出格式必须统一且简洁

### 提示模板

```
[你的提示词]

文本: {文本内容}
```

### 测试用例

**案例 1: 产品评论-积极**

```
文本: 这款手机性价比非常高，屏幕显示效果出色，拍照也很清晰。不过电池续航一般，充电速度有点慢，总体来说还是很满意的购买。
```

**案例 2: 新闻评论-消极**

```
文本: 这次政府的决策令人失望，完全没有考虑到普通民众的利益。政策出台太仓促，缺乏深入调研，恐怕会引发更多社会问题。
```

**案例 3: 中性陈述**

```
文本: 根据最新数据，今年第一季度GDP增长3.2%，略高于去年同期，但低于市场预期。分析师认为这一数据反映了当前经济的复杂状况。
```

**案例 4: 混合情感**

```
文本: 这部电影的视觉效果令人惊叹，特效制作精良，但剧情发展缓慢且人物刻画肤浅。演员表演尚可，音乐也不错，但整体体验平淡无奇。
```

**案例 5: 微妙情感**

```
文本: 会议按计划进行，参与者讨论了所有议程项目。有些人提出了建设性意见，也有人表达了顾虑。我们同意下周再次会面继续讨论这些问题。
```

**案例 6: 强烈积极情感**

```
文本: 我简直无法用言语表达我有多喜欢这个产品！它彻底改变了我的生活，解决了我所有的问题。每天使用都让我感到无比愉悦，绝对是我见过的最完美的设计！强烈推荐给所有人！
```

**案例 7: 强烈消极情感**

```
文本: 这是我经历过的最糟糕的服务！员工态度极其恶劣，完全不关心客户需求。我等了两个小时却得到了错误的产品，然后他们拒绝退款。绝不会再光顾，也强烈建议所有人远离这家公司！
```

### 评分标准和自动测试方法

提示词将根据以下标准进行评分：

1. **情感倾向识别准确度**（1分）
   - 评估方法: 检查AI是否能正确识别文本的主要情感倾向(积极/消极/中性)
   - 通过标准: 在至少6/7个测试用例中正确识别情感倾向

2. **情感强度判断合理性**（1分）
   - 评估方法: 评估AI判断的情感强度是否与文本内容相符
   - 通过标准: 强度评分与预期评分相差不超过1分

3. **关键词提取相关性**（1分）
   - 评估方法: 检查提取的关键词是否确实反映了情感表达
   - 通过标准: 至少提取3个与情感相关的关键词/短语

4. **分析简洁性与解释合理性**（1分）
   - 评估方法: 评估解释的简洁性（不超过20字）和合理性
   - 通过标准: 解释言简意赅且直接指出情感根源

5. **输出格式一致性**（1分）
   - 评估方法: 检查所有输出是否遵循一致的格式
   - 通过标准: 所有案例的输出格式完全一致

### 自动测试流程

1. 对每个测试用例，使用你的提示词作为输入
2. 分析输出中是否包含:
   - 明确标识的情感倾向（积极/消极/中性）
   - 1-5的整数强度评分
   - 至少3个关键词或短语
   - 不超过20字的解释
3. 将输出与专家标注的标准答案比较
4. 检查不同测试用例间输出格式的一致性
5. 计算最终得分(满分5分)

### 期望输出示例 (针对案例1)

```
情感分析结果:
- 情感倾向: 积极
- 情感强度: 4
- 关键词/短语: "性价比非常高", "屏幕显示效果出色", "拍照很清晰", "很满意的购买"
- 简短解释: 优点明显多于缺点，整体满意

注: 尽管提到电池续航一般和充电慢的缺点，但正面评价占主导，最后也表达了整体满意。
```

### 解决方案讨论

[点击查看社区解决方案](https://github.com/erweixin/prompt-challenges/discussions/2)

---

提交你的解决方案，与社区分享你的思路和技巧！ 