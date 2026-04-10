# Zero-Shot Tool Use

## 🟣 Extreme

### Challenge Description

Modern AI systems often have access to a variety of tools that extend their capabilities, but using these tools effectively without previous examples is challenging. This challenge requires you to design a prompt that enables AI to understand available tools and correctly use them to solve complex tasks, without requiring demonstrations. This capability is essential for AI to autonomously solve problems in dynamic environments where tools and requirements may change.

### Challenge Goals

Write a prompt that enables AI to:
1. Understand tool functions and constraints from textual descriptions
2. Identify when and which tools are necessary for solving complex problems
3. Correctly infer the order and parameters for tool usage
4. Handle errors and exceptions that may arise during tool use
5. Creatively combine multiple tools to achieve complex objectives

### Requirements

- The prompt must guide AI in analyzing tool descriptions to understand their capabilities
- Must help AI infer correct tool usage without explicit examples
- Should enable AI to plan sequences of tool operations for multi-step tasks
- Must guide AI in managing errors and exceptions effectively
- Should encourage creative problem-solving by combining tools in novel ways

### Prompt Template

```
[Your prompt]

Available Tools:
{tool descriptions}

Task:
{task description}
```

### Test Cases

**Case 1: Data Analysis Tools**

```
Available Tools:

1. load_data(file_path)
   - Description: Loads data from a specified file path
   - Parameters: file_path (string) - Path to the data file
   - Returns: A data object containing the loaded data
   - Errors: Raises FileNotFoundError if the file doesn't exist or InvalidFormatError if the file format is not supported

2. clean_data(data, options)
   - Description: Cleans the data by removing duplicates, handling missing values, etc.
   - Parameters: 
     - data (object) - The data object to clean
     - options (dict, optional) - Cleaning options like handling of missing values, etc.
   - Returns: Cleaned data object
   - Errors: Raises DataTypeError if the data is not in a supported format

3. analyze_data(data, analysis_type, parameters)
   - Description: Performs statistical analysis on the data
   - Parameters:
     - data (object) - The data to analyze
     - analysis_type (string) - Type of analysis ('summary', 'correlation', 'regression', etc.)
     - parameters (dict, optional) - Specific parameters for the analysis
   - Returns: Analysis results
   - Errors: Raises UnsupportedAnalysisError if the specified analysis type is not supported

4. visualize_data(data, visualization_type, parameters)
   - Description: Creates visualizations of the data
   - Parameters:
     - data (object) - The data to visualize
     - visualization_type (string) - Type of visualization ('scatter', 'bar', 'line', etc.)
     - parameters (dict, optional) - Specific parameters for the visualization
   - Returns: Visualization object
   - Errors: Raises UnsupportedVisualizationError if the specified visualization type is not supported

5. generate_report(analyses, visualizations, format)
   - Description: Generates a report containing analyses and visualizations
   - Parameters:
     - analyses (list) - List of analysis results
     - visualizations (list) - List of visualization objects
     - format (string) - Format of the report ('pdf', 'html', 'docx')
   - Returns: Report file path
   - Errors: Raises UnsupportedFormatError if the specified format is not supported

Task:
Analyze the sales data in the file "sales_data.json". Clean the data, perform a summary analysis and correlation analysis between product categories and sales figures. Create bar charts for top-selling products and line charts for sales trends over time. Finally, generate a comprehensive report in HTML format that includes all analyses and visualizations.
```

**Case 2: Natural Language Processing Tools**

```
Available Tools:

1. extract_text(file_path)
   - Description: Extracts text from a document file
   - Parameters: file_path (string) - Path to the document file
   - Returns: Extracted text as a string
   - Errors: Raises FileNotFoundError if the file doesn't exist or UnsupportedFileType if the file format is not supported

2. detect_language(text)
   - Description: Detects the language of the given text
   - Parameters: text (string) - The text to analyze
   - Returns: ISO language code (e.g., 'en' for English)
   - Errors: Raises EmptyTextError if the text is empty

3. analyze_sentiment(text, language_code)
   - Description: Analyzes the sentiment of the given text
   - Parameters:
     - text (string) - The text to analyze
     - language_code (string, optional) - ISO language code (defaults to 'en')
   - Returns: Sentiment score (-1.0 to 1.0) and sentiment label ('positive', 'negative', 'neutral')
   - Errors: Raises UnsupportedLanguageError if the language is not supported

4. extract_keywords(text, language_code, max_keywords)
   - Description: Extracts key phrases and keywords from the text
   - Parameters:
     - text (string) - The text to analyze
     - language_code (string, optional) - ISO language code (defaults to 'en')
     - max_keywords (int, optional) - Maximum number of keywords to extract (defaults to 10)
   - Returns: List of keywords/phrases with their relevance scores
   - Errors: Raises UnsupportedLanguageError if the language is not supported

5. summarize_text(text, language_code, max_length)
   - Description: Creates a summary of the text
   - Parameters:
     - text (string) - The text to summarize
     - language_code (string, optional) - ISO language code (defaults to 'en')
     - max_length (int, optional) - Maximum length of the summary in words (defaults to 100)
   - Returns: Summarized text
   - Errors: Raises UnsupportedLanguageError if the language is not supported or TextTooShortError if the text is too short to summarize

Task:
Analyze the PDF article at "financial_report_2023.pdf". Extract the text, detect its language, and perform sentiment analysis. Then extract the top 15 keywords from the text and create a concise summary of no more than 150 words. Focus especially on identifying the overall financial outlook and key business developments mentioned in the report.
```

