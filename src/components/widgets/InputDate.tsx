import moment from "moment.js";
import { MdChevronRight } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";

import { useFormik, ErrorMessage } from "formik";

type InputDateProps = {
  name: string,
  value: number,
}

export default function InputDate({ name, value } : InputDateProps) {
  const { setFieldValue } = useFormik();
  
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-bold">Unlock Date</label>
      <div className="flex space-2 bg-black p-4 rounded-xl">
        <div className="flex-1 flex flex-col">
          <h1 className="text-bold">{moment(value).format()}</h1>
          <p className="text-sm text-highlight">{moment(value).fromNow()}</p>
        </div>
        <div>
          <button className="flex space-x-1 text-xl text-green-500">
            <IoMdCalendar />
            <MdChevronRight className="rotate-90" />
          </button>
        </div>
      </div>
      <div className="text-sm text-red-500">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
}
