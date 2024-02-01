import Image from "next/image";
import HomeHeroBanner from "./HomeHeroBanner";

export default function HomeHeroSection() {
  return (
    <section className="flex flex-col space-y-8 md:p-16">
      <div className="flex flex-col space-x-4 p-8 md:p-0 md:flex-row">
        <div className="flex-1 flex flex-col space-y-4">
          <div className="flex flex-col space-y-2 text-center md:text-start">
            <h1 className="text-4xl font-extrabold">
              <span>The first LP locker built </span>
              <span className="text-green-500">on solana</span>
            </h1>
            <p className="text-highlight">
              Locking and managing of liquidity pool made easier. Create a liquity
              pool lock contract on solana network.
            </p>
          </div>
          <button className="btn btn-primary md:w-1/2">Join the community</button>
        </div>
        <div className="flex-1" />
      </div>
      <HomeHeroBanner />
    </section>
  );
}
