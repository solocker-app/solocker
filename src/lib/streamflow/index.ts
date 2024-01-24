import { StreamflowSolana } from "@streamflow/stream";
import { clusterApiUrl, Cluster, Connection } from "@solana/web3.js";

export default class {
  client: StreamflowSolana.SolanaStreamClient;

  constructor(cluster?: Cluster) {
    this.client = new StreamflowSolana.SolanaStreamClient(
      clusterApiUrl(cluster)
    );
  }

  lockToken() {}
}
