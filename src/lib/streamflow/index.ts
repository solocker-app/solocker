import BN from "bn.js";
import { StreamflowSolana, getBN, Types } from "@streamflow/stream";

import type { Config } from "../models/config.model";

import {createFeeInstructions } from "./instructions";
import type { BaseRepository } from "..";
import { InjectBaseRepository } from "../injector";

export default class StreamFlow extends InjectBaseRepository {
  client: StreamflowSolana.SolanaStreamClient;

  constructor(repository: BaseRepository) {
    super(repository);

    this.client = new StreamflowSolana.SolanaStreamClient(
      this.repository.connection.rpcEndpoint,
      Types.ICluster.Mainnet,
    );
  }

  async lockToken(config: Config) {
    const { wallet } = this.repository;
    const { lpTokenMetadata, lpTokenDecimal } = config.token;
    const { period, recipient } = config;
    
    const baseAmount = getBN(config.amount - (config.amount * 0.05), lpTokenDecimal);
    const feeAmount = baseAmount.mul(new BN(1).div(new BN(100)));
    const depositAmount = baseAmount.sub(feeAmount);
    
    const params = {
      period,
      cliff: 0,
      canTopup: true,
      name: "Solocker #test",
      amount: depositAmount,
      recipient: recipient,
      cliffAmount: getBN(0, lpTokenDecimal),
      amountPerPeriod: depositAmount,
      tokenId: lpTokenMetadata.mint.toString(),
      cancelableBySender: true,
      cancelableByRecipient: false,
      transferableBySender: true,
      transferableByRecipient: false,
      start: 0,
      partner: null,
      customInstructions: await createFeeInstructions(this.repository, feeAmount, lpTokenMetadata.mint.toString())
    };
    
    return this.client.create(params, {
      sender: wallet as any,
    });
  }

  topup(id: string, amount: number, decimal: number) {
    return this.client.topup(
      {
        id,
        amount: getBN(amount, decimal),
      },
      {
        invoker: this.repository.wallet as any,
      },
    );
  }

  transfer(id: string, recipient: string) {
    return this.client.transfer(
      {
        id,
        newRecipient: recipient,
      },
      {
        invoker: this.repository.wallet as any,
      },
    );
  }

  cancel(id: string) {
    return this.client.cancel(
      {
        id,
      },
      {
        invoker: this.repository.wallet as any,
      },
    );
  }

  withdraw(id: string, amount: number, decimal: number) {
    return this.client.withdraw(
      {
        id,
        amount: getBN(amount, decimal),
      },
      {
        invoker: this.repository.wallet as any,
      },
    );
  }

  getLockToken(id: string) {
    return this.client.getOne({ id });
  }

  getLockedTokens() {
    return this.client.get({
      address: this.repository.wallet.publicKey.toBase58(),
      type: Types.StreamType.All,
      direction: Types.StreamDirection.All,
    });
  }
}
