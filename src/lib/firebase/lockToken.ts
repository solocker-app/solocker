import { Firestore, updateDoc, setDoc, doc } from "firebase/firestore";

import { BaseRepository } from "..";
import { LpInfo } from "../api/models/raydium.model";
import { TokenVesting } from "../api/models/tokenVesting.model";

export enum Type {
  OUTGOING = "outgoing",
  INCOMING = "incoming",
}

export default class LockToken {
  constructor(
    readonly firestore: Firestore,
    readonly repository: BaseRepository,
  ) {}

  async createTransaction(
    address: string,
    data: Partial<TokenVesting["contractInfo"]>,
  ) {
    const ref = doc(this.firestore, address, data.seed);
    return setDoc(ref, Object.assign(data, { createdAt: Date.now() }));
  }

  async updateTransaction(
    address: string,
    seed: string,
    data: Partial<TokenVesting["contractInfo"]>,
  ) {
    const ref = doc(this.firestore, address, seed);

    return updateDoc(ref, data);
  }
}
