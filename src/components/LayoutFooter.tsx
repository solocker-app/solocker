"use client";

import Image from "next/image";

import { layoutSocials } from "@/data/social";
import { IlSolockerBrand } from "@/assets";

export default function LayoutFooter() {
  return (
    <footer className="flex flex-col space-y-8 text-base text-highlight md:text-lg p-4 md:p-8">
      <div className="flex space-x-4">
        {layoutSocials.map((social, index) => (
          <a
            key={index}
            className="w-12 h-12 flex items-center justify-center bg-container rounded-full"
          >
            <Image
              src={social.icon}
              alt={social.name}
              className="w-8 h-8"
            />
          </a>
        ))}
      </div>
      <hr className="border-highlight border-dashed" />
      <div className="flex flex-col space-y-8">
        <div>
          <Image
            src={IlSolockerBrand}
            alt="Solocker branding"
          />
          <p>support@sololocker.com</p>
        </div>
        <div>
          <p className="hidden">Build with love by BackLog ❤</p>
          <p>Copyright © Solocker™ </p>
        </div>
      </div>
    </footer>
  );
}
