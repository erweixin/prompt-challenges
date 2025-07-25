---
title: "格式转换"
difficulty: "warm"
tags: ["数据转换", "格式处理", "结构化数据"]
testCases:
  - description: "纯文本转JSON"
    inputText: |
      源格式: 纯文本
      目标格式: JSON
      内容: 
      姓名: 张三
      年龄: 28
      职业: 软件工程师
      技能: Python, JavaScript, Docker
      地址: 北京市海淀区
    llmResult: |
      {
        "姓名": "张三",
        "年龄": 28,
        "职业": "软件工程师",
        "技能": ["Python", "JavaScript", "Docker"],
        "地址": "北京市海淀区"
      }
  - description: "CSV转Markdown表格"
    inputText: |
      源格式: CSV
      目标格式: Markdown表格
      内容: 
      姓名,年龄,城市,职业
      李四,32,上海,产品经理
      王五,27,广州,UI设计师
      赵六,35,深圳,数据分析师
    llmResult: |
      | 姓名 | 年龄 | 城市 | 职业 |
      |------|------|------|------|
      | 李四 | 32   | 上海 | 产品经理 |
      | 王五 | 27   | 广州 | UI设计师 |
      | 赵六 | 35   | 深圳 | 数据分析师 |
  - description: "嵌套JSON转YAML"
    inputText: |
      源格式: JSON
      目标格式: YAML
      内容: 
      {
        "公司": "科技有限公司",
        "成立年份": 2010,
        "员工": [
          {"id": 1, "姓名": "张三", "部门": "研发"},
          {"id": 2, "姓名": "李四", "部门": "市场"}
        ],
        "地址": {
          "城市": "北京",
          "街道": "科技园路"
        }
      }
    llmResult: |
      公司: 科技有限公司
      成立年份: 2010
      员工:
        - id: 1
          姓名: 张三
          部门: 研发
        - id: 2
          姓名: 李四
          部门: 市场
      地址:
        城市: 北京
        街道: 科技园路
  - description: "复杂表格结构转JSON"
    inputText: |
      源格式: Markdown表格
      目标格式: JSON
      内容: 
      | 产品ID | 产品名称 | 价格 | 库存 | 分类 |
      |--------|---------|-----|------|------|
      | A001   | 智能手表 | 1299.99 | 45 | 电子产品 |
      | B002   | 保温杯   | 129.00  | 230 | 日用品 |
      | C003   | 蓝牙耳机 | 499.50  | 78 | 电子产品 |
    llmResult: |
      [
        {
          "产品ID": "A001",
          "产品名称": "智能手表",
          "价格": 1299.99,
          "库存": 45,
          "分类": "电子产品"
        },
        {
          "产品ID": "B002",
          "产品名称": "保温杯",
          "价格": 129.00,
          "库存": 230,
          "分类": "日用品"
        },
        {
          "产品ID": "C003",
          "产品名称": "蓝牙耳机",
          "价格": 499.50,
          "库存": 78,
          "分类": "电子产品"
        }
      ]
  - description: "多行文本描述转结构化数据"
    inputText: |
      源格式: 多行文本
      目标格式: JSON数组
      内容: 
      会议记录 - 2023年4月12日
      参会人员: 张三(主持), 李四, 王五, 赵六
      主要议题:
      1. 第二季度营销策略讨论
      2. 新产品发布时间表确认
      3. 团队扩充计划
      决定事项:
      - 4月底完成营销方案
      - 新产品延期至6月15日发布
      - 下周开始招聘2名开发人员
    llmResult: |
      {
        "会议日期": "2023年4月12日",
        "参会人员": ["张三(主持)", "李四", "王五", "赵六"],
        "主要议题": [
          "第二季度营销策略讨论",
          "新产品发布时间表确认",
          "团队扩充计划"
        ],
        "决定事项": [
          "4月底完成营销方案",
          "新产品延期至6月15日发布",
          "下周开始招聘2名开发人员"
        ]
      }
  - description: "XML转JSON"
    inputText: |
      源格式: XML
      目标格式: JSON
      内容: 
      <订单>
        <订单号>ORD-2023-001</订单号>
        <客户信息>
          <姓名>张三</姓名>
          <电话>13812345678</电话>
          <地址>北京市朝阳区</地址>
        </客户信息>
        <商品列表>
          <商品>
            <名称>机械键盘</名称>
            <数量>1</数量>
            <单价>499.00</单价>
          </商品>
          <商品>
            <名称>显示器</名称>
            <数量>2</数量>
            <单价>1299.00</单价>
          </商品>
        </商品列表>
        <总价>3097.00</总价>
      </订单>
    llmResult: |
      {
        "订单号": "ORD-2023-001",
        "客户信息": {
          "姓名": "张三",
          "电话": "13812345678",
          "地址": "北京市朝阳区"
        },
        "商品列表": [
          {
            "名称": "机械键盘",
            "数量": 1,
            "单价": 499.00
          },
          {
            "名称": "显示器",
            "数量": 2,
            "单价": 1299.00
          }
        ],
        "总价": 3097.00
      }
  - description: "SQL查询结果转CSV"
    inputText: |
      源格式: SQL查询结果文本
      目标格式: CSV
      内容: 
      SQL查询: SELECT id, name, department, salary FROM employees WHERE department = 'IT' ORDER BY salary DESC;

      结果:
      | id | name   | department | salary  |
      |----|--------|------------|---------|
      | 23 | 张三   | IT         | 25000   |
      | 45 | 李四   | IT         | 20000   |
      | 67 | 王五   | IT         | 18000   |
      | 89 | 赵六   | IT         | 15000   |
    llmResult: |
      id,name,department,salary
      23,张三,IT,25000
      45,李四,IT,20000
      67,王五,IT,18000
      89,赵六,IT,15000
