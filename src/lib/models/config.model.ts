import { DigitalAssetWithJsonMetadata } from "../api/metaplex";
import { LpInfo } from "../api/models/raydium.model";

export type Config = {
  token: LpInfo;
  amount: number;
  period: number;
  recipient: string;
};

export type TokenConfig = {
  token: DigitalAssetWithJsonMetadata;
  amount: number;
  period: number;
  recipient: string;
};
