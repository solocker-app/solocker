type LockInfoProps = {
  title: string;
} & React.PropsWithChildren;

export default function LockInfo({ title, children }: LockInfoProps) {
  return (
    <div className="flex flex-col space-y-1 bg-stone-100 p-4 rounded-md">
      <p className="text-xs">{title}</p>
      <div className="flex space-x-1 text-xl">{children}</div>
    </div>
  );
}
