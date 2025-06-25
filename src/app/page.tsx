"use client";

import React from "react";
import Header from "@/components/lp/header";
import HeroSection from "@/components/lp/hero-section";
import FeaturesSection from "@/components/lp/features-section";
import DemoSection from "@/components/lp/demo-section";
import FeatureDetailsSection from "@/components/lp/feature-details-section";
import TabsSection from "@/components/lp/tabs-section";
import TestimonialsSection from "@/components/lp/testimonials-section";
import PricingSection from "@/components/lp/pricing-section";
import FAQSection from "@/components/lp/faq-section";
import CTASection from "@/components/lp/cta-section";
import Footer from "@/components/lp/footer";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <FeatureDetailsSection />
        <TabsSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
