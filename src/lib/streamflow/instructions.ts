import BN from "bn.js";
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL  } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, createTransferInstruction } from "@solana/spl-token";
import { Connection, Keypair, ParsedAccountData, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";

export function createFeeInstructions(repository: BaseRepository, fee: BN, mintAddress: string){
  const { connection, wallet } = this.repository;
  
  const mint = new PublicKey(mintAddress);
  const marketingWallet = new PublicKey(process.env.NEXT_PUBLIC_MARKETING_WALLET);
  
  const sourceAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet as any,
    mint,
    wallet.publicKey,
  );
  
  const destinationAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet as any,
    mint,
    marketingWallet,
  );
  
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