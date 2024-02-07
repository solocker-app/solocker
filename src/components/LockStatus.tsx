import { join } from "@/lib/utils"; 
  
 type LockStatusProps = { 
   status: string; 
 }; 
  
 export default function LockStatus({ status }: LockStatusProps) { 
   const colorScheme = { 
     cancelled: "bg-red-100 text-red-500", 
     pending: "bg-amber-100 text-amber-500", 
     scheduled: "bg-container text-highlight", 
     completed: "bg-green-100 text-green-500", 
     paused: "bg-container text-highlight/50", 
   }; 
  
   return ( 
     <div 
       className={join("uppercase px-2 text-sm rounded", colorScheme[status])} 
     > 
       {status} 
     </div> 
   ); 
 }
 