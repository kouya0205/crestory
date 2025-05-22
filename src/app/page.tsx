import { HydrateClient } from "@/trpc/server";
import HeroSection from "@/components/lp/hero-section";
import LpHeader from "@/components/lp/header";

export default async function Home() {
  return (
    <HydrateClient>
      <LpHeader />
      <HeroSection />
      <HeroSection />
    </HydrateClient>
  );
}
