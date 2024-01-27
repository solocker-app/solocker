"use client";
import "@unocss/reset/tailwind.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import "react-toastify/dist/ReactToastify.css";

import { useMemo } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

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

import { store } from "@/store";
import { devnet } from "@/data";
import Firebase from "@/providers/Firebase";
import LayoutHeader from "@/components/LayoutHeader";
import DigitalAsset from "@/providers/DigitalAsset";
import Repository from "@/providers/Repository";

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
        <Firebase>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider
              wallets={wallets}
              autoConnect={true}
            >
              <WalletModalProvider>
                <Repository>
                  <Provider store={store}>
                      <div className="flex-1 flex flex-col overflow-y-scroll">
                        <LayoutHeader />
                        <DigitalAsset>{children}</DigitalAsset>
                        <ToastContainer />
                      </div>
                  </Provider>
                </Repository>
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </Firebase>
      </body>
    </html>
  );
}
