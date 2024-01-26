"use client";
import Link from "next/link";
import { useRef } from "react";
import { IoMenu } from "react-icons/io5";

import LayoutNavigation, {
  type LayoutNavigationElement,
} from "./LayoutNavigation";

import WalletConnect from "./widgets/WalletConnect";

export default function LayoutHeader() {
  const navigationRef = useRef<LayoutNavigationElement>();
  return (
    <header className="flex items-center space-x-2 p-4 md:py-8">
      <div className="lt-md:flex-1">
        <Link
          href="/"
          className="text-primary text-2xl font-extrabold"
        >
          SoloLocker
        </Link>
      </div>
      <LayoutNavigation ref={navigationRef} />
      <div className="flex items-center space-x-4">
        <WalletConnect />
        <button
          className="border p-2 rounded-full md:hidden"
          onClick={() => navigationRef.current!.toggle(true)}
        >
          <IoMenu className="text-lg" />
        </button>
      </div>
    </header>
  );
}
