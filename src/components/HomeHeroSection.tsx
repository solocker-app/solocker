import Image from "next/image";
import HomeFeatureBanner from "./HomeFeatureBanner";

export default function HomeHeroSection() {
  return (
    <section className="flex flex-col space-y-8 md:p-16">
      <div className="flex flex-col space-x-4 p-8 md:p-0 md:flex-row">
        <div className="flex-1 flex flex-col space-y-4">
          <div className="flex flex-col space-y-2 text-center md:text-start">
            <h1 className="text-4xl font-extrabold">
              <span>The Seamless Token Management Suite </span>
              <span className="text-green-500">On solana</span>
            </h1>
            <p className="text-highlight">
              Lock and manage your liquidity pools, Vest and delegate tokens in your DAO, and deploy secure token contracts, only possible on Solocker.
            </p>
          </div>
          <div className="flex space-x-4 md:w-1/2">
            <button className="flex-1 btn btn-primary">Join Community</button>
            <button className="flex-1 btn btn-dark">Buy $LOCK</button>
          </div>
       </div>
        <div className="flex-1 lt-md:pt-8">
          <Image
            src="/assets/images/config.png"
            alt="Solocker dapp"
            width={256}
            height={256} />
        </div>
      </div>
      <HomeFeatureBanner />
    </section>
  );
}
