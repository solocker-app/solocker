import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { MdArrowDropDown, MdSearch } from "react-icons/md";

import { Popover } from "@headlessui/react";

import { ErrorMessage, Field } from "formik";

import { useConnection, Wallet } from "@solana/wallet-adapter-react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

import { devnet } from "@/data";
import solanaTokenMap from "@/data/token";
import { SolanaWallet } from "@/lib/solana";

type SelectCoinProps = {
  name: string;
  value?: string;
  wallet: Wallet;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function SelectCoin({
  name,
  wallet,
  value,
  setValue,
}: SelectCoinProps) {
  const connection = useConnection();

  const umi = useMemo(() => createUmi(devnet), []);

  const solanaConnect = new SolanaWallet(
    connection.connection,
    umi,
    wallet.adapter
  );

  const metadata = useMemo(() => solanaTokenMap[value], [value]);
  const pTokenAccounts = useMemo(() => solanaConnect.getTokenAccounts(), []);

  const [tokenAccounts, setTokenAccounts] =
    useState<Awaited<typeof pTokenAccounts>>();

  useEffect(() => {
    pTokenAccounts
      .then(setTokenAccounts)
      .then(() => {
        const tokenAccount = tokenAccounts.at(0);
        if (tokenAccount) {
          const info = tokenAccount.account.data.parsed["info"];
          setValue(info["mint"]);
        }
      })
      .catch(console.log);
  });

  return (
    <Popover className="relative">
      <Popover.Button
        as="div"
        className="flex flex-col"
      >
        <div className="flex items-center bg-container/70 px-2 rounded-md">
          <Image
            src={metadata?.logoUrl}
            alt={metadata?.name}
            className="w-8 h-8 rounded-full"
            width={24}
            height={24}
          />
          <Field
            name={name}
            value={metadata?.name}
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
        className="absolute mt-2 w-full h-xs flex flex-col space-y-2 bg-container p-4 rounded-md shadow shadow-white/10 overflow-y-scroll"
      >
        <div className="input-container text-base !bg-stone-900 !hidden">
          <MdSearch className="text-xl" />
          <input placeholder="Search tokens..." />
        </div>
        <div className="flex flex-col">
          {tokenAccounts &&
            tokenAccounts.map((tokenAccount, index) => {
              const info = tokenAccount.account.data.parsed["info"];
              const metadata = solanaTokenMap[info["mint"]];

              return (
                <div
                  key={index}
                  className="flex px-4 py-2 cursor-pointer"
                  onClick={() => {
                    setValue(info["mint"]);
                  }}
                >
                  <div className="flex-1 flex items-center">
                    <Image
                      src={metadata?.logoUrl}
                      alt={metadata?.name}
                      className="w-8 h-8 rounded-full"
                      width={24}
                      height={24}
                    />
                    <div className="text-base">
                      <h1 className="font-medium">{metadata?.symbol}</h1>
                      <p className="text-highlight">{metadata?.name}</p>
                    </div>
                  </div>
                  <div>
                    {info["tokenAmount"]["uiAmount"]} {metadata?.symbol}
                  </div>
                </div>
              );
            })}
        </div>
      </Popover.Panel>
    </Popover>
  );
}
