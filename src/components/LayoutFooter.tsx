import Image from "next/image";

import { IlSolockerBrandInverse } from "@/assets";
import { layoutSocials } from "@/data";

export default function LayoutFooter() {
  return (
    <footer className="px-8 py-4 md:p-16 text-highlight">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col">
          <Image
            src={IlSolockerBrandInverse}
            alt="Solocker"
          />
          <p>Solana First Lp Locker</p>
        </div>
        <hr className="border-dark" />
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0">
          <p className="flex-1">© {new Date().getFullYear()} Solocker Inc. All Right Reserve</p>
          <div className="flex space-x-2">
            {layoutSocials.map((social, index) => (
              <Image
                key={index}
                src={social.icon}
                alt={social.name}
                className="w-6 h-6"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
