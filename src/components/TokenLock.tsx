import { useState } from "react";
import { MdSearch, MdAdd } from "react-icons/md";

import StreamFlow from "@/lib/streamflow";
import { Types } from "@streamflow/stream";

import { LpInfo } from "@/lib/api/models/raydium.model";

import TokenLockListItem from "./TokenLockListItem";
import { TokenLockMenuAction } from "./TokenLockItemMenu";
import TokenLockCancelDialog from "./TokenLockCancelDialog";
import TokenLockUnlockDialog from "./TokenLockUnlockDialog";

type TokenLockProps = {
  lockedTokens: Awaited<ReturnType<StreamFlow["getLockedTokens"]>>;
  onCreateLockToken: () => void;
};

export default function TokenLock({
  lockedTokens,
  onCreateLockToken,
}: TokenLockProps) {
  const [action, setAction] = useState<TokenLockMenuAction>();
  const [stream, setStream] = useState<[string, Types.Stream, LpInfo]>();

  return (
    <div className="flex-1 flex flex-col space-y-8">
      <header className="flex items-center px-4">
        <div className="flex items-center space-x-2 bg-container px-2 rounded-md">
          <MdSearch className="text-lg" />
          <input
            className="py-2"
            placeholder="Search for Locked Liquidity By Token"
          />
        </div>
        <div className="flex-1 flex items-center justify-end">
          <button
            className="btn btn-secondary !px-4 !rounded-md"
            onClick={onCreateLockToken}
          >
            <MdAdd className="text-lg" />
            <span>Create New</span>
          </button>
        </div>
      </header>
      <div className="flex-1 table-container">
        <table>
          <tr>
            <td>&nbsp;</td>
            <td>Liquidity Pool</td>
            <td>Locked liquidity</td>
            <td>Unlock date</td>
            <td>Status</td>
            <td></td>
          </tr>
          {lockedTokens.map((lockedToken, index) => (
            <TokenLockListItem
              key={index}
              lockedToken={lockedToken}
              onAction={(type, stream) => {
                setAction(type);
                setStream(stream);
              }}
            />
          ))}
        </table>
      </div>
      {action === TokenLockMenuAction.CANCEL && stream && (
        <TokenLockCancelDialog
          stream={stream}
          setVisible={() => {
            setAction(undefined);
            setStream(undefined);
          }}
        />
      )}
      {action === TokenLockMenuAction.WITHDRAW && stream && (
        <TokenLockUnlockDialog
          stream={stream}
          setVisible={() => {
            setAction(undefined);
            setStream(undefined);
          }}
        />
      )}
      f
    </div>
  );
}
