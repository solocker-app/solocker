import { useState } from "react";
import Image from "next/image";
import { Types } from "@streamflow/stream";

import Search from "./widgets/Search";
import TokenLockEditItemMenu, {
  TokenLockEditMenuAction,
} from "./TokenLockEditItemMenu";
import Loading from "./widgets/Loading";
import ErrorWidget from "./widgets/ErrorWidget";
import TokenLockEditItem from "./TokenLockEditItem";
import TokenLockCancel from "./TokenLockCancel";
import OverlapCoinIcon, { getCoinProps } from "./widgets/OverlapCoinIcon";
import { LpInfo } from "@/lib/api/models/raydium.model";
import { useAppSelector } from "@/store/hooks";

type TokenLockEditTabProps = {
  lockedTokens: [string, Types.Stream][];
};

export default function TokenLockEditTab({
  lockedTokens,
}: TokenLockEditTabProps) {
  const [action, setAction] = useState<TokenLockEditMenuAction>();
  const [stream, setStream] = useState<[string, Types.Stream, LpInfo]>();

  const { loadingState } = useAppSelector((state) => state.streamFlow);

  return (
    <>
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
        <div className="overflow-y-scroll max-h-lg min-h-sm overflow-y-scroll">
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
              {loadingState === "success" ? (
                lockedTokens.map(([address, stream]) => (
                  <TokenLockEditItem
                    key={address}
                    stream={stream}
                    onAction={(action, lpInfo) => {
                      switch (action) {
                        case TokenLockEditMenuAction.VIEW:
                          window.open(
                            "https://solscan.io/account/" + address,
                            "_blank",
                          );
                          break;
                        default:
                          setAction(action);
                          setStream([address, stream, lpInfo]);
                      }
                    }}
                  />
                ))
              ) : loadingState === "failed" ? (
                <ErrorWidget />
              ) : (
                <Loading />
              )}
            </tbody>
          </table>
        </div>
      </div>
      {action === TokenLockEditMenuAction.CANCEL && (
        <TokenLockCancel
          stream={stream}
          setVisible={() => {
            setStream(undefined);
            setStream(undefined);
          }}
        />
      )}
    </>
  );
}
