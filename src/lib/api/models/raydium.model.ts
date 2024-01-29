import {
  Metadata,
  JsonMetadata,
} from "@metaplex-foundation/mpl-token-metadata";

export type MetadataWithNetwork = {
  network: JsonMetadata;
} & Metadata;

export type LpInfo = {
  quoteTokenMetadata: MetadataWithNetwork;
  baseTokenMetadata: MetadataWithNetwork;
  baseValueBalance: number;
  quoteValueBalance: number;
  totalLpAmount: number;
  addedLpAmount: number;
};
