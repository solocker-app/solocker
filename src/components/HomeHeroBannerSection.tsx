import Image from "next/image";
import { useRef } from "react";

import { homeHeroBannerInfos } from "@/data";
import { IlLogoUnion, IlArrowRight } from "@/assets";

export default function HomeHeroBannerSection() {
  return (
    <div className="overflow-hidden">
      <section className="relative flex flex-col md:min-w-1/4 md:flex-row md:items-center md:justify-center md:px-0 lt-md:space-y-4 overflow-hidden">
        <div className="relative w-sm h-80 px-8 lt-md:hidden">
          <Image
            src={IlLogoUnion}
            alt="Solocker Logo Union"
            className="absolute w-xs h-xs"
          />
          <Image
            src={IlArrowRight}
            alt="Arrow Right"
            className="absolute left-14 bottom-14 w-32"
          />
          <h1 className="text-xl capitalize font-bold p-4">
            bring the essential tools to solana
          </h1>
        </div>
        <div className="md:hidden max-w-1/2 self-center">
          <h1 className="text-xl capitalize font-bold text-center">
            bring the essential tools to solana
          </h1>
        </div>
        <div className="flex space-x-4 md:overflow-x-scroll snap-mandatory snap-x lt-md:px-4 z-10 marquee">
          {homeHeroBannerInfos.map((feature, index) => (
            <div
              key={index}
              className="shrink-0 w-64 h-80 flex flex-col space-y-8 bg-white/3 backdrop-blur-3xl p-8 rounded-xl snap-center"
            >
              <div className="flex items-center space-x-2">
                <div>
                  <div className="w-16 h-16 flex flex-col items-center justify-center bg-white/12 rounded-xl">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      className="w-8 h-8"
                    />
                  </div>
                </div>
                <h1 className="text-xl capitalize font-medium p-4">
                  {feature.title}
                </h1>
              </div>
              <div className="flex-1 flex flex-col justify-end">
                <p>{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        <Image
          src={IlArrowRight}
          alt="Arrow Right"
          className="md:hidden w-16 self-center"
        />
        <div className="absolute -right-24 w-xl h-xs bg-secondary/10 rounded-full blur-3xl -z-10 lt-md:hidden" />
      </section>
      <Image
        src={IlLogoUnion}
        alt="Solocker Logo Union"
        className="absolute -right-48 -bottom-48 md:hidden"
      />
    </div>
  );
}
