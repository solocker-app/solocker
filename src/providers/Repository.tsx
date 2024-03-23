"use client";
import { createContext, useMemo } from "react";

import { Connection, clusterApiUrl } from  "@solana/web3.js";
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
  const connection = new Connection(process.env.NEXT_PUBLIC_RPC_ENDPOINT, {
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
