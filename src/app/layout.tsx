import "@/app/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "PickBuy（ピクバイ）",
  description:
    "AIのサポートを受けながら、個人の自分史を簡単に作成・整理し、プライバシーに配慮した形で家族や指定した範囲で共有したり、自身の人生を振り返って自己理解を深めたり、他者の経験（公開設定されたもの）から学びを得たりすることを目的としたWebプラットフォーム。記録の容易化: AIが手間のかかる作業をサポートし、誰でも自分史を残しやすくする。家族の絆の深化: 世代を超えて人生の物語を共有し、理解を深める。自己成長の促進: 過去を振り返ることで自己理解を深め、未来の指針を得る。知見の共有: （公開設定の場合）他者の多様な人生経験から学びを得る機会を提供する。",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
