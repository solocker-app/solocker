"use client";
import { MdClose } from "react-icons/md";

import { join } from "@/lib/utils";

type TokenLockReviewDialogProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TokenLockReviewDialog({
  visible,
  setVisible,
}: TokenLockReviewDialogProps) {
  return (
    <div
      className={join(
        "fixed inset-0 flex flex-col justify-center items-center bg-black/50 transition transition-200",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className={join(
          "w-xs bg-slate-950 border border-container rounded-xl  md:w-sm",
          visible ? "animate-fade-in" : "animate-fade-out"
        )}
      >
        <header className="flex items-center space-x-2 p-4">
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold">Review Contract</h1>
          </div>
          <button 
            className="p-2"
            onClick={() => setVisible(false)}>
            <MdClose className="text-xl" />
          </button>
        </header>
        <div className="flex flex-col space-y-4 p-4 overflow-y-scroll">
          <div className="bg-container/70 p-4 rounded-md">
            <p className="text-sm">Number of recipients</p>
            <div className="flex space-x-1 text-xl">
              <h1>1</h1>
              <span className="text-highlight">Recipient</span>
            </div>
          </div>
          <div className="bg-container/70 p-4 rounded-md">
            <p className="text-sm">Total Locked Amount</p>
            <div className="flex items-center space-x-2">
              <img
                src="/assets/coins/solana.png"
                className="w-8 h-8 rounded-full"
                width={24}
                height={24}
              />
              <div className="flex space-x-1 text-xl">
                <h1>0.03</h1>
                <span className="text-highlight">SOL</span>
              </div>
            </div>
          </div>
          <div className="bg-container/70 p-4 rounded-md">
            <p className="text-sm">Solocker Fees</p>
            <div className="flex items-center space-x-2">
              <img
                src="/assets/coins/solana.png"
                className="w-8 h-8 rounded-full"
                width={24}
                height={24}
              />
              <div className="flex">
                <div className="flex items-center text-xl">
                  <h1>2</h1>
                  <span className="text-highlight">SOL</span>
                </div>
                <div className="flex items-center space-x-1 text-xl">
                  <h1>+</h1>
                  <span className="text-highlight">1%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-4">
          <button className="self-end btn btn-primary !rounded-md">
            Create Lock Contract
          </button>
        </div>
      </div>
    </div>
  );
}
