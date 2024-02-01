import { MdChevronRight } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";

export default function InputDate() {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-bold">Unlock Date</label>
      <div className="flex space-2 bg-black p-4 rounded-xl">
        <div className="flex-1 flex flex-col">
          <h1 className="text-bold">Thu 1 Aug 2024 19:30</h1>
          <p className="text-sm text-highlight"> In 6 months</p>
        </div>
        <div>
          <button className="flex space-x-1 text-xl text-green-500">
            <IoMdCalendar />
            <MdChevronRight className="rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
}
