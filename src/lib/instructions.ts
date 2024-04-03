import BN from "bn.js";
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

import type { BaseRepository } from ".";
import { createTransferInstruction } from "@solana/spl-token";

import { getOrCreateAssociatedTokenAccount } from "./utils";

export const marketingWallet = new PublicKey(
  process.env.NEXT_PUBLIC_MARKETING_WALLET,
);

export async function createTokenFeeInstructions(
  repository: BaseRepository,
  mint: PublicKey,
  sourceATA: PublicKey,
  amount: BN,
) {
  const { wallet, connection } = repository;
  const [marketingWalletATA, marketingWalletATAInstructions] =
    await getOrCreateAssociatedTokenAccount(
      connection,
      wallet.publicKey,
      mint,
      marketingWallet,
    );

  return [
    ...marketingWalletATAInstructions,
    createTransferInstruction(
      sourceATA,
      marketingWalletATA,
      wallet.publicKey,
      amount as any,
    ),
  ];
}

export async function createFeeInstructions(repository: BaseRepository, solanaFeeAmount: number) {
  const { wallet } = repository;

  return [
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: marketingWallet,
      lamports: solanaFeeAmount * LAMPORTS_PER_SOL,
    }),
  ];
}
