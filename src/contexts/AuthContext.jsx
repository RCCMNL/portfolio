import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../firebase/config';

const ADMIN_EMAIL = 'riccardiemanuele2016@outlook.it';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve essere usato dentro AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  const isAdmin = currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  useEffect(() => {
    if (!isFirebaseConfigured) { setLoading(false); return; }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = (email, password) => {
    if (!isFirebaseConfigured) return Promise.reject(new Error('Firebase non configurato'));
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    if (!isFirebaseConfigured) return Promise.reject(new Error('Firebase non configurato'));
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    if (!isFirebaseConfigured) return Promise.resolve();
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAdmin, loading, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
