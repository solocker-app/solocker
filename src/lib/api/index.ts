import axios, { AxiosInstance } from "axios";
import RaydiumApi from "./raydium";
import { TokenVestingApi } from "./tokenVesting";
import { MetaplexApi } from "./metaplex";

class ApiImpl {
  readonly raydium: RaydiumApi;
  readonly metaplex: MetaplexApi;
  readonly tokenVesting: TokenVestingApi;
  
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });

    this.raydium = new RaydiumApi(this.axios);
    this.metaplex = new MetaplexApi(this.axios);
    this.tokenVesting = new TokenVestingApi(this.axios);
  }
}

export default class Api {
  private static mApi: ApiImpl;

  static get instance() {
    if (!Api.mApi) Api.mApi = new ApiImpl();

    return Api.mApi;
  }
}
