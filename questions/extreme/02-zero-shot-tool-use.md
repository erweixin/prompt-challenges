# 零样本工具使用

## 🟣 地狱

### 挑战描述

现代 AI 系统越来越需要与外部工具和 API 交互，而无需为每个新工具提供详细示例。零样本工具使用（Zero-shot Tool Use）是一项关键能力，使 AI 能够仅通过工具的描述就理解并正确使用它们。本挑战要求你设计一个提示词，使 AI 能够在没有具体使用示例的情况下，推理并正确使用新的、复杂的工具集，解决多步骤任务。

### 挑战目标

编写一个提示词，使 AI 能够：
1. 仅基于文本描述理解新工具的功能和约束
2. 识别解决复杂问题所需的工具组合
3. 正确推断工具的使用顺序和参数
4. 处理工具使用过程中的错误和异常情况
5. 创造性地将多个工具组合以实现复杂目标

### 要求

- 提示词必须引导 AI 分析工具描述并推断正确用法
- 必须能处理具有复杂参数和约束的工具
- 应鼓励 AI 基于任务需求选择最适合的工具组合
- 在工具使用错误时，应能引导 AI 进行有效的错误诊断和修正
- 输出应包含清晰的工具使用计划和推理过程

### 提示模板

```
[你的提示词]

可用工具:
{工具列表及描述}

任务: {任务描述}
```

### 测试用例

**案例 1: 数据分析工具**

```
可用工具:

1. DataLoader
   - 功能: 从各种来源加载数据
   - 参数:
     * source_type: 数据源类型 (可选值: "csv", "json", "api", "database")
     * source_path: 数据源路径或URL
     * credentials: 访问凭证 (可选，仅当数据源需要时)
   - 返回: 加载的数据集对象

2. DataTransformer
   - 功能: 转换和清洗数据
   - 参数:
     * dataset: 要转换的数据集对象
     * operations: 要执行的操作列表，每个操作是一个字典，包含操作类型和参数
     * output_format: 输出格式 (可选值: "same", "csv", "json")
   - 返回: 转换后的数据集

3. DataVisualizer
   - 功能: 创建数据可视化
   - 参数:
     * dataset: 要可视化的数据集
     * chart_type: 图表类型 (可选值: "bar", "line", "scatter", "pie")
     * x_field: X轴字段名
     * y_field: Y轴字段名 (某些图表类型需要)
     * groupby: 分组字段 (可选)
     * title: 图表标题 (可选)
   - 返回: 可视化图表对象

4. ReportGenerator
   - 功能: 生成分析报告
   - 参数:
     * title: 报告标题
     * sections: 报告章节列表，每个章节是一个字典，包含标题、内容和可选的图表
     * format: 报告格式 (可选值: "html", "pdf", "markdown")
   - 返回: 生成的报告文件路径

任务: 使用这些工具从提供的JSON销售数据中加载数据，清洗数据(移除空值，转换日期格式)，创建月度销售趋势图表，并生成一个包含数据摘要和图表的销售分析报告。数据位于"sales_data.json"。
```

**案例 2: 自然语言处理工具**

```
可用工具:

1. TextExtractor
   - 功能: 从各种文档格式中提取纯文本
   - 参数:
     * source: 文档来源 (文件路径或URL)
     * format: 文档格式 (可选值: "auto", "pdf", "html", "docx")
     * pages: 要提取的页面范围 (可选，例如 "1-5,8,11-13")
   - 返回: 提取的文本内容

2. LanguageDetector
   - 功能: 检测文本的语言
   - 参数:
     * text: 要分析的文本
     * confidence_threshold: 置信度阈值 (可选，默认0.7)
   - 返回: 检测到的语言代码和置信度分数

3. SentimentAnalyzer
   - 功能: 分析文本的情感倾向
   - 参数:
     * text: 要分析的文本
     * language: 文本语言 (可选，如未提供将自动检测)
     * granularity: 分析粒度 (可选值: "document", "paragraph", "sentence")
   - 返回: 情感分析结果，包含积极/消极得分

4. TextSummarizer
   - 功能: 生成文本摘要
   - 参数:
     * text: 要总结的文本
     * max_length: 摘要最大长度 (单词数或字符数)
     * method: 摘要方法 (可选值: "extractive", "abstractive")
     * language: 文本语言 (可选，如未提供将自动检测)
   - 返回: 生成的摘要文本

5. KeywordExtractor
   - 功能: 从文本中提取关键词
   - 参数:
     * text: 要分析的文本
     * count: 要提取的关键词数量
     * language: 文本语言 (可选，如未提供将自动检测)
   - 返回: 提取的关键词列表及其重要性分数

任务: 分析一篇存储在"article.pdf"的商业新闻文章，提取文本，确定其语言，分析整体情感倾向，提取10个关键词，并生成一个不超过200单词的摘要。
```

