import BN from "bn.js";
import moment from "moment"; 

import Image from "next/image"; 

import { MdLockOutline } from "react-icons/md"; 
  
import { Types } from "@streamflow/stream"; 

import { LpInfo } from "@/lib/api/models/raydium.model"; 

import { useLpLockInfo } from "@/composables";

import LockStatus from "./LockStatus"; 
import OverlapCoinIcon, { getCoinProps } from "./widgets/OverlapCoinIcon"; 
import TokenEditLockItemMenu, { TokenLockEditMenuAction } from "./TokenLockEditItemMenu"; 
 
type TokenLockListItemProps = { 
  onAction: ( 
    type: TokenLockEditMenuAction, 
    lpInfo: LpInfo, 
  ) => void; 
  stream: Types.Stream; 
};

export default function TokenLockEditItem({onAction, stream} : TokenLockListItemProps){
  const { lpInfo } = useLpLockInfo(stream);
    
  return ( 
     lpInfo && ( 
       <tr> 
         <td> 
           <div className="flex items-center"> 
             <Image 
               src="/assets/coins/ray.png" 
               alt="raydium" 
               className="w-6 h-6 rounded-full" 
               width={24} 
               height={24} 
             /> 
             <p className="invisible">hm</p> 
           </div> 
         </td> 
         <td> 
           <div className="flex items-center space-x-2"> 
             <OverlapCoinIcon 
               icons={[ 
                 getCoinProps(lpInfo.baseTokenMetadata), 
                 getCoinProps(lpInfo.quoteTokenMetadata), 
               ]} 
             /> 
             <p>{lpInfo.lpTokenMetadata.symbol}</p> 
           </div> 
         </td> 
         <td> 
           <div className="flex space-x-2 items-center"> 
             <MdLockOutline /> 
             <p className="flex items-center space-x-1"> 
               <span> 
                 {stream.depositedAmount 
                   .div(new BN(10).pow(new BN(lpInfo.lpTokenDecimal))) 
                   .toNumber()} 
               </span> 
               <span className="text-highlight"> 
                 {lpInfo.lpTokenMetadata.symbol} 
               </span> 
             </p> 
           </div> 
         </td> 
         <td>{moment.unix(Number(stream.period)).fromNow()}</td> 
         <td> 
           <LockStatus 
             status={ 
               stream.closed 
               ? "closed" 
               : stream.unlocked 
               ? "unlocked" 
               : "locked" 
             } 
           /> 
         </td> 
         <td> 
           <TokenEditLockItemMenu 
             onAction={(type) => { 
               onAction(type, lpInfo); 
             }} 
           /> 
         </td> 
       </tr> 
     ) 
   );
}