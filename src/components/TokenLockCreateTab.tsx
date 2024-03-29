import BN from "bn.js";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import { PublicKey } from "@solana/web3.js";

import { TokenConfig } from "@/lib/models/config.model";

import { useRepository } from "@/composables";
import type { DigitalAssetWithJsonMetadata } from "@/lib/api/metaplex";

import TokenLockCreateSelectToken from "./TokenLockCreateSelectToken";
import TokenLockCreateConfiguration from "./TokenLockCreateConfiguration";
import TokenLockConfirmDialog from "./TokenLockConfirmDialog";

type TokenLockCreateTabProps = {
  digitalAssets: DigitalAssetWithJsonMetadata[];
};

export default function TokenLockCreateTab({
  digitalAssets,
}: TokenLockCreateTabProps) {
  const { repository } = useRepository();
  const [config, setConfig] = useState<Partial<TokenConfig>>({
    period: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);

  return (
    <>
      <Tab.Group
        as="div"
        key={selectedIndex}
        selectedIndex={selectedIndex}
        className="flex-1 max-h-2xl flex flex-col space-y-8 bg-dark/50 rounded-xl overflow-y-scroll"
      >
        <Tab.Panels>
          <Tab.Panel>
            <TokenLockCreateSelectToken
              digitalAssets={digitalAssets}
              onSelect={(token) =>
                setConfig((config) => {
                  config.token = token;
                  setSelectedIndex(1);
                  return config;
                })
              }
            />
          </Tab.Panel>
          <Tab.Panel>
            <TokenLockCreateConfiguration
              value={config}
              setValue={(value) => {
                setConfig((config) => {
                  setTimeout(() => setConfirmDialogVisible(true));
                  return Object.assign(config, value);
                });
              }}
              onBack={() => setSelectedIndex(0)}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {confirmDialogVisible && (
        <TokenLockConfirmDialog
          tokenLock={config as unknown as TokenConfig}
          visible={confirmDialogVisible}
          setVisible={setConfirmDialogVisible}
          onCreateLockContract={async (config) => {
            const params = {
              mint: new PublicKey(config.token.mint),
              receiver: new PublicKey(config.recipient),
              schedules: [
                {
                  period: config.period,
                  amount: new BN(Number(config.amount)).mul(
                    new BN(10).pow(
                      new BN(config.token.token.tokenAmount.decimals),
                    ),
                  ),
                },
              ],
            };

            const [seed, tx] = await repository.tokenVesting.lockToken(params);

            // dispatch(
            //   tokenVestingActions.addOne({
            //     seed,
            //     contractInfo: {
            //       tx,
            //       seed,
            //       id: seed,
            //       schedules: params.schedules,
            //       mintAddress: params.mint.toBase58(),
            //       destinationAddress: params.receiver.toBase58(),
            //       unlocked: false,
            //       createdAt: Date.now(),
            //       type: "outgoing",
            //     },
            //     lpInfo: config.token,
            //   }),
            // );

            // setLockedParams({
            //   tx,
            //   seed,
            //   lpInfo: config.token,
            //   contractInfo: {
            //     schedules: params.schedules,
            //     destinationAddress: params.receiver,
            //     mintAddress: params.mint,
            //   },
            // });
          }}
        />
      )}
    </>
  );
}
