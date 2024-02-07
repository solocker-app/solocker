"use client";
import { createContext, useMemo } from "react";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

import { BaseRepository } from "@/lib";

type ContextState = {
  repository: BaseRepository | null;
};

export const Repository = createContext<ContextState>({
  repository: null,
});

export default function Component({ children }: React.PropsWithChildren) {
  const { wallet, connected } = useWallet();
  const { connection } = useConnection();
  const { signTransaction } = useWallet();

  const umi = useMemo(
    () => createUmi(process.env.NEXT_PUBLIC_RPC_ENDPOINT),
    [],
  );

  const repository = useMemo(
    () => new BaseRepository(connection, umi, wallet?.adapter, signTransaction),
    [connection, wallet],
  );

  return (
    <Repository.Provider value={{ repository }}>{children}</Repository.Provider>
  );
}
