import axios, { AxiosInstance } from "axios";
import RaydiumApi from "./raydium";

class ApiImpl {
  readonly raydium: RaydiumApi;
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });

    this.raydium = new RaydiumApi(this.axios);
  }
}

export default class Api {
  private static mApi: ApiImpl;

  static get instance() {
    if (!Api.mApi) Api.mApi = new ApiImpl();

    return Api.mApi;
  }
}
