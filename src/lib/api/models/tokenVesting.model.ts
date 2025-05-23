import { LpInfo } from "./raydium.model";
import type { DigitalAssetWithJsonMetadata } from "../metaplex";

export type ContractInfo = {
  id: string;
  tx: string;
  seed: string;
  unlockTx?: string;
  createdAt: string;
  mintAddress: string;
  totalAmount: string;
  destinationAddress: string;
  schedules: {
    releaseTime: any;
    amount: any;
    isReleased: boolean;
  }[];
  type: "outgoing" | "incoming";
};

export type LpTokenVesting = {
  lpInfo: LpInfo;
  contractInfo: ContractInfo;
};

export type TokenVesting = {
  mintMetadata: DigitalAssetWithJsonMetadata;
  contractInfo: ContractInfo;
};
