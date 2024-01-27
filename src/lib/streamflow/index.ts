import { StreamflowSolana, getBN, Types } from "@streamflow/stream";
import { clusterApiUrl, Cluster } from "@solana/web3.js";
import { SignerWalletAdapter } from "@solana/wallet-adapter-base";
// import { Wallet } from "@solana/wallet-adapter-react";

import {
  doc,
  collection,
  addDoc,
  getDocs,
  getFirestore,
  Firestore,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import type { TokenLock } from "@/components/CreateTokenLockDialog";

export default class StreamFlow {
  private mFirestore: Firestore;
  client: StreamflowSolana.SolanaStreamClient;

  constructor(private wallet: SignerWalletAdapter, cluster?: Cluster) {
    this.client = new StreamflowSolana.SolanaStreamClient(
      clusterApiUrl(cluster),
      Types.ICluster.Devnet,
    );
  }

  get firestore() {
    if (this.mFirestore === null) this.mFirestore = getFirestore();

    return this.mFirestore;
  }
  async lockToken(tokenLock: NonNullable<TokenLock>) {
    const { mint } = tokenLock.configuration.token;
    const { startDate, startTime } = tokenLock.configuration;
    const recipients = tokenLock.recipients.map<Types.IRecipient>(
      (recipient) =>
        ({
          name: "",
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
    console.log(params)
    const input = await this.client.createMultiple(params, {
      sender: this.wallet,
    });
    return this.saveStream(input);
  }

  saveStream(input: Types.IMultiTransactionResult) {
    const streamRef = doc(
      collection(
        this.firestore,
        "users",
        this.wallet.publicKey.toBase58(),
        "streams"
      )
    );

    return addDoc(streamRef, {
      ...input,
      createdAt: Date.now(),
    });
  }

  async getAllStreams(startAfter = null) {
    const streamsRef = collection(
      this.firestore,
      "users",
      this.wallet.publicKey.toBase58(),
      "streams"
    );
    let q: ReturnType<typeof query>;

    if (startAfter)
      q = query(streamsRef, orderBy("createdAt"), limit(16), startAfter);
    else q = query(streamsRef, orderBy("createdAt"), limit(16));

    const snapshots = await getDocs(q);
    const docs = snapshots.docs;
    const lastVisible = docs[docs.length - 1];

    return {
      docs: docs.map((doc) => doc.data() as Types.IMultiTransactionResult),
      next: lastVisible ? () => this.getAllStreams(lastVisible) : null,
    };
  }
}
