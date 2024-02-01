"use client";
import Image from "next/image";
import { MdMenu } from "react-icons/md";

import { Menu } from "@headlessui/react";

import { IlSolockerBrand } from "@/assets";

import LayoutNavigation from "./LayoutNavigation";

export default function LayoutHeader() {
  return (
    <header className="flex items-center space-x-4 p-2">
      <div>
        <Image
          src={IlSolockerBrand}
          alt="Solocker"
        />
      </div>
      <LayoutNavigation className="lt-md:!hidden" />

      <div className="flex-1 flex justify-end space-x-4 items-center md:flex-none">
        <button className="btn bg-dark/70 rounded-md hover:bg-dark active:bg-dark/70">
          Connect
        </button>
        <button className="btn btn-primary lt-md:!hidden">Launch App</button>
        <Menu>
          <Menu.Button className="p-2 md:hidden">
            <MdMenu className="text-xl" />
          </Menu.Button>
          <Menu.Items>
            <LayoutNavigation className="md:!hidden" />
          </Menu.Items>
        </Menu>
      </div>
    </header>
  );
}
