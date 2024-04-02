import BN from "bn.js";
import base58 from "bs58";
import { TOKEN_VESTING_PROGRAM_ID } from "@solocker/vesting";

import { PublicKey, Connection, TransactionInstruction } from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

export const encodeSeed = function (value: string) {
  return base58.encode(Buffer.from(value).slice(0, 31));
};

export const decodeSeed = function (value: string) {
  return Buffer.from(base58.decode(value));
};

export const getVestingContractAddress = function (
  seed: string,
  programId = TOKEN_VESTING_PROGRAM_ID,
) {
  const [vestingAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from(seed).slice(0, 31)],
    programId,
  );
  return vestingAccount;
};

export const isPublicKey = function (value: string) {
  try {
    new PublicKey(value);
    return true;
  } catch {
    return false;
  }
};

export function getTotalLockedAmount(
  schedules: any,
  power: number,
  base?: string | number | "hex",
): BN {
  return (
    schedules
      /// @ts-ignore
      .map((schedule) => new BN(schedule.amount, base))
      .reduceRight((a, b) => a.add(b.amount))
      .div(new BN(10).pow(new BN(6)))
  );
}

export const getOrCreateAssociatedTokenAccount = async (
  connection: Connection,
  payer: PublicKey,
  mint: PublicKey,
  owner: PublicKey,
): Promise<[PublicKey, TransactionInstruction[]]> => {
  const transactionInstructions: TransactionInstruction[] = [];
  const ata = await getAssociatedTokenAddress(mint, owner);
  const accountInfo = await connection.getAccountInfo(ata);

  if (!accountInfo) {
    transactionInstructions.push(
      createAssociatedTokenAccountInstruction(payer, ata, owner, mint),
    );
  }

  return [ata, transactionInstructions];
};

export const PRIORITY_FEE = Number(process.env.NEXT_PUBLIC_PRIORITY_FEE);
export const COMPUTE_LIMIT = Number(process.env.NEXT_PUBLIC_COMPUTE_LIMIT);