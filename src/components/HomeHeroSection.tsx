import Link from "next/link";
import Image from "next/image";
import { IlDecentralizeBank } from "@/assets";

export default function HomeHeroSection() {
  return (
    <div className="flex flex-col md:flex-row md:relative">
      <div className="flex flex-col space-y-4 px-4 md:px-8 md:w-2xl">
        <div className="text-4xl capitalize font-extrabold">
          <span>empowering the</span>
          <span className="text-primary"> solana community</span>
          <span> with secure</span>
          <span className="text-primary"> liquidity pool locking</span>
        </div>
        <p className="text-sm text-highlight">
          Solocker helps you keep transparency and secure liquidity lock with
          user friendly interface for your projects.
        </p>
        <Link 
          href="/token-lock"
          className="self-start btn btn-primary">Liquidity Pool Lock</Link>
      </div>
      <div className="flex items-center justify-center md:flex-1 md:w-sm md:h-sm md:absolute md:right-0 md:top-0">
        <Image
          src={IlDecentralizeBank}
          alt="Decentralize bank"
        />
      </div>
    </div>
  );
}
