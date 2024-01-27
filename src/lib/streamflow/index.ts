import { StreamflowSolana, getBN, Types } from "@streamflow/stream";
import { clusterApiUrl, Cluster } from "@solana/web3.js";
import { SignerWalletAdapter } from "@solana/wallet-adapter-base";

import type { TokenLock } from "@/components/CreateTokenLockDialog";

export default class StreamFlow {
  client: StreamflowSolana.SolanaStreamClient;

  constructor(private readonly wallet: SignerWalletAdapter, cluster?: Cluster) {
    this.client = new StreamflowSolana.SolanaStreamClient(
      clusterApiUrl(cluster),
      Types.ICluster.Devnet,
    );
  }
  
  async lockToken(tokenLock: NonNullable<TokenLock>) {
    const { mint } = tokenLock.configuration.token;
    const { startDate, startTime } = tokenLock.configuration;
    const recipients = tokenLock.recipients.map<Types.IRecipient>(
      (recipient) =>
        ({
          name: "Solocker #test",
          amount: getBN(recipient.amount, mint.decimals),
          recipient: recipient.recipient,
          cliffAmount: getBN(0, mint.decimals),
          amountPerPeriod: getBN(recipient.amount, mint.decimals),
        } as Types.IRecipient)
    );
    const start = new Date(startDate + " " + startTime);
    const params = {
      recipients,
      period: 1,
      cliff: 0,
      canTopup: false,
      tokenId: mint.publicKey,
      cancelableBySender: true,
      cancelableByRecipient: false,
      transferableBySender: true,
      transferableByRecipient: false,
      start: start.getTime() / 1000,
    };
    
    return this.client.createMultiple(params, {
      sender: this.wallet,
    });
  }
  
  getLockToken(id){
    return this.client.getOne({ id });
  }
  
  getLockedTokens(){
    return this.client.get({
      address: this.wallet.publicKey.toBase58(),
      type: Types.StreamType.All,
      direction: Types.StreamDirection.All,
    });
  }
}
