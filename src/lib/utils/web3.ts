import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  getAccount,
  createAssociatedTokenAccountInstruction,
} from '@solana/spl-token';
import { Connection, Transaction, PublicKey } from '@solana/web3.js';
import type { SignerWalletAdapterProps } from "@solana/wallet-adapter-base";

export async function getOrCreateAssociatedTokenAccount(
  connection: Connection,
  payer: PublicKey,
  mint: PublicKey,
  owner: PublicKey,
  signTransaction: SignerWalletAdapterProps["signTransaction"],
  allowOwnerOffCurve = false,
  commitment: any= "finalized",
  programId = TOKEN_PROGRAM_ID,
  associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID
) {
  const associatedToken = await getAssociatedTokenAddress(
    mint,
    owner,
    allowOwnerOffCurve,
    programId,
    associatedTokenProgramId
  );

  try {
    const account = await getAccount(connection, associatedToken, commitment, programId);
    return account;
  } catch (error) {
    try {
      const transaction = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          payer,
          associatedToken,
          owner,
          mint,
          programId,
          associatedTokenProgramId
        )
      );

      const blockHash = await connection.getRecentBlockhash();
      transaction.feePayer = await payer;
      transaction.recentBlockhash = await blockHash.blockhash;
      const signed = await signTransaction(transaction);

      const signature = await connection.sendRawTransaction(signed.serialize());

      await connection.confirmTransaction(signature);
    } catch (error) {
      // Ignore all errors
    }

    // Now this should always succeed
    const account = await getAccount(connection, associatedToken, commitment, programId);
    return account;
  }
}