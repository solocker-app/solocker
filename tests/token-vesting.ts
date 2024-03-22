import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

import { getDefaultWallet } from "./utils";
import { BaseRepository } from "../src/lib";

const TOKEN_VESTING_PROGRAM_ID = new PublicKey(
  "DLxB9dSQtA4WJ49hWFhxqiQkD9v6m67Yfk9voxpxrBs4",
);

async function main() {
  const connection = new Connection(clusterApiUrl("devnet"));
  const wallet = getDefaultWallet();

  const repository = new BaseRepository(
    connection,
    wallet as any,
    undefined,
    TOKEN_VESTING_PROGRAM_ID,
  );

  // repository.tokenVesting.getLockedToken("1511312979136742628337534380651869247563347998703551268508924183")
  // .then(console.log);

  const [seed] = await repository.tokenVesting.lockToken({
    mint: new PublicKey("8TEPiymMCHvMayJfCKCB89WEwB51vCVrcwoPVo1Lkd4M"),
    receiver: wallet.publicKey,
    schedules: [
      {
        period: Date.now() / 1000,
        amount: 0.5 * Math.pow(10, 9),
      },
    ],
  });

  console.log(seed);

  repository.tokenVesting
    .unlockToken(
      seed,
      new PublicKey("8TEPiymMCHvMayJfCKCB89WEwB51vCVrcwoPVo1Lkd4M"),
    )
    .then(console.log);
}

main().catch(console.log);
