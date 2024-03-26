import { LpInfo } from "./raydium.model";

export type TokenVesting = {
  seed: string;
  lpInfo: LpInfo;
  contractInfo: {
    id: string;
    tx: string;
    programId: string;
    seed: string;
    unlockTx?: string;
    unlocked: boolean;
    createdAt: number;
    mintAddress: string;
    destinationAddress: string;
    schedules: {
      period: number;
      amount: number;
    }[];
    type: "outgoing" | "incoming";
  };
};
