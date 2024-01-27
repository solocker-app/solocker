import { Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";

import Metaplex from "../metaplex";

export class SolanaWallet {
  public readonly metaplex: Metaplex;

  constructor(
    private readonly connection: Connection,
    private readonly umi: ReturnType<typeof createUmi>,
    private readonly wallet: ReturnType<typeof useWallet>["wallet"]["adapter"]
  ) {
    this.umi.use(mplTokenMetadata());
    this.umi.use(walletAdapterIdentity(wallet));
    this.metaplex = new Metaplex(this.umi);
  }

  async getTokenAccounts() {
    const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(
      this.wallet.publicKey,
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );
    const token2022Accounts =
      await this.connection.getParsedTokenAccountsByOwner(
        this.wallet.publicKey,
        {
          programId: TOKEN_2022_PROGRAM_ID,
        }
      );

    return [tokenAccounts.value, token2022Accounts.value].flat();
  }
}
