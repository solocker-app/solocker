import BN from "bn.js";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import { PublicKey } from "@solana/web3.js";

import { TokenConfig } from "@/lib/models/config.model";
import type { DigitalAssetWithJsonMetadata } from "@/lib/api/metaplex";
import type { TokenVesting } from "@/lib/api/models/tokenVesting.model";

import { useRepository } from "@/composables";

import { useAppDispatch } from "@/store/hooks";
import { tokenVestingActions } from "@/store/slices/tokenVesting";

import TokenLockInfoDialog from "./TokenLockInfoDialog";
import TokenLockConfirmDialog from "./TokenLockConfirmDialog";
import TokenLockCreateSelectToken from "./TokenLockCreateSelectToken";
import TokenLockCreateConfiguration from "./TokenLockCreateConfiguration";

type TokenLockCreateTabProps = {
  digitalAssets: DigitalAssetWithJsonMetadata[];
};

export default function TokenLockCreateTab({
  digitalAssets,
}: TokenLockCreateTabProps) {
  const dispatch = useAppDispatch();
  const { repository } = useRepository();
  const [config, setConfig] = useState<Partial<TokenConfig>>({
    period: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lockParams, setLockedParams] = useState<TokenVesting>(null);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);

  return (
    <>
      <Tab.Group
        as="div"
        key={selectedIndex}
        selectedIndex={selectedIndex}
        className="flex-1 flex flex-col"
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
              onBack={() => {
                setSelectedIndex(0);
                setConfig({
                  period: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
                });
              }}
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
            const amount =
              Number(config.amount) *
              Math.pow(10, config.token.token.tokenAmount.decimals);

            const params = {
              isNative: config.token.token.isNative,
              mint: new PublicKey(config.token.mint),
              receiver: new PublicKey(config.recipient),
              schedules: [
                {
                  isReleased: false,
                  releaseTime: config.period,
                  amount,
                },
              ],
            };

            const [seed, tx, totalAmount] =
              await repository.tokenVesting.lockToken(params);

            const tokenVesting: TokenVesting = {
              mintMetadata: config.token,
              contractInfo: {
                tx,
                seed,
                id: seed,
                type: "outgoing",
                totalAmount: totalAmount.toString("hex"),
                schedules: params.schedules.map((schedule: any) => {
                  schedule.amount = new BN(schedule.amount).toString();
                  return schedule;
                }),
                mintAddress: params.mint.toBase58(),
                destinationAddress: params.receiver.toBase58(),
                createdAt: new BN(Date.now() / 1000).toString("hex"),
              },
            };

            setLockedParams(tokenVesting);
            dispatch(tokenVestingActions.addOne(tokenVesting));
          }}
        />
      )}
      {lockParams && (
        <TokenLockInfoDialog
          tx={lockParams.contractInfo.tx}
          contractInfo={lockParams.contractInfo}
          digitalAsset={lockParams.mintMetadata}
          onClose={() => {
            setLockedParams(null);
            setConfirmDialogVisible(false);
          }}
        />
      )}
    </>
  );
}
