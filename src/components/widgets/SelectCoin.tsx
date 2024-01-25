import Image from "next/image";

import { MdArrowDropDown } from "react-icons/md";

export default function SelectCoin() {
  return (
    <div className="relative">
      <div className="flex items-center bg-container/70 px-2 rounded-md">
        <Image
          src="/assets/coins/solana.png"
          alt="Solana"
          className="w-8 h-8 rounded-full"
          width={24}
          height={24}
        />
        <input
          value="SOL"
          className="flex-1 bg-transparent p-2 outline-none pointer-events-none"
          disabled
        />
        <MdArrowDropDown className="text-lg" />
      </div>
    </div>
  );
}
