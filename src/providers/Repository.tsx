"use client";

import { createContext, useMemo } from "react";

import { Wallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

import { devnet } from "@/data";
import { SolanaWallet } from "@/lib/solana";
import StreamFlow from "@/lib/streamflow";

type ContextState = {
  streamFlow: StreamFlow;
  solanaWallet: SolanaWallet;
};

export const Repository = createContext<ContextState>({
  streamFlow: null,
  solanaWallet: null,
});

function InnerComponent({
  children,
  wallet,
}: React.PropsWithChildren & { wallet: Wallet }) {
  const { connection } = useConnection();
  const umi = useMemo(() => createUmi(devnet), []);
  const solanaWallet = useMemo(
    () => new SolanaWallet(connection, umi, wallet.adapter),
    [connection, wallet]
  );
  const streamFlow = useMemo(
    () => new StreamFlow(wallet.adapter as any),
    [wallet]
  );

  return (
    <Repository.Provider value={{ solanaWallet, streamFlow }}>
      {children}
    </Repository.Provider>
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
