"use client";

import { useState } from "react";

import { join } from "@/lib/utils";

import Select from "./widgets/Select";

type CoinItemProps = {
  coin: any;
  className?: string;
};

function CoinItem({ className, coin }: CoinItemProps) {
  return (
    <div className={join("flex items-center space-x-2", className)}>
      <img
        src="/assets/coins/solana.png"
        className="w-6 h-6 rounded-full"
      />
      <p className="text-highlight">SOL</p>
    </div>
  );
}

export default function DefaultCoinSelect() {
  const [coin, setCoin] = useState(null);

  return (
    <Select
      value={coin}
      onSelect={setCoin}
      values={[null, null, null]}
      prefixChild={(coin) => <CoinItem coin={coin} />}
      itemChild={(coin) => (
        <CoinItem
          coin={coin}
          className="p-4"
        />
      )}
    />
  );
}
