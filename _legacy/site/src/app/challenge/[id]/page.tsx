import { redirect } from 'next/navigation';

interface ChallengePageProps {
  params: Promise<{ id: string }>;
}

export default async function ChallengePage(props: ChallengePageProps) {
  const { id } = await props.params;
  
  // 重定向到英文版本
  redirect(`/en/challenge/${id}`);
  
  return null;
} 