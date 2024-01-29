import BN from "bn.js";
import { PublicKey } from "@solana/web3.js";
import { LIQUIDITY_STATE_LAYOUT_V4 } from "@raydium-io/raydium-sdk";

import { InjectBaseRepository } from "../injector";
import Metaplex, { DigitalAssetWithTokenUiAmount } from "../metaplex";

export type LiquidityState = ReturnType<
  (typeof LIQUIDITY_STATE_LAYOUT_V4)["decode"]
>;

export type LiquidityPoolInfo = {
  lpState: LiquidityState;
  totalLpAmount: number;
  quoteMetadata: Awaited<ReturnType<Metaplex["getTokenMetadata"]>>;
};

type RaydiumCache = {
  lpInfos: Map<string, LiquidityPoolInfo>;
};

export default class Raydium extends InjectBaseRepository {
  private static mCached: RaydiumCache;

  static get cached() {
    if (!Raydium.mCached)
      Raydium.mCached = {
        lpInfos: new Map(),
      };

    return Raydium.mCached;
  }

  async getLiquidityPoolInfos(
    tokenAccounts: DigitalAssetWithTokenUiAmount[] = []
  ) {
    const result = await Promise.all(
      tokenAccounts.map(async (tokenAccount) => {
        const { lpState, totalLpAmount, quoteMetadata } =
          await this.getLiquidityPoolInfo(tokenAccount.mint.publicKey);

        return {
          lpState,
          totalLpAmount,
          tokenAccount,
          quoteMetadata,
        };
      })
    );
    
    return result;
  }

  async getLiquidityPoolInfo(lpMint: string, version = 4) {
    const cache = Raydium.cached.lpInfos;
    if (cache.has(lpMint)) return cache.get(lpMint) as LiquidityPoolInfo;

    const { connection, metaplex } = this.repository;

    const info = await connection.getAccountInfo(new PublicKey(lpMint));
    const lpState: LiquidityState = LIQUIDITY_STATE_LAYOUT_V4.decode(info.data);

    console.log(lpState.baseMint.toBase58());
    console.log(lpState.quoteMint.toBase58());

    const result = {
      lpState,
      totalLpAmount: lpState.lpReserve.gt(new BN(0))
        ? lpState.lpReserve.div(new BN(10).pow(lpState.baseDecimal)).toString()
        : 0,
      quoteMetadata: null,
      // quoteMetadata: await metaplex.getTokenMetadata(lpState.quoteMint.toBase58()),
    };

    cache.set(lpState.lpMint.toBase58(), result);

    return result;
  }
}
