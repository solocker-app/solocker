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
      new BN(schedule.amount).isZero
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

export const safeBN = function (
  value: BN | number | string,
  decimals: number = 3,
) {
  let input = undefined;

  switch (typeof value) {
    case "number":
      input = Number(value * Math.pow(10, decimals)).toString(16);
      break;
    case "string":
      input = new BN(value, "hex").mul(new BN(10).pow(new BN(decimals)));
      break;
    default:
      throw new Error("unsupported BN input");
  }

  return new BN(input, "hex");
};

export const unsafeBN = function (value: BN, decimals: number = 3) {
  return value.div(new BN(10).pow(new BN(decimals)));
};

export const unsafeBnToNumber = function (value: BN, decimals: number = 3) {
  return value.toNumber() / Math.pow(10, decimals);
};

export const PRIORITY_FEE = Number(process.env.NEXT_PUBLIC_PRIORITY_FEE);
export const COMPUTE_LIMIT = Number(process.env.NEXT_PUBLIC_COMPUTE_LIMIT);
