import { Connection, PublicKey } from "@solana/web3.js";
import { Wallet } from "@solana/wallet-adapter-react";

import { TOKEN_VESTING_PROGRAM_ID } from "@solocker/vesting";

import TokenVesting from "./token-vest";

export class BaseRepository {
  readonly tokenVesting: TokenVesting;

  constructor(
    readonly connection: Connection,
    readonly wallet?: Wallet["adapter"],
    readonly VESTING_PROGRAM_ID = TOKEN_VESTING_PROGRAM_ID,
  ) {
    this.tokenVesting = new TokenVesting(
      VESTING_PROGRAM_ID,
      this,
    );
  }
}
