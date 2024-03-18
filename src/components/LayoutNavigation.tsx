import Link from "next/link";
import { useRouter } from "next/navigation";

import { MdClose } from "react-icons/md";
import { RiArrowRightUpLine } from "react-icons/ri";

import { join } from "@/lib/utils";
import { layoutNavigation } from "@/data";
import { useLoading } from "@/composables";

type LayoutNavigationProps = {
  className?: string;
  wrapChild?: (child: React.ReactNode) => React.ReactNode;
};

export default function LayoutNavigation({
  className,
  wrapChild,
}: LayoutNavigationProps) {
  const router = useRouter();
  const { setLoading } = useLoading();

  return (
    <div
      className={join(
        "fixed inset-0 flex-1 flex flex-col shadow md:flex-1 md:static md:flex-row  md:space-y-0 md:justify-center md:items-center md:self-center lt-md:bg-black/50 z-20",
        className,
      )}
    >
      <div className="flex flex-col p-4 md:flex-row md:space-x-6 md:px-0 lt-md:bg-black">
        <div className="flex justify-end md:hidden">
          {wrapChild &&
            wrapChild(
              <button className="p-2 hover:text-highlight">
                <MdClose className="text-xl" />
              </button>,
            )}
        </div>
        {layoutNavigation.map((navigation, index) => {
          const child = (
            <Link
              key={index}
              href={navigation.href}
              target={navigation.external ? "_blank" : undefined}
              className={join(
                "flex items-center space-x-2 py-4 hover:text-highlight md:p-0",
                navigation.external ? "underline" : undefined,
                navigation.disabled ? "text-highlight" : undefined,
              )}
            >
              <p>{navigation.name}</p>
              {navigation.external && <RiArrowRightUpLine />}
            </Link>
          );

          return wrapChild ? wrapChild(child) : child;
        })}
      </div>
    </div>
  );
}
