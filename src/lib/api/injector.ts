import type { AxiosInstance } from "axios";

export abstract class InjectAxios {
  abstract path: string;
  constructor(readonly axios: AxiosInstance) {}

  buildPath(...paths: string[]) {
    return this.path + paths.join("/") + "/";
  }

  buildQuery(path: string, query: Record<string, any>) {
    const q = new URLSearchParams(query);
    return path + "?" + q.toString();
  }
}
