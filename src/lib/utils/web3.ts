import BN from "bn.js";
import base58 from "bs58";
import { Schedule, TOKEN_VESTING_PROGRAM_ID } from "@bonfida/token-vesting";

import { 
  PublicKey,
  Connection,
  TransactionInstruction
 } from "@solana/web3.js";
import {
  createTransferInstruction,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  getAccount
} from '@solana/spl-token';

import { LockedToken, LpLockedToken } from "../firebase/lockToken";

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
  schedules: Schedule[] | LockedToken["schedules"],
  power: number,
): BN {
  return (
    schedules
      .map((schedule) => new BN(schedule.amount))
      .reduceRight((a, b) =>
        //@ts-ignore
        a.add(b.amount),
      )
      // @ts-ignore
      .div(new BN(10).pow(new BN(power)))
  );
}

export const getOrCreateAssociatedTokenAccount = async (
  connection: Connection,
  payer: PublicKey,
  mint: PublicKey,
  owner: PublicKey
) => {
  const transactionInstructions: TransactionInstruction[] = [];
  const ata = await getAssociatedTokenAddress(mint, owner);
  const accountInfo = await connection.getAccountInfo(ata);

  if (!accountInfo) {
    transactionInstructions.push(
      createAssociatedTokenAccountInstruction(payer, ata, owner, mint)
    );
  }

  return [ata, transactionInstructions];
};

