import { Orbitron } from "next/font/google";

import HomeStep from "@/components/HomeStep";
import HomeQuote from "@/components/HomeQuote";
import HomeHeroSection from "@/components/HomeHeroSection";
import HomeFeatureSection from "@/components/HomeFeatureSection";

export const orbitronFont = Orbitron({
  subsets: ["latin"],
});

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-16">
      <HomeHeroSection />
      <HomeFeatureSection />
      <HomeStep />
      <HomeQuote />
    </div>
  );
}
