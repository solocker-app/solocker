import BN from "bn.js";
import * as Sentry from "@sentry/nextjs";

import { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import { PublicKey } from "@solana/web3.js";
import { ContractInfo, Numberu64, Schedule } from "@bonfida/token-vesting";

import { Config } from "@/lib/models/config.model";
import { LpInfo } from "@/lib/api/models/raydium.model";
import { useRepository } from "@/composables";

import TokenLockInfoDialog from "./TokenLockInfoDialog";
import TokenLockConfirmDialog from "./TokenLockConfirmDialog";
import TokenLockCreateSelectToken from "./TokenLockCreateSelectToken";
import TokenLockCreateConfiguration from "./TokenLockCreateConfiguration";

type TokenLockCreateTabProps = {
  lpInfos: LpInfo[];
};

type LockedParams = {
  seed: string;
  tx: string;
  lpInfo: LpInfo;
  contractInfo: any;
};

export default function TokenLockCreateTab({
  lpInfos,
}: TokenLockCreateTabProps) {
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
        className="flex flex-col space-y-8 bg-dark/50 rounded-xl"
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
