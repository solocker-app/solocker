import Image from "next/image";

import InputToggle from "./widgets/InputToggle";

type LiquidityAmountProps = {
  onBack: () => void;
};

export default function LiquidityAmount({ onBack }: LiquidityAmountProps) {
  return (
    <form
      className="form-container"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className="flex flex-col space-y-2">
        <label className="text-base">Amount</label>
        <input
          className="p-2 bg-container rounded-md"
          placeholder="0.00"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-base">Remaining amount</label>
        <div className="flex space-x-2">
          <Image
            src="/assets/coins/solana.png"
            alt="Solana"
            width={64}
            height={64}
            className="w-6 h-6 object-cover rounded-full"
          />
          <p>0 SOL</p>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          <InputToggle>
            <span className="ml-2">Use connected wallet</span>
          </InputToggle>
        </div>
        <small className="text-highlight/70">
          When tokens are unlocked they will be sent to the address of the
          connected wallet.
        </small>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-2">
          <label className="text-base">Recipient wallet address</label>
          <input
            className="p-2 bg-container rounded-md"
            placeholder="Please double check the address"
          />
        </div>
        <small className="text-highlight/70">
          Make sure this is not a centralized exchange address
        </small>
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          className="btn bg-container !px-8"
          onClick={onBack}
        >
          Back
        </button>
        <div className="flex-1" />
        <button className="btn btn-gradient-primary !px-8">Execute</button>
      </div>
    </form>
  );
}
