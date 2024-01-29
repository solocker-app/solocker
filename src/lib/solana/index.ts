import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";

import { InjectBaseRepository } from "../injector";

export default class Solana extends InjectBaseRepository {
  async getTokenAccounts() {
    const { connection, wallet } = this.repository;
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      wallet.publicKey,
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );
    const token2022Accounts = await connection.getParsedTokenAccountsByOwner(
      wallet.publicKey,
      {
        programId: TOKEN_2022_PROGRAM_ID,
      }
    );

    return [tokenAccounts.value, token2022Accounts.value].flat();
  }
}
