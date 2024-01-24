"use client";

import Image from "next/image";

import { homeFeatures } from "@/data";

export default function HomeFeatureSection() {
  return (
    <div className="self-center flex flex-col space-y-4 px-4 md:flex-row md:space-x-4 md:space-y-0 md:px-8">
      {homeFeatures.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col space-y-8 items-center justify-center bg-container-gradient p-8 border border-primary/30 rounded-lg md:flex-1"
        >
          <Image
            src={feature.image}
            alt={feature.title}
          />
          <h1 className="text-2xl text-center text-gradient bg-gradient-primary font-bold">
            {feature.title}
          </h1>
          <p className="text-center text-contrast">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
