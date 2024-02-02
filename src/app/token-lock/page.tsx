"use client";
import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { useWallet } from "@solana/wallet-adapter-react";

import { join } from "@/lib/utils";

import TokenLockEditTab from "@/components/TokenLockEditTab";
import TokenLockCreateTab from "@/components/TokenLockCreateTab";
import TokenLockConnectWallet from "@/components/TokenLockConnectWallet";
import { useInitializeTokenLock } from "@/composables/useInitializeTokenLock";

function AuthorizedUserOnlyPage() {
  const { lpInfos, lockedTokens } = useInitializeTokenLock();

  return (
    <Tab.Group
      as="div"
      className="flex-1 flex flex-col space-y-4 px-2 py-4 md:p-8 md:w-2xl md:self-center"
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
          <TokenLockEditTab lockedTokens={lockedTokens} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export default function TokenLockPage() {
  const { connected } = useWallet();

  return connected ? <AuthorizedUserOnlyPage /> : <TokenLockConnectWallet />;
}
