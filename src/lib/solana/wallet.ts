import { Connection } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";

import { publicKey } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  fetchAllDigitalAsset,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";

export class SolanaWallet {
  constructor(
    private readonly connection: Connection,
    private readonly umi: ReturnType<typeof createUmi>,
    private readonly wallet: ReturnType<typeof useWallet>["wallet"]["adapter"]
  ) {
    this.umi.use(mplTokenMetadata());
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

  getTokenMetadata(
    tokenAccounts: Awaited<ReturnType<typeof this.getTokenAccounts>>
  ) {
    const mints = tokenAccounts.map((tokenAccount) =>
      publicKey(tokenAccount.account.data.parsed["mint"])
    );

    return fetchAllDigitalAsset(this.umi, mints);
  }
}
