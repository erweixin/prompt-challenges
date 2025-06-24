import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" }
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://prompt-challenges.tslang.org"),
  title: {
    default: "Prompt Challenges",
    template: "%s | Prompt Challenges",
  },
  description: "Collection of AI prompt engineering challenges to enhance your skills with varying difficulty levels from easy to extreme.",
  keywords: ["prompt engineering", "AI prompts", "AI challenges", "LLM", "ChatGPT", "prompt techniques"],
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "Prompt Challenges Team" }],
  creator: "Prompt Challenges Team",
  publisher: "Prompt Challenges",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <Analytics />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
