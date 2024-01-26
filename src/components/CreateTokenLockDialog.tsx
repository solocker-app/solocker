"use client";

import { useState, Fragment } from "react";
import { IoClose } from "react-icons/io5";

import { Tab } from "@headlessui/react";

import { join } from "@/lib/utils";

import TokenLockRecipient from "./TokenLockRecipient";
import TokenLockReviewDialog from "./TokenLockReviewDialog";
import TokenLockConfiguration from "./TokenLockConfiguration";

type CreateTokenLockDialogProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateTokenLockDialog({
  visible,
  setVisible,
}: CreateTokenLockDialogProps) {
  const [formIndex, setFormIndex] = useState(0);
  const [reviewDialogVisible, setReviewDialogVisible] = useState(false);

  return (
    <>
      <div
        className={join(
          "fixed inset-0  flex flex-col bg-black/50 transition-200 md:items-end overflow-y-scroll",
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className={join(
            "flex-1 flex flex-col bg-stone-950 md:w-1/3 overflow-y-scroll",
            visible ? "animate-bounce-in" : "animate-bounce-out"
          )}
        >
          <header className="flex flex-col">
            <button
              className="self-end p-4"
              onClick={() => setVisible(false)}
            >
              <IoClose className="text-xl" />
            </button>
          </header>
          <Tab.Group
            key={formIndex}
            selectedIndex={formIndex}
            onChange={setFormIndex}
          >
            <Tab.Panels as={Fragment}>
              <Tab.Panel
                as="div"
                className="flex-1 flex flex-col"
              >
                <TokenLockConfiguration onSave={() => setFormIndex(1)} />
              </Tab.Panel>
              <Tab.Panel
                as="div"
                className="flex-1 flex flex-col"
              >
                <TokenLockRecipient
                  onBack={() => setFormIndex(0)}
                  onSave={() => setReviewDialogVisible(true)}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      <TokenLockReviewDialog
        visible={reviewDialogVisible}
        setVisible={setReviewDialogVisible}
      />
    </>
  );
}
