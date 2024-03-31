import Image from "next/image";
import { MdArrowBack } from "react-icons/md";

import { number, object, string } from "yup";
import { Formik } from "formik";

import { TokenConfig } from "@/lib/models/config.model";

import InputDate from "./widgets/InputDate";
import InputAmount from "./widgets/InputAmount";
import InputRecipient from "./widgets/InputRecipient";
import { isPublicKey } from "@/lib/utils";

type TokenLockCreateConfigurationProps = {
  onBack: () => void;
  value: Partial<TokenConfig>;
  setValue: React.Dispatch<React.SetStateAction<Partial<TokenConfig>>>;
};

export default function TokenLockCreateConfiguration({
  value,
  setValue,
  onBack,
}: TokenLockCreateConfigurationProps) {
  const validateSchema = object().shape({
    amount: number()
      .moreThan(
        0,
        "At least 0.000000001 " + value.token.symbol + " is required",
      )
      .test("validate-balance", "Insufficient balance", (amount) => {
        return amount <= value.token.token.tokenAmount.uiAmount;
      })
      .required(),
    recipient: string()
      .required()
      .test("validate-address", "Invalid Solana address", (recipient) =>
        isPublicKey(recipient),
      ),
  });
  return (
    <section className="flex flex-col">
      <header className="flex flex-col space-y-4 p-4">
        <div>
          <button
            className="flex items-center space-x-2"
            onClick={onBack}
          >
            <MdArrowBack className="text-2xl" />
            <p>Back</p>
          </button>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-black">Lock Token</h1>
          <div className="flex items-center space-x-2">
            <Image
              className="rounded-full"
              src={value.token.jsonMetadata.image}
              alt={value.token.name}
              width={32}
              height={32}
            />
            <p className="text-base text-highlight">{value.token.name}</p>
          </div>
        </div>
      </header>
      <Formik
        initialValues={{
          amount: value.amount,
          period: value.period,
          recipient: value.recipient,
        }}
        validationSchema={validateSchema}
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
                symbol: value.token.symbol,
                amount: value.token.token.tokenAmount.uiAmount,
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
