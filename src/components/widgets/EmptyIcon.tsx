import { MdArrowDropDown, MdSearch, MdQuestionMark } from "react-icons/md";
import { join } from "@/lib/utils";

type EmptyIconProps = {
  className?: string;
};

export default function EmptyIcon({ className }: EmptyIconProps) {
  const mClassName = className ?? "w-6 h-6";

  return (
    <div
      className={join(
        "flex items-center justify-center bg-highlight/50 text-black rounded-full",
        mClassName
      )}
    >
      <MdQuestionMark className="text-lg" />
    </div>
  );
}
