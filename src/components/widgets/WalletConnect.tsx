import { BaseWalletMultiButton } from "@solana/wallet-adapter-react-ui";

const LABELS = {
  copied: "Copied",
  "has-wallet": "Connect",
  "no-wallet": "Connect",
  connecting: "Connecting",
  disconnect: "Disconnect",
  "copy-address": "Copy address",
  "change-wallet": "Change wallet",
} as const;

export default function WalletConnect() {
  return <BaseWalletMultiButton labels={LABELS} />;
}
