export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { redirect } from 'next/navigation';

export default function RootPage() {
  // 重定向到默认语言（英文）
  redirect('/en');
}
