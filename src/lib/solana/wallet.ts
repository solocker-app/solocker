import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { BaseWalletAdapter } from "@solana/wallet-adapter-base";
import { Connection, GetProgramAccountsFilter } from "@solana/web3.js";

export class SolanaWallet {
  private wallet!: BaseWalletAdapter;

  constructor(private readonly connection: Connection) {}

  setWallet(wallet: BaseWalletAdapter) {
    this.wallet = wallet;
    return this;
  }

  async getTokenAccounts() {
    const publicKey = this.wallet.publicKey;
    const filters: GetProgramAccountsFilter[] = [
      {
        dataSize: 165,
      },
      {
        memcmp: {
          offset: 32,
          bytes: publicKey.toBase58(),
        },
      },
    ];

    return (
      await this.connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
        filters,
      })
    ).map((account) => {
      const info = account.account.data;
      return {
        info,
        mint: info["parsed"]["info"]["mint"] as string,
        balance: info["parsed"]["info"]["tokenAmount"]["uiAmount"] as string,
      };
    });
  }
}
