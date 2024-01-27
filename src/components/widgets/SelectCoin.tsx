import Image from "next/image";
import { useContext } from "react";
import { MdArrowDropDown } from "react-icons/md";

import { Popover } from "@headlessui/react";

import { ErrorMessage, Field } from "formik";

import { Wallet } from "@solana/wallet-adapter-react";

import { join } from "@/lib/utils";
import { DigitalAssetWithTokenUiAmount } from "@/lib/metaplex";

import { DigitalAsset } from "@/providers/DigitalAsset";

import EmptyIcon from "./EmptyIcon";


type SelectCoinProps = {
  name: string;
  value?: DigitalAssetWithTokenUiAmount;
  wallet: Wallet;
  setValue: React.Dispatch<
    React.SetStateAction<DigitalAssetWithTokenUiAmount | undefined>
  >;
};

export default function SelectCoin({
  name,
  wallet,
  value,
  setValue,
}: SelectCoinProps) {
  const { value: digitalAssets, loadingState } = useContext(DigitalAsset);

  return (
    <Popover className="relative">
      <Popover.Button
        as="div"
        className="flex flex-col"
      >
        <div className="flex items-center bg-container/70 px-2 rounded-md">
          {value ? (
            <Image
              src={value.metadata.network.image}
              alt={value.metadata.name}
              className="w-8 h-8 rounded-full"
              width={24}
              height={24}
            />
          ) : (
            <EmptyIcon />
          )}
          <Field
            name={name}
            value={value ? value.metadata.name : "Select a token"}
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
        className="absolute mt-2 w-full h-xs flex flex-col space-y-2 bg-container px-4 rounded-md shadow shadow-white/10 overflow-y-scroll"
      >
        <div className={join("flex-1 flex flex-col")}>
          {loadingState === "success" ? (
            digitalAssets.length > 0 ? (
              digitalAssets.map((digitalAsset, index) => {
                const metadata = digitalAsset.metadata;
                const mint = digitalAsset.mint.publicKey.toString();
                const selected = mint === value?.metadata.mint;

                return (
                  <div
                    key={index}
                    className="flex py-2 cursor-pointer"
                    onClick={() => setValue(digitalAsset)}
                  >
                    <div className="flex-1 flex items-center space-x-2">
                      {metadata.network ? (
                        <Image
                          src={metadata.network.image}
                          alt={metadata.name}
                          className="w-8 h-8 rounded-full"
                          width={24}
                          height={24}
                        />
                      ) : (
                        <EmptyIcon />
                      )}
                      <div className="text-base">
                        <h1
                          className={join(
                            "font-medium",
                            selected ? "text-secondary" : null
                          )}
                        >
                          {metadata.symbol}
                        </h1>
                        <p className="text-highlight">{name}</p>
                      </div>
                    </div>
                    <div>
                      {Number(digitalAsset.token.uiAmount)} {metadata.symbol}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="m-auto flex flex-col items-center justify-center space-y-2">
                <div className="text-center">
                  <h1 className="text-lg font-medium"> No Liquidity Token </h1>
                  <p className="text-highlight">
                    Lock your liquidity token on solocker
                  </p>
                </div>
                <button className="btn btn-primary">Add Liquidity</button>
              </div>
            )
          ) : (
            <div className="m-auto w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      </Popover.Panel>
    </Popover>
  );
}
