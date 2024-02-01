import { useMemo } from "react";
import {
  WalletAdapter,
  WalletAdapterNetwork,
} from "@solana/wallet-adapter-base";
import {
  CoinbaseWalletAdapter,
  PhantomWalletAdapter,
  CloverWalletAdapter,
  TorusWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

export function useWallet(): [
  string,
  ReturnType<typeof useMemo<WalletAdapter[]>>,
] {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT;

  return [
    endpoint,
    useMemo(
      () => [
        new CoinbaseWalletAdapter(),
        new PhantomWalletAdapter(),
        new CloverWalletAdapter(),
        new TorusWalletAdapter(),
        new SolflareWalletAdapter({ network }),
      ],
      [network],
    ),
  ];
}
