import { InjectAxios } from "./injector";
import type { LpInfo } from "./models/raydium.model";

type Cache = Map<string, LpInfo>;

export default class RaydiumApi extends InjectAxios {
  path: string = "/raydium/lp-infos/";

  async fetchLpInfos(wallet: string) {
    const lpInfos = await this.axios.post<LpInfo[]>(this.path, {
      wallet,
    });
    
    return lpInfos;
  }

  fetchLpInfo(wallet: string, mint: string) {
    return this.axios.post<LpInfo>(this.buildPath(mint), {
      wallet,
    });
  }
}
