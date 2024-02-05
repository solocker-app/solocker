import {
  Orbitron,
  Roboto,
} from "next/font/google";

export const orbitronFont = Orbitron({
  subsets: ["latin"],
});

export const defaultFont = Roboto({
  subsets: ["latin"],
  variable: "--default-font",
  weight: ["100", "300", "400", "500", "700", "900"],
});
