import { Connection } from "@solana/web3.js";
import { Wallet } from "@solana/wallet-adapter-react";
import type { SignerWalletAdapterProps } from "@solana/wallet-adapter-base";

import { Umi } from "@metaplex-foundation/umi";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";

import StreamFlow from "./streamflow";

export class BaseRepository {
  readonly streamflow: StreamFlow;

  constructor(
    readonly connection: Connection,
    readonly umi: Umi,
    readonly wallet?: Wallet["adapter"],
    readonly signTransaction: SignerWalletAdapterProps["signTransaction"],
  ) {
    this.umi.use(mplTokenMetadata());
    if (wallet) this.umi.use(walletAdapterIdentity(wallet));

    this.streamflow = new StreamFlow(this);
  }
}
