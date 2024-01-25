"use client";
import Image from "next/image";

import { homeFeatures } from "@/data";

export default function HomeFeatureSection() {
  return (
    <div className="flex flex-col space-y-8 items-center justify-center px-4 md:px-8">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold">
          <span>Solocker </span>
          <span className="text-primary">Token Lock</span>
        </h1>
        <p className="text-highlight text-sm">
          Introducing our Token Lock feature, designed to safeguard your assets.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {homeFeatures.map((feature, index) => (
          <div
            key={index}
            className="max-w-xs flex flex-col space-y-2 bg-container/50 p-4 rounded-md"
          >
            <Image
              src={feature.image}
              alt={feature.title}
              className="w-12 h-12"
            />
            <div>
              <h1 className="text-base font-bold">{feature.title}</h1>
              <p className="text-highlight">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
