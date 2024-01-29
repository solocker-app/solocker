import "dotenv/config";

import bs58 from "bs58";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Umi, keypairIdentity } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

import { BaseRepository } from "../src/lib";

const main = async () => {
  let umi: Umi;
  let connection: Connection;
  let repository: BaseRepository;
  const endpoint = clusterApiUrl("devnet");
  connection = new Connection(endpoint);
  umi = createUmi(endpoint);
  umi.use(
    keypairIdentity(
      umi.eddsa.createKeypairFromSecretKey(bs58.decode(process.env.SECRET_KEY))
    )
  );
  repository = new BaseRepository(connection, umi);
  const tokenAccounts =
    await repository.metaplex.fetchAllDigitalAssetWithTokenByOwner();
  const lpInfos = await repository.raydium.getLiquidityPoolInfos(tokenAccounts);
  console.log(lpInfos.length);
};

main().catch(console.error);

