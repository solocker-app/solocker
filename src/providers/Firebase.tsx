"use client";

import { createContext, useState, useEffect } from "react";
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
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    return onAuthStateChanged(auth, async (user) => {
      setConnected(true);
      if (user === null) user = (await signInAnonymously(auth)).user;
      setUser(user);
      setLoggedIn(user === null);
    });
  }, []);

  return (
    <Firebase.Provider value={{ connected, loggedIn, user }}>
      {children}
    </Firebase.Provider>
  );
}
