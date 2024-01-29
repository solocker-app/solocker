import axios, { AxiosInstance } from "axios";
import RaydiumApi from "./raydium";

class ApiImpl {
  readonly raydium: RaydiumApi;
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: "http://localhost:8000",
    });

    this.raydium = new RaydiumApi(this.axios);
  }
}

export default class Api {
  private static mApi: ApiImpl;

  static get instance() {
    if (Api.mApi === null) Api.mApi = new ApiImpl();

    return Api.mApi;
  }
}
