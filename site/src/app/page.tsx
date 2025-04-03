export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { redirect } from 'next/navigation';

export default function Home() {
  // 默认重定向到英文版本，实际上不会执行到这一步
  // 中间件会在这之前处理重定向
  redirect('/en');
  
  return null;
}
