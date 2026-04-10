const fs = require('fs');
const path = require('path');

// 模拟测试新的解析器
async function testNewParser() {
  try {
    // 读取新的挑战文件
    const newChallengePath = path.join(__dirname, '../questions/warm/01-sentiment-analysis-new.md');
    const newContent = fs.readFileSync(newChallengePath, 'utf-8');
    
    console.log('=== 测试新的YAML格式挑战文件 ===');
    console.log('文件路径:', newChallengePath);
    console.log('文件大小:', newContent.length, '字符');
    
    // 检查是否包含YAML Front Matter
    const hasYAML = newContent.includes('---') && newContent.match(/^---\s*\n/);
    console.log('包含YAML Front Matter:', hasYAML);
    
    if (hasYAML) {
      const yamlMatch = newContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
      if (yamlMatch) {
        const [, yamlContent, markdownContent] = yamlMatch;
        console.log('YAML内容长度:', yamlContent.length, '字符');
        console.log('Markdown内容长度:', markdownContent.length, '字符');
        
        // 简单的YAML解析测试
        const yaml = require('js-yaml');
        const metadata = yaml.load(yamlContent);
        
        console.log('\n=== 解析的元数据 ===');
        console.log('标题:', metadata.title);
        console.log('难度:', metadata.difficulty);
        console.log('标签:', metadata.tags);
        console.log('测试用例数量:', metadata.testCases?.length);
        console.log('评分标准数量:', metadata.scoringCriteria?.length);
        
        if (metadata.testCases && metadata.testCases.length > 0) {
          console.log('\n=== 第一个测试用例 ===');
          const firstCase = metadata.testCases[0];
          console.log('描述:', firstCase.description);
          console.log('输入长度:', firstCase.inputText?.length);
          console.log('输出长度:', firstCase.llmResult?.length);
        }
        
        if (metadata.scoringCriteria && metadata.scoringCriteria.length > 0) {
          console.log('\n=== 评分标准 ===');
          metadata.scoringCriteria.forEach((criterion, index) => {
            console.log(`${index + 1}. ${criterion.name} (权重: ${criterion.weight})`);
          });
        }
      }
    }
    
    // 读取传统格式的挑战文件进行对比
    const oldChallengePath = path.join(__dirname, '../questions/warm/01-sentiment-analysis.md');
    const oldContent = fs.readFileSync(oldChallengePath, 'utf-8');
    
    console.log('\n=== 对比传统格式 ===');
    console.log('传统文件大小:', oldContent.length, '字符');
    console.log('新格式文件大小:', newContent.length, '字符');
    console.log('大小差异:', newContent.length - oldContent.length, '字符');
    
  } catch (error) {
    console.error('测试失败:', error);
  }
}

// 运行测试
testNewParser(); 