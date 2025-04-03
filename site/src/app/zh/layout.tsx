import type { Metadata } from "next";
import LocaleSwitcher from "../../components/LocaleSwitcher";
import { jsonLdScriptProps } from "react-schemaorg";
import { WebSite } from "schema-dts";

export const metadata: Metadata = {
  title: "提示词挑战 - AI 提示工程实践平台",
  description: "通过我们的挑战系列提升您的 AI 提示工程技能，难度从简单到极限不等",
  alternates: {
    canonical: "/zh",
    languages: {
      "en": "/en",
    },
  },
  openGraph: {
    title: "提示词挑战 - 掌握 AI 提示技巧",
    description: "结构化的练习平台，通过渐进式挑战提升您的 AI 提示工程能力",
    url: "/zh",
    siteName: "提示词挑战",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/images/og-image-zh.png",
        width: 1200,
        height: 630,
        alt: "提示词挑战平台",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "提示词挑战 - AI 提示工程练习",
    description: "通过我们的渐进式挑战系统掌握 AI 提示工程",
    images: ["/images/twitter-image-zh.png"],
  },
};

export default function ChineseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">提示词挑战</h1>
          <LocaleSwitcher />
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} 提示词挑战
        </div>
      </footer>
      
      <script
        {...jsonLdScriptProps<WebSite>({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "提示词挑战",
          url: "https://prompt-challenges.tslang.org/zh",
          description: "提高您的 AI 提示工程技能的挑战集合",
          inLanguage: "zh-CN",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://prompt-challenges.tslang.org/zh/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any
        })}
      />
    </div>
  );
} 