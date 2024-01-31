import { TokenAccount } from "@raydium-io/raydium-sdk";
import {
  Metadata,
  JsonMetadata,
} from "@metaplex-foundation/mpl-token-metadata";

export type MetadataWithNetwork = {
  jsonMetadata?: JsonMetadata;
} & Metadata;

export type TokenAccountWithMetadata = {
  symbol: string;
  name: string;
} & TokenAccount["accountInfo"];

export type LpInfo = {
  lpTokenDecimal: number;
  baseTokenDecimal: number;
  quoteTokenDecimal: number;
  lpTokenMetadata: MetadataWithNetwork | TokenAccountWithMetadata;
  quoteTokenMetadata: MetadataWithNetwork;
  baseTokenMetadata: MetadataWithNetwork;
  baseValueBalance: number;
  quoteValueBalance: number;
  totalLpAmount: number;
  addedLpAmount: number;
};
