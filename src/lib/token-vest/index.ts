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
import { createTokenFeeInstructions } from "../instructions";
import {
  COMPUTE_LIMIT,
  getOrCreateAssociatedTokenAccount,
  PROIRITY_FEE,
} from "../utils";

type LockToken = {
  mint: PublicKey;
  receiver: PublicKey;
  isNative?: boolean;
  schedules: {
    releaseTime: any;
    isReleased: boolean;
    amount: any;
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
    isNative = false,
  }: LockToken): Promise<[string, string, BN, BN]> {
    const transaction = new Transaction().add(
      ComputeBudgetProgram.setComputeUnitLimit({
        units: COMPUTE_LIMIT,
      }),
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: PROIRITY_FEE,
      }),
    );
    const seed = generateRandomSeed();
    const { wallet, connection } = this.repository;

    console.log("programId: ", this.programId.toBase58());

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
      transaction.add(...receiverCreateAssociatedAccountInstructions);

    let transferFee = new BN(0);
    let totalAmount = new BN(0);

    const createInstruction = await create(
      connection,
      this.programId,
      Buffer.from(seed),
      wallet.publicKey,
      wallet.publicKey,
      isNative ? senderATA : wallet.publicKey,
      receiverATA,
      new PublicKey(mint),
      schedules.map((schedule) => {
        const baseAmount = new BN(schedule.amount);
        const feeAmount = baseAmount.mul(new BN(1)).div(new BN(100));
        const amount = baseAmount.sub(feeAmount);
        transferFee = feeAmount;
        totalAmount = totalAmount.add(baseAmount);

        return Schedule.new(
          /// @ts-ignore
          new Numberu64(schedule.releaseTime),
          /// @ts-ignore
          new Numberu64(amount.toNumber()),
        );
      }),
      isNative,
    );

    // transaction.add(...(await createFeeInstructions(this.repository)));
    transaction.add(...createInstruction);
    transaction.add(
      ...(await createTokenFeeInstructions(
        this.repository,
        mint,
        senderATA,
        transferFee,
      )),
    );
    const tx = await wallet.sendTransaction(transaction, connection);

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

    const transaction = new Transaction();
    transaction.add(...unlockInstruction);

    const tx = await wallet.sendTransaction(transaction, connection);

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
