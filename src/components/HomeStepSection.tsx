"use client";

import { homeSteps } from "@/data";

export default function HomeStep() {
  return (
    <div className="bg-secondary p-4">
      <div className="flex flex-col space-y-8 bg-dark px-4 py-8 rounded-md">
        <div>
          <h1 className="text-2xl font-bold">How it works?</h1>
        </div>
        <div className="flex flex-col md:flex-row">
          {homeSteps.map((step, index) => (
            <div
              key={index}
              className="flex space-x-4 md:flex-1 md:flex-col md:space-x-0 md:space-y-4"
            >
              <div className="flex flex-col items-center md:flex-row">
                <div className="relative flex items-center justify-center">
                  <div className="w-8 h-8 bg-secondary rounded rotate-45" />
                  <p className="absolute text-black">{index + 1}</p>
                </div>
                {index < homeSteps.length - 1 && (
                  <div className="w-0.5 h-16 bg-secondary md:w-full md:h-0.5" />
                )}
              </div>
              <div>
                <p className="text-base">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
