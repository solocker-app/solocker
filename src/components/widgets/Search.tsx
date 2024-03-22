import { useRef } from "react";
import { MdSearch } from "react-icons/md";

type SearchProps = {
  placeholder?: string;
  minLength?: number;
  onChange: (value: string | null) => void;
};

export default function Search({
  placeholder,
  minLength,
  onChange,
}: SearchProps) {
  const timer = useRef<number>();

  return (
    <div className="flex space-x-2 items-center bg-black px-2 rounded-md focus-within:ring-1 focus-within:ring-secondary focus-within:text-secondary">
      <input
        className="flex-1 p-2 bg-transparent outline-none"
        placeholder={placeholder ?? "Search by token name and mint address"}
        onKeyUp={(event) => {
          timer.current = window.setTimeout(() => {
            const value = (event.target as HTMLInputElement).value;
            if (value.trim().length > (minLength ?? 16)) onChange(value);
            else onChange(null);
          }, 500);
        }}
      />
      <MdSearch className="text-xl" />
    </div>
  );
}
