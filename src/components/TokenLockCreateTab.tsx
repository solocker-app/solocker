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

import TokenLockConfirmDialog from "./TokenLockConfirmDialog";
import TokenLockCreateSelectToken from "./TokenLockCreateSelectToken";
import TokenLockCreateConfiguration from "./TokenLockCreateConfiguration";
import TokenLockInfoDialog from "./TokenLockInfoDialog";
import { createPortal } from "react-dom";

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
                  isReleased: false,
                  releaseTime: config.period,
                  amount: new BN(Number(config.amount)).mul(
                    new BN(10).pow(
                      new BN(config.token.token.tokenAmount.decimals),
                    ),
                  ),
                },
              ],
            };

            const [seed, tx] = await repository.tokenVesting.lockToken(params);

            dispatch(
              tokenVestingActions.addOne({
                contractInfo: {
                  tx,
                  seed,
                  id: seed,
                  totalAmount: new BN(config.amount).toString("hex"),
                  schedules: params.schedules,
                  mintAddress: params.mint.toBase58(),
                  destinationAddress: params.receiver.toBase58(),
                  createdAt: Date.now(),
                  type: "outgoing",
                },
                mintMetadata: config.token,
              }),
            );

            setLockedParams({
              mintMetadata: config.token,
              contractInfo: {
                tx,
                seed,
                id: seed,
                type: "outgoing",
                createdAt: Date.now(),
                schedules: params.schedules,
                mintAddress: params.mint.toBase58(),
                destinationAddress: params.receiver.toBase58(),
                totalAmount: new BN(config.amount).toString("hex"),
              },
            });
          }}
        />
      )}
      {lockParams && (
        <TokenLockInfoDialog
          tx={lockParams.contractInfo.tx}
          contractInfo={lockParams.contractInfo}
          digitalAsset={lockParams.mintMetadata}
          onClose={() => setLockedParams(null)}
        />
      )}
    </>
  );
}
