import { getFirestore } from "firebase/firestore";

import LockToken from "./lockToken";
import { InjectBaseRepository } from "../injector";
import { BaseRepository } from "..";
import { initializeApp } from "firebase/app";

initializeApp({
  projectId: "sol-locker",
  measurementId: "G-XHQQNEYH56",
  messagingSenderId: "411812313347",
  storageBucket: "sol-locker.appspot.com",
  authDomain: "sol-locker.firebaseapp.com",
  apiKey: "AIzaSyAEukQdosReUzz4HD5t1LNO46Vu2TkaKxk",
  appId: "1:411812313347:web:4c9af4d6d8df6de86d5136",
});


export default class Firebase extends InjectBaseRepository {
  readonly lockToken: LockToken;

  constructor(repository: BaseRepository) {
    super(repository);

    this.lockToken = new LockToken(getFirestore(), repository);
  }
}
