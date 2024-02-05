import { join } from "@/lib/utils";
import { homeFeatures } from "@/data";

export default function HomeFeatureSection() {
  return (
    <section className="max-w-4xl self-center flex flex-col space-y-8 p-8">
      <div className="w-64 md:w-96 self-center">
        <h1 className="text-xl font-bold text-center">
          Providing Trust And Confidence For Long Term Projects On Solana
        </h1>
      </div>
      <div className="grid grid-rows-1 gap-8 md:grid-cols-2 md:grid-rows-2">
        {homeFeatures.map((feature, index) => (
          <div
            key={index}
            className={join(
              "flex flex-col space-y-4 border-1 border-secondary/15 p-6 rounded-xl md:h-52",
              index % 2 === 0
                ? "bg-gradient-to-bl from-secondary/20 to-transparent"
                : "bg-white/3",
              index === 2 ? "md:order-last" : null,
            )}
          >
            <h1 className="max-w-xs text-lg font-bold">{feature.title}</h1>
            <div className="flex-1 flex flex-col justify-end">
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
