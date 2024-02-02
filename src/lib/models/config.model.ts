import { LpInfo } from "../api/models/raydium.model";

export type Config = {
  token: LpInfo;
  amount: number;
  period: number;
  recipient: string;
};
