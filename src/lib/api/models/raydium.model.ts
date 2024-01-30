import {
  Metadata,
  JsonMetadata,
} from "@metaplex-foundation/mpl-token-metadata";

export type MetadataWithNetwork = {
  network: JsonMetadata;
} & Metadata;

export type LpInfo = {
  lpTokenDecimal: number,
  baseTokenDecimal: number,
  quoteTokenDecimal: number,
  lpTokenMetadata: MetadataWithNetwork;
  quoteTokenMetadata: MetadataWithNetwork;
  baseTokenMetadata: MetadataWithNetwork;
  baseValueBalance: number;
  quoteValueBalance: number;
  totalLpAmount: number;
  addedLpAmount: number;
};
