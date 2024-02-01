import Image from "next/image";
import { MdEdit, MdSearch } from "react-icons/md";
import { IoChevronDown, IoAdd } from "react-icons/io5";
import OverlapCoinIcon, {
  getCoinProps,
} from "@/components/widgets/OverlapCoinIcon";

export default function TokenLockPage() {
  return (
    <div className="flex-1 flex flex-col space-y-4 p-8 md:w-2xl md:self-center">
      <div className="flex space-x-2 bg-dark/50 rounded-xl md:rounded-full">
        <button className="btn text-green-500">
          <p>New Lock</p>
        </button>
        <button className="btn">
          <p>Edit/Withdraw</p>
        </button>
      </div>
      <div className="flex flex-col space-y-8 bg-dark/50 p-4 rounded-xl">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/assets/coins/solana.png"
              alt="Solana"
              className="w-12 h-12 rounded-full"
              width={32}
              height={32}
            />
            <p className="text-xl font-bold">Solana Lp Locker</p>
          </div>
          <div className="flex space-x-2 items-center bg-black px-2 rounded-md focus-within:ring-1 focus-within:ring-green-500 focus-within:text-green-500">
            <input
              className="flex-1 p-2 bg-transparent outline-none"
              placeholder="Search by token name and mint address"
            />
            <MdSearch className="text-xl" />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 flex space-x-2 items-center">
              <OverlapCoinIcon
                icons={[getCoinProps(null), getCoinProps(null)]}
              />
              <div className="flex flex-col">
                <p className="text-base font-medium">Raydium Lp Token</p>
                <p className="text-highlight">RAY/SOL</p>
              </div>
            </div>
            <div className="text-sm">0.001 RAY/SOL</div>
          </div>
        </div>
      </div>
    </div>
  );
}
