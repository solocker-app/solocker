import { Fragment } from "react";
import { Tab } from "@headlessui/react";

import { join } from "@/lib/utils";

export default function InputAddress() {
  return (
    <Tab.Group
      as="div"
      className="flex flex-col space-y-2"
    >
      <label className="text-lg font-bold">Who get the unlocked token?</label>
      <Tab.List className="self-center flex space-x-4">
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={join(
                "btn !py-2",
                selected ? "btn-primary" : "over:bg-black/50 hover:rounded-md",
              )}
            >
              Me
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={join(
                "btn !py-2",
                selected ? "btn-primary" : "over:bg-black/50 hover:rounded-md",
              )}
            >
              Someone else
            </button>
          )}
        </Tab>
      </Tab.List>
      <div className="flex flex-col">
        <input
          placeholder="Unlocker address"
          className="bg-black p-4 outline-none rounded-xl"
        />
      </div>
    </Tab.Group>
  );
}
