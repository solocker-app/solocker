import { PublicKey } from "@solana/web3.js";
import {
  DigitalAssetWithToken,
  MPL_TOKEN_METADATA_PROGRAM_ID,
  fetchAllDigitalAssetWithTokenByOwner,
  fetchJsonMetadata,
  JsonMetadata,
  fetchMetadata,
} from "@metaplex-foundation/mpl-token-metadata";

import { InjectBaseRepository } from "../injector";
import { publicKey } from "@metaplex-foundation/umi";


export type DigitalAssetWithTokenUiAmount = {
  metadata: {
    network?: JsonMetadata;
  };
  token: {
    uiAmount: bigint;
  } & DigitalAssetWithToken["token"];
} & DigitalAssetWithToken;

type MetaplexCache = {
  metadata: Map<string, DigitalAssetWithTokenUiAmount["metadata"]>;
};

export default class Metaplex extends InjectBaseRepository {
  private static mCache: MetaplexCache;

  static get cache() {
    if (!Metaplex.mCache)
      Metaplex.mCache = {
        metadata: new Map(),
      };

    return Metaplex.mCache;
  }

  async fetchAllDigitalAssetWithTokenByOwner() {
    const { umi } = this.repository;

    return Promise.all(
      (
        await fetchAllDigitalAssetWithTokenByOwner(umi, umi.identity.publicKey)
      ).map(async (asset: DigitalAssetWithTokenUiAmount) => {
        asset.token.uiAmount =
          BigInt(asset.token.amount) /
          BigInt(Math.pow(10, asset.mint.decimals));

        await fetchJsonMetadata(umi, asset.metadata.uri)
          .then(({ data }) => data)
          .catch(() => (asset.metadata.network = null));

        Metaplex.cache.metadata.set(asset.mint.publicKey, asset.metadata);

        return asset;
      })
    );
  }

  async getTokenMetadata(mint: string) {
    const cache = Metaplex.cache.metadata;
    if (cache.has(mint)) return cache.get(mint);
    const { umi } = this.repository;

    const programId = new PublicKey(MPL_TOKEN_METADATA_PROGRAM_ID);
    const [pda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        programId.toBuffer(),
        new PublicKey(mint).toBuffer(),
      ],
      programId
    );

    const metadata: DigitalAssetWithTokenUiAmount["metadata"] =
      await fetchMetadata(this.repository.umi, publicKey(pda.toBase58()));

    await fetchJsonMetadata(umi, metadata.uri)
      .then((data) => metadata.network = data)
      .catch(() => (metadata.network = null));

    Metaplex.cache.metadata.set(mint, metadata);

    return metadata;
  }
}
