import BN from "bn.js";
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL  } from "@solana/web3.js";
import { createTransferInstruction } from "@solana/spl-token";

import type { BaseRepository } from "..";
import { getOrCreateAssociatedTokenAccount } from "../utils/web3";

export async function createFeeInstructions(repository: BaseRepository, fee: BN, mintAddress: string){
  const { connection, wallet, signTransaction } = repository;
  
  const mint = new PublicKey(mintAddress);
  const marketingWallet = new PublicKey(process.env.NEXT_PUBLIC_MARKETING_WALLET);
  
 const sourceAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet.publicKey,
    mint,
    wallet.publicKey,
    signTransaction,
  );
  
  console.log(sourceAccount)
  
  const destinationAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet.publicKey,
    mint,
    marketingWallet,
    signTransaction,
  );
  
  console.log(destinationAccount);
  
  return [
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: marketingWallet,
      lamports: 2 * LAMPORTS_PER_SOL,
    }),
    createTransferInstruction(
      sourceAccount.address,
      destinationAccount.address,
      wallet.publicKey,
      fee,
    ), 
  ];
}