**案例 3: 智能家居自动化工具**

```
可用工具:

1. DeviceController
   - 功能: 控制智能家居设备
   - 参数:
     * device_id: 设备标识符
     * action: 要执行的操作 (可选值: 取决于设备类型)
     * parameters: 操作参数 (可选，取决于操作类型)
   - 返回: 操作状态和结果

2. DeviceScanner
   - 功能: 扫描网络中的智能设备
   - 参数:
     * network: 网络标识符 (可选，默认当前网络)
     * device_type: 设备类型过滤器 (可选)
     * timeout: 扫描超时时间(秒) (可选，默认30)
   - 返回: 发现的设备列表，包含设备ID、类型和状态

3. SceneManager
   - 功能: 创建和管理设备场景
   - 参数:
     * action: 要执行的操作 (可选值: "create", "update", "delete", "execute")
     * scene_id: 场景标识符 (除"create"外的操作必需)
     * scene_name: 场景名称 (仅"create"操作需要)
     * devices: 场景中的设备列表，每个设备包含ID和目标状态 (创建/更新操作需要)
     * trigger: 触发场景的条件 (可选)
   - 返回: 操作状态和结果

4. ScheduleManager
   - 功能: 为设备或场景创建定时计划
   - 参数:
     * action: 要执行的操作 (可选值: "create", "update", "delete", "list")
     * schedule_id: 计划标识符 (除"create"和"list"外的操作必需)
     * target_type: 目标类型 (可选值: "device", "scene")
     * target_id: 目标标识符
     * schedule_type: 计划类型 (可选值: "once", "daily", "weekly", "monthly", "custom")
     * time: 执行时间
     * days: 执行日期 (对周期性计划)
     * action_params: 执行时的参数
   - 返回: 操作状态和计划详情

5. ConditionMonitor
   - 功能: 监控设备状态或环境条件
   - 参数:
     * monitor_type: 监控类型 (可选值: "device_state", "sensor_value", "pattern")
     * target_id: 监控目标标识符
     * condition: 触发条件
     * action: 条件满足时执行的操作
     * notification: 是否发送通知 (布尔值)
   - 返回: 监控器ID和状态

任务: 创建一个智能家居自动化方案，首先扫描网络查找所有灯光和温度传感器设备，然后创建一个场景，当室温超过26度时自动开启客厅的空调(device_id: AC_LivingRoom)，并设置定时计划在每天晚上10点将所有灯光调暗至30%亮度。
```

**案例 4: 金融数据分析和交易工具**

