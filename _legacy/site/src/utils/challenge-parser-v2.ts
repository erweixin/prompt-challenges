import * as yaml from 'js-yaml';
import { ChallengeMetadata, ParsedChallenge, TestCase, ScoringCriterion } from '../types/challenge';

/**
 * 解析包含YAML Front Matter的Markdown挑战文件
 * 格式：
 * ---
 * title: "挑战标题"
 * difficulty: "warm"
 * tags: ["标签1", "标签2"]
 * testCases: [...]
 * ---
 * 
 * ## 挑战描述
 * 内容...
 */
export function parseChallengeWithYAML(content: string): ParsedChallenge {
  const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  
  if (!frontMatterMatch) {
    throw new Error('未找到有效的YAML Front Matter格式');
  }

  const [, yamlContent, markdownContent] = frontMatterMatch;
  
  try {
    const metadata = yaml.load(yamlContent) as ChallengeMetadata;
    
    // 验证必需的字段
    validateMetadata(metadata);
    
    return {
      metadata,
      content: markdownContent.trim()
    };
  } catch (error) {
    throw new Error(`YAML解析失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

/**
 * 验证挑战元数据的完整性
 */
function validateMetadata(metadata: unknown): asserts metadata is ChallengeMetadata {
  if (!metadata || typeof metadata !== 'object') {
    throw new Error('元数据必须是对象');
  }

  const meta = metadata as Record<string, unknown>;
  const requiredFields = ['title', 'difficulty', 'tags', 'testCases', 'scoringCriteria'];
  
  for (const field of requiredFields) {
    if (!meta[field]) {
      throw new Error(`缺少必需字段: ${field}`);
    }
  }

  // 验证难度等级
  const validDifficulties = ['warm', 'medium', 'hard', 'extreme'];
  if (!validDifficulties.includes(meta.difficulty as string)) {
    throw new Error(`无效的难度等级: ${meta.difficulty}`);
  }

  // 验证测试用例
  if (!Array.isArray(meta.testCases) || meta.testCases.length === 0) {
    throw new Error('至少需要一个测试用例');
  }

  for (const testCase of meta.testCases as unknown[]) {
    if (!testCase || typeof testCase !== 'object') {
      throw new Error('测试用例必须是对象');
    }
    const tc = testCase as Record<string, unknown>;
    if (!tc.description || !tc.inputText || !tc.llmResult) {
      throw new Error('测试用例缺少必需字段: description, inputText, llmResult');
    }
  }

  // 验证评分标准
  if (!Array.isArray(meta.scoringCriteria) || meta.scoringCriteria.length === 0) {
    throw new Error('至少需要一个评分标准');
  }

  for (const criterion of meta.scoringCriteria as unknown[]) {
    if (!criterion || typeof criterion !== 'object') {
      throw new Error('评分标准必须是对象');
    }
    const cr = criterion as Record<string, unknown>;
    if (!cr.name || typeof cr.weight !== 'number') {
      throw new Error('评分标准缺少必需字段: name, weight');
    }
  }
}

/**
 * 获取第一个测试用例
 */
export function getFirstTestCase(parsedChallenge: ParsedChallenge): TestCase {
  return parsedChallenge.metadata.testCases[0];
}

/**
 * 获取所有测试用例
 */
export function getAllTestCases(parsedChallenge: ParsedChallenge): TestCase[] {
  return parsedChallenge.metadata.testCases;
}

/**
 * 获取评分标准
 */
export function getScoringCriteria(parsedChallenge: ParsedChallenge): ScoringCriterion[] {
  return parsedChallenge.metadata.scoringCriteria;
}

/**
 * 获取挑战标题
 */
export function getChallengeTitle(parsedChallenge: ParsedChallenge): string {
  return parsedChallenge.metadata.title;
}

/**
 * 获取挑战难度
 */
export function getChallengeDifficulty(parsedChallenge: ParsedChallenge): string {
  return parsedChallenge.metadata.difficulty;
}

/**
 * 获取挑战标签
 */
export function getChallengeTags(parsedChallenge: ParsedChallenge): string[] {
  return parsedChallenge.metadata.tags;
}

/**
 * 向后兼容：解析传统Markdown格式
 */
export function parseLegacyChallenge(content: string): ParsedChallenge {
  const lines = content.split('\n');
  const metadata: ChallengeMetadata = {
    title: '',
    difficulty: 'medium',
    tags: [],
    testCases: [],
    scoringCriteria: []
  };

  let currentSection = '';
  let currentTestCase: Partial<TestCase> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // 检测标题
    if (line.startsWith('# ')) {
      metadata.title = line.substring(2);
      continue;
    }

    // 检测难度等级
    if (line.includes('难度:') || line.includes('Difficulty:')) {
      const difficultyMatch = line.match(/难度:\s*(\w+)|Difficulty:\s*(\w+)/);
      if (difficultyMatch) {
        const difficulty = difficultyMatch[1] || difficultyMatch[2];
        if (['warm', 'medium', 'hard', 'extreme'].includes(difficulty)) {
          metadata.difficulty = difficulty as 'warm' | 'medium' | 'hard' | 'extreme';
        }
      }
      continue;
    }

    // 检测知识点标签
    if (line.includes('知识点标签') || line.includes('Tags:')) {
      const tagsMatch = line.match(/`([^`]+)`/g);
      if (tagsMatch) {
        metadata.tags = tagsMatch.map(tag => tag.replace(/`/g, ''));
      }
      continue;
    }

    // 检测测试用例部分
    if (line.includes('测试用例') || line.includes('Test Cases') || line.includes('### 测试用例') || line.includes('## 测试用例')) {
      currentSection = 'testCases';
      continue;
    }

    // 处理测试用例
    if (currentSection === 'testCases') {
      // 检测测试用例标题
      if (line.startsWith('**案例') || line.startsWith('**Case') || line.startsWith('### 案例') || line.startsWith('### Case')) {
        if (currentTestCase.inputText && currentTestCase.llmResult) {
          metadata.testCases.push(currentTestCase as TestCase);
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
    metadata.testCases.push(currentTestCase as TestCase);
  }

  // 如果没有找到测试用例，使用默认值
  if (metadata.testCases.length === 0) {
    metadata.testCases.push({
      description: "默认测试用例",
      inputText: "这是一个示例输入文本，用于测试用户的 prompt。",
      llmResult: "这是大模型对示例输入的返回结果，用于评估 prompt 的效果。"
    });
  }

  // 添加默认评分标准
  if (metadata.scoringCriteria.length === 0) {
    metadata.scoringCriteria = [
      {
        name: "基本功能",
        weight: 1,
        description: "评估提示词的基本功能是否正常"
      }
    ];
  }

  return {
    metadata,
    content: content
  };
}

/**
 * 智能解析：自动检测格式并选择合适的解析器
 */
export function parseChallenge(content: string): ParsedChallenge {
  // 检查是否包含YAML Front Matter
  if (content.includes('---') && content.match(/^---\s*\n/)) {
    try {
      return parseChallengeWithYAML(content);
    } catch (error) {
      console.warn('YAML解析失败，回退到传统解析:', error);
      return parseLegacyChallenge(content);
    }
  }
  
  // 使用传统解析
  return parseLegacyChallenge(content);
} 