import { Connection } from "@solana/web3.js";
import { Wallet } from "@solana/wallet-adapter-react";

import { TOKEN_VESTING_PROGRAM_ID as _TOKEN_VESTING_PROGRAM_ID } from "@bonfida/token-vesting";

import StreamFlow from "./streamflow";
import TokenVesting from "./token-vest";
import Firebase from "./firebase";

export class BaseRepository {
  readonly streamflow: StreamFlow;
  readonly tokenVesting: TokenVesting;
  readonly firebase: Firebase;

  constructor(
    readonly connection: Connection,
    readonly wallet?: Wallet["adapter"],
    readonly TOKEN_VESTING_PROGRAM_ID = _TOKEN_VESTING_PROGRAM_ID,
  ) {
    this.firebase = new Firebase(this);
    this.tokenVesting = new TokenVesting(TOKEN_VESTING_PROGRAM_ID, this);
  }
}