```
可用工具:

1. MarketDataFetcher
   - 功能: 获取金融市场数据
   - 参数:
     * symbol: 股票/资产代码
     * data_type: 数据类型 (可选值: "price", "volume", "financials", "news")
     * period: 时间段 (可选值: "1d", "5d", "1m", "3m", "6m", "1y", "5y")
     * interval: 数据间隔 (可选值: "1m", "5m", "15m", "30m", "1h", "1d")
   - 返回: 请求的市场数据

2. TechnicalAnalyzer
   - 功能: 执行技术分析计算
   - 参数:
     * data: 市场数据
     * indicator: 技术指标 (可选值: "sma", "ema", "macd", "rsi", "bollinger")
     * params: 指标参数 (字典，取决于所选指标)
   - 返回: 分析结果

3. RiskCalculator
   - 功能: 计算投资风险指标
   - 参数:
     * portfolio: 投资组合数据 (资产列表及权重)
     * metrics: 要计算的风险指标列表 (可选值: "volatility", "sharpe", "sortino", "drawdown", "var")
     * period: 计算周期 (可选)
     * confidence: 置信度 (仅对某些风险指标有效)
   - 返回: 计算的风险指标

4. PortfolioOptimizer
   - 功能: 优化投资组合配置
   - 参数:
     * assets: 可投资资产列表
     * constraints: 优化约束条件 (字典)
     * objective: 优化目标 (可选值: "return", "risk", "sharpe")
     * method: 优化方法 (可选值: "mean_variance", "black_litterman", "risk_parity")
   - 返回: 优化后的投资组合

5. TradingSimulator
   - 功能: 模拟交易策略
   - 参数:
     * strategy: 交易策略函数或规则集
     * data: 历史市场数据
     * initial_capital: 初始资金
     * commission: 交易手续费率
     * slippage: 滑点设置
   - 返回: 模拟交易结果，包括收益、交易记录等

任务: 使用这些工具分析苹果(AAPL)、微软(MSFT)和亚马逊(AMZN)过去3个月的股票数据，计算它们的移动平均线(SMA 50和SMA 200)和相对强弱指标(RSI)，评估这三只股票的风险和回报特征，并构建一个优化的投资组合，目标是在风险可控的情况下最大化夏普比率。然后，使用简单的均线交叉策略模拟该组合在过去1年的表现。
```

**案例 5: 内容创作与发布工具**

```
可用工具:

1. ContentGenerator
   - 功能: 生成各种类型的内容
   - 参数:
     * content_type: 内容类型 (可选值: "blog", "social", "email", "ad", "script")
     * topic: 内容主题
     * tone: 语调 (可选值: "professional", "casual", "enthusiastic", "serious")
     * length: 内容长度 (短/中/长 或 具体字数限制)
     * keywords: 要包含的关键词列表 (可选)
   - 返回: 生成的内容

2. MediaCreator
   - 功能: 创建多媒体内容
   - 参数:
     * media_type: 媒体类型 (可选值: "image", "infographic", "banner", "thumbnail")
     * theme: 视觉主题
     * text: 要包含的文本 (可选)
     * style: 视觉风格 (可选)
     * dimensions: 尺寸 (宽x高，单位像素)
   - 返回: 生成的媒体文件路径

3. ContentOptimizer
   - 功能: 优化内容以提高效果
   - 参数:
     * content: 要优化的内容
     * target: 优化目标 (可选值: "seo", "engagement", "conversion", "readability")
     * platform: 目标平台 (可选)
     * audience: 目标受众 (可选)
   - 返回: 优化后的内容及改进建议

4. SchedulePublisher
   - 功能: 安排内容发布
   - 参数:
     * content: 要发布的内容或内容ID
     * platform: 发布平台 (可选值: "website", "instagram", "twitter", "linkedin", "email")
     * schedule_time: 计划发布时间
     * audience: 目标受众群组 (可选)
     * settings: 平台特定的发布设置 (可选)
   - 返回: 发布计划详情

5. PerformanceAnalyzer
   - 功能: 分析内容表现
   - 参数:
     * content_ids: 要分析的内容ID列表
     * metrics: 要评估的指标列表 (可选值: "views", "engagement", "conversion", "roi")
     * period: 分析周期
     * comparison: 比较基准 (可选)
   - 返回: 性能分析报告

任务: 为一家销售有机食品的电子商务网站策划并执行一个内容营销活动。先生成一篇关于有机食品健康益处的SEO优化博客文章，创建一个配套的吸引人的信息图表，针对SEO和读者参与度优化内容，安排在下周一上午9点发布到网站和LinkedIn平台，并设置在发布后7天分析其性能指标，重点关注网站访问量和转化率。
```

### 评分标准和自动测试方法

提示词将根据以下标准进行评分：

1. **工具功能理解**（1分）
   - 评估方法: 检查AI是否正确理解每个工具的核心功能和限制
   - 通过标准: 选择的工具与其预期功能一致，没有明显的功能误解

2. **参数推断准确性**（1分）
   - 评估方法: 评估AI是否能正确推断每个工具所需的参数和值
   - 通过标准: 所有必需参数都被正确指定，可选参数在需要时被合理使用

