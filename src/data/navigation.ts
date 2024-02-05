type Navigation = { 
   name: string; 
   href: string; 
   disabled?: boolean; 
   external?: boolean; 
 }; 
  
 export const layoutNavigation: Navigation[] = [ 
   { 
     name: "LP Locker", 
     href: "/token-lock", 
   }, 
   { 
     name: "Token Vesting", 
     href: "", 
     disabled: true, 
   }, 
   { 
     name: "Docs", 
     href: "https://solocker.gitbook.io/solocker-spl/", 
     external: true, 
   }, 
 ];