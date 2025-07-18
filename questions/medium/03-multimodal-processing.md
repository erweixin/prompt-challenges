# 多模态处理

## 🟡 中等

### 挑战描述

多模态处理是指同时处理文本、图像、音频等多种类型数据的能力。本挑战要求你设计一个提示词，使 AI 能够理解并处理包含多种模态信息的输入，进行跨模态的分析和推理。

### 挑战目标

编写一个提示词，使 AI 能够：
1. 识别输入中的不同模态信息（文本、图像描述、音频描述等）
2. 理解不同模态信息之间的关联和互补关系
3. 基于多模态信息进行综合分析
4. 生成跨模态的推理和结论
5. 处理模态信息缺失或不一致的情况

### 要求

- 提示词必须能处理多种模态的组合输入
- 分析结果应体现多模态信息的综合理解
- 对于模态冲突，应能识别并合理处理
- 输出应包含对每个模态的分析和综合结论
- 处理过程应清晰可追溯

### 提示模板

```
[你的提示词]

输入内容:
文本: {文本内容}
图像描述: {图像描述}
音频描述: {音频描述}
任务: {具体任务}
```

### 测试用例

**案例 1: 产品评价分析**

```
文本: "这款手机拍照效果不错，但是电池续航一般。"
图像描述: "手机屏幕显示着一张清晰的城市夜景照片，色彩鲜艳，细节丰富。"
音频描述: "用户点击拍照按钮的声音，快门声清脆。"
任务: 分析用户对这款手机的整体评价，特别关注拍照功能。
```

**案例 2: 新闻事件理解**

```
文本: "今日股市大涨，科技股领涨，投资者情绪乐观。"
图像描述: "股票交易大厅内，大屏幕显示绿色上涨数字，交易员们表情兴奋。"
音频描述: "交易大厅内嘈杂的声音，电话铃声此起彼伏，人们交谈声热烈。"
任务: 分析当前市场情绪和可能的投资趋势。
```

**案例 3: 学习场景识别**

```
文本: "学生们正在讨论数学问题，课堂氛围活跃。"
图像描述: "教室内，学生们围成小组，桌上摆着数学课本和计算器，有人在黑板上写公式。"
音频描述: "学生们讨论的声音，偶尔有笑声，老师的声音在背景中指导。"
任务: 评估当前的学习环境和学生参与度。
```

**案例 4: 情感状态分析**

```
文本: "我今天心情很好，完成了所有计划的任务。"
图像描述: "一个人坐在咖啡厅里，面前放着笔记本电脑，嘴角微微上扬，阳光透过窗户洒在桌上。"
音频描述: "咖啡厅内轻柔的背景音乐，键盘敲击声有节奏，偶尔有咖啡杯轻放的声音。"
任务: 分析这个人的当前情感状态和可能的心理状态。
```

**案例 5: 模态冲突处理**

```
文本: "这部电影很无聊，浪费时间。"
图像描述: "电影院屏幕上播放着精彩的打斗场面，观众们聚精会神地观看。"
音频描述: "电影配乐激昂，音效震撼，观众发出惊叹声。"
任务: 分析这种文本与视听信息不一致的情况，可能的原因是什么。
```

**案例 6: 环境评估**

```
文本: "这个公园环境优美，适合休闲。"
图像描述: "公园内绿树成荫，有老人下棋，儿童玩耍，小径整洁。"
音频描述: "鸟叫声清脆，远处有轻柔的音乐声，人们交谈声温和。"
任务: 评估这个公园的整体环境质量和适合的活动类型。
```

### 评分标准和自动测试方法

提示词将根据以下标准进行评分：

1. **多模态识别能力**（2分）
   - 评估方法: 检查AI是否能正确识别和处理不同模态的信息
   - 通过标准: 能准确识别文本、图像、音频描述中的关键信息

2. **跨模态关联分析**（2分）
   - 评估方法: 评估AI是否能理解不同模态信息之间的关联
   - 通过标准: 能发现模态间的互补、支持或冲突关系

3. **综合分析质量**（2分）
   - 评估方法: 检查综合分析的深度和准确性
   - 通过标准: 分析结果体现多模态信息的综合理解

4. **冲突处理能力**（2分）
   - 评估方法: 评估对模态冲突的识别和处理
   - 通过标准: 能识别冲突并给出合理的解释

5. **输出结构清晰度**（2分）
   - 评估方法: 检查输出是否结构清晰，易于理解
   - 通过标准: 输出包含各模态分析和综合结论，逻辑清晰

### 自动测试流程

1. 对每个测试用例，使用你的提示词作为输入
2. 分析输出是否包含：
   - 对各模态信息的单独分析
   - 跨模态关联分析
   - 综合结论
3. 评估分析的准确性和深度
4. 检查冲突处理的合理性
5. 验证输出结构的清晰度
6. 计算最终得分(满分10分)

### 期望输出示例 (针对案例1)

```
多模态分析结果:

## 各模态分析
**文本模态**: 用户对手机拍照功能评价积极，但对电池续航不满意
**图像模态**: 照片质量确实很高，色彩鲜艳，细节丰富，证实了拍照效果
**音频模态**: 拍照操作流畅，快门声清脆，说明相机响应良好

## 跨模态关联
- 图像模态支持了文本中对拍照功能的正面评价
- 音频模态进一步证实了相机操作的流畅性
- 三个模态信息在拍照功能方面高度一致

## 综合结论
用户对这款手机拍照功能的评价是准确的，照片质量确实优秀，操作体验良好。但电池续航问题确实存在，这是需要改进的地方。整体而言，这是一款拍照功能出色但续航有待提升的手机。

## 置信度: 90%
理由: 多模态信息高度一致，分析结果可靠。
```

### 解决方案讨论

[点击查看社区解决方案](https://github.com/erweixin/prompt-challenges/discussions/14)

---

提交你的解决方案，与社区分享你的思路和技巧！ 