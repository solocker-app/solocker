"use client";

import { Tab } from "@headlessui/react";
import TokenLockEditTab from "@/components/TokenLockEditTab";
import TokenLockCreateTab from "@/components/TokenLockCreateTab";
import { join } from "@/lib/utils";

export default function TokenLockPage() {
  return (
    <Tab.Group
      as="div"
      className="flex-1 flex flex-col space-y-4 p-8 md:w-2xl md:self-center"
    >
      <Tab.List className="flex space-x-2 bg-dark/50 rounded-xl md:rounded-full">
        <Tab
          className={({ selected }) =>
            join("btn", selected ? "text-green-500" : undefined)
          }
        >
          <p>New Lock</p>
        </Tab>
        <Tab
          className={({ selected }) =>
            join("btn", selected ? "text-green-500" : undefined)
          }
        >
          <p>Edit/Withdraw</p>
        </Tab>
      </Tab.List>
      <Tab.Panels className="flex-1 flex flex-col">
        <Tab.Panel className="flex-1 flex flex-col">
          <TokenLockCreateTab />
        </Tab.Panel>
        <Tab.Panel className="flex-1 flex flex-col">
          <TokenLockEditTab />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
