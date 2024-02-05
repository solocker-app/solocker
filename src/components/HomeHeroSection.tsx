"use client";

import Link from "next/link";
import Image from "next/image";

import { IlHero } from "@/assets";
import HomeHeroBannerSection from "./HomeHeroBannerSection";

export default function HomeHeroSection() {
  return (
    <section className="flex flex-col space-y-24">
      <div className="flex flex-col space-y-16 px-8 md:px-16">
        <div className="flex flex-col space-y-8 md:max-w-2xl md:self-center">
          <div className="flex flex-col text-center">
            <h1 className="text-2xl font-extrabold">
              The Seamless Token Management Suite On Solana
            </h1>
            <p>
              Lock and manage your liquidity pools, Vest and delegate tokens in
              your DAO, and deploy secure token contracts, only possible on
              Solocker.
            </p>
          </div>
          <div className="flex items-center justify-center space-x-6">
            <Link
              href=""
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
          className="border-1 border-primary/28 rounded-xl lt-md:object-fill"
        />
      </div>
      <HomeHeroBannerSection />
    </section>
  );
}
