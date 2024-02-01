import { Fragment } from "react";
import { Tab } from "@headlessui/react";

import TokenLockCreateSelectToken from "./TokenLockCreateSelectToken";
import TokenLockCreateConfiguration from "./TokenLockCreateConfiguration";

export default function TokenLockerCreateTab() {
  return (
    <Tab.Group
      as="div"
      selectedIndex={1}
      className="flex flex-col space-y-8 bg-dark/50 p-4 rounded-xl"
    >
      <Tab.Panels>
        <Tab.Panel as={Fragment}>
          <TokenLockCreateSelectToken />
        </Tab.Panel>
        <Tab.Panel as={Fragment}>
          <TokenLockCreateConfiguration />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
