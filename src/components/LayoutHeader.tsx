"use client";
import Link from "next/link";
import Image from "next/image";
import { MdMenu } from "react-icons/md";

import { Menu } from "@headlessui/react";

import { IlSolockerBrand, IlSolockerLogo } from "@/assets";

import WalletConnect from "./widgets/WalletConnect";
import LayoutNavigation from "./LayoutNavigation";

export default function LayoutHeader() {
  return (
    <header className="flex items-center space-x-4 p-2">
      <Link href="/">
        <Image
          src={IlSolockerBrand}
          alt="Solocker"
          className="lt-md:hidden"
        />
        <Image
          src={IlSolockerLogo}
          alt="Solocker"
          className="w-14 h-14 md:hidden"
        />
      </Link>
      <LayoutNavigation className="lt-md:!hidden" />

      <div className="flex-1 flex justify-end items-center space-x-4 md:flex-none">
        <WalletConnect />
        <Link
          href="/token-lock"
          className="btn btn-primary !px-8 lt-md:!hidden"
        >
          Launch App
        </Link>
        <Menu>
          <Menu.Button className="p-2 md:hidden">
            <MdMenu className="text-xl" />
          </Menu.Button>
          <Menu.Items>
            <LayoutNavigation
              className="md:!hidden"
              wrapChild={(child) => <Menu.Item>{child}</Menu.Item>}
            />
          </Menu.Items>
        </Menu>
      </div>
    </header>
  );
}
