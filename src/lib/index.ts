import { Connection } from "@solana/web3.js";
import { Wallet } from "@solana/wallet-adapter-react";
import type { SignerWalletAdapterProps } from "@solana/wallet-adapter-base";

import { TOKEN_VESTING_PROGRAM_ID as _TOKEN_VESTING_PROGRAM_ID } from "@bonfida/token-vesting";

import StreamFlow from "./streamflow";
import TokenVesting from "./token-vest";

export class BaseRepository {
  readonly streamflow: StreamFlow;
  readonly tokenVesting: TokenVesting;

  constructor(
    readonly connection: Connection,
    readonly wallet?: Wallet["adapter"],
    readonly TOKEN_VESTING_PROGRAM_ID = _TOKEN_VESTING_PROGRAM_ID,
  ) {

    // this.streamflow = new StreamFlow(this);
    this.tokenVesting = new TokenVesting(TOKEN_VESTING_PROGRAM_ID, this);
  }
}
