import { useWallet } from "@solana/wallet-adapter-react"; 
 import { Types } from "@streamflow/stream";

import { 
   getLiquidityPoolInfo, 
   raydiumLpInfoSelector, 
 } from "@/store/slices/raydiumLpInfo"; 
 import { useAppDispatch, useAppSelector } from "@/store/hooks"; 
 
 import { LpInfo } from "@/lib/api/models/raydium.model";
 
export default function useLpLockInfo(stream: Types.Stream){
  const { publicKey } = useWallet(); 
  const dispatch = useAppDispatch(); 
  const state = useAppSelector((state) => state.raydiumLpInfo); 
  
  const lpInfo = raydiumLpInfoSelector.selectById(state, stream.mint); 
  
  useEffect(() => { 
    getLiquidityPoolInfo(state, dispatch, { 
      wallet: publicKey.toBase58(), 
      mint: stream.mint, 
   }); 
   }, [state, dispatch, wallet]);
   
   
   return {
     lpInfo,
   }
}