"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { useRef } from "react";
import { createPortal } from "react-dom";
import { MdMenu } from "react-icons/md";

import {useMounted} from "@/composables";
import { layoutNavigation } from "@/data";
import { IlSolockerBrand } from "@/assets";
import LayoutSideNavigation, {
  type LayoutSideNavigationElement,
} from "@/components/LayoutSideNavigation";

export default function LayoutHeader() {
  const pathname = usePathname();
  const mounted = useMounted();
  const navigationRef = useRef<LayoutSideNavigationElement>();

  return (
    <header className="flex items-center space-x-8 p-4 md:px-8">
      <Link
        href="/"
        className="flex-1"
      >
        <Image
          src={IlSolockerBrand}
          alt="Decentralize bank"
          width={128}
          height={128}
          className="object-cover"
        />
      </Link>
      <div className="flex items-center space-x-6 text-sm lt-md:hidden">
        {layoutNavigation.map((navigation, index) => (
          <Link
            key={index}
            href={navigation.href}
            className={
              pathname === navigation.href
                ? "btn btn-gradient-primary"
                : "text-highlight"
            }
          >
            {navigation.name}
          </Link>
        ))}
      </div>
      <div className="flex space-x-2 items-center">
        <button className="btn btn-gradient-primary">Connect Wallet</button>
        <button
          className="btn flex items-center md:space-x-2 bg-stone-900 text-white md:hidden"
          onClick={() => navigationRef.current!.toggle(true)}
        >
          <MdMenu className="text-xl" />
          <span>Menu</span>
        </button>
      </div>
      {mounted &&createPortal(
        <LayoutSideNavigation ref={navigationRef} />,
        document.body
      )}
    </header>
  );
}
