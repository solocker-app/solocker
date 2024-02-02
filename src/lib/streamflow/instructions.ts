import BN from "bn.js";
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL  } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, createTransferInstruction } from "@solana/spl-token";

import type { BaseRepository } from "..";

export async function createFeeInstructions(repository: BaseRepository, fee: BN, mintAddress: string){
  const { connection, wallet } = repository;
  
  const mint = new PublicKey(mintAddress);
  const marketingWallet = new PublicKey(process.env.NEXT_PUBLIC_MARKETING_WALLET);
  
  const sourceAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet as any,
    mint,
    wallet.publicKey,
    false,
    "confirmed" 
  );
  
  alert(JSON.stringify(sourceAccount))
  
  const destinationAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet as any,
    mint,
    marketingWallet,
    false,
    "confirmed" 
  );
  
  alert(JSON.stringify(destinationAccount))
  
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