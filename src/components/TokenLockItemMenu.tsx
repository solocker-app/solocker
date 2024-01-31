import { Menu } from "@headlessui/react";
import { MdMoreHoriz } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { FaMoneyBill, FaUnlock } from "react-icons/fa";

import {toast} from "react-toastify";

export enum TokenLockMenuAction {
  TOP_UP,
  WITHDRAW,
  CANCEL,
}

type TokenLockItemMenuProps = {
  onAction: (action: TokenLockMenuAction) => void;
};

export default function TokenLockItemMenu({
  onAction,
}: TokenLockItemMenuProps) {
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
          className="flex items-center space-x-2 p-2"
          onClick={() => {
            // onAction(TokenLockMenuAction.TOP_UP)
            toast("Topup currently not supported, create new contract instead");
          }}
        >
          <FaMoneyBill className="text-lg" />
          <span>Topup</span>
        </Menu.Item>
        <Menu.Item
          as="button"
          className="flex items-center space-x-2 p-2"
          onClick={() => onAction(TokenLockMenuAction.WITHDRAW)}
        >
          <IoIosSend className="text-lg" />
          <span>Withdraw</span>
        </Menu.Item>
        <Menu.Item
          as="button"
          className="flex items-center space-x-2 p-2"
          onClick={() => onAction(TokenLockMenuAction.CANCEL)}
        >
          <FaUnlock />
          <span>Cancel</span>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
