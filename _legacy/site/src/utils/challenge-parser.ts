// 挑战内容解析工具
// 用于从 Markdown 内容中提取测试用例、题目要求等信息

export interface TestCase {
  inputText: string;
  llmResult: string;
  description?: string;
}

export interface ChallengeRequirements {
  title: string;
  description: string;
  requirements: string[];
  testCases: TestCase[];
  difficulty?: string;
  tags?: string[];
}

export function parseChallengeContent(content: string): ChallengeRequirements {
  const lines = content.split('\n');
  const result: ChallengeRequirements = {
    title: '',
    description: '',
    requirements: [],
    testCases: [],
    tags: []
  };

  let currentSection = '';
  let currentTestCase: Partial<TestCase> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // 检测标题
    if (line.startsWith('# ')) {
      result.title = line.substring(2);
      continue;
    }

    // 检测难度等级
    if (line.includes('难度:') || line.includes('Difficulty:')) {
      const difficultyMatch = line.match(/难度:\s*(\w+)|Difficulty:\s*(\w+)/);
      if (difficultyMatch) {
        result.difficulty = difficultyMatch[1] || difficultyMatch[2];
      }
      continue;
    }

    // 检测知识点标签
    if (line.includes('知识点标签') || line.includes('Tags:')) {
      const tagsMatch = line.match(/`([^`]+)`/g);
      if (tagsMatch) {
        result.tags = tagsMatch.map(tag => tag.replace(/`/g, ''));
      }
      continue;
    }

    // 检测描述部分
    if (line.includes('挑战描述') || line.includes('Challenge Description') || line.includes('## 目标') || line.includes('## Goal')) {
      currentSection = 'description';
      continue;
    }

    // 检测要求部分
    if (line.includes('要求') || line.includes('Requirements') || line.includes('### 要求') || line.includes('## 要求')) {
      currentSection = 'requirements';
      continue;
    }

    // 检测测试用例部分
    if (line.includes('测试用例') || line.includes('Test Cases') || line.includes('### 测试用例') || line.includes('## 测试用例')) {
      currentSection = 'testCases';
      continue;
    }

    // 处理描述内容
    if (currentSection === 'description' && line && !line.startsWith('#')) {
      result.description += line + '\n';
    }

    // 处理要求内容
    if (currentSection === 'requirements' && line.startsWith('- ')) {
      result.requirements.push(line.substring(2));
    }

    // 处理测试用例
    if (currentSection === 'testCases') {
      // 检测测试用例标题
      if (line.startsWith('**案例') || line.startsWith('**Case') || line.startsWith('### 案例') || line.startsWith('### Case')) {
        if (currentTestCase.inputText && currentTestCase.llmResult) {
          result.testCases.push(currentTestCase as TestCase);
        }
        currentTestCase = { description: line.replace(/[*#]/g, '').trim() };
        continue;
      }

      // 检测输入文本
      if (line.includes('inputText:') || line.includes('初始提示词:') || line.includes('输入:')) {
        const inputMatch = line.match(/inputText:\s*["""](.*?)["""]/);
        const promptMatch = line.match(/初始提示词:\s*["""](.*?)["""]/);
        const inputSimpleMatch = line.match(/输入:\s*["""](.*?)["""]/);
        if (inputMatch) {
          currentTestCase.inputText = inputMatch[1];
        } else if (promptMatch) {
          currentTestCase.inputText = promptMatch[1];
        } else if (inputSimpleMatch) {
          currentTestCase.inputText = inputSimpleMatch[1];
        }
        continue;
      }

      // 检测 LLM 结果
      if (line.includes('llmResult:') || line.includes('预期输出:') || line.includes('输出:')) {
        const resultMatch = line.match(/llmResult:\s*["""](.*?)["""]/);
        const outputMatch = line.match(/预期输出:\s*["""](.*?)["""]/);
        const outputSimpleMatch = line.match(/输出:\s*["""](.*?)["""]/);
        if (resultMatch) {
          currentTestCase.llmResult = resultMatch[1];
        } else if (outputMatch) {
          currentTestCase.llmResult = outputMatch[1];
        } else if (outputSimpleMatch) {
          currentTestCase.llmResult = outputSimpleMatch[1];
        }
        continue;
      }
    }
  }

  // 添加最后一个测试用例
  if (currentTestCase.inputText && currentTestCase.llmResult) {
    result.testCases.push(currentTestCase as TestCase);
  }

  // 如果没有找到测试用例，使用默认值
  if (result.testCases.length === 0) {
    result.testCases.push({
      inputText: "这是一个示例输入文本，用于测试用户的 prompt。",
      llmResult: "这是大模型对示例输入的返回结果，用于评估 prompt 的效果。",
      description: "默认测试用例"
    });
  }

  return result;
}

// 获取第一个测试用例用于评分
export function getFirstTestCase(content: string): TestCase {
  const parsed = parseChallengeContent(content);
  return parsed.testCases[0] || {
    inputText: "这是一个示例输入文本，用于测试用户的 prompt。",
    llmResult: "这是大模型对示例输入的返回结果，用于评估 prompt 的效果。",
    description: "默认测试用例"
  };
}

// 获取所有测试用例
export function getAllTestCases(content: string): TestCase[] {
  const parsed = parseChallengeContent(content);
  return parsed.testCases.length > 0 ? parsed.testCases : [{
    inputText: "这是一个示例输入文本，用于测试用户的 prompt。",
    llmResult: "这是大模型对示例输入的返回结果，用于评估 prompt 的效果。",
    description: "默认测试用例"
  }];
}

// 提取题目要求（去除测试用例部分）
export function extractQuestionRequirements(content: string): string {
  const lines = content.split('\n');
  const result: string[] = [];
  let inTestCases = false;

  for (const line of lines) {
    // 检测测试用例部分开始
    if (line.includes('测试用例') || line.includes('Test Cases') || line.includes('### 测试用例') || line.includes('## 测试用例')) {
      inTestCases = true;
      break;
    }
    
    if (!inTestCases) {
      result.push(line);
    }
  }

  return result.join('\n').trim();
}

// 提取难度等级
export function extractDifficulty(content: string): string {
  const lines = content.split('\n');
  for (const line of lines) {
    if (line.includes('难度:') || line.includes('Difficulty:')) {
      const difficultyMatch = line.match(/难度:\s*(\w+)|Difficulty:\s*(\w+)/);
      if (difficultyMatch) {
        return difficultyMatch[1] || difficultyMatch[2];
      }
    }
  }
  return 'medium'; // 默认难度
}

// 提取知识点标签
export function extractTags(content: string): string[] {
  const lines = content.split('\n');
  for (const line of lines) {
    if (line.includes('知识点标签') || line.includes('Tags:')) {
      const tagsMatch = line.match(/`([^`]+)`/g);
      if (tagsMatch) {
        return tagsMatch.map(tag => tag.replace(/`/g, ''));
      }
    }
  }
  return [];
} 