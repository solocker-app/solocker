import { Fragment, useEffect } from "react";
import { Tab } from "@headlessui/react";

import { useFormikContext, Field, ErrorMessage } from "formik";
import { useWallet } from "@solana/wallet-adapter-react";

import { join } from "@/lib/utils";

type InputAddressProps = {
  name: string;
};

export default function InputAddress({ name }: InputAddressProps) {
  const { publicKey } = useWallet();
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    setFieldValue(name, publicKey.toBase58());
  }, []);

  return (
    <Tab.Group
      as="div"
      className="flex flex-col space-y-4"
    >
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Who get the unlocked token?</label>
        <Tab.List className="flex items-center space-x-4">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={join(
                  "btn !py-1",
                  selected
                    ? "btn-primary"
                    : "over:bg-black/50 hover:rounded-md",
                )}
                onClick={() =>
                  publicKey && setFieldValue(name, publicKey.toBase58())
                }
              >
                Me
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={join(
                  "btn !py-1",
                  selected
                    ? "btn-primary"
                    : "over:bg-black/50 hover:rounded-md",
                )}
                onClick={() => setFieldValue(name, "")}
              >
                Someone else
              </button>
            )}
          </Tab>
        </Tab.List>
      </div>
      <div className="flex flex-col">
        <Field
          name={name}
          placeholder="Unlocker address"
          className="bg-black p-4 outline-none rounded-xl"
        />
      </div>
      <ErrorMessage
        name={name}
        className="text-sm text-red-500"
      />
    </Tab.Group>
  );
}
