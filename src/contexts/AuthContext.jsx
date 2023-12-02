"use client"
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider
} from "firebase/auth";
import { auth } from "../firebase"


export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const facebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  console.log("user:", user)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, facebookSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContext = createContext();

export const UserAuth = () => {
  return useContext(AuthContext);
};