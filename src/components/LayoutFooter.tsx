"use client";
import Link from "next/link";
import Image from "next/image";

import { IlSolockerBrandInverse } from "@/assets";
export default function LayoutFooter() {
  return (
    <footer className="flex space-x-4 p-8">
      <div className="flex-1 flex flex-col space-y-8 md:flex-none md:w-1/3">
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
      <div className="flex-1 items-end flex flex-col space-y-4">
        <h1>Social Media</h1>
        <div className="flex flex-col  text-center font-light text-highlight md:flex-row md:space-x-8">
          <Link
            href="/"
            className="py-2 md:p-0"
          >
            Twitter
          </Link>
          <Link
            href="/"
            className="py-2 md:p-0"
          >
            Telegram
          </Link>
          <Link
            href="/"
            className="py-2 md:p-0"
          >
            Discord
          </Link>
        </div>
      </div>
    </footer>
  );
}
