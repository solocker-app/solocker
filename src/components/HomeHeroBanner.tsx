import { homeHeroBannerInfos } from "@/data";
export default function HomeHeroBanner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 bg-dark/50 p-4 rounded overflow-x-scroll">
      <div>
        <h1 className="text-xl font-bold">In numbers we trust</h1>
      </div>
      <div className="flex flex-col space-y-8 md:flex-row md:space-x-16 md:space-y-0 md:overflow-x-scroll">
        {homeHeroBannerInfos.map((info, index) => (
          <div
            key={index}
            className="shrink-0 flex space-x-2 items-center"
          >
            {info.image}
            <div>
              <h1 className="text-lg font-medium">{info.title}</h1>
              <p className="text-highlight">{info.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
