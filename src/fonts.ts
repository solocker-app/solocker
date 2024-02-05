import LocalFont from "next/font/local";

export const defaultFont = LocalFont({
  src: [
    {
      path: "./assets/fonts/helvetica/Helvetica-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./assets/fonts/helvetica/Helvetica.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/helvetica/Helvetica-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./assets/fonts/helvetica/Helvetica-BoldOblique.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});
