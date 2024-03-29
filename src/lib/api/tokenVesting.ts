import { InjectAxios } from "./injector";
import type { LpTokenVesting, TokenVesting } from "./models/tokenVesting.model";

export class TokenVestingApi extends InjectAxios {
  path: string = "token-vesting/";

  getLpTokenVestingByOwner(wallet: string) {
    return this.axios.get<LpTokenVesting[]>(
      this.buildQuery(this.buildPath("lp-contract-infos"), { wallet }),
    );
  }


  getTokenVestingByOwner(wallet: string) {
    return this.axios.get<TokenVesting[]>(
      this.buildQuery(this.buildPath("contract-infos"), { wallet }),
    );
  }
}
