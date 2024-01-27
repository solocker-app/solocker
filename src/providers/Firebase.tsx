"use client";

import { createContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  Auth,
  onAuthStateChanged,
  User,
} from "firebase/auth";

export const Firebase = createContext({
  connected: false,
  loggedIn: false,
  user: null as User | null,
});

export default function FirebaseComponent({
  children,
}: React.PropsWithChildren) {
  const [connected, setConnected] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [auth, setAuth] = useState<Auth>();
  useEffect(() => {
    initializeApp({
      projectId: "sol-locker",
      measurementId: "G-XHQQNEYH56",
      messagingSenderId: "411812313347",
      storageBucket: "sol-locker.appspot.com",
      authDomain: "sol-locker.firebaseapp.com",
      apiKey: "AIzaSyAEukQdosReUzz4HD5t1LNO46Vu2TkaKxk",
      appId: "1:411812313347:web:4c9af4d6d8df6de86d5136",
    });
    const auth = getAuth();
    setAuth(auth);
    onAuthStateChanged(auth, async (user) => {
      if (user === null) user = (await signInAnonymously(auth)).user;
      setUser(user);
      setLoggedIn(user === null);
    });

    setConnected(true);
  }, []);

  return (
    <Firebase.Provider value={{ connected, loggedIn, user }}>
      {children}
    </Firebase.Provider>
  );
}
