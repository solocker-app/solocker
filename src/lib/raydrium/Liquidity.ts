import { Adapter } from "@solana/wallet-adapter-base";
import { jsonInfo2PoolKeys, Liquidity } from "@raydium-io/raydium-sdk";

import { Connection, PublicKey } from "@solana/web3.js";

type CreateAddLiquidityInstruction = {
  ammId: PublicKey;
  tokenA: PublicKey;
  tokenB: PublicKey;
  focusSide: "a" | "b";
  tokenAAmount: number;
  tokenBAmount: number;
  unslippageTokenAAmount: number;
  unslippageTokenBAmount: number;
  targetAmmId?: string | PublicKey;
  currentJsonInfo?: Record<string, string>;
};

export class LiquidityPoolNotFound extends Error {
  constructor() {
    super("can't find liquidity pool");
  }
}

export class InvalidTokenInput extends Error {}

export class InvalidAmount extends Error {}

export default class {
  constructor(
    private readonly connection: Connection,
    private readonly wallet: Adapter,
    private readonly jsonInfos: Record<string, string>[]
  ) {}

  getTargetJsonInfo(targetAmmId: string | PublicKey) {
    return this.jsonInfos.find(({ id }) => id === String(targetAmmId));
  }

  async createAddLiquidityInstruction(args: CreateAddLiquidityInstruction) {
    const targetJsonInfo = args.targetAmmId
      ? this.getTargetJsonInfo(args.targetAmmId)
      : args.currentJsonInfo;

    if (targetJsonInfo === null) throw new LiquidityPoolNotFound();

    const { innerTransactions } =
      await Liquidity.makeAddLiquidityInstructionSimple({
        connection: this.connection,
        poolKeys: undefined,
        userKeys: undefined,
        fixedSide: args.focusSide,
        amountInA: null,
        amountInB: null,
        makeTxVersion: null,
      });

    return innerTransactions;
  }
}
