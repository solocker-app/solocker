import BN from "bn.js";
import base58 from "bs58";
import { Schedule, TOKEN_VESTING_PROGRAM_ID } from "@bonfida/token-vesting";

import { PublicKey } from "@solana/web3.js";
import { LpLockedToken } from "../firebase/lockToken";

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

export function getTotalLockedAmountN(
  schedules: LpLockedToken["contractInfo"]["schedules"],
  power: number,
): BN {
  return schedules
    .map((schedule) => new BN(schedule.amount) as BN)
    .reduceRight((a, b) => a.add(b) as BN)
    .div(new BN(10).pow(new BN(power)));
}

export function getTotalLockedAmount(schedules: any, power: number): BN {
  return (
    schedules
      .reduceRight((a, b) =>
        //@ts-ignore
        a.amount.add(b.amount),
      )
      // @ts-ignore
      .amount.div(new BN(10).pow(new BN(power)))
  );
}
