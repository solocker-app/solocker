import type { AxiosInstance } from "axios";

export abstract class InjectAxios {
  abstract path: string;
  constructor(readonly axios: AxiosInstance) {}

  buildPath(...paths: string[]) {
    return this.path + paths.join("/") + "/";
  }
}
