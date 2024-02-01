import Link from "next/link";

import { MdClose } from "react-icons/md";

import { join } from "@/lib/utils";
import { layoutNavigation } from "@/data";

type LayoutNavigationProps = {
  className?: string;
};

export default function LayoutNavigation({ className }: LayoutNavigationProps) {
  return (
    <div
      className={join(
        "fixed inset-0 flex-1 flex flex-col bg-black/50 shadow md:static md:flex-row md:items-center md:justify-center  md:space-y-0",
        className,
      )}
    >
      <div className="flex flex-col bg-black p-4 md:flex-row md:space-x-6 md:px-0">
        <div className="flex justify-end md:hidden">
          <button className="p-2 hover:text-highlight">
            <MdClose className="text-xl" />
          </button>
        </div>
        {layoutNavigation.map((navigation, index) => (
          <Link
            key={index}
            href={navigation.href}
            className="py-4 hover:text-highlight md:p-0"
          >
            {navigation.name}
          </Link>
        ))}
        <button className="btn btn-primary mt-4 md:!hidden">Launch App</button>
      </div>
    </div>
  );
}
