"use client";

import Image from "next/image";
import { MdMenu } from "react-icons/md";

import { IlSolockerBrand } from "@/assets";

export default function LayoutHeader() {
  return (
    <header className="flex items-center space-x-2 p-4 md:px-8">
      <div className="flex-1">
        <Image
          src={IlSolockerBrand}
          alt="Decentralize bank"
          width={128}
          height={128}
          className="object-cover"
        />
      </div>
      <div className="flex space-x-2 items-center">
        <button className="btn btn-gradient-primary">Connect Wallet</button>
        <button className="btn flex items-center md:space-x-2 bg-stone-900 text-white">
          <MdMenu className="text-xl" />
          <span>Menu</span>
        </button>
      </div>
    </header>
  );
}
