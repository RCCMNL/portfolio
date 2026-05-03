import React, { useState } from 'react';
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useSkills } from '../../hooks/useSkills';
import { getIconComponent, AVAILABLE_ICONS } from '../../utils/iconMap';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, Save, X, ArrowLeft, CheckCircle } from 'lucide-react';

const SkillForm = ({ skill, onSave, onCancel }) => {
  const [form, setForm] = useState({
    category: skill?.category || '',
    icon: skill?.iconName || 'Code2',
    items: skill?.items || [],
    order: skill?.order ?? 0,
  });
  const [newItem, setNewItem] = useState('');
  const [saving, setSaving] = useState(false);
  const inputCls = 'w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm';

  const addItem = () => {
    const v = newItem.trim();
    if (v && !form.items.includes(v)) {
      setForm((p) => ({ ...p, items: [...p.items, v] }));
      setNewItem('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category.trim()) return alert('La categoria è obbligatoria.');
    setSaving(true);
    try { await onSave(form); } finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onCancel} className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg"><ArrowLeft size={20} /></button>
        <h2 className="text-2xl font-bold text-white">{skill ? 'Modifica Categoria' : 'Nuova Categoria'}</h2>
      </div>
      <form onSubmit={handleSubmit} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Nome Categoria *</label>
          <input type="text" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} placeholder="Backend & Data" required className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Icona</label>
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
            {AVAILABLE_ICONS.map((name) => (
              <button key={name} type="button" onClick={() => setForm((p) => ({ ...p, icon: name }))}
                className={`p-2.5 rounded-lg border transition-all flex items-center justify-center ${form.icon === name ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-slate-900/50 border-slate-600 text-gray-400 hover:border-slate-500'}`}
                title={name}>
                {getIconComponent(name, 18)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Competenze</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {form.items.map((item, i) => (
              <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-300 text-xs rounded-lg border border-blue-500/20">
                {item}
                <button type="button" onClick={() => setForm((p) => ({ ...p, items: p.items.filter((_, idx) => idx !== i) }))} className="hover:text-red-400"><X size={12} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())} placeholder="Aggiungi competenza..." className={`flex-1 ${inputCls}`} />
            <button type="button" onClick={addItem} className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl"><Plus size={18} className="text-white" /></button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Ordine</label>
          <input type="number" value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: parseInt(e.target.value) || 0 }))} min={0} className={inputCls} />
        </div>
        <div className="flex gap-3 pt-2">
          <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/20 disabled:opacity-50">
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? 'Salvataggio...' : 'Salva'}
          </motion.button>
          <button type="button" onClick={onCancel} className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium">Annulla</button>
        </div>
      </form>
    </div>
  );
};

const SkillsManager = () => {
  const { skills, loading } = useSkills(true);
  const [editingSkill, setEditingSkill] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const handleSave = async (data) => {
    try {
      if (editingSkill?.id) {
        await updateDoc(doc(db, 'skills', editingSkill.id), data);
      } else {
        await addDoc(collection(db, 'skills'), { ...data, order: skills.length });
      }
      setShowForm(false);
      setEditingSkill(null);
    } catch (err) {
      console.error('Errore salvataggio skill:', err);
      alert('Errore durante il salvataggio.');
    }
  };

  const handleDelete = async (skill) => {
    if (!window.confirm(`Eliminare la categoria "${skill.category}"?`)) return;
    setDeleting(skill.id);
    try { await deleteDoc(doc(db, 'skills', skill.id)); } catch (err) { console.error(err); alert('Errore.'); }
    finally { setDeleting(null); }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 size={28} className="animate-spin text-blue-400" /></div>;

  if (showForm) return <SkillForm skill={editingSkill} onSave={handleSave} onCancel={() => { setShowForm(false); setEditingSkill(null); }} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Competenze</h2>
          <p className="text-gray-400 text-sm mt-1">{skills.length} categorie di competenze</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setEditingSkill(null); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/20 text-sm">
          <Plus size={18} /> Nuova Categoria
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {skills.map((skill) => (
            <motion.div key={skill.id || skill.category} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-slate-800/40 backdrop-blur-xl rounded-xl border border-slate-700/50 p-5 group hover:border-slate-600 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-blue-400">{skill.icon}</div>
                  <h3 className="text-white font-semibold text-sm">{skill.category}</h3>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditingSkill(skill); setShowForm(true); }} className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(skill)} disabled={deleting === skill.id} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg disabled:opacity-50">
                    {deleting === skill.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(skill.items || []).map((item, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-700/50 text-gray-400 text-xs rounded">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillsManager;
