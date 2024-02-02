import BN from "bn.js";
import { SystemProgram, PublicKey } from "@solana/web3.js";

export const percentFee = new BN(1).div(100); /// 1%
export const solFee = new BN(2).mul(new BN(10).pow(9)); /// 2SOL

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