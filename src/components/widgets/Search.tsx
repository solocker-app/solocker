import { MdSearch } from "react-icons/md";

export default function Search() {
  return (
    <div className="flex space-x-2 items-center bg-black px-2 rounded-md focus-within:ring-1 focus-within:ring-green-500 focus-within:text-green-500">
      <input
        className="flex-1 p-2 bg-transparent outline-none"
        placeholder="Search by token name and mint address"
      />
      <MdSearch className="text-xl" />
    </div>
  );
}
