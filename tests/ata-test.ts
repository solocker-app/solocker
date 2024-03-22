import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { getDefaultWallet } from "./utils";

async function main() {
  const wallet = getDefaultWallet();
  const connection = new Connection(clusterApiUrl("devnet"));

  const mint = new PublicKey("8TEPiymMCHvMayJfCKCB89WEwB51vCVrcwoPVo1Lkd4M");

  const ata = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet,
    mint,
    new PublicKey("E9Sq8hSnH4zSuScu53gykLEFCqrVU9DD1i6FjD4Et5Mf"),
  );

  console.log(ata);
}

main().catch(console.log);
