"use client";

import { createContext, useState, useEffect, useContext } from "react";

import { Wallet, useWallet } from "@solana/wallet-adapter-react";

import { DigitalAssetWithTokenUiAmount } from "@/lib/metaplex";
import { Repository } from "./Repository";

type ContextState = {
  value: DigitalAssetWithTokenUiAmount[];
  loadingState: "idle" | "pending" | "error" | "success";
};

export const DigitalAsset = createContext<ContextState>({
  value: [],
  loadingState: "pending",
});

function InnerComponent({
  children,
  wallet,
}: React.PropsWithChildren & { wallet: Wallet }) {
  const [value, setValue] = useState<ContextState["value"]>([]);
  const [state, setState] = useState<ContextState["loadingState"]>("pending");

  const { repository } = useContext(Repository);

  const fetchDigitalAssets = async () => {
    setState("pending");
    await repository.metaplex
      .fetchAllDigitalAssetWithTokenByOwner()
      .then(setValue)
      .then(() => console.log(value))
      .then(() => setState("success"))
      .catch((error) => {
        setState("error");
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDigitalAssets().catch(console.log);
  }, [wallet]);

  return (
    <DigitalAsset.Provider value={{ value, loadingState: state }}>
      {children}
    </DigitalAsset.Provider>
  );
}

export default function Component({ children }: React.PropsWithChildren) {
  const { wallet, connected } = useWallet();
  return connected ? (
    <InnerComponent wallet={wallet}>{children}</InnerComponent>
  ) : (
    children
  );
}
