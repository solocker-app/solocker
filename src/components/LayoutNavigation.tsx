import Link from "next/link";
import { useImperativeHandle, forwardRef, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";

import { join } from "@/lib/utils";
import { layoutNavigation } from "@/data";

export type LayoutNavigationElement = {
  toggle(state?: boolean): void;
};

export default forwardRef<LayoutNavigationElement>(function LayoutNavigation(
  props,
  ref
) {
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
        "fixed inset-0 flex flex-col bg-black transition-opacity md:flex-1 md:flex-row md:static",
        visible ? "lt-md:opacity-100" : "lt-md:opacity-0 lt-md:pointer-events-none"
      )}
    >
      <div className="flex flex-col p-4 md:hidden">
        <button
          className="self-end p-2"
          onClick={() => setVisible(false)}
        >
          <IoClose className="text-xl" />
        </button>
      </div>
      <div className="flex-1 flex flex-col md:flex-row md:space-x-6 md:items-center md:justify-center">
        {layoutNavigation.map((navigation, index) => (
          <Link
            key={index}
            href={navigation.href}
            className="flex space-x-2 items-center lt-md:p-4 hover:text-stone/70"
            onClick={() => setVisible(false)}
          >
            <span>{navigation.name}</span>
            {navigation.external && <GoArrowUpRight />}
          </Link>
        ))}
      </div>
    </div>
  );
});
