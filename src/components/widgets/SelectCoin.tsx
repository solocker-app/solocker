import Link from "next/link";
import { MdArrowDropDown } from "react-icons/md";

import { Menu } from "@headlessui/react";
import { ErrorMessage, Field } from "formik";


import { join } from "@/lib/utils";
import { LpInfo } from "@/lib/api/models/raydium.model";

import { useAppSelector } from "@/store/hooks";
import { raydiumLpInfoSelector } from "@/store/slices/raydiumLpInfo";

import EmptyIcon from "./EmptyIcon";
import ErrorMessageWidget from "./ErrorMessage";
import OverlapIcon, { getCoinImageProps } from "./OverlapIcon";

type SelectCoinProps = {
  name: string;
  value?: LpInfo;
  setValue: React.Dispatch<React.SetStateAction<LpInfo | undefined>>;
};

export default function SelectCoin({ name, value, setValue }: SelectCoinProps) {
  const raydiumLpInfoState = useAppSelector((state) => state.raydiumLpInfo);

  const { loadingState } = raydiumLpInfoState;
  const lpInfos = raydiumLpInfoSelector.selectAll(raydiumLpInfoState);

  return (
    <Menu
      as="div"
      className="relative"
    >
      <Menu.Button
        as="div"
        className="flex flex-col"
      >
        <div className="flex items-center bg-container/70 px-2 rounded-md">
          {value ? (
            <OverlapIcon
              images={[
                getCoinImageProps(value.baseTokenMetadata),
                getCoinImageProps(value.quoteTokenMetadata),
              ]}
            />
          ) : (
            <EmptyIcon />
          )}
          <Field
            name={name}
            value={value ? value.lpTokenMetadata.symbol : "Select a token"}
            className="flex-1 bg-transparent p-2 outline-none pointer-events-none"
            disabled
          />
          <MdArrowDropDown className="text-lg" />
        </div>
        <div className="text-sm text-red first-letter:capitalize">
          <ErrorMessage name={name} />
        </div>
      </Menu.Button>
      <Menu.Items
        as="div"
        className="absolute mt-2 w-full h-xs flex flex-col space-y-2 bg-container px-4 rounded-md shadow shadow-white/10 overflow-y-scroll"
      >
        <div className={join("flex-1 flex flex-col")}>
          {loadingState === "success" ? (
            lpInfos.length > 0 ? (
              lpInfos.map((lpInfo, index) => {
                const {
                  baseTokenMetadata,
                  quoteTokenMetadata,
                  lpTokenMetadata,
                  addedLpAmount,
                } = lpInfo;
                const selected =
                  lpInfo.lpTokenMetadata.mint === value?.lpTokenMetadata.mint;

                return (
                  <Menu.Item
                    as="div"
                    key={index}
                    className="flex py-2 cursor-pointer"
                    onClick={() => setValue(lpInfo)}
                  >
                    <div className="flex-1 flex space-x-2">
                      <OverlapIcon
                        images={[
                          getCoinImageProps(baseTokenMetadata),
                          getCoinImageProps(quoteTokenMetadata),
                        ]}
                      />
                      <div className="flex-1 flex flex-col text-base">
                        <h1
                          className={join(
                            "font-medium",
                            selected ? "text-secondary" : null,
                          )}
                        >
                          {lpTokenMetadata.name.substring(0, 16)}
                        </h1>
                        <p className="text-highlight">
                          {lpTokenMetadata.symbol }
                        </p>
                      </div>
                    </div>
                    <div>
                      {Number(addedLpAmount)} {lpTokenMetadata.symbol}
                    </div>
                  </Menu.Item>
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
                <Link
                  href="https://raydium.io"
                  className="btn btn-primary"
                >
                  Add Liquidity
                </Link>
              </div>
            )
          ) : (
            loadingState === "pending" ?
            <div className="m-auto w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
            : <ErrorMessageWidget /> 
          )}
        </div>
      </Menu.Items>
    </Menu>
  );
}
