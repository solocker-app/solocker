import { Orbitron, Tajawal, Montserrat, Noto_Sans } from "next/font/google";

export const orbitronFont = Orbitron({
  subsets: ["latin"],
});

export const defaultFont = Tajawal({
  subsets: ["latin"],
  variable: "--default-font",
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});
