import moment from "moment";
import { Menu } from "@headlessui/react";
import Datetime from "react-datetime";
import { MdChevronRight } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";

import { useFormikContext, ErrorMessage } from "formik";

type InputDateProps = {
  name: string;
  value: number;
};

export default function InputDate({ name, value }: InputDateProps) {
  const { setFieldValue } = useFormikContext();

  return (
    <div className="relative flex flex-col space-y-2">
      <label className="font-medium">Unlock Date</label>
      <Menu
        as="div"
        className="flex space-2 bg-black p-4 rounded-xl"
      >
        <div className="flex-1 flex flex-col">
          <h1 className="text-bold">
            {moment.unix(value).format("MMMM Do YYYY, h:mm:ss a")}
          </h1>
          <p className="text-sm text-highlight">
            {moment.unix(value).fromNow().replace("ago", "")}
          </p>
        </div>
        <Menu.Button className="flex space-x-1 text-xl">
          <IoMdCalendar />
          <MdChevronRight className="rotate-90" />
        </Menu.Button>
        <Menu.Items className="absolute">
          <Datetime
            value={moment.unix(value)}
            input={false}
            open={true}
            isValidDate={(currentDate: ReturnType<typeof moment>) =>
              currentDate.isAfter(moment.now())
            }
            onChange={(value) => {
              if (typeof value !== "string") setFieldValue(name, value.unix());
            }}
          />
        </Menu.Items>
      </Menu>
      <ErrorMessage
        name={name}
        className="text-sm text-red-500"
      />
    </div>
  );
}
