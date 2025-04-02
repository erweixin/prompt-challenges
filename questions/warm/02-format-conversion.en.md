# Format Conversion

## 🟢 Warm-up

### Challenge Description

Format conversion is an essential task that requires transforming data from one structured format to another while preserving all semantic information. This challenge tests your ability to design a prompt that guides AI to accurately convert data between different formats such as JSON, XML, CSV, YAML, and others, while maintaining data integrity and handling edge cases.

### Challenge Goals

Write a prompt that enables AI to:
1. Convert data between various structured formats with perfect accuracy
2. Preserve all data, relationships, and hierarchies during conversion
3. Handle complex nested structures and arrays
4. Manage special characters and escape sequences appropriately
5. Validate the output format for correctness

### Requirements

- The prompt must guide AI to convert data between common formats (JSON, XML, CSV, YAML, etc.)
- Must maintain all data relationships and hierarchies
- Should handle special characters, escape sequences, and data types appropriately
- Must produce valid output that passes format validation
- Should handle both simple and complex data structures

### Prompt Template

```
[Your prompt]

Source format: {source_format}
Target format: {target_format}

Data to convert:
{data}
```

### Test Cases

**Case 1: JSON to XML**

```
Source format: JSON
Target format: XML

Data to convert:
{
  "person": {
    "name": "John Smith",
    "age": 35,
    "contact": {
      "email": "john.smith@example.com",
      "phone": "+1-555-123-4567"
    },
    "addresses": [
      {
        "type": "home",
        "street": "123 Main St",
        "city": "Anytown",
        "state": "CA",
        "zip": "12345"
      },
      {
        "type": "work",
        "street": "456 Market Ave",
        "city": "Somewhere",
        "state": "NY",
        "zip": "67890"
      }
    ],
    "active": true
  }
}
```

**Case 2: CSV to JSON**

```
Source format: CSV
Target format: JSON

Data to convert:
id,name,department,salary,hire_date,full_time
101,Alice Johnson,Engineering,85000,2020-03-15,true
102,Bob Smith,Marketing,72000,2019-11-01,true
103,Carol Williams,Finance,90000,2018-05-12,true
104,Dave Brown,Engineering,82000,2021-08-30,true
105,Eve Davis,Human Resources,67000,2022-01-15,false
```

**Case 3: YAML to JSON**

```
Source format: YAML
Target format: JSON

Data to convert:
---
product:
  name: "Smart TV X3000"
  manufacturer: "TechCorp"
  year: 2023
  specs:
    screen_size: 55
    resolution: "4K Ultra HD"
    hdr: true
    refresh_rate: 120
  connectivity:
    - HDMI: 4
    - USB: 3
    - Bluetooth: 5.0
    - WiFi: "802.11ac"
  power_consumption:
    standby: 0.5
    average: 120
    max: 180
  price: 799.99
  in_stock: true
  tags:
    - electronics
    - smart home
    - entertainment
```

**Case 4: XML to JSON**

```
Source format: XML
Target format: JSON

Data to convert:
<library>
  <books>
    <book id="BK001" available="true">
      <title>The Great Gatsby</title>
      <author>
        <first_name>F. Scott</first_name>
        <last_name>Fitzgerald</last_name>
      </author>
      <published_year>1925</published_year>
      <genres>
        <genre>Novel</genre>
        <genre>Fiction</genre>
        <genre>Tragedy</genre>
      </genres>
      <ratings>
        <goodreads>4.2</goodreads>
        <amazon>4.5</amazon>
      </ratings>
    </book>
    <book id="BK002" available="false">
      <title>To Kill a Mockingbird</title>
      <author>
        <first_name>Harper</first_name>
        <last_name>Lee</last_name>
      </author>
      <published_year>1960</published_year>
      <genres>
        <genre>Southern Gothic</genre>
        <genre>Coming-of-Age</genre>
        <genre>Legal Drama</genre>
      </genres>
      <ratings>
        <goodreads>4.3</goodreads>
        <amazon>4.8</amazon>
      </ratings>
    </book>
  </books>
</library>
```

**Case 5: JSON to YAML with Special Characters**

```
Source format: JSON
Target format: YAML

Data to convert:
{
  "product_description": {
    "name": "Deluxe Coffee Maker \"Supreme\"",
    "details": "This premium coffee maker includes:\n- Thermal carafe\n- Programmable timer\n- Water filter system",
    "warranty": "2 years limited warranty*",
    "reviews": [
      {
        "user": "coffee_lover_89",
        "rating": 5,
        "comment": "Perfect brew every time! I'm 100% satisfied."
      },
      {
        "user": "morning_person",
        "rating": 4,
        "comment": "Great machine, but cleaning is a bit difficult.\nStill recommended!"
      }
    ],
    "price_points": {
      "US$": 129.99,
      "EUR€": 119.99,
      "£GBP": 99.99
    },
    "filter_compatibility": ["Type A", "Type B & C", "Universal X7"]
  }
}
```

### Scoring Criteria and Automated Testing Methods

The prompt will be scored according to the following criteria:

1. **Format Correctness** (1 point)
   - Evaluation method: Validate the output against format specifications using parsers/validators
   - Passing standard: Output must be 100% valid in the target format with no syntax errors

2. **Data Preservation** (1 point)
   - Evaluation method: Compare all data values and relationships between source and target
   - Passing standard: All values, keys, and their relationships must be preserved

3. **Structure Integrity** (1 point)
   - Evaluation method: Verify that hierarchical structures and arrays are correctly maintained
   - Passing standard: All nesting levels and array structures must be maintained accurately

4. **Special Character Handling** (1 point)
   - Evaluation method: Test with inputs containing quotes, newlines, special symbols, etc.
   - Passing standard: All special characters must be appropriately escaped and preserved

5. **Type Fidelity** (1 point)
   - Evaluation method: Check if data types (string, number, boolean, etc.) are correctly preserved
   - Passing standard: All primitive data types must be correctly maintained

### Automated Testing Process

1. For each test case, use your prompt with the source format, target format, and data as input
2. Parse the output using a corresponding parser for the target format
3. Convert the output back to the source format for comparison
4. Compare all data elements between original source and round-trip converted data
5. Check for special character preservation and data type accuracy
6. Calculate final score (5 points maximum)

### Expected Output Example (for Case 2)

```json
[
  {
    "id": 101,
    "name": "Alice Johnson",
    "department": "Engineering",
    "salary": 85000,
    "hire_date": "2020-03-15",
    "full_time": true
  },
  {
    "id": 102,
    "name": "Bob Smith",
    "department": "Marketing",
    "salary": 72000,
    "hire_date": "2019-11-01",
    "full_time": true
  },
  {
    "id": 103,
    "name": "Carol Williams",
    "department": "Finance",
    "salary": 90000,
    "hire_date": "2018-05-12",
    "full_time": true
  },
  {
    "id": 104,
    "name": "Dave Brown",
    "department": "Engineering",
    "salary": 82000,
    "hire_date": "2021-08-30",
    "full_time": true
  },
  {
    "id": 105,
    "name": "Eve Davis",
    "department": "Human Resources",
    "salary": 67000,
    "hire_date": "2022-01-15",
    "full_time": false
  }
]
```

### Solution Discussion

[Click to view community solutions](https://github.com/erweixin/prompt-challenges/discussions/3)

---

Submit your solution and share your approach and techniques with the community! 