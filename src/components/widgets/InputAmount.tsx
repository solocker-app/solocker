import { useFormikContext, Field, ErrorMessage } from "formik";

type InputAmountProps = {
  info: {
    symbol: string;
    amount: number;
  };
  value?: number;
  name: string;
};

export default function InputAmount({ info, name }: InputAmountProps) {
  const { setFieldValue } = useFormikContext();
  const { symbol, amount } = info;

  return (
    <div className="flex flex-col space-y-2">
      <label className="font-medium">Enter Token Amount</label>
      <div className="flex flex-col bg-black p-4 rounded-xl">
        <div className="flex space-x-1 items-center justify-end text-sm">
          <span>Balance:</span>
          <span>{amount.toFixed(4)}</span>
        </div>
        <div className="flex space-x-2 items-center">
          <Field
            name={name}
            type="number"
            placeholder="0.0"
            className="w-4/5 p-2 bg-transparent font-bold outline-none md:text-lg"
          />
          <div className="flex space-x-2 item-center">
            <h1 className="text-nowrap text-sm font-bold truncate">{symbol}</h1>
            <button
              type="button"
              className="btn btn-primary !px-3 !py-1 text-xs uppercase"
              onClick={() => setFieldValue(name, amount)}
            >
              Max
            </button>
          </div>
        </div>
        <div className="flex space-x-2 text-xs md:text-sm">
          {Array.from({ length: 4 })
            .map((_, index) => (index + 1) * 25)
            .map((split, index) => (
              <button
                key={index}
                type="button"
                className="px-4 py-1.5 border border-dark rounded-full"
                onClick={() =>
                  setFieldValue(name, amount * (split / 100))
                }
              >
                {split}%
              </button>
            ))}
        </div>
      </div>
      <span className="text-sm text-red-500 first-letter:capitalize">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
}
