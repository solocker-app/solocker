type LockInfoProps = {
  title: string;
} & React.PropsWithChildren;

export default function LockInfo({ title, children }: LockInfoProps) {
  return (
    <div className="flex flex-col space-y-1 bg-black p-4 rounded-md">
      <p className="text-xs">{title}</p>
      <div className="flex text-xl">{children}</div>
    </div>
  );
}
