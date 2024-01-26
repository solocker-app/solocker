import { useMemo } from "react";
import solanaTokenList from "./solana.tokenlist.json";

export const filterTokenBy = function (key, ...values: string[]) {
  return solanaTokenList.tokens.filter((token) => values.includes(token[key]));
};

export const useLpTokens = () =>
  useMemo(
    () =>
      solanaTokenList.tokens.filter((token) => token.tag.includes("lp-token")),
    []
  );

function tokenListToMap() {
  const result = {};
  for (const token of solanaTokenList.tokens) {
    result[token.address] = token;
  }

  return result;
}

export default tokenListToMap();
