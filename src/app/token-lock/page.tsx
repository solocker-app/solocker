"use client";
import { useState } from "react";
import CreateTokenLockDialog from "@/components/CreateTokenLockDialog";
import TokenEmptyState from "@/components/TokenLockEmptyState";

export default function LockedPage() {
  const [createLockTokenDialogVisible, setCreateLockTokenDialogVisible] =
    useState(false);

  return (
    <>
      <div className="flex-1 max-w-sm self-center flex flex-col">
        <header className="px-4 hidden">
          <h1 className="text-xl font-extrabold">Token Lock</h1>
        </header>
        <TokenEmptyState
          onCreateLockToken={() => setCreateLockTokenDialogVisible(true)}
        />
        <CreateTokenLockDialog
          visible={createLockTokenDialogVisible}
          setVisible={setCreateLockTokenDialogVisible}
        />
      </div>
    </>
  );
}
