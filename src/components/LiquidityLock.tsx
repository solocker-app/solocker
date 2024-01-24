import DefaultCoinSelect from "./DefaultCoinSelect";

export default function LiquidityLock() {
  return (
    <form className="self-center w-88 md:w-sm flex flex-col space-y-6 bg-container-gradient-2 px-4 py-8 border border-primary/30 rounded-lg overflow-x-hidden">
      <div className="flex flex-col space-y-2">
        <label className="text-lg">Select Token</label>
        <DefaultCoinSelect />
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-lg">Unlock Settings</h1>
          <p className="text-highlight">
            Set the date and time the token will be unlocked
          </p>
        </div>
        <div className="flex space-x-4 items-center">
          <div className="flex-1 flex flex-col space-y-2">
            <label className="text-base text-highlight">Unlock date</label>
            <input
              type="date"
              className="bg-container py-2 rounded-md"
            />
          </div>
          <div className="flex-1 flex flex-col space-y-2">
            <label className="text-base text-highlight">Time</label>
            <input
              type="time"
              className="bg-container py-2 rounded-md"
            />
          </div>
        </div>
      </div>
      <button className="self-end btn btn-gradient-primary !px-8">
        Next Step
      </button>
    </form>
  );
}
