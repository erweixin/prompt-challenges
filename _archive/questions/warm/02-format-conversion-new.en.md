---
title: "Format Conversion"
difficulty: "warm"
tags: ["Data Transformation", "Format Handling", "Structured Data"]
testCases:
  - description: "Plain Text to JSON"
    inputText: |
      Source Format: Plain Text
      Target Format: JSON
      Content:
      Name: Zhang San
      Age: 28
      Occupation: Software Engineer
      Skills: Python, JavaScript, Docker
      Address: Haidian District, Beijing
    llmResult: |
      {
        "Name": "Zhang San",
        "Age": 28,
        "Occupation": "Software Engineer",
        "Skills": ["Python", "JavaScript", "Docker"],
        "Address": "Haidian District, Beijing"
      }
  - description: "CSV to Markdown Table"
    inputText: |
      Source Format: CSV
      Target Format: Markdown Table
      Content:
      Name,Age,City,Occupation
      Li Si,32,Shanghai,Product Manager
      Wang Wu,27,Guangzhou,UI Designer
      Zhao Liu,35,Shenzhen,Data Analyst
    llmResult: |
      | Name | Age | City | Occupation |
      |------|------|------|------------|
      | Li Si | 32   | Shanghai | Product Manager |
      | Wang Wu | 27   | Guangzhou | UI Designer |
      | Zhao Liu | 35   | Shenzhen | Data Analyst |
  - description: "Nested JSON to YAML"
    inputText: |
      Source Format: JSON
      Target Format: YAML
      Content:
      {
        "Company": "Tech Co. Ltd.",
        "Founded Year": 2010,
        "Employees": [
          {"id": 1, "Name": "Zhang San", "Department": "R&D"},
          {"id": 2, "Name": "Li Si", "Department": "Marketing"}
        ],
        "Address": {
          "City": "Beijing",
          "Street": "Technology Park Road"
        }
      }
    llmResult: |
      Company: Tech Co. Ltd.
      Founded Year: 2010
      Employees:
        - id: 1
          Name: Zhang San
          Department: R&D
        - id: 2
          Name: Li Si
          Department: Marketing
      Address:
        City: Beijing
        Street: Technology Park Road
  - description: "Complex Table Structure to JSON"
    inputText: |
      Source Format: Markdown Table
      Target Format: JSON
      Content:
      | Product ID | Product Name | Price | Stock | Category |
      |--------|---------|-----|------|----------|
      | A001   | Smartwatch | 1299.99 | 45 | Electronics |
      | B002   | Vacuum Flask | 129.00  | 230 | Daily Necessities |
      | C003   | Bluetooth Earphones | 499.50  | 78 | Electronics |
    llmResult: |
      [
        {
          "Product ID": "A001",
          "Product Name": "Smartwatch",
          "Price": 1299.99,
          "Stock": 45,
          "Category": "Electronics"
        },
        {
          "Product ID": "B002",
          "Product Name": "Vacuum Flask",
          "Price": 129.00,
          "Stock": 230,
          "Category": "Daily Necessities"
        },
        {
          "Product ID": "C003",
          "Product Name": "Bluetooth Earphones",
          "Price": 499.50,
          "Stock": 78,
          "Category": "Electronics"
        }
      ]
  - description: "Multi-line Text Description to Structured Data"
    inputText: |
      Source Format: Multi-line Text
      Target Format: JSON Array
      Content:
      Meeting Minutes - April 12, 2023
      Attendees: Zhang San (Chair), Li Si, Wang Wu, Zhao Liu
      Main Topics:
      1. Q2 Marketing Strategy Discussion
      2. New Product Release Schedule Confirmation
      3. Team Expansion Plan
      Decisions:
      - Complete marketing plan by end of April
      - New product release postponed to June 15
      - Start recruiting 2 developers next week
    llmResult: |
      {
        "Meeting Date": "April 12, 2023",
        "Attendees": ["Zhang San (Chair)", "Li Si", "Wang Wu", "Zhao Liu"],
        "Main Topics": [
          "Q2 Marketing Strategy Discussion",
          "New Product Release Schedule Confirmation",
          "Team Expansion Plan"
        ],
        "Decisions": [
          "Complete marketing plan by end of April",
          "New product release postponed to June 15",
          "Start recruiting 2 developers next week"
        ]
      }
  - description: "XML to JSON"
    inputText: |
      Source Format: XML
      Target Format: JSON
      Content:
      <Order>
        <OrderID>ORD-2023-001</OrderID>
        <CustomerInfo>
          <Name>Zhang San</Name>
          <Phone>13812345678</Phone>
          <Address>Chaoyang District, Beijing</Address>
        </CustomerInfo>
        <ItemList>
          <Item>
            <Name>Mechanical Keyboard</Name>
            <Quantity>1</Quantity>
            <UnitPrice>499.00</UnitPrice>
          </Item>
          <Item>
            <Name>Monitor</Name>
            <Quantity>2</Quantity>
            <UnitPrice>1299.00</UnitPrice>
          </Item>
        </ItemList>
        <TotalPrice>3097.00</TotalPrice>
      </Order>
    llmResult: |
      {
        "OrderID": "ORD-2023-001",
        "CustomerInfo": {
          "Name": "Zhang San",
          "Phone": "13812345678",
          "Address": "Chaoyang District, Beijing"
        },
        "ItemList": [
          {
            "Name": "Mechanical Keyboard",
            "Quantity": 1,
            "UnitPrice": 499.00
          },
          {
            "Name": "Monitor",
            "Quantity": 2,
            "UnitPrice": 1299.00
          }
        ],
        "TotalPrice": 3097.00
      }
  - description: "SQL Query Result to CSV"
    inputText: |
      Source Format: SQL Query Result Text
      Target Format: CSV
      Content:
      SQL Query: SELECT id, name, department, salary FROM employees WHERE department = 'IT' ORDER BY salary DESC;

      Result:
      | id | name   | department | salary  |
      |----|--------|------------|---------|
      | 23 | Zhang San   | IT         | 25000   |
      | 45 | Li Si   | IT         | 20000   |
      | 67 | Wang Wu   | IT         | 18000   |
      | 89 | Zhao Liu   | IT         | 15000   |
    llmResult: |
      id,name,department,salary
      23,Zhang San,IT,25000
      45,Li Si,IT,20000
      67,Wang Wu,IT,18000
      89,Zhao Liu,IT,15000
