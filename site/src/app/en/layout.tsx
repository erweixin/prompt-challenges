import type { Metadata } from "next";
import LocaleSwitcher from "../../components/LocaleSwitcher";
import { jsonLdScriptProps } from "react-schemaorg";
import { WebSite } from "schema-dts";

export const metadata: Metadata = {
  title: "Prompt Challenges - AI Prompt Engineering Practice Platform",
  description: "Improve your AI prompt engineering skills with our collection of challenges, ranging from easy to extreme difficulty levels.",
  alternates: {
    canonical: "/en",
    languages: {
      "zh": "/zh",
    },
  },
  openGraph: {
    title: "Prompt Challenges - Master AI Prompting Skills",
    description: "Structured practice platform for enhancing your AI prompt engineering abilities with progressive challenges.",
    url: "/en",
    siteName: "Prompt Challenges",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image-en.png",
        width: 1200,
        height: 630,
        alt: "Prompt Challenges Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Challenges - AI Prompt Engineering Practice",
    description: "Master AI prompt engineering through our progressive challenge system",
    images: ["/images/twitter-image-en.png"],
  },
};

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Prompt Challenges</h1>
          <LocaleSwitcher />
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Prompt Challenges
        </div>
      </footer>
      
      <script
        {...jsonLdScriptProps<WebSite>({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Prompt Challenges",
          url: "https://prompt-challenges.tslang.org/en",
          description: "Collection of AI prompt engineering challenges to enhance your skills",
          inLanguage: "en-US",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://prompt-challenges.tslang.org/en/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any
        })}
      />
    </div>
  );
} 