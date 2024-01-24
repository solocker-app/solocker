"use client";

import Image from "next/image";

import { join } from "@/lib/utils";
import { orbitronFont } from "@/fonts";
import { IlDecentralizeBank } from "@/assets";

export default function HomeHeroSection() {
  return (
    <div className="flex flex-col px-4 md:flex-row md:px-8">
      <div className="md:w-1/2 flex flex-col items-start space-y-4">
        <div
          className={join(
            "inline-block text-2xl md:text-4xl font-bold md:tracking-wider md:leading-10",
            orbitronFont.className
          )}
        >
          <span>Empowering the </span>
          <span className="text-gradient text-gradient-primary">
            Solana Community
          </span>
          <span> with Secure </span>
          <span className="text-gradient text-gradient-primary">
            Liquidity Pool Locking
          </span>
        </div>
        <button className="btn !px-8 btn-gradient-primary">Learn More</button>
      </div>
      <div>
        <Image
          src={IlDecentralizeBank}
          alt="decentralize bank"
          className="md:w-full md:h-sm"
        />
      </div>
    </div>
  );
}
