import { DigitalAssetWithTokenUiAmount } from ".";

export const transformTokenAccount = (
  tokenAccount: DigitalAssetWithTokenUiAmount
) => ({
  mint: {
    decimals: tokenAccount.mint.decimals,
    publicKey: tokenAccount.mint.publicKey,
  },
  metadata: {
    name: tokenAccount.metadata.name,
    mint: tokenAccount.metadata.mint,
    symbol: tokenAccount.metadata.symbol,
    network: tokenAccount.metadata.network,
  },
  token: {
    uiAmount: tokenAccount.token.uiAmount,
    publicKey: tokenAccount.token.publicKey,
  },
});

export type TransformTokenAccount = ReturnType<typeof transformTokenAccount>;