3. **工具组合与顺序**（1分）
   - 评估方法: 检查是否以最优或接近最优的顺序组合工具
   - 通过标准: 工具使用顺序符合逻辑依赖关系，无冗余步骤，数据流动合理

4. **错误处理与鲁棒性**（1分）
   - 评估方法: 评估是否预测并处理可能的错误情况
   - 通过标准: 提供错误检查或备选方案，考虑边缘情况

5. **方案完整性与创新性**（1分）
   - 评估方法: 评估解决方案是否完整实现任务目标，是否有创新的工具组合方式
   - 通过标准: 方案能完全实现任务目标，在适当情况下使用创新的工具组合

### 自动测试流程

1. 对每个测试用例，使用你的提示词和工具描述、任务作为输入
2. 分析输出中提到的每个工具使用是否符合工具描述
3. 验证参数使用是否正确（必要参数存在，参数类型匹配）
4. 检查工具调用顺序是否符合逻辑（例如，不使用尚未创建的数据）
5. 评估是否考虑了潜在的错误处理
6. 验证最终结果是否满足任务要求
7. 计算最终得分(满分5分)

### 期望输出示例 (针对案例1)

```
我将分析这些工具并创建一个处理销售数据的解决方案。

## 理解工具功能
首先，我需要理解每个工具的功能:
- DataLoader: 从不同来源加载数据
- DataTransformer: 用于转换和清洗数据
- DataVisualizer: 创建数据可视化
- ReportGenerator: 生成数据分析报告

## 解决方案计划
任务要求我加载JSON销售数据，清洗数据，创建月度趋势图表，并生成报告。我将按以下步骤使用工具:

### 步骤1: 加载数据
使用DataLoader从sales_data.json加载数据:
```
加载操作 = DataLoader(
    source_type="json",
    source_path="sales_data.json"
)
```
这将返回一个数据集对象，我们称之为sales_dataset。

### 步骤2: 转换和清洗数据
使用DataTransformer处理数据:
```
清洗操作 = DataTransformer(
    dataset=sales_dataset,
    operations=[
        {"type": "remove_nulls", "columns": "all"},
        {"type": "date_format", "column": "sale_date", "format": "YYYY-MM-DD"}
    ],
    output_format="same"
)
```
这将返回一个转换后的数据集，我们称之为cleaned_dataset。

### 步骤3: 创建月度销售趋势图表
使用DataVisualizer创建趋势图:
```
趋势图 = DataVisualizer(
    dataset=cleaned_dataset,
    chart_type="line",
    x_field="sale_date",
    y_field="amount",
    groupby="month",  # 假设我们需要按月分组
    title="月度销售趋势"
)
```
这将创建一个月度销售趋势的线图。

### 步骤4: 生成销售分析报告
最后，使用ReportGenerator生成完整报告:
```
报告 = ReportGenerator(
    title="销售数据分析报告",
    sections=[
        {
            "title": "概述",
            "content": "本报告分析了公司销售数据，展示了月度销售趋势和关键指标。"
        },
        {
            "title": "销售趋势分析",
            "content": "以下图表显示了月度销售额变化趋势。",
            "chart": 趋势图
        },
        {
            "title": "数据摘要",
            "content": "销售数据摘要包括总销售额、平均订单价值和销售峰值月份。"
        }
    ],
    format="pdf"
)
```

## 潜在错误处理
在执行过程中可能遇到的问题及处理方法:
1. 如果JSON文件不存在或格式无效，DataLoader会失败。解决方案：先检查文件是否存在，必要时提供备用数据源。
2. 日期格式转换可能失败。解决方案：添加错误处理来捕获并修复无效日期格式。
3. 如果数据中没有足够的月度数据点，趋势图可能不够有意义。解决方案：确保有足够数据，或切换到更适合的时间粒度。

## 最终评估
该方案涵盖了任务的所有要求，按照合理的顺序使用工具，并考虑了潜在的错误情况。报告的结构包含了数据摘要和可视化图表，使销售趋势分析清晰明了。
```

### 解决方案讨论

[点击查看社区解决方案](https://github.com/erweixin/prompt-challenges/discussions/12)

---

提交你的解决方案，与社区分享你的思路和技巧！ 