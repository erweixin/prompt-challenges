import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prompt Challenges",
  description: "查看和测试 Prompt 挑战",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <Analytics />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold">Prompt Challenges</h1>
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
        </div>
      </body>
    </html>
  );
}
