import { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";


import StreamFlow from "@/lib/streamflow";
import { Repository } from "@/providers/Repository";

import { useAppDispatch } from "@/store/hooks";
import { streamflowAction } from "@/store/slices/streamflow";

type TokenCancelDialogProps = {
  setVisible: () => void;
  stream: Awaited<ReturnType<StreamFlow["getLockedTokens"]>>[number];
};

export default function TokenLockCancelDialog({
  stream: { address, lpInfo, stream },
  setVisible,
}: TokenCancelDialogProps) {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { repository } = useContext(Repository);

  const onConfirm = async function () {
    setLoading(true);

    await toast
      .promise(repository.streamflow.cancel(address), {
        pending: "Canceling liquidity token",
        error: "An unexpected error occur, try again!",
        success: "Liquidity token locked cancelled successfully",
      })
      .finally(() => setLoading(false));

    stream.canceledAt = Date.now();
    dispatch(streamflowAction.updateOne({ address, lpInfo, stream }));
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-dark/50">
      <div className="w-xs bg-white text-black rounded-md md:w-sm">
        <header className="flex p-4">
          <div className="flex-1 flex flex-col">
            <h1 className="text-xl font-bold">Cancel Liquidity Lock</h1>
            <p className="text-black/50">
              Do you want to cancel lock contract on your liquidity tokens?
            </p>
          </div>
          <div>
            <button onClick={setVisible}>
              <MdClose />
            </button>
          </div>
        </header>
        <div className="flex-1 flex space-x-4 p-4">
          <button
            className="flex-1 btn bg-black text-white !rounded-full"
            onClick={setVisible}
          >
            Close
          </button>
          <button
            className="flex-1 btn btn-primary text-white !rounded-full"
            disabled={loading}
            onClick={onConfirm}
          >
            {loading ? (
              <div className="self-center m-auto w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Confirm</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
