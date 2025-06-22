你是一个 prompt 评分专家，现在要作为一个 prompt 评比大赛的评委，你要根据<大赛题目要求>和<用户作答的提示词>，给出一个对<用户作答的提示词>的评分和反馈。
- 评分标准是满分5分，分数越高表示提示词越符合要求。
- 如果有硬要求没有实现，则分别减一分，最低分为 0 分。
- 评分时要考虑提示词的清晰度、完整性、可操作性和对目标任务的适应性。
- 反馈要具体指出提示词的优点和改进建议，帮助用户提升提示词质量。
- 如果提示词已经非常优秀，可以直接给出满分5分，优化意见可以为空。
- 返回内容格式为 json 如下：
```
{
  评分: {分数},
  反馈: {具体反馈内容},
  优化意见: {具体优化建议}
}
```

### 大赛题目要求

在信息爆炸的时代，我们经常需要快速理解文章的核心内容。这个挑战要求你编写一个提示词，使 AI 能够将任何长文本准确地总结为 3-5 个关键点，每个关键点不超过 15 个字。

### 用户作答的提示词

**变量**
inputText: """The Industrial Revolution, which began in Great Britain around 1760 and had spread to North America and Western Europe by the early 19th century, fundamentally altered human society and its relationship with the environment. Prior to this period, manufacturing was predominantly done in homes using hand tools and basic machinery. The development of new machines, methods, and techniques led to a shift toward powered, special-purpose machinery, factories, and mass production.

Several factors converged to enable this transformation in Britain: an established colonial empire providing raw materials and markets, political stability after the Glorious Revolution, a strong banking system, mineral resources (especially coal), and technological innovation. The mechanization of the textile industry was particularly significant, with inventions like the flying shuttle, spinning jenny, and power loom dramatically increasing productivity.

The revolution spread to other sectors as entrepreneurs and investors sought to apply similar principles elsewhere. The development of the steam engine by Thomas Newcomen and later improvements by James Watt provided reliable, powerful energy that could be deployed anywhere, freeing industry from geographic constraints previously imposed by water power.

Transportation was revolutionized as well, with the development of steam locomotives and railways, and later steamships. These innovations reduced transportation costs and times significantly, enabling the effective movement of raw materials and finished goods.

The social impacts were equally profound. Urbanization accelerated as people moved to cities seeking employment in factories. Working conditions were often harsh, with long hours, child labor, and dangerous conditions. The resulting social tensions led to new political movements, labor organizations, and eventually regulatory reforms.

The Industrial Revolution also marked the beginning of an unprecedented rise in human population and resource consumption, setting the stage for today's environmental challenges. It represented a fundamental inflection point in human history, when economic growth began to accelerate exponentially, reshaping society and humanity's impact on the planet."""

**任务**
请你帮我总结以下文章（{{inputText}}）的核心内容，提炼出 3-5 个关键点

**输出格式**
有序列表

### 在测试以上<用户提示词>时大模型返回的内容如下

1. 工业革命推动了从家庭手工业向工厂化、机械化大规模生产的转变
始于18世纪中期的英国，工业革命通过新机器、新方法的引入，彻底改变了人类的生产方式。

2. 英国率先实现工业化的多重因素
包括殖民地资源、政治稳定、银行体系、丰富矿产（尤其是煤炭）和技术创新等，为工业革命提供了坚实基础。

3. 能源和交通技术的飞跃释放了生产力
蒸汽机的发明及其改良使工业摆脱对水源的依赖，蒸汽火车和轮船的发展显著降低了运输成本，加速了原材料和产品的流通。

4. 工业革命带来深远的社会变化与挑战
城市化加速，工厂工人面临恶劣的工作环境和社会不公，引发了劳工运动与政治改革。

5. 对环境与资源的影响奠定现代问题的基础
人口激增与资源消耗急剧上升，工业革命成为人类环境影响加剧的转折点。