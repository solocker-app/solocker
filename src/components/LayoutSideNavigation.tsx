"use client";
import Link from "next/link";
import { forwardRef, useRef, useState, useImperativeHandle } from "react";
import { MdClose } from "react-icons/md";
import { layoutNavigation } from "@/data";
import { join } from "@/lib/utils";

export type LayoutSideNavigationElement = {
  toggle(state?: boolean): void;
};

export default forwardRef<LayoutSideNavigationElement>(
  function LayoutSideNavigation({}, ref) {
    const innerRef = useRef<HTMLDivElement>();
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      toggle(state) {
        setVisible(state ?? !visible);
      },
    }));

    return (
      <div
        ref={innerRef}
        className={join(
          "fixed inset-0 flex flex-col bg-black p-4 transition md:hidden",
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <button
          className="self-end w-8 h-8 flex items-center justify-center border rounded-full p-2"
          onClick={() => setVisible(false)}
        >
          <MdClose className="text-xl" />
        </button>
        <div className="flex-1 flex flex-col items-center justify-center">
          <Link
            href="/"
            className="text-base p-4 hover:text-highlight"
            onClick={() => setVisible(false)}
          >
            Home
          </Link>
          {layoutNavigation.map((navigation, index) => (
            <Link
              href={navigation.href}
              key={index}
              className="text-base p-4 hover:text-highlight"
              onClick={() => setVisible(false)}
            >
              {navigation.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }
);
