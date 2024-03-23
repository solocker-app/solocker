import { InjectAxios } from "./injector";
import { TokenVesting } from "./models/tokenVesting.model";

export class TokenVestingApi extends InjectAxios {
  path: string = "token-vesting/";

  getTokenVestingByOwner(wallet: string) {
    return this.axios.get<TokenVesting[]>(
      this.buildQuery(this.path, { wallet }),
    );
  }
}
