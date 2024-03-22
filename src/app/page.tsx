"use client";
import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { useWallet } from "@solana/wallet-adapter-react";

import { join } from "@/lib/utils";

import TokenLockEditTab from "@/components/TokenLockEditTab";
import TokenLockCreateTab from "@/components/TokenLockCreateTab";
import TokenLockConnectWallet from "@/components/TokenLockConnectWallet";
import { useInitializeTokenLock } from "@/composables/useInitializeTokenLock";
import TokenLockInfo from "@/components/TokenLockInfoDialog";

function AuthorizedUserOnlyPage() {
  const { lpInfos, lockedTokens } = useInitializeTokenLock();

  return (
    <Tab.Group
      as="div"
      className="flex-1 flex flex-col space-y-4 px-2 py-4 md:p-8 md:w-2xl md:self-center xl:w-4xl"
    >
      <Tab.List className="flex space-x-2 bg-dark/50 rounded-md py-2">
        <Tab
          className={({ selected }) =>
            join(
              "btn",
              selected ? "text-secondary p-2 !outline-none" : undefined,
            )
          }
        >
          New Lock
        </Tab>
        <Tab
          className={({ selected }) =>
            join(
              "btn",
              selected ? "text-secondary p-2 !outline-none" : undefined,
            )
          }
        >
          Withdraw
        </Tab>
      </Tab.List>
      <Tab.Panels as={Fragment}>
        <Tab.Panel as={Fragment}>
          <TokenLockCreateTab lpInfos={lpInfos} />
        </Tab.Panel>
        <Tab.Panel as={Fragment}>
          <TokenLockEditTab />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export default function TokenLockPage() {
  const { connected } = useWallet();

  return connected ? <AuthorizedUserOnlyPage /> : <TokenLockConnectWallet />;
}
