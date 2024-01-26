import Image from "next/image";
import { Popover } from "@headlessui/react";

import { ErrorMessage, Field } from "formik";

import { MdArrowDropDown, MdSearch } from "react-icons/md";

type SelectCoinProps = {
  name: string;
  value?: string;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function SelectCoin({ name, value, setValue }: SelectCoinProps) {
  return (
    <Popover className="relative">
      <Popover.Button
        as="div"
        className="flex flex-col"
      >
        <div className="flex items-center bg-container/70 px-2 rounded-md">
          <Image
            src="/assets/coins/solana.png"
            alt="Solana"
            className="w-8 h-8 rounded-full"
            width={24}
            height={24}
          />
          <Field
            name={name}
            value="SOL"
            className="flex-1 bg-transparent p-2 outline-none pointer-events-none"
            disabled
          />
          <MdArrowDropDown className="text-lg" />
        </div>
        <div className="text-sm text-red first-letter:capitalize">
          <ErrorMessage name={name} />
        </div>
      </Popover.Button>

      <Popover.Panel
        as="div"
        className="absolute -mt-4 w-full h-xs flex flex-col space-y-2 bg-container p-4 rounded-md shadow shadow-white/10"
      >
        <div className="input-container text-base !bg-stone-900">
          <MdSearch className="text-xl" />
          <input placeholder="Search tokens..." />
        </div>
        <div className="flex flex-col">
          <div className="flex p-4">
            <div className="flex-1 flex">
              <div />
              <div className="text-base">
                <h1 className="font-medium">SOL</h1>
                <p className="text-highlight">Solana</p>
              </div>
            </div>
            <div>0.038 SOL</div>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
