import { homeFeatureBannerInfos } from "@/data";

export default function HomeFeatureBanner() {
  return (
    <div className="flex flex-col space-y-8 md:self-center overflow-x-hidden">
      <div className="flex flex-col text-center">
        <h1 className="text-xl font-bold capitalize">
          Bring the essential tools to solana
        </h1>
      </div>
      <div className="flex flex-col space-y-8 flex-nowrap  md:flex-row md:space-x-4 md:space-y-0 md:overflow-x-scroll">
        {homeFeatureBannerInfos.map((info, index) => (
          <div
            key={index}
            className="flex flex-col space-y-4  bg-dark/50 p-4 rounded-md md:shrink-0 md:flex-row md:space-x-4 md:space-y-0  md:w-xs"
          >
            <div>{info.image}</div>
            <div className="flex flex-col space-y-2 md:space-y-0">
              <h1 className="text-lg font-medium">{info.title}</h1>
              <p className="text-sm text-highlight">{info.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
