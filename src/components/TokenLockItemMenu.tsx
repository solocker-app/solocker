import { Menu } from "@headlessui/react";
import { MdMoreHoriz } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { FaMoneyBill, FaUnlock } from "react-icons/fa";

import { Types } from "@streamflow/stream";

type TokenLockItemMenuProps = {
  stream: Types.Stream;
};

export default function TokenLockItemMenu({ stream }: TokenLockItemMenuProps) {
  return (
    <Menu
      as="div"
      className="relative"
    >
      <Menu.Button className="bg-container p-2 rounded-md">
        <MdMoreHoriz />
      </Menu.Button>
      <Menu.Items className="absolute -bottom-17 w-32 flex flex-col bg-container rounded-sm">
        <Menu.Item
          as="button"
          className="flex items-center space-x-2"
        >
          <FaMoneyBill className="text-lg" />
          <span>Topup</span>
        </Menu.Item>
        <Menu.Item
          as="button"
          className="flex items-center space-x-2"
        >
          <IoIosSend className="text-lg" />
          <span>Transfer</span>
        </Menu.Item>
        <Menu.Item
          as="button"
          className="flex items-center space-x-2"
        >
          <FaUnlock />
          <span>Cancel</span>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
