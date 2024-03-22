import * as Sentry from "@sentry/nextjs";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { ContractInfo } from "@bonfida/token-vesting";

import { LoadingState } from "@/store/types";
import { useLpLockInfo, useRepository } from "@/composables";

import Loading from "./widgets/Loading";
import ErrorWidget from "./widgets/ErrorWidget";
import LockInfoList from "./abstract/LockInfoList";
import { isPublicKey } from "@/lib/utils";

type NetworkLockInfoProps = {
  seed: string;
};

export default function NetworkLockInfo({ seed }: NetworkLockInfoProps) {
  const { repository } = useRepository();
  const [loadingState, setLoadingState] =
    useState<LoadingState["loadingState"]>("idle");

  const [contractInfo, setContractInfo] = useState<ContractInfo>();
  const { lpInfo, error } = useLpLockInfo(contractInfo?.mintAddress.toBase58());

  const getContractInfo = useCallback(
    function <T extends (value: string) => Promise<ContractInfo>>(
      fetchAction: T,
    ) {
      setLoadingState("pending");

      return fetchAction(seed)
        .then((contract) => {
          setContractInfo(contract);
          setLoadingState("success");
        })
        .catch((error) => {
          Sentry.captureException(error);
          setLoadingState("failed");
        });
    },
    [seed],
  );

  useEffect(() => {
    getContractInfo(
      isPublicKey(seed)
        ? repository.tokenVesting.getLockedTokenByTokenVestingAddress.bind(
            repository.tokenVesting,
          )
        : repository.tokenVesting.getLockedTokenBySeed.bind(
            repository.tokenVesting,
          ),
    );
  }, [seed]);

  useEffect(() => {
    if (error) setLoadingState("failed");
  }, [error]);

  switch (loadingState) {
    case "success":
      return lpInfo ? (
        <>
          <div className="flex-1 flex flex-col">
            <LockInfoList
              lpInfo={lpInfo}
              contractInfo={contractInfo}
            />
          </div>
          <div className="flex flex-col">
            <button
              className="btn btn-primary"
              onClick={() => {
                toast.promise(
                  repository.tokenVesting.unlockToken(
                    seed,
                    contractInfo.mintAddress,
                  ),
                  {
                    success: "Lp Token unlocked successfully",
                    error: "Lp Token unlock failed, Try again!",
                    pending: "Lp Token unlocking...",
                  },
                );
              }}
            >
              Unlock
            </button>
          </div>
        </>
      ) : (
        <Loading />
      );
    case "idle":
    case "pending":
      return <Loading />;
    case "failed":
      return <ErrorWidget message="Error loading contract try again!" />;
  }
}
