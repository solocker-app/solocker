import type { AxiosInstance } from "axios";

export abstract class InjectAxios {
  abstract path: string;
  constructor(protected readonly axios: AxiosInstance) {}

  protected buildPath(...paths: string[]) {
    return this.path + paths.join("/") + "/";
  }

  protected buildQuery(path: string, query: Record<string, any>) {
    const q = new URLSearchParams(query);
    return path + "?" + q.toString();
  }
}
