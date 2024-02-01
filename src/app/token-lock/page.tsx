import Image from "next/image";
import { IoChevronDown } from "react-icons/io5";

export default function TokenLockPage() {
  return (
    <div className="flex-col space-y-4 md:self-center md:w-md flex">
      <div className="flex flex-col lt-md:bg-container lt-md:border-1 lt-md:border-stone-700 md:self-center">
        <button className="self-center flex space-x-2 items-center border border-container px-4 py-2 rounded-full hover:bg-container">
          <Image
            src="/assets/coins/solana.png"
            alt="sol"
            className="border border-container rounded-full"
            width={24}
            height={24}
          />
          <span className="flex-1 text-lg uppercase font-medium">Solana</span>
          <IoChevronDown />
        </button>
      </div>
      <section className="flex flex-col space-y-4 px-4">
        <div className="flex space-x-4 bg-container rounded-xl md:rounded-full">
          <button className="px-4 py-3 text-secondary hover:bg-secondary/20 rounded-l-full">
            New Lock
          </button>
          <button className="px-4 py-3 hover:bg-white/20">Manage Lock</button>
        </div>
        <div className="h-sm bg-container p-4 rounded-xl">
          <div className="flex items-center space-x-2">
            <Image
              src="/assets/coins/solana.png"
              alt="solana"
              className="rounded-full"
              width={32}
              height={32}
            />
            <h1 className="text-xl font-extrabold">Solana Lp Locker</h1>
          </div>
        </div>
      </section>
    </div>
  );
}
