import BN from "bn.js";
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
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import { InjectBaseRepository } from "../injector";
import { Type } from "../firebase/lockToken";
import { getOrCreateAssociatedTokenAccount } from "../utils";
import {
  createFeeInstructions,
  createTokenFeeInstructions,
} from "../instructions";

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
    const transaction = new Transaction();
    const seed = generateRandomSeed();
    const { wallet, connection, firebase } = this.repository;

    /// Logging Seed
    await firebase.lockToken.saveTransaction(wallet.publicKey.toBase58(), {
      seed,
      destinationAddress: receiver.toBase58(),
      mintAddress: mint.toBase58(),
      schedules: schedules.map((schedule) => {
        schedule.amount = schedule.amount.toNumber();
        return schedule;
      }),
      type: Type.OUTGOING,
      unlocked: false,
    });

    const senderATA = await getAssociatedTokenAddress(
      mint,
      wallet.publicKey,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    );

    const [receiverATA, receiverCreateAssociatedAccountInstructions] = await getOrCreateAssociatedTokenAccount(
      connection,
      wallet.publicKey,
      mint,
      receiver,
    );
     
    if(receiverCreateAssociatedAccountInstructions.length > 0)
      transaction.add(...receiverCreateAssociatedAccountInstructions);

    let transferFee = new BN(0);

    const createInstruction = await create(
      connection,
      this.programId,
      Buffer.from(seed),
      wallet.publicKey,
      wallet.publicKey,
      senderATA,
      receiverATA,
      new PublicKey(mint),
      schedules.map((schedule) => {
        const baseAmount = new BN(schedule.amount);
        const feeAmount = baseAmount.mul(new BN(1)).div(new BN(100));
        const amount = baseAmount.sub(feeAmount);
        transferFee = feeAmount;

        console.log(baseAmount.toNumber());
        console.log(amount.toNumber());
        console.log(feeAmount.toNumber());
        console.log(transferFee.toNumber());

        return new Schedule(
          /// @ts-ignore
          new Numberu64(Math.round(schedule.period / 1000)),
          /// @ts-ignore
          new Numberu64(amount.toNumber()),
        );
      }),
    );

    transaction.add(...(await createFeeInstructions(this.repository)));
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

    /// Logging Transaction
    await firebase.lockToken.updateTransaction(
      wallet.publicKey.toBase58(),
      seed,
      { tx },
    );

    return [seed, tx];
  }

  async unlockToken(seed: string, mint: PublicKey) {
    const { connection, wallet, firebase } = this.repository;
    const unlockInstruction = await unlock(
      connection,
      this.programId,
      Buffer.from(seed).slice(0, 31),
      mint,
    );

    const transaction = new Transaction();
    transaction.add(...unlockInstruction);

    const tx = await wallet.sendTransaction(transaction, connection);
    await firebase.lockToken.updateTransaction(
      wallet.publicKey.toBase58(),
      seed,
      { unlocked: true },
    );

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
}
