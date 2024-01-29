import { MdError } from "react-icons/md";

export default function ErrorMessage() {
  return (
    <div className="flex flex-col space-y-4 items-center justify-center text-center">
      <div className="w-8 h-8 flex items-center justify-center bg-red-200 text-red-500 rounded-full">
        <MdError className="m-auto text-xl" />
      </div>
      <div>
        <h1 className="text-lg font-medium">Failed to fetch</h1>
        <p className="text-highlight">
          An unexpected error occur, Please refresh browser.
        </p>
      </div>
    </div>
  );
}
