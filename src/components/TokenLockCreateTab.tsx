import { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";

import { LpInfo } from "@/lib/api/models/raydium.model";
import TokenLockCreateSelectToken from "./TokenLockCreateSelectToken";
import TokenLockCreateConfiguration from "./TokenLockCreateConfiguration";

type TokenLockCreateTabProps = {
  lpInfos: LpInfo[];
};

export default function TokenLockCreateTab({
  lpInfos,
}: TokenLockCreateTabProps) {
  const [lpInfo, setLpInfo] = useState<LpInfo>();

  return (
    <Tab.Group
      as="div"
      selectedIndex={1}
      className="flex flex-col space-y-8 bg-dark/50 p-4 rounded-xl"
    >
      <Tab.Panels>
        <Tab.Panel as={Fragment}>
          <TokenLockCreateSelectToken
            lpInfos={lpInfos}
            value={lpInfo}
            onSelect={setLpInfo}
          />
        </Tab.Panel>
        <Tab.Panel as={Fragment}>
          <TokenLockCreateConfiguration />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

