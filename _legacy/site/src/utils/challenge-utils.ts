import fs from 'fs';
import path from 'path';
import { Challenge } from '../types/challenge';
import { challenges } from '../data/challenges';
import { getChallengeContentPath } from './i18n';

// 获取所有挑战的扁平列表
export function getAllChallenges(): Challenge[] {
  return challenges.flatMap(group => group.challenges);
}

// 根据ID获取特定挑战
export function getChallengeById(id: string): Challenge | undefined {
  return getAllChallenges().find(challenge => challenge.id === id);
}

// 获取挑战的Markdown内容
export async function getChallengeContent(challengePath: string, locale: string = 'en'): Promise<string> {
  try {
    // 使用i18n工具获取适合当前语言的路径
    const localizedPath = getChallengeContentPath(locale, challengePath);
    
    // 构建文件路径，从项目根目录的questions目录开始
    const filePath = path.join(process.cwd(), '..', 'questions', localizedPath);
    
    // 尝试读取特定语言的文件内容
    if (fs.existsSync(filePath)) {
      console.log(`Found localized file: ${filePath}`);
      return fs.readFileSync(filePath, 'utf8');
    }
    
    // 如果找不到特定语言的文件，使用原始路径（默认文件）
    const defaultFilePath = path.join(process.cwd(), '..', 'questions', challengePath);
    console.log(`Using default file: ${defaultFilePath}`);
    
    if (fs.existsSync(defaultFilePath)) {
      return fs.readFileSync(defaultFilePath, 'utf8');
    } else {
      console.error(`File not found: ${defaultFilePath}`);
      throw new Error('Challenge file not found');
    }
  } catch (error) {
    console.error(`Error reading challenge file: ${error}`);
    return locale === 'zh' 
      ? '# 内容加载失败\n\n无法加载挑战内容，请稍后再试。'
      : '# Content Failed to Load\n\nUnable to load challenge content. Please try again later.';
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