scoringCriteria:
  - name: "Data Integrity"
    weight: 1
    description: "Checks if all data points from the original content are preserved after conversion."
    evaluationMethod: "Checks if all data points from the original content are preserved after conversion."
    passCriteria: "No critical information, including nested data, is lost."
  - name: "Format Compliance"
    weight: 1
    description: "Evaluates whether the converted output fully complies with the specifications of the target format."
    evaluationMethod: "Evaluates whether the converted output fully complies with the specifications of the target format."
    passCriteria: "Output can be correctly parsed by the respective parser, with no format errors."
  - name: "Adaptability to Structural Complexity"
    weight: 1
    description: "Checks if it can handle data structure conversions of varying complexity (simple, nested, multi-layered)."
    evaluationMethod: "Checks if it can handle data structure conversions of varying complexity (simple, nested, multi-layered)."
    passCriteria: "Performs well in nested structure and complex table cases."
  - name: "Data Type Accuracy"
    weight: 1
    description: "Evaluates whether different data types such as numbers, strings, and booleans are correctly identified and converted."
    evaluationMethod: "Evaluates whether different data types such as numbers, strings, and booleans are correctly identified and converted."
    passCriteria: "Numeric values are not incorrectly converted to strings, date formats are correct, etc."
  - name: "Formatting and Readability"
    weight: 1
    description: "Checks if the output format is clean, consistent, and suitable for human readability."
    evaluationMethod: "Checks if the output format is clean, consistent, and suitable for human readability."
    passCriteria: "Includes appropriate indentation, line breaks, and alignment to enhance readability."
promptTemplate: |
  [Your Prompt]

  Content:
  {Content}
expectedOutput: |
  {
    "Name": "Zhang San",
    "Age": 28,
    "Occupation": "Software Engineer",
    "Skills": ["Python", "JavaScript", "Docker"],
    "Address": "Haidian District, Beijing"
  }
solutionDiscussion: "https://github.com/erweixin/prompt-challenges/discussions/3"
---

## Challenge Description

In data processing and integration, we often need to convert information from one format to another. This challenge requires you to write a prompt that enables AI to accurately convert text from one format (such as plain text, CSV, JSON, etc.) to a specified target format, while maintaining data integrity and accuracy.

## Challenge Goals

Write a prompt that enables AI to:
1. Identify the data structure and format of the original text.
2. Extract all relevant information.
3. Convert the information to the specified target format.
4. Ensure no data is lost or misinterpreted during the conversion process.

## Requirements

- The conversion must be accurate and retain all original data.
- The converted format must comply with the specifications of the target format.
- The prompt must be able to handle conversions between various common formats.
- For ambiguous data, reasonable assumptions must be made and explained.
- The output must be formatted for readability and usability.

## Prompt Template

```

[Your Prompt]

Source Format: {Source Format}
Target Format: {Target Format}
Content:
{Content}

```

## Automated Testing Process

1. For each test case, use your prompt as input.
2. Use specialized validators to check the validity of the output format:
   - JSON output validated by a JSON parser.
   - YAML output validated by a YAML parser.
   - Markdown table structure validated by a table parser.
3. Compare the data content before and after conversion to ensure completeness.
4. Check if data types are correctly preserved.
5. Evaluate formatting quality (indentation, alignment, etc.).
6. Calculate the final score (out of 5 points).

## Expected Output Example (for Case 1)

```

Conversion Result:

{
"Name": "Zhang San",
"Age": 28,
"Occupation": "Software Engineer",
"Skills": ["Python", "JavaScript", "Docker"],
"Address": "Haidian District, Beijing"
}

```

---

Submit your solution and share your ideas and techniques with the community!