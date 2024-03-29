import { LpInfo } from "./raydium.model";
import type { DigitalAssetWithJsonMetadata } from "../metaplex";

export type ContractInfo = {
  id: string;
  tx: string;
  seed: string;
  unlockTx?: string;
  unlocked: boolean;
  createdAt: number;
  mintAddress: string;
  destinationAddress: string;
  schedules: {
    period: number;
    amount: any;
  }[];
  type: "outgoing" | "incoming";
};

export type LpTokenVesting = {
  seed: string;
  lpInfo: LpInfo;
  contractInfo: ContractInfo;
};

export type TokenVesting = {
  seed: string;
  mintMetadata: DigitalAssetWithJsonMetadata;
  contractInfo: ContractInfo;
};
