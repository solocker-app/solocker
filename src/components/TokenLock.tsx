import Image from "next/image";
import { MdSearch, MdAdd, MdLockOutline, MdMoreHoriz } from "react-icons/md";

import LockStatus from "./widgets/LockStatus";
import TokenLockListItem from "./TokenLockListItem";

type TokenLockProps = {
  onCreateLock: () => void;
};

export default function TokenLock({ onCreateLock }: TokenLockProps) {
  return (
    <div className="flex-1 flex flex-col space-y-8">
      <header className="flex items-center px-4">
        <div className="flex items-center space-x-2 bg-container px-2 rounded-md">
          <MdSearch className="text-lg" />
          <input
            className="py-2"
            placeholder="Search for Locked Liquidity By Token"
          />
        </div>
        <div className="flex-1 flex items-center justify-end">
          <button
            className="btn btn-secondary !px-4 !rounded-md"
            onClick={onCreateLock}
          >
            <MdAdd className="text-lg" />
            <span>Create New</span>
          </button>
        </div>
      </header>
      <div className="flex-1 table-container">
        <table>
          <tr>
            <td>&nbsp;</td>
            <td>Liquidity Pool</td>
            <td>Locked liquidity</td>
            <td>Unlock date</td>
            <td>Status</td>
            <td></td>
          </tr>
          <TokenLockListItem />
        </table>
      </div>
    </div>
  );
}
