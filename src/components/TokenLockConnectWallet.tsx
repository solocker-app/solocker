import { MdWallet } from "react-icons/md";

import WalletConnect from "./widgets/WalletConnect";

export default function TokenLockConnectWallet() {
  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center space-y-6 p-2">
      <div className="w-8 h-8 flex items-center justify-center bg-white rounded-md">
        <MdWallet className="text-2xl text-secondary" />
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Connect Wallet</h1>
        <p className="text-highlight">
          Connect your solana wallet to continue with dapp
        </p>
      </div>
      <WalletConnect />
    </div>
  );
}
