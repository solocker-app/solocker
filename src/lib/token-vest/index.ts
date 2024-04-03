import BN from "bn.js";
import {
  create,
  unlock,
  generateRandomSeed,
  Numberu64,
  Schedule,
  getContractInfo,
  ContractInfo,
} from "@solocker/vesting";

import { ComputeBudgetProgram, PublicKey, Transaction } from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import { InjectBaseRepository } from "../injector";
import {
  createFeeInstructions,
  createTokenFeeInstructions,
} from "../instructions";
import {
  COMPUTE_LIMIT,
  getOrCreateAssociatedTokenAccount,
  PRIORITY_FEE,
  retry,
} from "../utils";
import { safeBN, unsafeBN } from "@solocker/safe-bn";

export type LockToken = {
  mint: PublicKey;
  receiver: PublicKey;
  isNative?: boolean;
  solanaFee?: number;
  tokenFeePercentage?: number;
  schedules: {
    amount: BN;
    releaseTime: number;
    isReleased: boolean;
  }[];
};

export default class TokenVesting extends InjectBaseRepository {
  constructor(
    private readonly programId: PublicKey,
    ...params: ConstructorParameters<typeof InjectBaseRepository>
  ) {
    super(...params);
  }

  async lockToken({
    mint,
    receiver,
    schedules,
    solanaFee,
    tokenFeePercentage,
    isNative = false,
  }: LockToken): Promise<[string, string, BN, BN]> {
    console.log("programId: ", this.programId.toBase58());

    const seed = generateRandomSeed();
    const { wallet, connection } = this.repository;

    let instructions = [
      // ComputeBudgetProgram.setComputeUnitLimit({
      //   units: COMPUTE_LIMIT,
      // }),
      // ComputeBudgetProgram.setComputeUnitPrice({
      //   microLamports: PRIORITY_FEE,
      // }),
    ];

    const senderATA = await getAssociatedTokenAddress(
      mint,
      wallet.publicKey,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    );

    const [receiverATA, receiverCreateAssociatedAccountInstructions] =
      await getOrCreateAssociatedTokenAccount(
        connection,
        wallet.publicKey,
        mint,
        receiver,
      );

    if (receiverCreateAssociatedAccountInstructions.length > 0)
      instructions = instructions.concat(
        receiverCreateAssociatedAccountInstructions,
      );

    let transferFee = new BN(0);
    let totalAmount = new BN(0);

    const createInstructions = await create(
      connection,
      this.programId,
      Buffer.from(seed),
      wallet.publicKey,
      wallet.publicKey,
      isNative ? wallet.publicKey : senderATA,
      receiverATA,
      new PublicKey(mint),
      schedules.map((schedule) => {
        const baseAmount = schedule.amount;
        const feeAmount = unsafeBN(baseAmount.mul(safeBN(tokenFeePercentage)));
        const amount = baseAmount.sub(feeAmount);
        transferFee = transferFee.add(feeAmount);
        totalAmount = totalAmount.add(baseAmount);

        console.log(console.log(amount.toString()));

        return Schedule.new(
          /// @ts-ignore
          new Numberu64(schedule.releaseTime),
          /// @ts-ignore
          new Numberu64(amount.toString("hex"), "hex"),
        );
      }),
      isNative,
    );

    if (solanaFee && solanaFee > 0) {
      const solanaFeeInstructions = await createFeeInstructions(
        this.repository,
        solanaFee,
      );
      instructions.concat(solanaFeeInstructions);
    }

    instructions = instructions.concat(createInstructions);

    if (!transferFee.isZero) {
      const tokenFeeInstructions = await createTokenFeeInstructions(
        this.repository,
        mint,
        senderATA,
        transferFee,
      );

      instructions = instructions.concat(tokenFeeInstructions);
    }

    const {
      value: lastestBlockhash,
      context: { slot: minContextSlot },
    } = await connection.getLatestBlockhashAndContext({
      commitment: "finalized",
    });

    const transaction = new Transaction(lastestBlockhash).add(...instructions);
    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = lastestBlockhash.blockhash;

    const tx = await wallet.sendTransaction(transaction, connection, {
      minContextSlot,
      maxRetries: 0,
      preflightCommitment: "confirmed",
    });

    await connection.confirmTransaction(
      {
        signature: tx,
        blockhash: lastestBlockhash.blockhash,
        lastValidBlockHeight: lastestBlockhash.lastValidBlockHeight,
      },
      "confirmed",
    );

    return [seed, tx, totalAmount, transferFee];
  }

  async unlockToken(seed: string, mint: PublicKey) {
    console.log("seed: ", seed);
    console.log("programId: ", this.programId.toBase58());

    const { connection, wallet } = this.repository;
    const unlockInstruction = await unlock(
      connection,
      this.programId,
      Buffer.from(seed).slice(0, 31),
      mint,
    );

    const {
      value: lastestBlockhash,
      context: { slot: minContextSlot },
    } = await connection.getLatestBlockhashAndContext();

    const transaction = new Transaction(lastestBlockhash);
    transaction.add(...unlockInstruction);

    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = lastestBlockhash.blockhash;

    const tx = await wallet.sendTransaction(transaction, connection, {
      minContextSlot,
    });

    await connection.confirmTransaction({
      signature: tx,
      blockhash: lastestBlockhash.blockhash,
      lastValidBlockHeight: lastestBlockhash.lastValidBlockHeight,
    });

    return tx;
  }

  async getLockedTokenBySeed(seed: string) {
    console.log("programId: ", this.programId.toBase58());

    const { connection } = this.repository;
    const [vestingAccountKey] = PublicKey.findProgramAddressSync(
      [Buffer.from(seed).slice(0, 31)],
      this.programId,
    );

    return getContractInfo(connection, vestingAccountKey);
  }

  async getLockedTokenByTokenVestingAddress(vestingAddress: string) {
    const { connection } = this.repository;
    return getContractInfo(connection, new PublicKey(vestingAddress));
  }

  async getLockedTokens(tokenAddress: string[]) {
    const { connection } = this.repository;
    const accounts = await connection.getProgramAccounts(this.programId, {
      filters: tokenAddress.map((address) => ({
        memcmp: {
          offset: 0,
          bytes: address,
        },
      })),
    });

    return accounts.map((account) =>
      ContractInfo.fromBuffer(account.account.data),
    );
  }
}
