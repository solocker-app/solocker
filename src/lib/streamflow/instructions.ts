import BN from "bn.js";
import { SystemProgram } from "@solana/web3.js";

export const percentFee = new BN(1).div(100); /// 1%
export const solFee = new BN(2).mul(new BN(10).pow(9)); /// 2SOL

export function createFeeInstruction(fee: BN, mintAddress: string, wallet: any){
  const mint = new PublicKey(mintAddress);
  const marketingWallet = new PublicKey(process.env.MARKETING_WALLET);
  
  return [
    SystemProgram.transfer({
      fromPubKey: wallet.pubkey,
      toPubKey: marketingWallet,
      lamport: solFee,
    }),
  ];
}