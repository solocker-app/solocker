import { useState } from "react";
import Image from "next/image";
import { Types } from "@streamflow/stream";

import Search from "./widgets/Search";
import TokenLockEditItemMenu, {
  TokenLockEditMenuAction,
} from "./TokenLockEditItemMenu";
import OverlapCoinIcon, { getCoinProps } from "./widgets/OverlapCoinIcon";

type TokenLockEditTabProps = {
  lockedTokens: [string, Types.Stream][];
};

export default function TokenLockEditTab({
  lockedTokens,
}: TokenLockEditTabProps) {
  const [stream, setStream] = useState<null>();
  const [action, setAction] = useState<TokenLockEditMenuAction>();

  return (
    <div className="flex flex-col space-y-8 bg-dark/50 p-4 rounded-xl">
      <header className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-xl font-bold">Edit / Withdraw</h1>
          <p className="text-highlight">
            Withdraw or cancel from lock contracts
          </p>
        </div>
        <Search />
      </header>
      <div className="overflow-y-scroll max-h-sm min-h-lg">
        <table>
          <thead className="sticky top-0">
            <tr>
              <th></th>
              <th>Liquidity Pool</th>
              <th>Locked amount</th>
              <th>Unlock date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
           
          </tbody>
        </table>
      </div>
    </div>
  );
}
