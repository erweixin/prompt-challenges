'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { locales } from '../middleware';

export default function LocaleSwitcher() {
  const pathname = usePathname();
  
  const currentLocale = pathname.split('/')[1];
  const restOfPath = pathname.split('/').slice(2).join('/');

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale) => {
        const isActive = currentLocale === locale;
        
        return (
          <Link
            key={locale}
            href={`/${locale}/${restOfPath}`}
            className={`text-sm px-2 py-1 rounded ${
              isActive 
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {locale === 'en' ? 'English' : '中文'}
          </Link>
        );
      })}
    </div>
  );
} 