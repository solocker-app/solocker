import Image from "next/image";
import { MdLockOutline } from "react-icons/md";

import LockStatus from "./widgets/LockStatus";
import TokenLockItemMenu from "./TokenLockItemMenu";

export default function TokenLockListItem() {
  return (
    <tr>
      <td>
        <div className="flex items-center">
          <Image
            src="/assets/coins/ray.png"
            alt="raydium"
            className="w-6 h-6 rounded-full"
            width={24}
            height={24}
          />
          <p className="invisible">hm</p>
        </div>
      </td>
      <td>
        <div className="flex items-center">
          <Image
            src="/assets/coins/usdc.png"
            alt="usdc"
            className="w-6 h-6 rounded-full border border-highlight/50"
            width={24}
            height={24}
          />
          <Image
            src="/assets/coins/solana.png"
            alt="usdc"
            className="-ml-2 w-6 h-6 rounded-full border border-highlight/50"
            width={24}
            height={24}
          />
        </div>
      </td>
      <td>
        <div className="flex space-x-2 items-center">
          <MdLockOutline />
          <p className="flex items-center space-x-1">
            <span>2</span>
            <span className="text-highlight">SOL</span>
          </p>
        </div>
      </td>
      <td>Tommorrow</td>
      <td>
        <LockStatus status="pending" />
      </td>
      <td>
        <TokenLockItemMenu />
      </td>
    </tr>
  );
}
