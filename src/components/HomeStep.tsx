import { homeSteps } from "@/data";

export default function HomeStep() {
  return (
    <div className="flex flex-col bg-gradient-primary p-4">
      <div className="flex flex-col space-y-8 bg-dark p-8 rounded-xl">
        <header>
          <h1 className="text-2xl font-medium">How it works</h1>
        </header>
        <div className="flex flex-col md:self-center md:w-4/5 md:flex-row">
          {homeSteps.map((step, index) => (
            <div
              key={index}
              className="flex space-x-4 md:flex-1 md:flex-col md:space-y-2"
            >
              <div className="flex flex-col items-center md:flex-row">
                <div className="relative flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-primary rotate-45 rounded" />
                  <p className="absolute text-black">{index + 1}</p>
                </div>
                {index < homeSteps.length - 1 && (
                  <div className="h-16 w-0.5 bg-gradient-primary md:h-0.5 md:w-full" />
                )}
              </div>
              <div>
                <p className="text-highlight text-nowrap">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
