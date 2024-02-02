import { MdArrowBack } from "react-icons/md";

import { Config } from "@/lib/models/config.model";

import InputDate from "./widgets/InputDate";
import InputAmount from "./widgets/InputAmount";
import InputRecipient from "./widgets/InputRecipient";
import OverlapCoinIcon, { getCoinProps } from "./widgets/OverlapCoinIcon";

type TokenLockCreateConfigurationProps = {
  onBack: () => void;
  onConfirm: (config: Config) => void;
};

export default function TokenLockCreateConfiguration({
  onBack,
  onConfirm,
}: TokenLockCreateConfigurationProps) {
  return (
    <>
      <section className="flex flex-col space-y-8">
        <header className="flex flex-col space-y-4">
          <div>
            <button className="flex items-center space-x-2">
              <MdArrowBack className="text-lg" />
              <p>Back</p>
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-black">Lock Liquidity</h1>
            <div className="flex items-center space-x-2">
              <OverlapCoinIcon
                icons={[getCoinProps(null), getCoinProps(null)]}
              />
              <p className="text-base text-highlight">RAY/SOL</p>
            </div>
          </div>
        </header>
        <div className="flex flex-col space-y-6">
          <InputAmount />
          <InputDate />
          <InputRecipient />
          <div className="flex space-x-4">
            <button className="flex-1 btn btn-dark">Back</button>
            <button className="flex-1 btn btn-primary">Confirm</button>
          </div>
        </div>
      </section>
      <div className="fixed inset-0 bg-black/50"></div>
    </>
  );
}
