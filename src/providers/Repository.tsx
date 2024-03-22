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
  const { connection } = useConnection();

  const repository = useMemo(
    () => new BaseRepository(connection, wallet?.adapter),
    [connection, wallet],
  );

  return (
    <Repository.Provider value={{ repository }}>{children}</Repository.Provider>
  );
}
