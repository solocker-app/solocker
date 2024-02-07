import { useRouter } from "next/navigation";

import { useState } from "react";
import { toast } from "react-toastify";

import { Types } from "@streamflow/stream";

import { useAppSelector } from "@/store/hooks";
import { LpInfo } from "@/lib/api/models/raydium.model";

import Search from "./widgets/Search";
import ErrorWidget from "./widgets/ErrorWidget";
import TokenLockEditItem from "./TokenLockEditItem";
import TokenLockCancel from "./TokenLockCancel";
import { TokenLockEditMenuAction } from "./TokenLockEditItemMenu";

type TokenLockEditTabProps = {
  lockedTokens: [string, Types.Stream][];
};

export default function TokenLockEditTab({
  lockedTokens,
}: TokenLockEditTabProps) {
  const router = useRouter();
  const [action, setAction] = useState<TokenLockEditMenuAction>();
  const [stream, setStream] = useState<[string, Types.Stream, LpInfo]>();

  const { loadingState } = useAppSelector((state) => state.streamFlow);

  return (
    <>
      <div className="flex flex-col space-y-8 bg-dark/50 p-4 rounded-xl">
        <header className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <h1 className="text-xl font-bold">Withdraw</h1>
            <p className="text-highlight">
              Withdraw or cancel from lock contracts
            </p>
          </div>
          <Search />
        </header>
        <div className="overflow-y-scroll max-h-lg min-h-sm flex flex-col overflow-y-scroll">
          {loadingState === "failed" ? (
            <ErrorWidget />
          ) : (
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
              <>
                {loadingState === "success" &&
                  lockedTokens.map(([address, stream]) => (
                    <TokenLockEditItem
                      key={address}
                      stream={stream}
                      onAction={async (action, lpInfo) => {
                        switch (action) {
                          case TokenLockEditMenuAction.VIEW:
                            router.push(
                              window.location.href +
                                "lp-lock/?address=" +
                                address,
                            );
                            break;
                          case TokenLockEditMenuAction.SHARE:
                            const data = {
                              title: "View Lp Token Locked on Solocker",
                              text: "",
                              url:
                                window.location.href +
                                "lp-lock/?address=" +
                                address,
                            };
                            await window.navigator.share(data);
                            toast.success("Token LP lock Link shared");
                            break;
                          default:
                            setAction(action);
                            setStream([address, stream, lpInfo]);
                        }
                      }}
                    />
                  ))}
              </>
            </table>
          )}
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
