import { Formik, Field, ErrorMessage } from "formik";
import { object, date, string } from "yup";

import { useWallet } from "@solana/wallet-adapter-react";

import SelectCoin from "./widgets/SelectCoin";
import { LpInfo } from "@/lib/api/models/raydium.model";

export type TokenConfiguration = {
  endDate: string;
  endTime: string;
  token: LpInfo;
};

type TokenLockConfigurationProps = {
  onSave(value: TokenConfiguration): void;
};

export default function TokenLockConfiguration({
  onSave,
}: TokenLockConfigurationProps) {
  const validationSchema = object().shape({
    token: object().shape({}).required(),
    endDate: date().required(),
    endTime: string().required(),
  });

  const wallet = useWallet();

  return (
    <div className="flex-1 flex flex-col space-y-4 p-4">
      <div>
        <h5 className="text-lg font-bold text-highlight uppercase">step 1</h5>
        <h1 className="text-2xl font-extrabold">Configuration</h1>
      </div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          endDate: new Date().toISOString().split("T").at(0),
          endTime: new Date().toTimeString().substring(0, 8),
          token: undefined as LpInfo | undefined,
        }}
        onSubmit={onSave}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <form
            className="flex-1 flex flex-col space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="flex-1 flex flex-col space-y-4">
              <div className="flex flex-col">
                <label className="text-lg text-stone font-medium">Token</label>
                {wallet.wallet && (
                  <SelectCoin
                    name="token"
                    value={values.token}
                    setValue={(value) => setFieldValue("token", value)}
                  />
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-col">
                  <label className="text-lg font-medium">Unlock Settings</label>
                  <p className="text-highlight">
                    Set the date and time when the token will be unlocked
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex space-x-4">
                    <Field
                      name="endDate"
                      type="date"
                      className="flex-1 p-2 bg-container/70 rounded-md"
                    />
                    <Field
                      name="endTime"
                      type="time"
                      className="flex-1 p-2 bg-container/70 rounded-md"
                    />
                  </div>
                  <div className="text-red-500 text-sm first-letter:capitalize">
                    <ErrorMessage name="endDate" />
                    <ErrorMessage name="endTime" />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary self-end !rounded-md"
            >
              Next Step
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
