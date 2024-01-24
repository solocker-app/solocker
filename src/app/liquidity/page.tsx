"use client";
import { useState } from "react";
import { Tab } from "@headlessui/react";

import LiquidityLock from "@/components/LiquidityLock";
import LiquidityLockAmount from "@/components/LiquidityLockAmount";

export default function LiquidityPage() {
  const [formIndex, setFormIndex] = useState(0);

  return (
    <div className="flex flex-col items-center space-y-8 px-4 md:justify-center">
      <h1 className="text-center text-highlight">
        Supply assets to earn, yield and borrow against collateral. How it works{" "}
      </h1>
      <Tab.Group
        key={formIndex}
        selectedIndex={formIndex}
        onChange={setFormIndex}
      >
        <Tab.Panels>
          <Tab.Panel>
            <LiquidityLock onSubmit={() => setFormIndex(1)} />
          </Tab.Panel>
          <Tab.Panel>
            <LiquidityLockAmount onBack={() => setFormIndex(0)} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