**Case 3: Smart Home Automation Tools**

```
Available Tools:

1. get_device_status(device_id)
   - Description: Gets the current status of a smart home device
   - Parameters: device_id (string) - ID of the device to query
   - Returns: Device status object with properties like power, mode, temperature, etc.
   - Errors: Raises DeviceNotFoundError if the device doesn't exist or ConnectionError if the device is offline

2. set_device_state(device_id, properties)
   - Description: Sets properties for a smart home device
   - Parameters:
     - device_id (string) - ID of the device to control
     - properties (dict) - Dictionary of properties to set (e.g., {'power': 'on', 'temperature': 22})
   - Returns: New device status object
   - Errors: Raises DeviceNotFoundError if the device doesn't exist, ConnectionError if the device is offline, or InvalidPropertyError if the property is not supported

3. get_sensor_readings(sensor_id, time_range)
   - Description: Gets readings from a sensor over a specified time range
   - Parameters:
     - sensor_id (string) - ID of the sensor to query
     - time_range (dict, optional) - Time range for readings (e.g., {'start': '2023-04-10T00:00:00Z', 'end': '2023-04-10T23:59:59Z'})
   - Returns: List of sensor readings with timestamps
   - Errors: Raises SensorNotFoundError if the sensor doesn't exist or InvalidTimeRangeError if the time range is invalid

4. create_automation_rule(trigger, action, conditions)
   - Description: Creates a new automation rule
   - Parameters:
     - trigger (dict) - Event that triggers the rule (e.g., {'type': 'time', 'value': '07:00:00'} or {'type': 'sensor', 'sensor_id': 'temp1', 'condition': 'above', 'value': 25})
     - action (dict) - Action to perform (e.g., {'type': 'device', 'device_id': 'light1', 'properties': {'power': 'on'}})
     - conditions (list, optional) - Additional conditions that must be met (e.g., [{'type': 'time_range', 'start': '07:00:00', 'end': '23:00:00'}])
   - Returns: ID of the created rule
   - Errors: Raises InvalidTriggerError if the trigger is invalid, InvalidActionError if the action is invalid, or InvalidConditionError if a condition is invalid

5. list_devices(type)
   - Description: Lists all devices of a specified type
   - Parameters: type (string, optional) - Device type to filter by (e.g., 'light', 'thermostat', 'lock')
   - Returns: List of device objects with their IDs and basic information
   - Errors: Raises InvalidTypeError if the specified type is not supported

Task:
Design a smart home automation scheme for energy efficiency and comfort. Use the available tools to:
1. Get a list of all thermostats and temperature sensors in the home
2. Create an automation rule that adjusts the living room thermostat (device_id: "thermostat1") based on the outdoor temperature sensor (sensor_id: "outdoor_temp1")
3. Create a rule to turn off all lights (type: "light") when no motion is detected by any motion sensor (type: "motion") for 30 minutes
4. Create a rule to adjust window blinds (device_id: "blinds1") based on the indoor temperature and time of day
Be sure to handle any potential errors and create a comprehensive automation scheme that balances energy efficiency with comfort.
```

**Case 4: Financial Data Analysis and Trading Tools**

