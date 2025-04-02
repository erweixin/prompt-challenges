import fs from 'fs';
import path from 'path';
import { Challenge } from '../types/challenge';
import { challenges } from '../data/challenges';

// 获取所有挑战的扁平列表
export function getAllChallenges(): Challenge[] {
  return challenges.flatMap(group => group.challenges);
}

// 根据ID获取特定挑战
export function getChallengeById(id: string): Challenge | undefined {
  return getAllChallenges().find(challenge => challenge.id === id);
}

// 获取挑战的Markdown内容
export async function getChallengeContent(challengePath: string): Promise<string> {
  try {
    // 构建文件路径，从项目根目录的questions目录开始
    const filePath = path.join(process.cwd(), '..', 'questions', challengePath);
    
    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf8');
    
    return content;
  } catch (error) {
    console.error(`Error reading challenge file: ${error}`);
    return '# 内容加载失败\n\n无法加载挑战内容，请稍后再试。';
  }
}

// 获取相邻的挑战（上一个和下一个）
export function getAdjacentChallenges(id: string): { 
  prev: Challenge | null; 
  next: Challenge | null;
} {
  const allChallenges = getAllChallenges();
  const currentIndex = allChallenges.findIndex(challenge => challenge.id === id);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  
  const prev = currentIndex > 0 ? allChallenges[currentIndex - 1] : null;
  const next = currentIndex < allChallenges.length - 1 ? allChallenges[currentIndex + 1] : null;
  
  return { prev, next };
} 