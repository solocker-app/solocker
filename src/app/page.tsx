"use client";

import { homeSteps } from "@/data";
import LayoutFooter from "@/components/LayoutFooter";
import HomeHeroSection from "@/components/HomeHeroSection";
import HomeStepSection from "@/components/HomeStepSection";
import HomeFeatureSection from "@/components/HomeFeatureSection";
import HomeTestimonySection from "@/components/HomeTestimonySection";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col space-y-16 py-16">
        <HomeHeroSection />
        <HomeFeatureSection />
        <HomeStepSection />
        <HomeTestimonySection />
      </div>
      <LayoutFooter />
    </>
  );
}
