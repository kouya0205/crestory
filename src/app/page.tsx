"use client";

import { CTASection } from "@/components/lp/ctaSection";
import { FeaturesSection } from "@/components/lp/featuresSection";
import Footer from "@/components/lp/footer";
import { LpHeader } from "@/components/lp/header";
import { HeroSection } from "@/components/lp/hero-section";
import { SplashScreen } from "@/components/lp/splashScreen";
import { WhySection } from "@/components/lp/whySection";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const CrestoryLanding = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="relative">
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!showSplash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <LpHeader />
            <main>
              <HeroSection />
              <FeaturesSection />
              <WhySection />
              <CTASection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CrestoryLanding;
