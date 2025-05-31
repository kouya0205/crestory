import { HydrateClient } from "@/trpc/server";
import HeroSection from "@/components/lp/hero-section";
import LpHeader from "@/components/lp/header";

export default async function Home() {
  return (
    <HydrateClient>
      <LpHeader />
      <main className="min-h-screen">
        <HeroSection />
        {/* 自分史サービスの特徴やメリットを紹介するセクションを追加予定 */}
      </main>
    </HydrateClient>
  );
}
