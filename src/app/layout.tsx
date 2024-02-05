import "@unocss/reset/tailwind.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datetime/css/react-datetime.css";

import type { Metadata } from "next";

import { ToastContainer } from "react-toastify";

import "@/global.css";
import { join } from "@/lib/utils";
import { defaultFont } from "@/fonts";

import LayoutHeader from "@/components/LayoutHeader";
import ProviderMixin from "@/components/ProviderMixin";

export const metadata: Metadata = {
  title: "The Seamless Token Management Suite On Solana| SOLocker",
  metadataBase: new URL("https://solocker.app"),
  description:
    "Lock and manage your liquidity pools, Vest and delegate tokens in your DAO, and deploy secure token contracts, only possible on Solocker.",
  openGraph: {
    type: "website",
    siteName: "SOLocker",
    url: "https://solocker.app",
    images: ["https://solocker.app/assets/images/preview.png"],
  },
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={join(
          "fixed inset-0 flex flex-col bg-gradient-to-r bg-black via-dark from-primary to-dark  text-white text-[15px]",
          defaultFont.className,
        )}
      >
        <ProviderMixin>
          <div
            id="container"
            className="flex-1 flex flex-col overflow-y-scroll overflow-x-hidden"
          >
            <LayoutHeader />
            {children}
            <ToastContainer />
          </div>
        </ProviderMixin>
      </body>
    </html>
  );
}
