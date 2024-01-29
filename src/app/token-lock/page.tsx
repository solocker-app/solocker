"use client";
import { useState, useEffect, useContext } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import TokenLock from "@/components/TokenLock";
import TokenEmptyState from "@/components/TokenLockEmptyState";
import CreateTokenLockDialog from "@/components/CreateTokenLockDialog";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getDigitalAssets } from "@/store/slices/raydiumLpAsset";

import { Repository } from "@/providers/Repository";
import { DigitalAsset } from "@/providers/DigitalAsset";

function LockPageRestrictToConnectedWallet() {
  const [createLockTokenDialogVisible, setCreateLockTokenDialogVisible] =
    useState(false);
  const dispatch = useAppDispatch();
  const { repository } = useContext(Repository);
  const { value: digitalAssets } = useContext(DigitalAsset);
  const { loadingState } = useAppSelector((state) => state.raydiumAsset);

  useEffect(() => {
    if (loadingState === "idle")
      dispatch(
        getDigitalAssets(
          repository.raydium.getLiquidityPoolInfos(digitalAssets)
        )
      )
        .unwrap()
        .then(console.log)
        .catch(console.log);
  }, [loadingState, dispatch]);

  return (
    <>
      <div className="flex-1 max-w-sm self-center flex flex-col space-y-4 md:max-w-full">
        <header className="px-4 hidden">
          <h1 className="text-xl font-extrabold">Token Lock</h1>
        </header>
        {true ? (
          <TokenLock />
        ) : (
          <TokenEmptyState
            onCreateLockToken={() => setCreateLockTokenDialogVisible(true)}
          />
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
