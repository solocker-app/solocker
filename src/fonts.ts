import { Orbitron, Montserrat, Tajawal } from "next/font/google";

export const orbitronFont = Orbitron({
  subsets: ["latin"],
});

export const defaultFont = Tajawal({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});
