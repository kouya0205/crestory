import "@/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: {
    template: "%s | Crestory",
    default: "Crestory - あなたの人生を物語に",
  },
  description:
    "Crestoryは、あなたの思い出や経験を大切な家族史として残すためのサービスです。",
  openGraph: {
    title: "Crestory - 家族の歴史を紡ぐ",
    description: "大切な思い出を、次世代へ。Crestoryで始める家族の物語作り",
    images: [
      {
        url: "https://crestory.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Crestory - Family History Platform",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crestory - あなたの人生を物語に",
    description: "大切な思い出を、次世代へ。Crestoryで始める家族の物語作り",
    images: ["https://crestory.vercel.app/og-image.jpg"],
  },
  // その他の重要なメタデータ
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://crestory.vercel.app",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${inter.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
