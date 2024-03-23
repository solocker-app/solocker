"use client";
import { createContext, useMemo } from "react";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { BaseRepository } from "@/lib";

type ContextState = {
  repository: BaseRepository | null;
};

export const Repository = createContext<ContextState>({
  repository: null,
});

export default function Component({ children }: React.PropsWithChildren) {
  const { wallet } = useWallet();
  const connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"), {
    commitment: "confirmed",
  });

  const repository = useMemo(
    () => new BaseRepository(connection, wallet?.adapter),
    [connection, wallet],
  );

  return (
    <Repository.Provider value={{ repository }}>{children}</Repository.Provider>
  );
}
