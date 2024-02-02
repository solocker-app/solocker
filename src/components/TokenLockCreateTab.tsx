import { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";

import { Config } from "@/lib/models/config.model";
import { LpInfo } from "@/lib/api/models/raydium.model";
import { hasNull } from "@/lib/utils/object";
import { useRepository } from "@/composables";

import { useAppDispatch } from "@/store/hooks";
import { streamflowAction } from "@/store/slices/streamflow";

import TokenLockConfirmDialog from "./TokenLockConfirmDialog";
import TokenLockCreateSelectToken from "./TokenLockCreateSelectToken";
import TokenLockCreateConfiguration from "./TokenLockCreateConfiguration";

type TokenLockCreateTabProps = {
  lpInfos: LpInfo[];
};

export default function TokenLockCreateTab({
  lpInfos,
}: TokenLockCreateTabProps) {
  const [formIndex, setFormIndex] = useState(0);
  const [config, setConfig] = useState<Partial<Config>>({});
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { repository } = useRepository();

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
      {config.token && config.amount && config.recipient && config.period && (
        <TokenLockConfirmDialog
          tokenLock={config as unknown as Config}
          visible={confirmDialogVisible}
          setVisible={setConfirmDialogVisible}
          onCreateLockContract={async (config) => {
              const { metadataId } = await repository.streamflow.lockToken(config);
              /// Ignore error from fetching metadata
              repository.streamflow.getLockToken(metadataId)
              .then(response => dispatch(streamflowAction.addOne(response)));
            }
          }
        />
      )}
    </>
  );
}
