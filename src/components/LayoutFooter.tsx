"use client";
import Link from "next/link";
import Image from "next/image";

import { IlSolockerBrandInverse } from "@/assets";
export default function LayoutFooter() {
  return (
    <footer className="flex space-x-4 p-4 md:px-8">
      <div className="flex-1 flex flex-col space-y-8">
        <div>
          <Image
            src={IlSolockerBrandInverse}
            alt="Solocker"
          />
        </div>
        <p className="text-highlight">
          Unlocking Solana's Liquidity Potential: Secure, Efficient and
          Empowering
        </p>
      </div>
      <div className="flex flex-col space-y-4">
        <h1>Social Media</h1>
        <div className="flex flex-col self-center text-center font-light text-highlight">
          <Link
            href="/"
            className="py-4"
          >
            Twitter
          </Link>
          <Link
            href="/"
            className="py-4"
          >
            Telegram
          </Link>
          <Link
            href="/"
            className="py-4"
          >
            Discord
          </Link>
        </div>
      </div>
    </footer>
  );
}
