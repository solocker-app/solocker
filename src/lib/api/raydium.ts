import { AxiosResponse } from "axios";
import { InjectAxios } from "./injector";
import type { LpInfo } from "./models/raydium.model";

type Cache = Map<string, LpInfo>;

export default class RaydiumApi extends InjectAxios {
  path: string = "/raydium/lp-infos/";
  static cache: Map<string, AxiosResponse> = new Map();

  async fetchLpInfos(wallet: string) {
    return this.axios.post<LpInfo[]>(this.path, {
      wallet,
    });
  }

  async fetchLpInfo(mint: string, wallet: string = null) {
    if (RaydiumApi.cache.has(mint)) return RaydiumApi.cache.get(mint);

    return this.axios.post<LpInfo>(this.buildPath(mint), {
      wallet,
    });
  }
}
