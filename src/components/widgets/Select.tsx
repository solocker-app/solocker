"use client";

import { Listbox } from "@headlessui/react";
import { MdOutlineChevronRight } from "react-icons/md";

type SelectProps<T> = {
  value?: T;
  values: T[];
  onSelect: React.Dispatch<React.SetStateAction<T>>;
  prefixChild: (value?: T) => React.ReactNode;
  itemChild: (value?: T) => React.ReactNode;
};

export default function Select<T>({
  value,
  values,
  onSelect,
  prefixChild,
  itemChild,
}: SelectProps<T>) {
  return (
    <Listbox
      as="div"
      className="relative flex flex-col"
      value={value}
      onChange={onSelect}
    >
      <Listbox.Button className="flex space-x-2 items-center bg-container px-2 rounded-md">
        {prefixChild(value)}
        <input
          className="flex-1 py-2 pointer-events-none"
          disabled

        />
        <MdOutlineChevronRight className="rotate-90 text-xl" />
      </Listbox.Button>
      <Listbox.Options className="absolute flex flex-col top-10 inset-x-0 h-48 bg-container rounded-md">
        {values.map((value, index) => (
          <Listbox.Option
            key={index}
            value={value}
          >
            {itemChild(value)}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
