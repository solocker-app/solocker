import { MdError } from "react-icons/md";

type ErrorWidgetProps = {
  message?: string;
};

export default function ErrorWidget({ message }: ErrorWidgetProps) {
  return (
    <div className="w-full m-auto flex flex-col space-y-2 text-center px-2">
      <div className="self-center flex flex-col bg-red-50 text-red-500 w-8 h-8 rounded-full">
        <MdError className="m-auto text-xl" />
      </div>
      <div>
        <h1 className="text-lg font-bold">An unexpected error occur</h1>
        <p className="text-highlight">
          {message ??
            "Please refresh browser. If problem persist contact support."}
        </p>
      </div>
    </div>
  );
}
