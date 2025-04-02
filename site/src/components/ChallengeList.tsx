import { ChallengeGroup } from '../types/challenge';
import ChallengeCard from './ChallengeCard';

interface ChallengeListProps {
  groups: ChallengeGroup[];
}

export default function ChallengeList({ groups }: ChallengeListProps) {
  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <div key={group.level} className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{group.emoji}</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{group.label}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {group.challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 