import "@unocss/reset/tailwind.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

import "@/global.css";
import { join } from "@/lib/utils";
import { defaultFont } from "@/fonts";

import LayoutHeader from "@/components/LayoutHeader";
import ProviderMixin from "@/components/ProviderMixin";

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={join(
          "fixed inset-0 flex flex-col bg-black text-white text-[15px]",
          defaultFont.className,
        )}
      >
        <ProviderMixin>
          <div className="flex-1 flex flex-col overflow-y-scroll">
            <LayoutHeader />
            {children}
            <ToastContainer />
          </div>
        </ProviderMixin>
      </body>
    </html>
  );
}
