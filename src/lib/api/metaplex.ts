import {
  JsonMetadata,
  Metadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { InjectAxios } from "./injector";

export type DigitalAssetWithJsonMetadata = {
  jsonMetadata: JsonMetadata;
  token: {
    isNative: boolean;
    mint: string;
    owner: string;
    tokenAmount: {
      amount: number;
      decimals: number;
      uiAmount: number;
      uiAmountString: string;
    };
  };
} & Metadata;

export class MetaplexApi extends InjectAxios {
  path: string = "metaplex/";

  getDigitalAssetsByUser(wallet: string) {
    return this.axios.get<DigitalAssetWithJsonMetadata[]>(
      this.buildPath("digital-assets", wallet),
    );
  }
}
