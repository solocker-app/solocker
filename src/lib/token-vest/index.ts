import { signAndSendInstructions } from "@bonfida/utils";
import {
  create,
  unlock,
  generateRandomSeed,
  Numberu64,
  Schedule,
  getContractInfo,
} from "@bonfida/token-vesting";

import { InjectBaseRepository } from "../injector";
import { PublicKey } from "@solana/web3.js";
import {
  getAssociatedTokenAddressSync,
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";

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

  async lockToken({ mint, receiver, schedules }: LockToken) {
    const seed = generateRandomSeed();
    const { wallet, connection } = this.repository;

    const senderATA = await getAssociatedTokenAddress(mint, wallet.publicKey);
    const receiverATA = await getAssociatedTokenAddress(mint, receiver);

    const createInstruction = await create(
      connection,
      this.programId,
      Buffer.from(seed),
      wallet.publicKey,
      wallet.publicKey,
      senderATA,
      receiverATA,
      new PublicKey(mint),
      schedules.map(
        (schedule) =>
          new Schedule(
            /// @ts-ignore
            new Numberu64(schedule.period),
            /// @ts-ignore
            new Numberu64(schedule.amount),
          ),
      ),
    );

    const tx = await signAndSendInstructions(
      connection,
      [],
      wallet as any,
      createInstruction,
    );

    return [seed, tx];
  }

  async unlockToken(seed: PublicKey, mint: PublicKey) {
    const { connection, wallet } = this.repository;
    const unlockInstruction = await unlock(
      connection,
      this.programId,
      seed.toBuffer(),
      mint,
    );

    const tx = await signAndSendInstructions(
      connection,
      [],
      wallet as any,
      unlockInstruction,
    );

    return tx;
  }

  async getLockedToken(seed: string) {
    const { connection } = this.repository;
    const [vestingAccountKey] = PublicKey.findProgramAddressSync(
      [Buffer.from(seed).slice(0, 31)],
      this.programId,
    );

    return getContractInfo(connection, vestingAccountKey);
  }
}
