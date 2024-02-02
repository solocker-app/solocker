import BN from "bn.js";
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL  } from "@solana/web3.js";

export const percentFee = new BN(1).div(100); /// 1%
export const solFee = 2 * LAMPORTS_PER_SOL; /// 2SOL

export function createFeeInstructions(fee: BN, mintAddress: string, wallet: any){
  const mint = new PublicKey(mintAddress);
  const marketingWallet = new PublicKey(process.env.NEXT_PUBLIC_MARKETING_WALLET);
  
  return [
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: marketingWallet,
      lamports: solFee,
    }),
  ];
}