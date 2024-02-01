"use client";
import { Fragment } from "react";
import { Tab } from "@headlessui/react";

import { join } from "@/lib/utils";

import TokenLockEditTab from "@/components/TokenLockEditTab";
import TokenLockCreateTab from "@/components/TokenLockCreateTab";
import { useInitializeTokenLock } from "@/composables/useInitializeTokenLock";

export default function TokenLockPage() {
  const {
    lpInfos,
    lockedTokens,
    raydiumLpInfoLoadingState,
    streamflowLoadingState,
  } = useInitializeTokenLock();

  return (
    <Tab.Group
      as="div"
      className="flex-1 flex flex-col space-y-4 p-4 md:p-8 md:w-2xl md:self-center"
    >
      <Tab.List className="flex space-x-2 bg-dark/50 rounded-xl md:rounded-full">
        <Tab
          className={({ selected }) =>
            join("btn", selected ? "text-green-500" : undefined)
          }
        >
          New Lock
        </Tab>
        <Tab
          className={({ selected }) =>
            join("btn", selected ? "text-green-500" : undefined)
          }
        >
          Edit/Withdraw
        </Tab>
      </Tab.List>
      <Tab.Panels as={Fragment}>
        <Tab.Panel as={Fragment}>
          <TokenLockCreateTab lpInfos={lpInfos} />
        </Tab.Panel>
        <Tab.Panel as={Fragment}>
          <TokenLockEditTab lockedTokens={loadedTokens} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
