import { StreamflowSolana, getBN, Types } from "@streamflow/stream";

import type { TokenLock } from "@/components/CreateTokenLockDialog";

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

  async lockToken(tokenLock: NonNullable<TokenLock>) {
    const { lpTokenMetadata, baseTokenDecimal } = tokenLock.configuration.token;
    const { endDate, endTime} = tokenLock.configuration;

    const recipients = tokenLock.recipients.map<Types.IRecipient>(
      (recipient) =>
        ({
          name: "Solocker #test",
          amount: getBN(recipient.amount, baseTokenDecimal),
          recipient: recipient.recipient,
          cliffAmount: getBN(0, baseTokenDecimal),
          amountPerPeriod: getBN(recipient.amount, baseTokenDecimal),
        }) as Types.IRecipient,
    );

    const period = new Date(endDate + " " + endTime).getTime() / 1000;

    const params: Types.ICreateMultipleStreamData = {
      recipients,
      period,
      cliff: 0,
      canTopup: false,
      tokenId: lpTokenMetadata.mint,
      cancelableBySender: true,
      cancelableByRecipient: false,
      transferableBySender: true,
      transferableByRecipient: false,
      start: Date.now() / 1000,
      partner: null,
    };

    console.log(params);

    return this.client.createMultiple(params, {
      sender: this.repository.wallet as any,
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
