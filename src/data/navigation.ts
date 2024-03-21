type Navigation = { 
   name: string; 
   href: string; 
   disabled?: boolean; 
   external?: boolean; 
 }; 
  
 export const layoutNavigation: Navigation[] = [ 
   { 
     name: "LP Locker", 
     href: "/", 
   }, 
   { 
     name: "Staking", 
     href: "", 
     disabled: true, 
   }, 
   { 
     name: "Docs", 
     href: "https://solocker.gitbook.io/solocker-spl/", 
     external: true, 
   }, 
 ];