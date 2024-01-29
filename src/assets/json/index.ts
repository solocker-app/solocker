import LiquidityMainnet from "./raydium.mainnet.json";

type LiquidityPoolInfo = {
  id: string;
  baseMint: string;
  quoteMint: string;
  lpMint: string;
  lpDecimals: number;
  quoteDecimals: number;
  baseDecimals: number;
  version: number;
  programId: string;
  openOrders?: string;
  targetOrders?: string;
  baseVault?: string;
  quoteVault?: string;
  lpVault?: string;
  marketVersion?: number;
  marketId: string;
  marketAuthority?: string;
  marketBaseVault?: string;
  marketQuoteValue?: string;
  marketQuoteVault?: string;
  marketBids?: string;
  marketAsk?: string;
  lookupTableAccount?: string;
};

export type RaydiumPoolInfo = {
  name: string;
  official: LiquidityPoolInfo[];
  unOfficial: LiquidityPoolInfo[];
};

export const raydiumLiquidityPoolInfo = LiquidityMainnet;
