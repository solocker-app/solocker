import { Fragment } from "react";
import { Tab } from "@headlessui/react";

import { useFormik, Field, ErrorMessage } from "formik";

import { join } from "@/lib/utils";

type InputAddressProps = {
  name: string,
}

export default function InputAddress({ name, value }: InputAddressProps) {
  const { publicKey } = useWallet();
  const { setFieldValue } = useFormik();
  
  return (
    <Tab.Group
      as="div"
      className="flex flex-col space-y-2"
    >
      <label className="text-lg font-bold">Who get the unlocked token?</label>
      <Tab.List className="self-center flex space-x-4">
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={join(
                "btn !py-2",
                selected ? "btn-primary" : "over:bg-black/50 hover:rounded-md",
              )}
              onClick={() => publicKey && setFieldValue(name, publicKey.toBase58())}
            >
              Me
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={join(
                "btn !py-2",
                selected ? "btn-primary" : "over:bg-black/50 hover:rounded-md",
              )}
              onClick={() => setFieldValue(name, "")}
            >
              Someone else
            </button>
          )}
        </Tab>
      </Tab.List>
      <div className="flex flex-col">
        <Field
          name={name}
          placeholder="Unlocker address"
          className="bg-black p-4 outline-none rounded-xl"
        />
      </div>
      <div className="text-sm text-red-500">
        <ErrorMessage name={name} />
      </div>
    </Tab.Group>
  );
}
