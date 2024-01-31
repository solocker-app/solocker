import { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import { Types } from "@streamflow/stream";

import { Repository } from "@/providers/Repository";
import { toast } from "react-toastify";
import { LpInfo } from "@/lib/api/models/raydium.model";

type TokenUnlockDialogProps = {
  setVisible: () => void;
  stream: [string, Types.Stream, LpInfo];
};

export default function TokenUnlockDialog({
  stream: [id],
  setVisible,
}: TokenUnlockDialogProps) {
  const [loading, setLoading] = useState(false);
  const { repository } = useContext(Repository);

  const onConfirm = function () {
    setLoading(true);

    return toast.promise(repository.streamflow.cancel(id), {
      pending: "Canceling liquidity token",
      success: "Liquidity token locked cancelled successfully",
      error: "An unexpected error occur, try again!",
    });
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/50">
      <div className="w-xs bg-container rounded-md md:w-sm">
        <header className="flex p-4">
          <div className="flex-1 flex flex-col">
            <h1 className="text-xl font-bold">Cancel Liquidity Lock</h1>
            <p className="text-highlight">
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
            className="flex-1 btn btn-primary"
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
