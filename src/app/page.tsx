"use client";

import LayoutFooter from "@/components/LayoutFooter";
import HomeHeroSection from "@/components/HomeHeroSection";
import HomeFeatureSection from "@/components/HomeFeatureSection";

export default function HomePage() {
  return (
    <>
      <div
        id="container"
        className="flex flex-col space-y-16 pt-16 md:pt-8 overflow-x-hidden overflow-y-auto"
      >
        <HomeHeroSection />
        <HomeFeatureSection />
        <LayoutFooter />
      </div>
    </>
  );
}
