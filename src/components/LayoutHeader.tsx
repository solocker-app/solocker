"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Menu } from "@headlessui/react";

import { useLoading } from "@/composables";
import { IcMenu, IlSolockerBrand } from "@/assets";

import WalletConnect from "./widgets/WalletConnect";
import LayoutNavigation from "./LayoutNavigation";

export default function LayoutHeader() {
  const router = useRouter();
  const { setLoading } = useLoading();

  return (
    <>
      <header className="flex items-center space-x-4 px-4 py-2 md:px-16 md:py-0 border-gradient 2xl:w-7xl 2xl:self-center">
        <Link href="/">
          <Image
            src={IlSolockerBrand}
            alt="Solocker"
            className="w-24 md:w-24 md:h-24 md:object-fill"
          />
        </Link>
        <LayoutNavigation className="lt-md:hidden" />
        <div className="flex-1 flex items-center justify-end space-x-4 md:flex-none md:justify-unset">
          <WalletConnect />
          <button
            className="btn btn-primary lt-md:!hidden"
            onClick={() => {
              setLoading(true);
              window.setTimeout(() => {
                router.push("/token-lock");
                window.setTimeout(() => {
                  setLoading(false);
                }, 1000);
              }, 3000);
            }}
          >
            Launch App
          </button>
          <Menu>
            <Menu.Button className="md:hidden">
              <Image
                src={IcMenu}
                alt="Menu"
              />
            </Menu.Button>
            <Menu.Items>
              <LayoutNavigation
                wrapChild={(children) => <Menu.Item>{children}</Menu.Item>}
              />
            </Menu.Items>
          </Menu>
        </div>
      </header>
    </>
  );
}
