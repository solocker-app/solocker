"use client";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

import { useState } from "react";
import { MdChevronRight, MdQuestionMark, MdPerson } from "react-icons/md";

import { Disclosure } from "@headlessui/react";

import { object, number, string, array } from "yup";
import { Formik, Field, ErrorMessage } from "formik";

import Toggle from "./widgets/Toggle";
import { LpInfo } from "@/lib/api/models/raydium.model";

export type TokenRecipient = {
  amount: number;
  recipient: string;
};

type TokenLockRecipientProps = {
  onBack(): void;
  token: LpInfo;
  onSave(value: { recipients: TokenRecipient[] }): void;
};

export default function TokenLockRecipient({
  token,
  onBack,
  onSave,
}: TokenLockRecipientProps) {
  const { publicKey } = useWallet();
  const [recipientCount, setRecipientCount] = useState(1);

  const validationSchema = object().shape({
    recipients: array().of(
      object().shape({
        amount: number()
          .moreThan(1, "amount must be greater than 0")
          .positive("amount must be a positive number")
          .required("amount is a required field"),
        recipient: string()
          .test({
            name: "is-valid-address",
            message: "Invalid recipient address",
            test(value) {
              return new Promise((resolve) => {
                try {
                  resolve(PublicKey.isOnCurve(value));
                } catch (error) {
                  resolve(false);
                }
              });
            },
          })
          .required("recipient is a required field"),
      })
    ),
  });

  return (
    <div className="flex-1 flex flex-col space-y-4 p-4 md:px-8">
      <header>
        <h1 className="text-lg font-medium text-highlight">Step 2</h1>
        <h1 className="text-2xl font-bold">Recipients</h1>
      </header>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          recipients: [] as TokenRecipient[],
        }}
        onSubmit={onSave}
      >
        {({ handleSubmit, setFieldValue }) => (
          <form
            className="flex-1 flex flex-col space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="flex-1 flex flex-col space-y-2">
              {Array.from({ length: recipientCount }).map((_, index) => (
                <Disclosure
                  key={index}
                  as="div"
                  className="flex flex-col space-y-4 bg-slate-900/50 p-4 rounded-md"
                  defaultOpen={true}
                >
                  <Disclosure.Button
                    as="div"
                    className="flex flex-col cursor-pointer"
                  >
                    <div className="flex items-center space-x-2 text-highlight">
                      <MdChevronRight className="rotate-90 text-xl" />
                      <span className="text-lg">Recipient {index + 1}</span>
                    </div>
                  </Disclosure.Button>
                  <Disclosure.Panel
                    as="div"
                    className="flex flex-col space-y-4"
                  >
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-col">
                        <div className="flex flex-col">
                          <label className="text-lg">Amount</label>
                          <Field
                            name={`recipients[${index}].amount`}
                            type="number"
                            placeholder="0.0"
                            className="input"
                          />
                        </div>
                        <div className="text-sm text-red-500 first-letter:capitalize">
                          <ErrorMessage name={`recipients[${index}].amount`} />
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <h1 className="text-lg font-medium">
                          Remaining Amount
                        </h1>
                        <div className="flex items-center space-x-4">
                          <MdQuestionMark />
                          <div className="flex items-center space-x-2 text-highlight">
                            <b>{Number(token.totalLpAmount)}</b>
                            <span>{token.baseTokenMetadata.symbol}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <Toggle
                          onChange={(event) => {
                            const checked = (event.target as HTMLInputElement)
                              .checked;
                            const name = `recipients[${index}.recipient]`;
                            if (checked) setFieldValue(name, publicKey);
                            else setFieldValue(name, "");
                          }}
                        />
                        <span className="text-lg">Use connected wallet</span>
                      </div>
                      <p className="text-highlight text-sm">
                        When Liquidity tokens unlock they will be sent to the
                        address of the connected wallet.
                      </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div>
                        <div className="flex flex-col">
                          <label className="text-lg">
                            Recipient Wallet Address
                          </label>
                          <div className="input-container">
                            <Field
                              name={`recipients[${index}].recipient`}
                              type="text"
                              placeholder="Please double check the address"
                            />
                            <MdPerson className="text-lg" />
                          </div>
                        </div>
                        <div className="text-sm text-red-500 first-letter:capitalize">
                          <ErrorMessage
                            name={`recipients[${index}].recipient`}
                          />
                        </div>
                      </div>
                      <p className="text-sm text-highlight">
                        Make sure this is not a centralized exchange address.
                      </p>
                    </div>
                  </Disclosure.Panel>
                </Disclosure>
              ))}
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                className="justify-self-start btn bg-stone-700/50 rounded-md"
                onClick={onBack}
              >
                Back
              </button>
              <div className="flex-1" />
              <button
                type="submit"
                className="justify-self-end btn btn-primary !rounded-md"
              >
                Next
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
