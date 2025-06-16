"use client";

import AIAssistantSection from "@/components/lp/features/aiAssistantSection";
import ShareSection from "@/components/lp/features/familyShareSection";
import FeaturesHero from "@/components/lp/features/hero-section";
import PublicShareSection from "@/components/lp/features/publicShareSection";
import StoryFormSection from "@/components/lp/features/storyFormSection";
import Footer from "@/components/lp/footer";
import { LpHeader } from "@/components/lp/header";
import { AnimatePresence } from "framer-motion";

export default function FeaturesPage() {
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <div key="features-content">
          <LpHeader />
          <main>
            <FeaturesHero />
            <StoryFormSection />
            <AIAssistantSection />
            <ShareSection />
            <PublicShareSection />
          </main>
          <Footer />
        </div>
      </AnimatePresence>
    </div>
  );
}
