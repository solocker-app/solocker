import { MdArrowBack } from "react-icons/md";

import { Formik } from "formik";

import { Config } from "@/lib/models/config.model";

import InputDate from "./widgets/InputDate";
import InputAmount from "./widgets/InputAmount";
import InputRecipient from "./widgets/InputRecipient";
import OverlapCoinIcon, { getCoinProps } from "./widgets/OverlapCoinIcon";

type LpTokenLockCreateConfigurationProps = {
  onBack: () => void;
  value: Partial<Config>;
  setValue: React.Dispatch<React.SetStateAction<Partial<Config>>>;
};

export default function LpTokenLockCreateConfiguration({
  value,
  setValue,
  onBack,
}: LpTokenLockCreateConfigurationProps) {
  const { lpTokenMetadata, baseTokenMetadata, quoteTokenMetadata } =
    value.token;

  return (
    <section className="flex-1 flex flex-col">
      <header className="flex flex-col space-y-4 p-4">
        <div>
          <button
            className="flex items-center space-x-2"
            onClick={onBack}
          >
            <MdArrowBack className="text-lg" />
            <p>Back</p>
          </button>
        </div>
        <div className="flex-1 flex flex-col space-y-2">
          <h1 className="text-2xl font-black">Lock Liquidity</h1>
          <div className="flex items-center space-x-2">
            <OverlapCoinIcon
              icons={[
                getCoinProps(baseTokenMetadata),
                getCoinProps(quoteTokenMetadata),
              ]}
            />
            <p className="text-base text-highlight">{lpTokenMetadata.name}</p>
          </div>
        </div>
      </header>
      <Formik
        initialValues={{
          amount: value.amount,
          period: value.period,
          recipient: value.recipient,
        }}
        onSubmit={(value) => setValue(value)}
      >
        {({ values, handleSubmit }) => (
          <form
            className="flex flex-col space-y-6 p-4"
            onSubmit={handleSubmit}
          >
            <InputAmount
              name="amount"
              info={{
                symbol: value.token.lpTokenMetadata.symbol,
                amount: Number(value.token.addedLpAmount),
              }}
              value={values.amount}
            />
            <InputDate
              name="period"
              value={values.period}
            />
            <InputRecipient name="recipient" />
            <div className="flex space-x-4">
              <button
                type="button"
                className="flex-1 btn btn-dark"
                onClick={onBack}
              >
                Back
              </button>
              <button className="flex-1 btn btn-primary">Confirm</button>
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
}
