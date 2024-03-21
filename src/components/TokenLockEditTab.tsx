import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { MdLock } from "react-icons/md";
import { toast } from "react-toastify";

import { LoadingState } from "@/store/types";
import StreamFlow from "@/lib/streamflow";

import Search from "./widgets/Search";
import Loading from "./widgets/Loading";
import ErrorWidget from "./widgets/ErrorWidget";

import TokenLockEditItem from "./TokenLockEditItem";
import TokenLockCancel from "./TokenLockCancel";
import { TokenLockEditMenuAction } from "./TokenLockEditItemMenu";

type TokenLockEditTabProps = {
  loadingState: LoadingState["loadingState"];
  lockedTokens: Awaited<ReturnType<StreamFlow["getLockedTokens"]>>;
};

export default function TokenLockEditTab({
  lockedTokens,
  loadingState,
}: TokenLockEditTabProps) {
  const router = useRouter();
  const [action, setAction] = useState<TokenLockEditMenuAction>();
  const [stream, setStream] = useState<Awaited<ReturnType<StreamFlow["getLockedTokens"]>>[number]>();

  return (
    <>
      <div className="self-center flex flex-col space-y-8 bg-dark/50 p-4 rounded-xl lt-md:max-w-full md:w-full">
        <header className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <h1 className="text-xl font-bold">Withdraw</h1>
            <p className="text-highlight">
              Withdraw or cancel from lock contracts
            </p>
          </div>
          <Search />
        </header>
        <div className="max-h-lg min-h-sm flex flex-col overflow-y-scroll">
          {loadingState === "success" ? (
            lockedTokens.length > 0 ? (
              <table>
                <thead className="sticky top-0">
                  <tr>
                    <th className="truncate"></th>
                    <th className="truncate">Liquidity Pool</th>
                    <th>Locked amount</th>
                    <th className="truncate">Locked date</th>
                    <th className="truncate">Unlock date</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <>
                  {lockedTokens.map(({ address, stream, lpInfo }) => (
                    <TokenLockEditItem
                      key={address}
                      lpInfo={lpInfo}
                      stream={stream}
                      onAction={async (action) => {
                        switch (action) {
                          case TokenLockEditMenuAction.VIEW:
                            router.push("/lp-lock/?address=" + address);
                            break;
                          case TokenLockEditMenuAction.SHARE:
                            const data = {
                              title: "View Lp Token Locked on Solocker",
                              url:
                                window.location.origin +
                                "/lp-lock/?address=" +
                                address,
                            };
                            await window.navigator.share(data);
                            toast.success("Token LP lock Link shared");
                            break;
                          default:
                            setAction(action);
                            setStream({address, stream, lpInfo});
                        }
                      }}
                    />
                  ))}
                </>
              </table>
            ) : (
              <div className="self-center flex-1 flex flex-col space-y-4 items-center justify-center">
                <button className="bg-secondary p-2 rounded-md">
                  <MdLock className="text-2xl text-white" />
                </button>
                <div className="flex flex-col space-y-2">
                  <p>No Lp Token Lock Found</p>
                  <Link
                    href="/token-lock?tab=new"
                    className="btn btn-dark"
                  >
                    Create New Lock
                  </Link>
                </div>
              </div>
            )
          ) : loadingState === "failed" ? (
            <ErrorWidget />
          ) : (
            <Loading />
          )}
        </div>
      </div>
      {action === TokenLockEditMenuAction.CANCEL && (
        <TokenLockCancel
          stream={stream}
          setVisible={() => {
            setAction(undefined);
          }}
        />
      )}
    </>
  );
}
