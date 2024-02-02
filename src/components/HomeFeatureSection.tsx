import Image from "next/image";
import { MdChevronRight } from "react-icons/md";

import { join } from "@/lib/utils";
import { homeFeatures } from "@/data";

import HomeFeatureBanner from "./HomeFeatureBanner";

export default function HomeFeatureSection() {
  return (
    <section 
      id="faq"
      className="flex flex-col items-center justify-center space-y-8 px-8 md:px-16">
      <div className="flex flex-col text-center">
        <h1 className="text-xl font-bold">
          Providing Trust & Confidence on Solana
        </h1>
        <p className="text-sm text-highlight">
          Transparent and Secure liquidity pool locker for solana spl-token.
        </p>
      </div>
      <div className="flex-col space-y-4 xl:w-6xl md:self-center flex">
        {homeFeatures.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col space-y-16 md:flex-row md:space-y-0"
          >
            <div className={index % 2 === 0 ? "md:order-last md:ml-24" : "md:mr-24"}>
              <Image  
                src={feature.image}
                alt={feature.title}
                height={256}
                width={256}
                className="w-full h-48 bg-dark/50 rounded-md md:w-sm" 
              />
            </div>
            <div
              className={join(
                "flex-1 flex flex-col space-y-8",
                index % 2 === 0 ? "md:order-first" : null,
              )}
            >
              <div className="flex flex-col space-y-4">
                <h1 className="text-lg font-medium">{feature.title}</h1>
                <p className="text-highlight">{feature.description}</p>
              </div>
              <button className="self-start flex items-center p-2 text-green-500 hover:bg-green-500/10 !hidden">
                <span>{feature.subtitle}</span>
                <MdChevronRight className="text-xl" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <HomeFeatureBanner />
    </section>
  );
}
