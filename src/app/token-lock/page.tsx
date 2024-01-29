"use client";
import { useState, useEffect, useContext } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import TokenLock from "@/components/TokenLock";
import TokenEmptyState from "@/components/TokenLockEmptyState";
import CreateTokenLockDialog from "@/components/CreateTokenLockDialog";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getLiquidityPoolInfos } from "@/store/slices/raydiumLpInfo";
import { streamflowSelector, getLockedTokens } from "@/store/slices/streamflow";

import { Repository } from "@/providers/Repository";

import Loading from "@/components/widgets/Loading";
import ErrorMessage from "@/components/widgets/ErrorMessage";

function LockPageRestrictToConnectedWallet() {
  const [createLockTokenDialogVisible, setCreateLockTokenDialogVisible] =
    useState(false);
  const { wallet } = useWallet();
  const dispatch = useAppDispatch();
  const { repository } = useContext(Repository);

  const streamflowState = useAppSelector((state) => state.streamFlow);
  const { loadingState } = useAppSelector((state) => state.raydiumLpInfo);

  const { loadingState: streamflowLoadingState } = streamflowState;
  const lockedTokens = streamflowSelector.selectAll(streamflowState);

  useEffect(() => {
    if (loadingState === "idle")
      dispatch(getLiquidityPoolInfos(wallet.adapter.publicKey.toBase58()))
        .unwrap()
        .then(console.log)
        .catch(console.log);
  }, [loadingState, dispatch, streamflowLoadingState]);

  useEffect(() => {
    if (streamflowLoadingState === "idle")
      dispatch(getLockedTokens(repository.streamflow.getLockedTokens()))
        .unwrap()
        .then(console.log)
        .catch(console.log);
  }, [streamflowLoadingState, dispatch]);

  return (
    <>
      <div className="flex-1 max-w-sm self-center flex flex-col space-y-4 md:max-w-full">
        <header className="px-4 hidden">
          <h1 className="text-xl font-extrabold">Token Lock</h1>
        </header>
        {streamflowLoadingState === "success" ? (
          lockedTokens.length > 0 ? (
            <TokenLock
              lockedTokens={lockedTokens}
              onCreateLockToken={() => setCreateLockTokenDialogVisible(true)}
            />
          ) : (
            <TokenEmptyState
              onCreateLockToken={() => setCreateLockTokenDialogVisible(true)}
            />
          )
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            {streamflowLoadingState === "pending" ? (
              <Loading />
            ) : (
              <ErrorMessage />
            )}
          </div>
        )}
        <CreateTokenLockDialog
          visible={createLockTokenDialogVisible}
          setVisible={setCreateLockTokenDialogVisible}
        />
      </div>
    </>
  );
}

export default function LockPage() {
  const { connected } = useWallet();

  return connected ? <LockPageRestrictToConnectedWallet /> : <div></div>;
}
