import { useEffect, useState } from "react";

export function useMounted() {
  const [state, setState] = useState(false);
  useEffect(() => {
    setState(true);
  }, []);

  return state;
}
