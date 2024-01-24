import "@unocss/reset/tailwind.css";
import { Poppins } from "next/font/google";

import "@/global.css";
import { join } from "@/lib/utils";
import LayoutHeader from "@/components/LayoutHeader";
import LayoutFooter from "@/components/LayoutFooter";

const defaultFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={join(
          "relative bg-dark text-white text-[15px] overflow-x-hidden",
          defaultFont.className
        )}
      >
        <div className="w-100 h-100 absolute md:-top-16 md:-right-16 bg-linear-gradient rounded-full  blur-3xl mix-blend-difference -z-10" />
        <div className="h-full flex flex-col space-y-16 overflow-x-hidden overflow-y-scroll z-10">
          <LayoutHeader />
          {children}
          <LayoutFooter />
        </div>
      </body>
    </html>
  );
}
