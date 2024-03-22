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

  repository.tokenVesting.lockToken({
    mint: new PublicKey("D2ypd2q2P78owA6pxYt4FVouz9wumeWRvuAJHgmfw8M"),
    receiver: wallet.publicKey,
    schedules: [
      {
        period: Date.now(),
        amount: 0.5 * Math.pow(10, 9),
      },
    ],
  }).then(console.log);
}

main().catch(console.log);
