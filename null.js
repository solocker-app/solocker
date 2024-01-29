// require("dotenv/config");
// const bs58 = require("bs58");
// const { clusterApiUrl } = require("@solana/web3.js");
// const { keypairIdentity } = require("@metaplex-foundation/umi");
// const { createUmi } = require("@metaplex-foundation/umi-bundle-defaults");

// console.log();
// const endpoint = clusterApiUrl("devnet");
// const umi = createUmi(endpoint);
// umi.use(
//   keypairIdentity(
//     umi.eddsa.createKeypairFromSecretKey(
//       bs58.decode(process.env.SECRET_KEY)
//     )
//   )
// );

// console.log(umi.identity.publicKey)

const data = require('./src/assets/json/raydium.mainnet.json')

console.log(data.at(0))