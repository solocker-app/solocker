"use client";
import { createContext, useMemo } from "react";

import { Wallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

import { devnet } from "@/data";
import { BaseRepository } from "@/lib";

type ContextState = {
  repository: BaseRepository | null;
};

export const Repository = createContext<ContextState>({
  repository: null,
});

function InnerComponent({
  children,
  wallet,
}: React.PropsWithChildren & { wallet: Wallet }) {
  const { connection } = useConnection();
  const umi = useMemo(() => createUmi(devnet), []);
  const repository = useMemo(
    () => new BaseRepository(connection, umi, wallet.adapter),
    [connection, wallet]
  );

  return (
    <Repository.Provider value={{ repository }}>{children}</Repository.Provider>
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
