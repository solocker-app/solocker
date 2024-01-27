import { useMemo } from "react";
import solanaTokenList from "./solana.tokenlist.json";

export type TokenMetadata = {
  address: string;
  name: string;
  symbol: string;
  logoUrl: string;
  tags: string[];
};

export const filterTokenBy = function (key, ...values: string[]): TokenMetadata[] {
  return solanaTokenList.tokens.filter((token) => values.includes(token[key]));
};

export const useLpTokens = () =>
  useMemo<TokenMetadata[]>(
    () =>
      solanaTokenList.tokens.filter((token) => token.tag.includes("lp-token")),
    []
  );

function tokenListToMap() {
  const result = new Map<string, TokenMetadata>();
  for (const token of solanaTokenList.tokens) result.set(token.address, token);

  return result;
}

export default tokenListToMap();
