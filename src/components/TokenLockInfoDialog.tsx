import { MdClose } from "react-icons/md";

import LockInfoList from "./abstract/LockInfoList";

type TokenLockConfirmDialogProps = {
  tx: string;
  seed: string;
  onClose: () => void;
} & React.ComponentProps<typeof LockInfoList>;

export default function TokenLockInfoDialog({
  tx,
  seed,
  lpInfo,
  contractInfo,
  onClose,
}: TokenLockConfirmDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">
      <div className="w-sm h-lg flex flex-col space-y-8 bg-white text-black p-4 rounded-md">
        <header className="flex">
          <h1 className="flex-1 text-xl font-bold">Unlock LpToken</h1>
          <button onClick={onClose}>
            <MdClose className="text-xl" />
          </button>
        </header>
        <div className="flex-1 flex flex-col space-y-4 overflow-y-scroll overflow-x-hidden">
          <div className="bg-red-200 text-red-500 p-2 rounded text-sm">
            Please make sure you copy and save your seed to somewhere save.
            Token can't be unlocked without providing seed.
          </div>
          <LockInfoList
            seed={seed}
            lpInfo={lpInfo}
            contractInfo={contractInfo}
          />
        </div>
        <div className="flex flex-col">
          <button
            className="btn btn-primary text-white"
            onClick={() => {
              window.open(`https://solscan.io/tx/${tx}`);
            }}
          >
            View Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
