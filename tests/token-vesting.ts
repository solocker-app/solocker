import "dotenv/config";

import {
  Connection,
  PublicKey,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";

import { signAndSendInstructions } from "@bonfida/utils";

import { BaseRepository } from "../src/lib";
import { getDefaultWallet } from "./utils";

export const TOKEN_VESTING_PROGRAM_ID = new PublicKey(
  "DLxB9dSQtA4WJ49hWFhxqiQkD9v6m67Yfk9voxpxrBs4",
);

export const MINT = new PublicKey("8TEPiymMCHvMayJfCKCB89WEwB51vCVrcwoPVo1Lkd4M");

async function main() {
  const connection = new Connection(clusterApiUrl("devnet"), {
    commitment: "finalized",
  });
  const wallet = getDefaultWallet() as any;

  wallet.sendTransaction = async function (
    transaction: Transaction,
    connection: Connection,
  ) {
    return signAndSendInstructions(
      connection,
      [],
      wallet,
      transaction.instructions,
    );
  };

  const repository = new BaseRepository(
    connection,
    wallet as any,
    TOKEN_VESTING_PROGRAM_ID,
  );


  const contractInfo = await repository.tokenVesting.getLockedTokenBySeed(
    "1511312979136742628337534380651",
  );
  console.log(contractInfo);
}

main().catch(console.log);
