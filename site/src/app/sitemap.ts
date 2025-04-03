import { MetadataRoute } from 'next';
import { challenges } from '../data/challenges';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://prompt-challenges.tslang.org';
  
  // 基础页面路由
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/zh`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
  ];

  // 生成英文挑战页面 URL
  const enChallenges = challenges.flatMap(group => 
    group.challenges.map(challenge => ({
      url: `${baseUrl}/en/challenge/${challenge.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  // 生成中文挑战页面 URL
  const zhChallenges = challenges.flatMap(group => 
    group.challenges.map(challenge => ({
      url: `${baseUrl}/zh/challenge/${challenge.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...routes, ...enChallenges, ...zhChallenges];
} 