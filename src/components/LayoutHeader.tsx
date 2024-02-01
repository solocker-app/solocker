"use client";
import Link from "next/link";
import Image from "next/image";
import { MdMenu } from "react-icons/md";

import { Menu } from "@headlessui/react";

import { IlSolockerBrand } from "@/assets";

import LayoutNavigation from "./LayoutNavigation";

export default function LayoutHeader() {
  return (
    <header className="flex items-center space-x-4 p-2">
      <Link href="/">
        <Image
          src={IlSolockerBrand}
          alt="Solocker"
        />
      </Link>
      <LayoutNavigation className="lt-md:!hidden" />

      <div className="flex-1 flex justify-end space-x-4 items-center md:flex-none">
        <button className="btn bg-dark/70 rounded-md hover:bg-dark active:bg-dark/70">
          Connect
        </button>
        <Link
          href="/token-lock"
          className="btn btn-primary lt-md:!hidden"
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
