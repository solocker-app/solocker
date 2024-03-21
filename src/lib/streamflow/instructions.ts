import { SystemProgram, PublicKey, LAMPORTS_PER_SOL  } from "@solana/web3.js";

import type { BaseRepository } from "..";

export const marketingWallet = new PublicKey(process.env.NEXT_PUBLIC_MARKETING_WALLET);

export async function createFeeInstructions(repository: BaseRepository){
  const { wallet } = repository;

  return [
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: marketingWallet,
      lamports: 2 * LAMPORTS_PER_SOL,
    }),
  ];
}
