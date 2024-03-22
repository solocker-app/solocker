import {
  Connection,
  PublicKey,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";

import { signAndSendInstructions } from "@bonfida/utils";

import { BaseRepository } from "../src/lib";
import { getDefaultWallet } from "./utils";
import { isPublicKey } from "../src/lib/utils";

const TOKEN_VESTING_PROGRAM_ID = new PublicKey(
  "DLxB9dSQtA4WJ49hWFhxqiQkD9v6m67Yfk9voxpxrBs4",
);

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

  const mint = new PublicKey("8TEPiymMCHvMayJfCKCB89WEwB51vCVrcwoPVo1Lkd4M");

  // repository.tokenVesting.getLockedToken("1511312979136742628337534380651869247563347998703551268508924183")
  // .then(console.log);

  // const [seed, tx] = await repository.tokenVesting.lockToken({
  //   mint: new PublicKey("8TEPiymMCHvMayJfCKCB89WEwB51vCVrcwoPVo1Lkd4M"),
  //   receiver: wallet.publicKey,
  //   schedules: [
  //     {
  //       period: Date.now() / 1000,
  //       amount: 0.5 * Math.pow(10, 9),
  //     },
  //   ],
  // });

  // console.log(tx);
  // console.log(encodeSeed(seed));
  // console.log(
  //   getVestingContractAddress(seed, TOKEN_VESTING_PROGRAM_ID).toBase58(),
  // );
  // repository.tokenVesting
  //   .unlockToken(
  //     seed,
  //     new PublicKey("8TEPiymMCHvMayJfCKCB89WEwB51vCVrcwoPVo1Lkd4M"),
  //   )
  //   .then(console.log);

  // const ata = getAssociatedTokenAddressSync(mint, wallet.publicKey);

  // console.log(ata.toBase58())

  // const accounts = connection.getProgramAccounts(TOKEN_VESTING_PROGRAM_ID, {
  //   filters: [
  //     {
  //       memcmp: {
  //         offset: 0,
  //         bytes: ata.toBase58(),
  //       },
  //     },
  //     {
  //       memcmp: {
  //         offset: 0,
  //         bytes: ata.toBase58(),
  //       },
  //     },
  //   ],
  // });

  // console.log(
  //   (await accounts)
  //     .map((account) => account.account)
  //     .map((account) => ContractInfo.fromBuffer(account.data)),
  // );

  // const contractInfo = await repository.tokenVesting.getLockedTokenBySeed(
  //   "1511312979136742628337534380651869247563347998703551268508924183",
  // );
  // console.log(contractInfo);

  // const txInfo = await connection.getParsedTransaction(
  //   "2kSTTrARRaEvx9RS1Ho4hJkUhhj8WtdqFg61zFyDk4Gp3dvHYRoStoz9rZyxzsT7Zy5bTSyGGYbPSfEbX7qDAjGM",
  //   "confirmed",
  // );
  // console.log(JSON.stringify(txInfo));


  console.log(isPublicKey("9ENzb5hJvfPxuAowQKDXF3AfRbxRVDa7w1En4Qkc8x59"))
}

main().catch(console.log);
