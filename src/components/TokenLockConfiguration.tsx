import SelectCoin from "./widgets/SelectCoin";

export default function TokenLockConfiguration() {
  return (
    <div className="flex-1 flex flex-col space-y-4 p-4">
      <div>
        <h5 className="text-lg font-bold text-highlight uppercase">step 1</h5>
        <h1 className="text-2xl font-extrabold">Configuration</h1>
      </div>
      <form className="flex-1 flex flex-col space-y-4">
        <div className="flex-1 flex flex-col space-y-4">
          <div>
            <label className="text-lg text-stone font-medium">Token</label>
            <SelectCoin />
          </div>
          <div>
            <div>
              <label className="text-lg font-medium">Unlock Settings</label>
              <p className="text-highlight">
                Set the date and time when the token will be unlocked
              </p>
            </div>
            <div className="flex space-x-4">
              <input
                type="date"
                className="flex-1 p-2 bg-container/70 rounded-md"
                defaultValue={new Date().toISOString().split("T").at(0)}
              />
              <input
                type="time"
                className="flex-1 p-2 bg-container/70 rounded-md"
                defaultValue={new Date().toTimeString().substring(0, 8)}
              />
            </div>
          </div>
        </div>
        <button className="btn btn-primary self-end !rounded-md">
          Next Step
        </button>
      </form>
    </div>
  );
}
