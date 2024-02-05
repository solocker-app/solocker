import { useContext } from "react";
import { LoadingScreen } from "@/providers/LoadingScreen";

export function useLoading() {
  return useContext(LoadingScreen);
}
