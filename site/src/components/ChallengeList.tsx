import { ChallengeGroup } from '../types/challenge';
import ChallengeCard from './ChallengeCard';
import { getDictionary } from '../utils/i18n';

interface ChallengeListProps {
  groups: ChallengeGroup[];
  locale: string;
}

export default function ChallengeList({ groups, locale }: ChallengeListProps) {
  const dict = getDictionary(locale);
  
  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <div key={group.level} className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{group.emoji}</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {dict.difficulty[group.level]}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {group.challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} locale={locale} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 