import {
  create,
  unlock,
  generateRandomSeed,
  Numberu64,
  Schedule,
  getContractInfo,
  ContractInfo,
} from "@bonfida/token-vesting";

import { PublicKey, Transaction } from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import { InjectBaseRepository } from "../injector";

type LockToken = {
  mint: PublicKey;
  receiver: PublicKey;
  schedules: {
    period: any;
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
  }: LockToken): Promise<[string, string]> {
    const seed = generateRandomSeed();
    const { wallet, connection } = this.repository;

    const senderATA = await getAssociatedTokenAddress(
      mint,
      wallet.publicKey,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    );

    const receiverATA = await getOrCreateAssociatedTokenAccount(
      connection,
      wallet as any,
      mint,
      receiver,
      true,
      undefined,
      undefined,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    );

    const createInstruction = await create(
      connection,
      this.programId,
      Buffer.from(seed),
      wallet.publicKey,
      wallet.publicKey,
      senderATA,
      receiverATA.address,
      new PublicKey(mint),
      schedules.map(
        (schedule) =>
          new Schedule(
            /// @ts-ignore
            new Numberu64(Math.round(schedule.period / 1000)),
            /// @ts-ignore
            new Numberu64(schedule.amount),
          ),
      ),
    );
    const transaction = new Transaction();
    transaction.add(...createInstruction);

    const tx = await wallet.sendTransaction(transaction, connection);

    return [seed, tx];
  }

  async unlockToken(seed: string, mint: PublicKey) {
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

  async getLockedLpInfo(tokenAddress: string[]) {}
}
