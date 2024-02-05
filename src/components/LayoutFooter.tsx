import Link from "next/link";
import Image from "next/image";

import { layoutSocials } from "@/data";
import { IlLogoUnionDark, IlLogoUnion, IlSolockerBrand } from "@/assets";

export default function LayoutFooter() {
  return (
    <footer className="flex flex-col space-y-8 text-highlight p-4 md:flex-row  md:items-center md:space-x-16 md:space-y-0 md:max-w-4xl md:self-center lt-md:text-center lt-md:justify-center lt-md:items-center">
      <div className="flex-1 flex flex-col space-y-4 md:flex-1">
        <div className="flex flex-col space-y-4 lt-md:items-center lt-md:justify-center">
          <Image
            src={IlSolockerBrand}
            className="lt-md:w-32"
            alt="Solocker Brand"
          />
          <p className="capitalize">
            the seamless token management suite on solana.
          </p>
          <div className="flex space-x-4">
            {layoutSocials.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-md"
              >
                <Image
                  src={social.icon}
                  alt={social.name}
                />
              </Link>
            ))}
          </div>
        </div>
        <hr className="border-1 border-white/21" />
        <p>
          <span>2024. All Right Reserve, </span>
          <span className="text-secondary font-bold">SOLocker.app</span>
        </p>
      </div>
      <div className="relative flex flex-col items-center justify-center lt-md:order-first lt-md:pb-8">
        <Image
          src={IlLogoUnion}
          className="lt-md:w-72 lt-md:h-72 md:hidden"
          alt="Solocker Branding"
        />
        <Image
          src={IlLogoUnionDark}
          className="lt-md:absolute lt-md:w-56 lt-md:h-56"
          alt="Solocker Branding"
        />
      </div>
    </footer>
  );
}