```
Available Tools:

1. get_stock_data(ticker, start_date, end_date)
   - Description: Retrieves historical stock data for a given ticker
   - Parameters:
     - ticker (string) - Stock symbol (e.g., 'AAPL')
     - start_date (string) - Start date in YYYY-MM-DD format
     - end_date (string, optional) - End date in YYYY-MM-DD format (defaults to current date)
   - Returns: Historical stock data including Open, High, Low, Close, and Volume
   - Errors: Raises InvalidTickerError if the ticker doesn't exist or InvalidDateError if the dates are invalid

2. calculate_technical_indicator(data, indicator, parameters)
   - Description: Calculates technical indicators for stock data
   - Parameters:
     - data (object) - Stock data
     - indicator (string) - Indicator to calculate ('SMA', 'EMA', 'RSI', 'MACD', etc.)
     - parameters (dict) - Parameters for the indicator (e.g., {'period': 14} for RSI)
   - Returns: Stock data with the indicator values added
   - Errors: Raises UnsupportedIndicatorError if the indicator is not supported

3. backtest_strategy(data, strategy, parameters)
   - Description: Backtests a trading strategy on historical data
   - Parameters:
     - data (object) - Stock data with indicators
     - strategy (string) - Strategy to backtest ('MovingAverageCrossover', 'RSIReversion', etc.)
     - parameters (dict) - Parameters for the strategy
   - Returns: Backtest results including returns, drawdowns, and trade statistics
   - Errors: Raises UnsupportedStrategyError if the strategy is not supported

4. calculate_portfolio_metrics(portfolio, start_date, end_date)
   - Description: Calculates risk and return metrics for a portfolio
   - Parameters:
     - portfolio (dict) - Dictionary of assets and their weights (e.g., {'AAPL': 0.5, 'MSFT': 0.5})
     - start_date (string) - Start date in YYYY-MM-DD format
     - end_date (string, optional) - End date in YYYY-MM-DD format (defaults to current date)
   - Returns: Portfolio metrics including returns, volatility, Sharpe ratio, etc.
   - Errors: Raises InvalidTickerError if any ticker doesn't exist or InvalidDateError if the dates are invalid

5. optimize_portfolio(tickers, start_date, end_date, objective)
   - Description: Finds the optimal portfolio allocation for a given objective
   - Parameters:
     - tickers (list) - List of stock symbols
     - start_date (string) - Start date in YYYY-MM-DD format
     - end_date (string, optional) - End date in YYYY-MM-DD format (defaults to current date)
     - objective (string) - Optimization objective ('MaxSharpe', 'MinRisk', 'MaxReturn')
   - Returns: Optimal portfolio weights and metrics
   - Errors: Raises InvalidTickerError if any ticker doesn't exist, InvalidDateError if the dates are invalid, or UnsupportedObjectiveError if the objective is not supported

Task:
Analyze the historical performance of Apple (AAPL), Microsoft (MSFT), and Amazon (AMZN) stocks over the past 2 years. Calculate the 50-day and 200-day Simple Moving Averages (SMA) for each stock, as well as the Relative Strength Index (RSI) with a 14-day period. Backtest a Moving Average Crossover strategy for each stock individually. Then, calculate the risk and return metrics for a portfolio equally weighted between these three stocks. Finally, find the optimal portfolio allocation that maximizes the Sharpe ratio.
```

**Case 5: Content Creation and Publishing Tools**

```
Available Tools:

1. generate_content(topic, content_type, tone, length)
   - Description: Generates content on a specified topic
   - Parameters:
     - topic (string) - Topic to generate content about
     - content_type (string) - Type of content ('blog', 'social', 'email', etc.)
     - tone (string, optional) - Tone of the content ('professional', 'casual', 'persuasive', etc.)
     - length (string, optional) - Length of content ('short', 'medium', 'long')
   - Returns: Generated content text
   - Errors: Raises InvalidContentTypeError if the content type is not supported

2. create_image(prompt, style, dimensions)
   - Description: Creates an image based on a text prompt
   - Parameters:
     - prompt (string) - Text description of the image to create
     - style (string, optional) - Visual style of the image ('realistic', 'cartoon', 'artistic', etc.)
     - dimensions (dict, optional) - Dimensions of the image (e.g., {'width': 1200, 'height': 630})
   - Returns: URL of the created image
   - Errors: Raises InvalidPromptError if the prompt is inappropriate or InvalidStyleError if the style is not supported

3. optimize_content(content, platform, keywords)
   - Description: Optimizes content for a specific platform and SEO
   - Parameters:
     - content (string) - Content to optimize
     - platform (string) - Target platform ('website', 'instagram', 'linkedin', etc.)
     - keywords (list, optional) - Keywords to include for SEO
   - Returns: Optimized content
   - Errors: Raises InvalidPlatformError if the platform is not supported

4. design_infographic(data, theme, layout)
   - Description: Creates an infographic based on provided data
   - Parameters:
     - data (dict) - Data to visualize in the infographic
     - theme (string, optional) - Visual theme of the infographic
     - layout (string, optional) - Layout style ('vertical', 'horizontal', 'grid')
   - Returns: URL of the created infographic
   - Errors: Raises InvalidDataError if the data format is incorrect

5. schedule_publication(content, platform, publication_time, audience)
   - Description: Schedules content for publication
   - Parameters:
     - content (string or url) - Content or content URL to publish
     - platform (string) - Platform to publish on ('website', 'instagram', 'linkedin', etc.)
     - publication_time (string) - Time to publish in ISO format (e.g., '2023-04-15T09:00:00Z')
     - audience (dict, optional) - Targeting options for the publication
   - Returns: Scheduled publication ID and confirmation
   - Errors: Raises InvalidPlatformError if the platform is not supported or InvalidTimeError if the publication time is invalid

Task:
Create a content marketing campaign for an organic food e-commerce site. Generate a blog post about the health benefits of organic produce, optimized for SEO with keywords like "organic food benefits," "pesticide-free produce," and "sustainable farming." Create an accompanying infographic that visualizes the nutritional differences between organic and conventional produce. Optimize both the blog post and a shortened version of it for Instagram and LinkedIn. Finally, schedule the publication of the blog post for next Monday at 9:00 AM, and the social media posts for Monday at 12:00 PM (LinkedIn) and 5:00 PM (Instagram).
```

