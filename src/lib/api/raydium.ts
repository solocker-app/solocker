import { InjectAxios } from "./injector";
import type { LpInfo } from "./models/raydium.model";

export default class RaydiumApi extends InjectAxios {
  path: string = "/raydium/lp-infos/";

  async fetchLpInfos(wallet: string) {
    return this.axios.get<LpInfo[]>(
      this.buildQuery(this.path, {
        wallet,
      }),
    );
  }

  async fetchLpInfo(mint: string, wallet: string = null) {
    return this.axios.get<LpInfo>(
      this.buildQuery(this.buildPath(mint), {
        wallet,
      }),
    );
  }
}
