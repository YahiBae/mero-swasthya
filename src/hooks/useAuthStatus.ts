import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";

export function useAuthStatus() {
  const [user, setUser] = useState<User | null>(firebaseAuth?.currentUser ?? null);

  useEffect(() => {
    if (!firebaseAuth) {
      setUser(null);
      return;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, (nextUser) => {
      setUser(nextUser);
    });

    return unsubscribe;
  }, []);

  return {
    user,
    isAuthenticated: Boolean(user),
  };
}