type InputAmountProps = {};

export default function InputAmount() {
  const percentageSplits = [25, 50, 76, 100];

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-bold">Lock how many LP tokens?</label>
      <div className="flex flex-col bg-black p-4 rounded-xl">
        <div className="flex space-x-1 items-center justify-end text-sm">
          <span>Balance</span>
          <span>0</span>
        </div>
        <div className="flex space-x-2 items-center">
          <input
            placeholder="0.0"
            className="w-4/5 p-2 bg-transparent font-bold outline-none md:text-lg"
          />
          <div className="flex space-x-2 item-center">
            <h1 className="text-sm font-bold">RAY/SOL</h1>
            <button className="btn btn-primary !px-3 !py-1 text-xs uppercase">Max</button>
          </div>
        </div>
        <div className="flex space-x-2 text-xs md:text-sm">
          {percentageSplits.map((split, index) => (
            <button
              key={index}
              className="px-4 py-1.5 border border-dark rounded-full"
            >
              {split}%
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
