import type { Metadata } from "next";
import LocaleSwitcher from "../../components/LocaleSwitcher";
import { jsonLdScriptProps } from "react-schemaorg";
import { WebSite } from "schema-dts";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const isEnglish = locale === 'en';
  
  return {
    title: isEnglish 
      ? "Prompt Challenges - AI Prompt Engineering Practice Platform"
      : "提示词挑战 - AI 提示工程实践平台",
    description: isEnglish
      ? "Improve your AI prompt engineering skills with our collection of challenges, ranging from easy to extreme difficulty levels."
      : "通过我们的挑战系列提升您的 AI 提示工程技能，难度从简单到极限不等",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "en": "/en",
        "zh": "/zh",
      },
    },
    openGraph: {
      title: isEnglish
        ? "Prompt Challenges - Master AI Prompting Skills"
        : "提示词挑战 - 掌握 AI 提示技巧",
      description: isEnglish
        ? "Structured practice platform for enhancing your AI prompt engineering abilities with progressive challenges."
        : "结构化的练习平台，通过渐进式挑战提升您的 AI 提示工程能力",
      url: `/${locale}`,
      siteName: isEnglish ? "Prompt Challenges" : "提示词挑战",
      locale: isEnglish ? "en_US" : "zh_CN",
      type: "website",
      images: [
        {
          url: isEnglish ? "/images/og-image-en.png" : "/images/og-image-zh.png",
          width: 1200,
          height: 630,
          alt: isEnglish ? "Prompt Challenges Platform" : "提示词挑战平台",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isEnglish
        ? "Prompt Challenges - AI Prompt Engineering Practice"
        : "提示词挑战 - AI 提示工程练习",
      description: isEnglish
        ? "Master AI prompt engineering through our progressive challenge system"
        : "通过我们的渐进式挑战系统掌握 AI 提示工程",
      images: [isEnglish ? "/images/twitter-image-en.png" : "/images/twitter-image-zh.png"],
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const isEnglish = locale === 'en';
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {isEnglish ? "Prompt Challenges" : "提示词挑战"}
          </h1>
          <LocaleSwitcher />
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-4">
        {children}
      </main>
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {isEnglish ? "Prompt Challenges" : "提示词挑战"}
        </div>
      </footer>
      
      <script
        {...jsonLdScriptProps<WebSite>({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: isEnglish ? "Prompt Challenges" : "提示词挑战",
          url: `https://prompt-challenges.tslang.org/${locale}`,
          description: isEnglish 
            ? "Collection of AI prompt engineering challenges to enhance your skills"
            : "提高您的 AI 提示工程技能的挑战集合",
          inLanguage: isEnglish ? "en-US" : "zh-CN",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `https://prompt-challenges.tslang.org/${locale}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any
        })}
      />
    </div>
  );
} 