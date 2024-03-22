import base58 from "bs58";
import { TOKEN_VESTING_PROGRAM_ID } from "@bonfida/token-vesting";

import { PublicKey } from "@solana/web3.js";

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

export const isPublicKey = function (value) {
  try {
    new PublicKey(value);
    return true;
  } catch {
    return false;
  }
};
