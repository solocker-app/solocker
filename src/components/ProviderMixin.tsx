"use client";
import { Provider } from "react-redux";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import { store } from "@/store";
import { useWallet } from "@/composables";
import Firebase from "@/providers/Firebase";
import Repository from "@/providers/Repository";
import LoadingScreen from "@/providers/LoadingScreen";

export default function RootLayout({ children }: React.PropsWithChildren) {
  const [endpoint, wallets] = useWallet();

  return (
    <Firebase>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider
          wallets={wallets}
          autoConnect={true}
        >
          <WalletModalProvider>
            <Repository>
              <Provider store={store}>
                <LoadingScreen>{children}</LoadingScreen>
              </Provider>
            </Repository>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Firebase>
  );
}
