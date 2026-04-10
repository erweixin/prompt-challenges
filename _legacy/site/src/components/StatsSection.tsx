import { getDictionary } from '../utils/i18n';

interface StatsSectionProps {
  locale: string;
}

export default function StatsSection({ locale }: StatsSectionProps) {
  const dict = getDictionary(locale);
  
  const stats = [
    {
      number: '12+',
      label: dict.home.stats.challenges,
      icon: '🎯'
    },
    {
      number: '1.2k+',
      label: dict.home.stats.users,
      icon: '👥'
    },
    {
      number: '500+',
      label: dict.home.stats.solutions,
      icon: '💡'
    },
    {
      number: '2',
      label: dict.home.stats.languages,
      icon: '🌍'
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            {dict.home.stats.title}
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 