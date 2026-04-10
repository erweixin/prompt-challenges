import { ParsedChallenge } from '../types/challenge';
import { parseChallenge } from './challenge-parser-v2';

/**
 * 挑战加载器
 * 支持YAML Front Matter格式和传统Markdown格式的自动检测
 */
export class ChallengeLoader {
  /**
   * 加载挑战内容
   * @param content 挑战文件内容
   * @returns 解析后的挑战数据
   */
  static load(content: string): ParsedChallenge {
    try {
      return parseChallenge(content);
    } catch (error) {
      console.error('挑战加载失败:', error);
      throw new Error(`挑战加载失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  /**
   * 验证挑战数据的完整性
   * @param parsedChallenge 解析后的挑战数据
   * @returns 验证结果
   */
  static validate(parsedChallenge: ParsedChallenge): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // 验证元数据
    const { metadata } = parsedChallenge;
    
    if (!metadata.title) {
      errors.push('缺少挑战标题');
    }

    if (!['warm', 'medium', 'hard', 'extreme'].includes(metadata.difficulty)) {
      errors.push('无效的难度等级');
    }

    if (!Array.isArray(metadata.tags) || metadata.tags.length === 0) {
      errors.push('缺少知识点标签');
    }

    if (!Array.isArray(metadata.testCases) || metadata.testCases.length === 0) {
      errors.push('缺少测试用例');
    }

    if (!Array.isArray(metadata.scoringCriteria) || metadata.scoringCriteria.length === 0) {
      errors.push('缺少评分标准');
    }

    // 验证测试用例
    metadata.testCases.forEach((testCase, index) => {
      if (!testCase.description) {
        errors.push(`测试用例 ${index + 1} 缺少描述`);
      }
      if (!testCase.inputText) {
        errors.push(`测试用例 ${index + 1} 缺少输入文本`);
      }
      if (!testCase.llmResult) {
        errors.push(`测试用例 ${index + 1} 缺少预期输出`);
      }
    });

    // 验证评分标准
    metadata.scoringCriteria.forEach((criterion, index) => {
      if (!criterion.name) {
        errors.push(`评分标准 ${index + 1} 缺少名称`);
      }
      if (typeof criterion.weight !== 'number' || criterion.weight <= 0) {
        errors.push(`评分标准 ${index + 1} 权重必须大于0`);
      }
    });

    // 验证内容
    if (!parsedChallenge.content || parsedChallenge.content.trim().length === 0) {
      errors.push('缺少挑战描述内容');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * 获取挑战摘要信息
   * @param parsedChallenge 解析后的挑战数据
   * @returns 挑战摘要
   */
  static getSummary(parsedChallenge: ParsedChallenge) {
    const { metadata } = parsedChallenge;
    
    return {
      title: metadata.title,
      difficulty: metadata.difficulty,
      tags: metadata.tags,
      testCaseCount: metadata.testCases.length,
      scoringCriteriaCount: metadata.scoringCriteria.length,
      hasPromptTemplate: !!metadata.promptTemplate,
      hasExpectedOutput: !!metadata.expectedOutput,
      hasSolutionDiscussion: !!metadata.solutionDiscussion
    };
  }

  /**
   * 获取挑战统计信息
   * @param parsedChallenge 解析后的挑战数据
   * @returns 统计信息
   */
  static getStats(parsedChallenge: ParsedChallenge) {
    const { metadata, content } = parsedChallenge;
    
    return {
      contentLength: content.length,
      testCaseCount: metadata.testCases.length,
      totalScoringWeight: metadata.scoringCriteria.reduce((sum, criterion) => sum + criterion.weight, 0),
      averageTestCaseLength: metadata.testCases.reduce((sum, testCase) => 
        sum + testCase.inputText.length + testCase.llmResult.length, 0) / metadata.testCases.length
    };
  }
} 