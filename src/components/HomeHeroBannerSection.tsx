import Image from "next/image";

import { homeHeroBannerInfos } from "@/data";
import { IlLogoUnion, IlArrowRight } from "@/assets";

export default function HomeHeroBannerSection() {
  return (
    <section className="relative flex flex-col md:flex-row md:space-x-32 md:items-center lt-md:space-y-16 overflow-hidden">
      <Image
        src={IlLogoUnion}
        alt="Solocker Logo Union"
        className="absolute right-0 bottom-0 md:hidden"
      />
      <div className="relative h-72 px-4 md:px-16 lt-md:hidden">
        <Image
          src={IlLogoUnion}
          alt="Solocker Logo Union"
          className="absolute"
        />
        <Image
          src={IlArrowRight}
          alt="Arrow Right"
          className="absolute bottom-0"
        />
        <h1 className="text-xl capitalize font-bold">
          bring the essential tools to solana
        </h1>
      </div>
      <div className="md:hidden max-w-1/2 self-center">
        <h1 className="text-xl capitalize font-bold text-center">
          bring the essential tools to solana
        </h1>
      </div>
      <div className="flex space-x-4 overflow-x-scroll snap-mandatory snap-x lt-md:px-4 z-10 marquee">
        {homeHeroBannerInfos.map((feature, index) => (
          <div
            key={index}
            className="shrink-0 w-72 h-80 flex flex-col space-y-8 bg-white/3 backdrop-blur-xl p-8 rounded-xl snap-center"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 flex items-center justify-center bg-white/12 p-3 rounded-xl">
                <Image
                  src={feature.image}
                  alt={feature.title}
                />
              </div>
              <h1 className="text-xl capitalize font-medium">
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
  );
}
