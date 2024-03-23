import { join } from "@/lib/utils";

type LockStatusProps = {
  status: string;
};

export default function LockStatus({ status }: LockStatusProps) {
  const colorScheme = {
    pending: "bg-amber-100 text-amber-500",
    withdrawn: "bg-green-100 text-green-500",
  };

  return (
    <div
      className={join("uppercase px-2 text-sm rounded", colorScheme[status])}
    >
      {status}
    </div>
  );
}
