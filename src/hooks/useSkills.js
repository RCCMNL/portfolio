import { useState, useEffect } from 'react';
import { collection, onSnapshot, getDocs, query, orderBy } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import { SKILLS } from '../data';
import { getIconComponent } from '../utils/iconMap';

export const useSkills = (realtime = false) => {
  const [skills, setSkills] = useState(SKILLS);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isFirebaseConfigured) return;

    const q = query(collection(db, 'skills'), orderBy('order', 'asc'));
    const mapDoc = (d) => {
      const data = d.data();
      return { id: d.id, ...data, icon: getIconComponent(data.icon), iconName: data.icon };
    };

    if (realtime) {
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => { if (!snapshot.empty) setSkills(snapshot.docs.map(mapDoc)); setLoading(false); },
        (err) => { setError(err.message); setLoading(false); }
      );
      return unsubscribe;
    } else {
      getDocs(q)
        .then((snapshot) => { if (!snapshot.empty) setSkills(snapshot.docs.map(mapDoc)); })
        .catch((err) => { setError(err.message); })
        .finally(() => setLoading(false));
    }
  }, [realtime]);

  return { skills, loading, error };
};
