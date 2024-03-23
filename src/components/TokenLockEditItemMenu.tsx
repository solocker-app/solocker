import { Menu } from "@headlessui/react";
import { toast } from "react-toastify";
import { IoIosSend } from "react-icons/io";
import { MdMoreHoriz, MdPageview } from "react-icons/md";
import { FaMoneyBill, FaUnlock } from "react-icons/fa";

export enum TokenLockEditMenuAction {
  TOP_UP,
  WITHDRAW,
  CANCEL,
  VIEW,
  SHARE,
}

type TokenLockItemMenuProps = {
  onAction: (action: TokenLockEditMenuAction) => void;
};

export default function TokenLockIEditItemMenu({
  onAction,
}: TokenLockItemMenuProps) {
  return (
    <Menu
      as="div"
      className="relative"
    >
      <Menu.Button className="bg-black/70 p-2 rounded-md">
        <MdMoreHoriz />
      </Menu.Button>
      <Menu.Items className="absolute -bottom-17 w-32 flex flex-col bg-black/70 rounded-sm">
        <Menu.Item
          as="button"
          className="flex items-center space-x-2 p-2"
          onClick={() => {
            // onAction(TokenLockEditMenuAction.TOP_UP)
            toast("Topup currently not supported, create new contract instead");
          }}
        >
          <FaMoneyBill className="text-lg" />
          <span>Topup</span>
        </Menu.Item>
        <Menu.Item
          as="button"
          className="flex items-center space-x-2 p-2"
          onClick={() => {
            onAction(TokenLockEditMenuAction.VIEW);
          }}
        >
          <MdPageview className="text-lg" />
          <span>View</span>
        </Menu.Item>
        <Menu.Item
          as="button"
          className="flex items-center space-x-2 p-2"
          onClick={() => onAction(TokenLockEditMenuAction.SHARE)}
        >
          <IoIosSend className="text-lg" />
          <span>Share</span>
        </Menu.Item>

        <Menu.Item
          as="button"
          className="flex items-center space-x-2 p-2"
          onClick={() => onAction(TokenLockEditMenuAction.CANCEL)}
        >
          <FaUnlock />
          <span>Cancel</span>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
