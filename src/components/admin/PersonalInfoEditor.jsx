import React, { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useSettings } from '../../hooks/useSettings';
import { motion } from 'framer-motion';
import { Save, Loader2, CheckCircle, User, Github, Linkedin, Mail } from 'lucide-react';

/**
 * Editor per le informazioni personali (nome, ruolo, bio, contatti).
 * Legge e scrive sul documento Firestore "settings/general".
 */
const PersonalInfoEditor = () => {
  const { settings, loading: fetchLoading } = useSettings(true);
  const [form, setForm] = useState({
    name: '', role: '', bio: '', email: '', github: '', linkedin: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Sincronizza il form con i dati Firestore
  useEffect(() => {
    if (settings) {
      setForm({
        name: settings.name || '',
        role: settings.role || '',
        bio: settings.bio || '',
        email: settings.email || '',
        github: settings.github || '',
        linkedin: settings.linkedin || '',
      });
    }
  }, [settings]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'general'), {
        ...settings,
        ...form,
      }, { merge: true });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Errore salvataggio:', err);
      alert('Errore durante il salvataggio. Riprova.');
    } finally {
      setSaving(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="animate-spin text-blue-400" />
      </div>
    );
  }

  const fields = [
    { key: 'name', label: 'Nome completo', icon: User, type: 'text', placeholder: 'Mario Rossi' },
    { key: 'role', label: 'Ruolo / Titolo', icon: User, type: 'text', placeholder: 'Software Engineer' },
    { key: 'email', label: 'Email', icon: Mail, type: 'email', placeholder: 'email@esempio.com' },
    { key: 'github', label: 'GitHub URL', icon: Github, type: 'url', placeholder: 'https://github.com/...' },
    { key: 'linkedin', label: 'LinkedIn URL', icon: Linkedin, type: 'url', placeholder: 'https://linkedin.com/in/...' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Informazioni Personali</h2>
        <p className="text-gray-400 text-sm mt-1">Modifica le informazioni che appaiono nel portfolio.</p>
      </div>

      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 space-y-5">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-300 mb-2">{field.label}</label>
              <div className="relative">
                <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={field.type}
                  value={form[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm"
                />
              </div>
            </div>
          );
        })}

        {/* Bio - textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Bio / Descrizione</label>
          <textarea
            value={form.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            placeholder="Una breve descrizione professionale..."
            rows={4}
            className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm resize-none"
          />
        </div>
      </div>

      {/* Bottone salvataggio */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSave}
        disabled={saving}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all shadow-lg ${
          saved
            ? 'bg-emerald-600 text-white shadow-emerald-500/20'
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
        } disabled:opacity-50`}
      >
        {saving ? (
          <Loader2 size={18} className="animate-spin" />
        ) : saved ? (
          <CheckCircle size={18} />
        ) : (
          <Save size={18} />
        )}
        {saving ? 'Salvataggio...' : saved ? 'Salvato!' : 'Salva modifiche'}
      </motion.button>
    </div>
  );
};

export default PersonalInfoEditor;
