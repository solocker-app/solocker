"use client";

import Link from "next/link";
import Image from "next/image";

import { IlHero } from "@/assets";
import HomeHeroBannerSection from "./HomeHeroBannerSection";

export default function HomeHeroSection() {
  return (
    <section className="relative flex flex-col">
      <div className="self-center w-72 h-72 md:w-xs md:h-xs absolute -top-20 bg-primary/20 blur-3xl rounded-full -z-10 md:w-xl md:h-md " />
      <div className="flex flex-col space-y-24 z-10">
        <div className="flex flex-col space-y-16 px-8 md:px-16 md:items-center md:justify-center">
          <div className="flex flex-col space-y-8 md:max-w-2xl 2xl:max-w-4xl md:self-center">
            <div className="flex flex-col space-y-4 text-center">
              <h1 className="self-center max-w-60 md:max-w-md text-2xl 2xl:text-4xl font-bold">
                The Seamless Token Management Suite On Solana
              </h1>
              <p className="self-center max-w-4xl text-sm md:max-w-lg md:text-[15px] 2xl:text-base">
                Lock and manage your liquidity pools. Vest and delegate tokens
                in your DAO, and deploy secure token contracts, only possible on
                Solocker.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-4 md:space-x-6 2xl:space-x-8">
              <Link
                href="https://t.me/solocker"
                target="_blank"
                className="btn btn-primary"
              >
                Join Community
              </Link>
              <Link
                href="/"
                target="_blank"
                className="btn btn-dark"
              >
                Buy $LOCK
              </Link>
            </div>
          </div>
          <Image
            src={IlHero}
            alt="Solocker Dashboard Preview"
            className="rounded-xl lt-md:object-fill"
          />
        </div>
        <HomeHeroBannerSection />
      </div>
    </section>
  );
}
