import Image from "next/image";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [frame, setFrame] = useState(1);

  return (
    <div className="fixed inset-0 flex flex-col space-y-4 items-center justify-center bg-black/50">
      <Image
        src={`/assets/images/loading-frames/${frame}.svg`}
        width={48}
        height={48}
        alt="loading"
        className="animate animate-pulse"
      />
      <div className="w-8 h-8 border-3 border-secondary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
