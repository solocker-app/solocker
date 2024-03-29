import BN from "bn.js";

import { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import { PublicKey } from "@solana/web3.js";

import { useRepository } from "@/composables";

import { Config } from "@/lib/models/config.model";
import { LpInfo } from "@/lib/api/models/raydium.model";

import { useAppDispatch } from "@/store/hooks";
import { lpTokenVestingActions } from "@/store/slices/lpTokenVesting";

import TokenLockInfoDialog from "./LpTokenLockInfoDialog";
import TokenLockConfirmDialog from "./LpTokenLockConfirmDialog";
import TokenLockCreateSelectToken from "./LpTokenLockCreateSelectToken";
import TokenLockCreateConfiguration from "./LpTokenLockCreateConfiguration";

type TokenLockCreateTabProps = {
  lpInfos: LpInfo[];
};

type LockedParams = {
  seed: string;
  tx: string;
  lpInfo: LpInfo;
  contractInfo: any;
};

export default function LpTokenLockCreateTab({
  lpInfos,
}: TokenLockCreateTabProps) {
  const dispatch = useAppDispatch();
  const { repository } = useRepository();

  const [formIndex, setFormIndex] = useState(0);
  const [config, setConfig] = useState<Partial<Config>>({
    period: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  });
  const [lockedParams, setLockedParams] = useState<LockedParams>();
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);

  return (
    <>
      <Tab.Group
        as="div"
        key={formIndex}
        selectedIndex={formIndex}
        className="flex-1 max-h-xl flex flex-col space-y-8"
      >
        <Tab.Panels>
          <Tab.Panel as={Fragment}>
            <TokenLockCreateSelectToken
              lpInfos={lpInfos}
              value={config.token}
              onSelect={(value) => {
                setConfig((config) => {
                  config.token = value;

                  return config;
                });

                setFormIndex(1);
              }}
            />
          </Tab.Panel>
          <Tab.Panel as={Fragment}>
            <TokenLockCreateConfiguration
              value={config}
              setValue={(value) => {
                setConfig((config) => {
                  return Object.assign(config, value);
                });
                setConfirmDialogVisible(true);
              }}
              onBack={() => setFormIndex(0)}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {!!config.token &&
        !!config.amount &&
        !!config.recipient &&
        !!config.period && (
          <TokenLockConfirmDialog
            tokenLock={config as unknown as Config}
            visible={confirmDialogVisible}
            setVisible={setConfirmDialogVisible}
            onCreateLockContract={async (config) => {
              const params = {
                mint: new PublicKey(config.token.lpTokenMetadata.mint),
                receiver: new PublicKey(config.recipient),
                schedules: [
                  {
                    period: config.period,
                    amount: new BN(config.amount).mul(
                      new BN(10).pow(new BN(config.token.lpTokenDecimal)),
                    ),
                  },
                ],
              };

              const [seed, tx] =
                await repository.tokenVesting.lockToken(params);

              dispatch(
                lpTokenVestingActions.addOne({
                  seed,
                  contractInfo: {
                    tx,
                    seed,
                    id: seed,
                    schedules: params.schedules,
                    mintAddress: params.mint.toBase58(),
                    destinationAddress: params.receiver.toBase58(),
                    unlocked: false,
                    createdAt: Date.now(),
                    type: "outgoing",
                  },
                  lpInfo: config.token,
                }),
              );

              setLockedParams({
                tx,
                seed,
                lpInfo: config.token,
                contractInfo: {
                  schedules: params.schedules,
                  destinationAddress: params.receiver,
                  mintAddress: params.mint,
                },
              });
            }}
          />
        )}
      {lockedParams && (
        <TokenLockInfoDialog
          {...lockedParams}
          onClose={() => setLockedParams(null)}
        />
      )}
    </>
  );
}
