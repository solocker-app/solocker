import { IoClose } from "react-icons/io5";
import TokenLockConfiguration from "./TokenLockConfiguration";
import { join } from "@/lib/utils";

type CreateTokenLockDialogProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateTokenLockDialog({
  visible,
  setVisible,
}: CreateTokenLockDialogProps) {
  return (
    <div
      className={join(
        "fixed inset-0  flex flex-col bg-black/50 transition-200 md:items-end",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className={join(
          "flex-1 flex flex-col bg-stone-950 md:w-1/3",
          visible ? "animate-bounce-in" : "animate-bounce-out"
        )}
      >
        <header className="flex flex-col">
          <button
            className="self-end p-4"
            onClick={() => setVisible(false)}
          >
            <IoClose className="text-xl" />
          </button>
        </header>
        <>
          <TokenLockConfiguration />
        </>
      </div>
    </div>
  );
}
