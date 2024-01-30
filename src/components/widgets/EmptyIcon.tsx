import { MdQuestionMark } from "react-icons/md";
import { join } from "@/lib/utils";

type EmptyIconProps = {
  className?: string;
};

export default function EmptyIcon({ className }: EmptyIconProps) {
  return (
    <div
      className={join(
        "w-6 h-6 flex items-center justify-center bg-highlight/50 text-black rounded-full",
        className,
      )}
    >
      <MdQuestionMark className="text-lg" />
    </div>
  );
}
