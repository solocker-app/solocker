import { readFileSync } from "fs";
import { Keypair } from "@solana/web3.js";

export const getDefaultWallet = function (
  path: string = "/Users/macbookpro/.config/solana/id.json",
) {
  const seed = readFileSync(path, "utf-8");

  return Keypair.fromSecretKey(Uint8Array.from(JSON.parse(seed)));
};