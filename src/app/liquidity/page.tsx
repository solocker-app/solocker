import LiquidityLock from "@/components/LiquidityLock";

export default function LiquidityPage() {
  return (
    <div className="flex flex-col items-center space-y-8 px-4 md:justify-center">
      <h1 className="text-center text-highlight">
        Supply assets to earn, yield and borrow against collateral. How it works{" "}
      </h1>
      <>
        <LiquidityLock />
      </>
    </div>
  );
}
