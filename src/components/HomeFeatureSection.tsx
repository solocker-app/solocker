
import { join } from "@/lib/utils";
import { homeFeatures } from "@/data";

export default function HomeFeatureSection() {
  return (
    <section className="max-w-4xl self-center flex flex-col space-y-8 p-4">
      <div className="md:w-1/3 md:self-center">
        <h1 className="text-xl font-bold text-center">
          Providing Trust And Confidence For Long Term Projects On Solana
        </h1>
      </div>
      <div className="grid grid-rows-1 gap-8 md:grid-cols-2 md:grid-rows-2">
        {homeFeatures.map((feature, index) => (
          <div
            key={index}
            className={join(
              "flex flex-col space-y-4 border border-secondary/25 p-4 rounded-xl md:h-52",
              index % 2 === 0 ? "bg-gradient-to-r from-white/3 to-secondary/20" : "bg-dark/50",
              index === 2 ? "md:order-last" :  null
            )}
          >
            <h1 className="text-lg font-medium">{feature.title}</h1>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
