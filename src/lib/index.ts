import { Connection } from "@solana/web3.js";
import { Wallet } from "@solana/wallet-adapter-react";

import { TOKEN_VESTING_PROGRAM_ID as _TOKEN_VESTING_PROGRAM_ID } from "@bonfida/token-vesting";

import TokenVesting from "./token-vest";
import Firebase from "./firebase";

export class BaseRepository {
  readonly firebase: Firebase;
  readonly tokenVesting: TokenVesting;

  constructor(
    readonly connection: Connection,
    readonly wallet?: Wallet["adapter"],
    readonly TOKEN_VESTING_PROGRAM_ID = _TOKEN_VESTING_PROGRAM_ID,
  ) {
    this.firebase = new Firebase(this);
    this.tokenVesting = new TokenVesting(TOKEN_VESTING_PROGRAM_ID, this);
  }
}