scoringCriteria:
  - name: "数据完整性"
    weight: 1
    description: "检查转换后是否保留了原始内容的所有数据点"
    evaluationMethod: "检查转换后是否保留了原始内容的所有数据点"
    passCriteria: "不丢失任何关键信息，包括嵌套数据"
  - name: "格式规范性"
    weight: 1
    description: "评估转换后的输出是否完全符合目标格式的规范"
    evaluationMethod: "评估转换后的输出是否完全符合目标格式的规范"
    passCriteria: "输出可以被相应的解析器正确解析，格式无误"
  - name: "结构复杂度适应性"
    weight: 1
    description: "检查能否处理不同复杂度（简单、嵌套、多层）的数据结构转换"
    evaluationMethod: "检查能否处理不同复杂度（简单、嵌套、多层）的数据结构转换"
    passCriteria: "在嵌套结构和复杂表格案例中表现良好"
  - name: "数据类型准确性"
    weight: 1
    description: "评估是否正确识别和转换数字、字符串、布尔值等不同数据类型"
    evaluationMethod: "评估是否正确识别和转换数字、字符串、布尔值等不同数据类型"
    passCriteria: "数值不被错误地转为字符串，日期格式正确等"
  - name: "格式化与可读性"
    weight: 1
    description: "检查输出格式是否整洁、一致，适合人类阅读"
    evaluationMethod: "检查输出格式是否整洁、一致，适合人类阅读"
    passCriteria: "包含适当的缩进、换行和对齐，增强可读性"
promptTemplate: |
  [你的提示词]
  内容: 
  {内容}
expectedOutput: |
  {
    "姓名": "张三",
    "年龄": 28,
    "职业": "软件工程师",
    "技能": ["Python", "JavaScript", "Docker"],
    "地址": "北京市海淀区"
  }
solutionDiscussion: "https://github.com/erweixin/prompt-challenges/discussions/3"
---

## 挑战描述

在数据处理和集成过程中，我们经常需要将信息从一种格式转换为另一种格式。本挑战要求你编写一个提示词，使 AI 能够准确地将文本从一种格式（如纯文本、CSV、JSON 等）转换为另一种指定格式，同时保持数据的完整性和准确性。

## 挑战目标

编写一个提示词，使 AI 能够：
1. 识别原始文本的数据结构和格式
2. 提取所有相关信息
3. 将信息转换为指定的目标格式
4. 确保转换过程中不丢失或错误解释数据

## 要求

- 转换必须准确无误，保留所有原始数据
- 转换后的格式必须符合目标格式的规范
- 提示词必须能处理各种常见格式间的转换
- 对于不明确的数据，必须做出合理的假设并说明
- 输出必须是格式化的，便于阅读和使用

## 提示模板

```
[你的提示词]

内容: 
// (测试用例完整内容)
源格式: xxx 
目标格式: xxx
文本: xxx
```

## 测试用例

**案例 1: 纯文本转JSON**

```
源格式: 纯文本
目标格式: JSON
文本: 
姓名: 张三
年龄: 28
职业: 软件工程师
技能: Python, JavaScript, Docker
地址: 北京市海淀区
```

**案例 2: CSV转Markdown表格**

```
源格式: CSV
目标格式: Markdown表格
文本: 
姓名,年龄,城市,职业
李四,32,上海,产品经理
王五,27,广州,UI设计师
赵六,35,深圳,数据分析师 
```

**案例 3: 嵌套JSON转YAML**

```
源格式: JSON
目标格式: YAML
文本: 

{
  "公司": "科技有限公司",
  "成立年份": 2010,
  "员工": [
    {"id": 1, "姓名": "张三", "部门": "研发"},
    {"id": 2, "姓名": "李四", "部门": "市场"}
  ],
  "地址": {
    "城市": "北京",
    "街道": "科技园路"
  }
}
```

**案例 4: 复杂表格结构转JSON**

```
源格式: Markdown表格
目标格式: JSON
文本: 
| 产品ID | 产品名称 | 价格 | 库存 | 分类 |
|--------|---------|-----|------|------|
| A001   | 智能手表 | 1299.99 | 45 | 电子产品 |
| B002   | 保温杯   | 129.00  | 230 | 日用品 |
| C003   | 蓝牙耳机 | 499.50  | 78 | 电子产品 |
```

**案例 5: 多行文本描述转结构化数据**

```
源格式: 多行文本
目标格式: JSON数组
文本: 

会议记录 - 2023年4月12日
参会人员: 张三(主持), 李四, 王五, 赵六
主要议题:
1. 第二季度营销策略讨论
2. 新产品发布时间表确认
3. 团队扩充计划
```




## 自动测试流程

1. 对每个测试用例，使用你的提示词作为输入
2. 使用专门的验证器检查输出格式的有效性:
   - JSON输出通过JSON解析器验证
   - YAML输出通过YAML解析器验证
   - Markdown表格通过表格解析器验证结构
3. 比较转换前后的数据内容，确保完整性
4. 检查数据类型是否被正确保留
5. 评估格式化质量（缩进、对齐等）
6. 计算最终得分

## 期望输出示例 (针对案例1)

```
转换结果:

{
  "姓名": "张三",
  "年龄": 28,
  "职业": "软件工程师",
  "技能": ["Python", "JavaScript", "Docker"],
  "地址": "北京市海淀区"
}
```

---

提交你的解决方案，与社区分享你的思路和技巧！ 