import { useState, useEffect } from 'react';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import { PERSONAL_INFO } from '../data';

const DEFAULT_SETTINGS = {
  ...PERSONAL_INFO,
  heroCodeCard: {
    status: 'Contattami...',
    skills: ['Java', 'React'],
    coffee: 'Infinity',
  },
};

export const useSettings = (realtime = false) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isFirebaseConfigured) return;

    const docRef = doc(db, 'settings', 'general');

    if (realtime) {
      const unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) setSettings(snapshot.data());
          setLoading(false);
        },
        (err) => { setError(err.message); setLoading(false); }
      );
      return unsubscribe;
    } else {
      getDoc(docRef)
        .then((snapshot) => { if (snapshot.exists()) setSettings(snapshot.data()); })
        .catch((err) => { setError(err.message); })
        .finally(() => setLoading(false));
    }
  }, [realtime]);

  return { settings, loading, error };
};
