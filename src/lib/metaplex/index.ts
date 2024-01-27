import axios from "axios";
import { Umi, publicKey } from "@metaplex-foundation/umi";
import { fetchAllDigitalAssetWithTokenByOwner } from "@metaplex-foundation/mpl-token-metadata";

type NetworkMetadata = {
  name: string;
  symbol: string;
  description: string;
  image?: string;
  external_url?: string;
};

export type DigitalAssetWithTokenUiAmount = Awaited<
  ReturnType<Metaplex["fetchAllDigitalAssetWithTokenByOwner"]>
>[number];
export default class Metaplex {
  constructor(private umi: Umi) {}

  async fetchAllDigitalAssetWithTokenByOwner(address: string) {
    return Promise.all(
      (
        await fetchAllDigitalAssetWithTokenByOwner(this.umi, publicKey(address))
      ).map(async (asset: any) => {
        asset.token.uiAmount = Number(
          BigInt(asset.token.amount) / BigInt(10 ** asset.mint.decimals)
        ).toString();

        return {
          mint: {
            decimals: asset.mint.decimals,
            publicKey: asset.mint.publicKey,
          },
          metadata: {
            name: asset.metadata.name,
            mint: asset.metadata.mint,
            symbol: asset.metadata.symbol,
            network: await axios
              .get<NetworkMetadata>(asset.metadata.uri)
              .then(({ data }) => data)
              .catch(() => (asset.metadata.network = null)),
          },
          token: {
            uiAmount: asset.token.uiAmount,
            publicKey: asset.token.publicKey,
          },
        };
      })
    );
  }
}
