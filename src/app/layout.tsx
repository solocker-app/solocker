"use client";
import "@unocss/reset/tailwind.css";
import "@solana/wallet-adapter-react-ui/styles.css";

import { useMemo } from "react";

import { clusterApiUrl } from "@solana/web3.js";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  CoinbaseWalletAdapter,
  CloverWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import "@/global.css";
import { join } from "@/lib/utils";
import { defaultFont } from "@/fonts";

import { devnet } from "@/data";
import LayoutHeader from "@/components/LayoutHeader";
import TokenAccount from "@/providers/TokenAccount";

export default function RootLayout({ children }: React.PropsWithChildren) {
  const endpoint = devnet;
  const network = WalletAdapterNetwork.Mainnet;
  const wallets = useMemo(
    () => [
      new CoinbaseWalletAdapter(),
      new PhantomWalletAdapter(),
      new CloverWalletAdapter(),
      new TorusWalletAdapter(),
      new SolflareWalletAdapter({ network }),
    ],
    [network]
  );

  return (
    <html lang="en">
      <body
        className={join(
          "fixed inset-0 flex flex-col bg-black text-white text-[15px]",
          defaultFont.className
        )}
      >
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider
            wallets={wallets}
            autoConnect={true}
          >
            <WalletModalProvider>
              <div className="flex-1 flex flex-col overflow-y-scroll">
                <LayoutHeader />
                <TokenAccount>
                 {children}
                </TokenAccount>
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
