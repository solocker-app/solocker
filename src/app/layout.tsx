import "@unocss/reset/tailwind.css";

import "@/global.css";
import { join } from "@/lib/utils";
import { defaultFont } from "@/fonts";

import LayoutHeader from "@/components/LayoutHeader";
import LayoutFooter from "@/components/LayoutFooter";

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={join(
          "fixed inset-0 flex flex-col bg-black text-white text-[15px]",
          defaultFont.className
        )}
      >
        <div className="flex-1 flex flex-col overflow-y-scroll">
          <LayoutHeader />
          {children}
          <LayoutFooter />
        </div>
      </body>
    </html>
  );
}
