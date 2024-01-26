"use client";
import { PublicKey } from "@solana/web3.js";
import { MdChevronRight, MdQuestionMark, MdPerson } from "react-icons/md";

import { Disclosure } from "@headlessui/react";

import { object, number, string } from "yup";
import { Formik, Field, ErrorMessage } from "formik";

import Toggle from "./widgets/Toggle";

type TokenLockRecipientProps = {
  onBack(): void;
  onSave(): void;
};

export default function TokenLockRecipient({
  onBack,
  onSave,
}: TokenLockRecipientProps) {
  const validationSchema = object().shape({
    amount: number().moreThan(1).positive().required(),
    recipient: string()
      .test({
        name: "is-valid-address",
        message: "Invalid recipient address",
        test(value) {
          return new Promise((resolve, reject) => {
            try {
              resolve(PublicKey.isOnCurve(value));
            } catch (error) {
              resolve(false);
            }
          });
        },
      })
      .required(),
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
          amount: 0.0,
          recipient: "",
        }}
        onSubmit={() => {
          onSave();
        }}
      >
        {({ handleSubmit }) => (
          <form
            className="flex-1 flex flex-col space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="flex-1 flex flex-col space-y-2">
              <Disclosure
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
                    <span className="text-lg">Recipient 1</span>
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
                          name="amount"
                          type="number"
                          placeholder="0.0"
                          className="input"
                        />
                      </div>
                      <div className="text-sm text-red-500 first-letter:capitalize">
                        <ErrorMessage name="amount" />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <h1 className="text-lg font-medium">Remaining Amount</h1>
                      <div className="flex items-center space-x-4">
                        <MdQuestionMark />
                        <div className="flex items-center space-x-2 text-highlight">
                          <b>1</b>
                          <span>2VJjsY</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Toggle />
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
                            name="recipient"
                            type="text"
                            placeholder="Please double check the address"
                          />
                          <MdPerson className="text-lg" />
                        </div>
                      </div>
                      <div className="text-sm text-red-500 first-letter:capitalize">
                        <ErrorMessage name="recipient" />
                      </div>
                    </div>
                    <p className="text-sm text-highlight">
                      Make sure this is not a centralized exchange address.
                    </p>
                  </div>
                </Disclosure.Panel>
              </Disclosure>
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
