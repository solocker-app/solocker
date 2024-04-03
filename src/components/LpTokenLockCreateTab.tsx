import BN from "bn.js";

import { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import { PublicKey } from "@solana/web3.js";
import { safeBN, unsafeBN } from "@solocker/safe-bn";

import { useRepository } from "@/composables";

import type { LockToken } from "@/lib/token-vest";
import type { Config } from "@/lib/models/config.model";
import type { LpInfo } from "@/lib/api/models/raydium.model";
import { lpSolanaTokenFee, lpTokenFeePercentatge } from "@/lib/utils";
import type { LpTokenVesting } from "@/lib/api/models/tokenVesting.model";

import { useAppDispatch } from "@/store/hooks";
import { lpTokenVestingActions } from "@/store/slices/lpTokenVesting";

import TokenLockInfoDialog from "./LpTokenLockInfoDialog";
import TokenLockConfirmDialog from "./LpTokenLockConfirmDialog";
import TokenLockCreateSelectToken from "./LpTokenLockCreateSelectToken";
import TokenLockCreateConfiguration from "./LpTokenLockCreateConfiguration";

type TokenLockCreateTabProps = {
  lpInfos: LpInfo[];
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
  const [lockedParams, setLockedParams] = useState<LpTokenVesting>();
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);

  return (
    <>
      <Tab.Group
        as="div"
        key={formIndex}
        selectedIndex={formIndex}
        className="flex-1 flex flex-col"
      >
        <Tab.Panels as={Fragment}>
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
      {confirmDialogVisible && (
        <TokenLockConfirmDialog
          tokenLock={config as unknown as Config}
          visible={confirmDialogVisible}
          setVisible={setConfirmDialogVisible}
          onCreateLockContract={async (config) => {
            const amount = unsafeBN(
              safeBN(config.amount).mul(
                new BN(10).pow(new BN(config.token.lpTokenDecimal)),
              ),
            );

            const params: LockToken = {
              mint: new PublicKey(config.token.lpTokenMetadata.mint),
              receiver: new PublicKey(config.recipient),
              schedules: [
                {
                  amount,
                  isReleased: false,
                  releaseTime: config.period,
                },
              ],
              solanaFee: lpSolanaTokenFee,
              tokenFeePercentage: lpTokenFeePercentatge,
            };

            const [seed, tx, totalAmount] =
              await repository.tokenVesting.lockToken(params);

            const lpTokenVesting: LpTokenVesting = {
              contractInfo: {
                tx,
                seed,
                id: seed,
                type: "outgoing",
                totalAmount: totalAmount.toString("hex"),
                schedules: params.schedules.map((schedule: any) => {
                  schedule.amount = schedule.amount.toString("hex");
                  return schedule;
                }),
                mintAddress: params.mint.toBase58(),
                destinationAddress: params.receiver.toBase58(),
                createdAt: new BN(Date.now() / 1000).toString("hex"),
              },
              lpInfo: config.token,
            };

            dispatch(lpTokenVestingActions.addOne(lpTokenVesting));

            setLockedParams(lpTokenVesting);
          }}
        />
      )}
      {lockedParams && (
        <TokenLockInfoDialog
          {...lockedParams}
          onClose={() => {
            setLockedParams(null);
            setConfirmDialogVisible(false);
            setConfig({
              period: config.period,
            });
          }}
        />
      )}
    </>
  );
}
