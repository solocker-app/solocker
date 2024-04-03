import BN from "bn.js";
import base58 from "bs58";
import { TOKEN_VESTING_PROGRAM_ID } from "@solocker/vesting";

import { PublicKey, Connection, TransactionInstruction } from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { ContractInfo } from "../api/models/tokenVesting.model";

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

export const canWithdraw = (schedules: ContractInfo["schedules"]) => {
  return schedules.some((schedule) => {
    return (
      new BN(schedule.releaseTime, "hex").toNumber() <=
        Math.floor(Date.now() / 1000) &&
      !schedule.isReleased &&
      new BN(schedule.amount, "hex").isZero
    );
  });
};

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

export const retry = async <T extends () => Promise<Awaited<ReturnType<T>>>>(
  func: T,
  maxRetry: number = 6,
) => {
  const attempts = 0;
  while (attempts < maxRetry) {
    try {
      return await func();
    } catch (error) {
      if (attempts === maxRetry) throw error;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
};

export const PRIORITY_FEE = Number(process.env.NEXT_PUBLIC_PRIORITY_FEE);
export const COMPUTE_LIMIT = Number(process.env.NEXT_PUBLIC_COMPUTE_LIMIT);

export const tokenFeePercentage = Number(
  process.env.NEXT_PUBLIC_TOKEN_LOCK_FEE,
);
export const solanaTokenFee = Number(
  process.env.NEXT_PUBLIC_TOKEN_LOCK_SOLANA_FEE,
);
export const lpTokenFeePercentatge = Number(
  process.env.NEXT_PUBLIC_LP_TOKEN_LOCK_FEE,
);

export const lpSolanaTokenFee = Number(
  process.env.NEXT_PUBLIC_LP_TOKEN_LOCK_SOLANA_FEE,
);
