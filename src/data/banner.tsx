import { FaBoxes, FaPiggyBank } from "react-icons/fa"; 
 import { GrUserExpert } from "react-icons/gr"; 
 import { MdOutlineSupportAgent } from "react-icons/md"; 
 import { BsBank2 } from "react-icons/bs"; 
 import { FaCoins } from "react-icons/fa"; 
  
 type BannerInfo = { 
   image: React.ReactNode; 
   title: string | number; 
   subtitle: string; 
 }; 
  
 export const homeHeroBannerInfos: BannerInfo[] = [ 
   { 
     image: <MdOutlineSupportAgent className="text-4xl text-green-500" />, 
     title: "10+", 
     subtitle: "Voice communicators", 
   }, 
   { 
     image: <GrUserExpert className="text-4xl text-green-500" />, 
     title: "30+", 
     subtitle: "Key opinion leader", 
   }, 
   { 
     image: <FaBoxes className="text-4xl text-green-500" />, 
     title: "3+", 
     subtitle: "Blockchain supported", 
   }, 
 ]; 
  
 export const homeFeatureBannerInfos: BannerInfo[] = [ 
   { 
     image: <FaPiggyBank className="text-4xl text-green-500" />, 
     title: "For founders", 
     subtitle: 
       "Have peace of mind that you're following the gold-standard for token management. Easy respond to questions from investors and your community about your token.", 
   }, 
   { 
     image: <BsBank2 className="text-4xl text-green-500" />, 
     title: "For Solana Ecosystem", 
     subtitle: 
       "Administer payments and grants to employees or contributors. See hpw your token supply is distributed in real time.", 
   }, 
   { 
     image: <FaCoins className="text-4xl text-green-500" />, 
     title: "For investors and Traders", 
     subtitle: 
       "Assist your founders by helping them use a solution that reduces their stress and time spent on admin.", 
   }, 
 ];