### Scoring Criteria and Automated Testing Methods

The prompt will be scored according to the following criteria:

1. **Tool Function Understanding** (1 point)
   - Evaluation method: Check if AI correctly understands each tool's purpose and capabilities
   - Passing standard: Correctly identifies and describes the appropriate tools for each subtask

2. **Parameter Inference Accuracy** (1 point)
   - Evaluation method: Assess whether AI correctly infers and provides the required parameters
   - Passing standard: At least 90% of parameter types and structures are correct

3. **Tool Combination & Sequencing** (1 point)
   - Evaluation method: Check if AI correctly sequences tools in logical order
   - Passing standard: Tools are called in an order that respects dependencies and logical workflow

4. **Error Handling & Robustness** (1 point)
   - Evaluation method: Evaluate whether AI anticipates and handles potential errors
   - Passing standard: Includes error handling for at least 80% of potential error cases

5. **Solution Completeness & Innovation** (1 point)
   - Evaluation method: Assess whether the solution fully addresses all aspects of the task
   - Passing standard: All parts of the task are addressed with at least one creative or optimized approach

### Automated Testing Process

1. For each test case, use your prompt with the tool descriptions and task as input
2. Parse the output to identify tool calls and their parameters
3. Validate whether the right tools are called with the correct parameter types
4. Check the sequence of tool calls for logical order and dependency management
5. Assess completeness by comparing with a checklist of required subtasks
6. Calculate final score (5 points maximum)

### Expected Output Example (for Case 1)

```
I'll solve this data analysis task step by step using the available tools.

First, I need to understand what we're trying to achieve:
- Load and clean sales data from "sales_data.json"
- Perform summary and correlation analyses
- Create visualizations (bar charts for top products, line charts for trends)
- Generate an HTML report with all analyses and visualizations

Step 1: Load the data
I'll use the load_data tool to import the JSON file:
```
load_data("sales_data.json")
```

Step 2: Clean the data
The data might have missing values or duplicates, so I'll clean it using default options:
```
cleaned_data = clean_data(data)
```

Step 3: Perform analyses
I need to conduct two types of analyses:
```
summary_analysis = analyze_data(cleaned_data, "summary")
correlation_analysis = analyze_data(
    cleaned_data, 
    "correlation", 
    {"variables": ["product_category", "sales"]}
)
```

Step 4: Create visualizations
I'll create the required visualizations:
```
top_products_chart = visualize_data(
    cleaned_data, 
    "bar", 
    {
        "x_axis": "product_name",
        "y_axis": "sales",
        "sort": "descending",
        "limit": 10,
        "title": "Top-Selling Products"
    }
)

sales_trend_chart = visualize_data(
    cleaned_data, 
    "line", 
    {
        "x_axis": "date",
        "y_axis": "sales",
        "group_by": "product_category",
        "title": "Sales Trends Over Time"
    }
)
```

Step 5: Generate report
Finally, I'll compile everything into an HTML report:
```
report_path = generate_report(
    [summary_analysis, correlation_analysis],
    [top_products_chart, sales_trend_chart],
    "html"
)
```

Error handling considerations:
- If the file doesn't exist, I'll receive a FileNotFoundError from load_data
- If the data format is incorrect, clean_data might raise a DataTypeError
- If any analysis or visualization type is unsupported, I'll get appropriate errors
- If the HTML format isn't supported for some reason, generate_report will raise an UnsupportedFormatError

The completed report will provide comprehensive insights about the sales data, including top-performing products, sales trends over time, and correlations between product categories and sales figures.
```

### Solution Discussion

[Click to view community solutions](https://github.com/erweixin/prompt-challenges/discussions/12)

---

Submit your solution and share your approach and techniques with the community! 