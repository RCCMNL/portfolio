import React, { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useSettings } from '../../hooks/useSettings';
import { motion } from 'framer-motion';
import { Save, Loader2, CheckCircle, Plus, X } from 'lucide-react';

/**
 * Editor per la sezione Hero del portfolio.
 * Permette di modificare il contenuto della code card animata.
 */
const HeroEditor = () => {
  const { settings, loading: fetchLoading } = useSettings(true);
  const [form, setForm] = useState({
    status: 'Contattami...',
    skills: ['Java', 'React'],
    coffee: 'Infinity',
  });
  const [newSkill, setNewSkill] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings?.heroCodeCard) {
      setForm({
        status: settings.heroCodeCard.status || '',
        skills: settings.heroCodeCard.skills || [],
        coffee: settings.heroCodeCard.coffee || '',
      });
    }
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'general'), {
        ...settings,
        heroCodeCard: form,
      }, { merge: true });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Errore salvataggio hero:', err);
      alert('Errore durante il salvataggio.');
    } finally {
      setSaving(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !form.skills.includes(newSkill.trim())) {
      setForm((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
      setSaved(false);
    }
  };

  const removeSkill = (index) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
    setSaved(false);
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Sezione Hero</h2>
        <p className="text-gray-400 text-sm mt-1">Personalizza il contenuto della code card animata nella homepage.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <input
              type="text"
              value={form.status}
              onChange={(e) => { setForm((prev) => ({ ...prev, status: e.target.value })); setSaved(false); }}
              placeholder="Contattami..."
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Coffee</label>
            <input
              type="text"
              value={form.coffee}
              onChange={(e) => { setForm((prev) => ({ ...prev, coffee: e.target.value })); setSaved(false); }}
              placeholder="Infinity"
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Skills nella code card</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {form.skills.map((skill, i) => (
                <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-300 text-xs rounded-lg border border-blue-500/20">
                  {skill}
                  <button type="button" onClick={() => removeSkill(i)} className="hover:text-red-400 transition-colors">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="Aggiungi skill..."
                className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
              >
                <Plus size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Preview code card */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Anteprima</p>
          <div className="bg-slate-900/80 rounded-xl border border-slate-700 p-6 font-mono text-sm text-gray-300 space-y-2">
            <p><span className="text-purple-400">class</span> <span className="text-yellow-300">Dev</span> {'{'}</p>
            <p className="pl-4">status: <span className="text-green-400">"{form.status}"</span>;</p>
            <p className="pl-4">skills: [{form.skills.map((s, i) => (
              <span key={i}><span className="text-green-400">"{s}"</span>{i < form.skills.length - 1 ? ', ' : ''}</span>
            ))}];</p>
            <p className="pl-4">coffee: <span className="text-blue-400">{form.coffee}</span>;</p>
            <p>{'}'}</p>
          </div>
        </div>
      </div>

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
        {saving ? <Loader2 size={18} className="animate-spin" /> : saved ? <CheckCircle size={18} /> : <Save size={18} />}
        {saving ? 'Salvataggio...' : saved ? 'Salvato!' : 'Salva modifiche'}
      </motion.button>
    </div>
  );
};

export default HeroEditor;
