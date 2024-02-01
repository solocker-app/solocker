import Search from "./widgets/Search";

export default function TokenLockerEditTab() {
  return (
    <div className="flex flex-col space-y-8 bg-dark/50 p-4">
      <header className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-black">Edit / Withdraw</h1>
          <p className="text-highlight">
            Withdraw or cancel from lock contracts
          </p>
        </div>
        <Search />
      </header>
      <div>
        <table></table>
      </div>
    </div>
  );
}
