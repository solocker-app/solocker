import { forwardRef, useImperativeHandle, useState } from "react";

import { join } from "@/lib/utils";
import { MdClose } from "react-icons/md";

type RetryTransactionDialogProps = {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  onRetry: (...args: any) => Promise<any>;
};

export type RetryTransactionRef = {
  toggle: (state?: boolean) => void;
};

export default forwardRef<RetryTransactionRef, RetryTransactionDialogProps>(
  ({ title, subtitle, onRetry }, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      toggle(state) {
        setOpen(state ?? !open);
      },
    }));

    return (
      <div
        className={join(
          "fixed inset-0 bg-black/50 items-center justify-center z-1000",
          open
            ? "flex flex-col animate-slide-in-up animate-duration-100"
            : "hidden",
        )}
      >
        <div className="w-xs flex flex-col space-y-4 bg-white text-black rounded-md p-4">
          <div className="flex flex-col space-y-2">
            <header className="flex flex-col">
              <button
                className="self-end"
                onClick={() => setOpen(false)}
              >
                <MdClose className="text-xl" />
              </button>
            </header>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold">{title}</h1>
              <p className="opacity-90">{subtitle}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              className="flex-1 btn btn-primary"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
            <button
              className="flex-1 btn btn-primary"
              onClick={async () => {
                setOpen(false);
                await onRetry();
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  },
);
