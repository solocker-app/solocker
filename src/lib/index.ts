import { Connection } from "@solana/web3.js";
import { Wallet } from "@solana/wallet-adapter-react";

import { Umi } from "@metaplex-foundation/umi";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";

import Solana from "./solana";
import Metaplex from "./metaplex";
import Raydium from "./raydium";
import StreamFlow from "./streamflow";

export class BaseRepository {
  readonly solana: Solana;
  readonly metaplex: Metaplex;
  readonly raydium: Raydium;
  readonly streamflow: StreamFlow;

  constructor(
    readonly connection: Connection,
    readonly umi: Umi,
    readonly wallet?: Wallet["adapter"]
  ) {
    this.umi.use(mplTokenMetadata());
    if (wallet) this.umi.use(walletAdapterIdentity(wallet));

    this.solana = new Solana(this);
    this.raydium = new Raydium(this);
    this.metaplex = new Metaplex(this);
    this.streamflow = new StreamFlow(this);
  }
}
