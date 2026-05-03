import React, { useState } from 'react';
import { Database, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { db } from '../../firebase/config';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { PERSONAL_INFO, SKILLS, PROJECTS } from '../../data/index';

/**
 * Componente per migrare i dati dai file statici (src/data/index.jsx) a Firestore.
 * Utile durante la configurazione iniziale per popolare il database.
 */
const DataMigration = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  const migrateData = async () => {
    setLoading(true);
    setStatus('loading');
    setMessage('Migrazione in corso...');

    try {
      // 1. Migrazione Informazioni Personali
      await setDoc(doc(db, 'content', 'personal_info'), PERSONAL_INFO);

      // 2. Migrazione Skills (le salviamo come un unico documento per semplicità o una collezione)
      // Qui scegliamo di salvarle in un documento 'skills' nella collezione 'content'
      await setDoc(doc(db, 'content', 'skills'), { items: SKILLS });

      // 3. Migrazione Progetti
      // Per i progetti creiamo una collezione dedicata
      const projectsRef = collection(db, 'projects');
      
      // Carichiamo i progetti uno per uno (nota: le immagini locali rimarranno path stringa, 
      // in futuro l'admin potrà caricarne di nuove via Storage)
      for (const project of PROJECTS) {
        // Usiamo lo slug o il titolo come ID per evitare duplicati semplici se rilanciato
        const projectSlug = project.title.toLowerCase().replace(/ /g, '-');
        await setDoc(doc(db, 'projects', projectSlug), project);
      }

      setStatus('success');
      setMessage('Dati migrati con successo su Firestore!');
      
      // Reset dopo 3 secondi
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Errore durante la migrazione:', error);
      setStatus('error');
      setMessage('Errore: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20 text-xs font-medium">
        <CheckCircle2 size={14} />
        <span>Migrazione Completata</span>
      </div>
    );
  }

  return (
    <button
      onClick={migrateData}
      disabled={loading}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
        status === 'error' 
          ? 'bg-red-500/10 text-red-400 border-red-500/20' 
          : 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500 hover:text-white'
      }`}
      title="Copia i dati dai file locali a Firestore"
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : status === 'error' ? (
        <AlertCircle size={14} />
      ) : (
        <Database size={14} />
      )}
      <span>{loading ? 'Migrazione...' : status === 'error' ? 'Riprova' : 'Migra Dati'}</span>
    </button>
  );
};

export default DataMigration;
