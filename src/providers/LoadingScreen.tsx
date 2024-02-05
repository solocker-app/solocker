import Image from "next/image";

import { createPortal } from "react-dom";
import { createContext, useContext, useState } from "react";

import { useMounted } from "@/composables";

export const LoadingScreen = createContext({
  loading: false,
  setLoading: (() => void 0) as React.Dispatch<React.SetStateAction<boolean>>,
});

export default function LoadingScreenProvider({
  children,
}: React.PropsWithChildren) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingScreen.Provider value={{ loading, setLoading }}>
      {children}
      <LoadingScreenElement />
    </LoadingScreen.Provider>
  );
}

function LoadingScreenElement() {
  const mounted = useMounted();
  const { loading } = useContext(LoadingScreen);

  return (
    mounted &&
    createPortal(
      loading && (
        <div className="fixed inset-0 flex flex-col space-y-4 items-center justify-center bg-black/70 z-100">
          <Image
            src="/assets/images/loading-frames/1.svg"
            width={64}
            height={64}
            alt="loading"
            className="animate-bounce"
          />
        </div>
      ),
      document.body,
    )
  );
}
