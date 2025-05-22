import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "PickBuy（ピクバイ）",
  description:
    "PickBuy（ピクバイ）は、地方の生産者・職人と全国の消費者を繋ぐライブコマースプラットフォームです。生産現場や製造工程をライブ配信で可視化し、地域の魅力を伝えることで、地方創生と地域産業の活性化を支援します。",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
