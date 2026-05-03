import { useState, useEffect } from 'react';
import { collection, onSnapshot, getDocs, query, orderBy } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import { PROJECTS } from '../data';

export const useProjects = (realtime = false) => {
  const [projects, setProjects] = useState(PROJECTS);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isFirebaseConfigured) return;

    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const mapDoc = (d) => ({ id: d.id, ...d.data() });

    if (realtime) {
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => { if (!snapshot.empty) setProjects(snapshot.docs.map(mapDoc)); setLoading(false); },
        (err) => { setError(err.message); setLoading(false); }
      );
      return unsubscribe;
    } else {
      getDocs(q)
        .then((snapshot) => { if (!snapshot.empty) setProjects(snapshot.docs.map(mapDoc)); })
        .catch((err) => { setError(err.message); })
        .finally(() => setLoading(false));
    }
  }, [realtime]);

  return { projects, loading, error };
};
