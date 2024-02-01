import { useContext } from "react";

import { Repository } from "@/providers/Repository";

export  function useRepository() {
  return useContext(Repository);
}
