import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2, Plus, X } from 'lucide-react';
import ImageUploader from './ImageUploader';

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [form, setForm] = useState({
    title: project?.title || '',
    description: project?.description || '',
    tech: project?.tech || [],
    github: project?.github || '',
    link: project?.link || '',
    category: project?.category || '',
    details: project?.details || '',
    image: project?.image || '',
    imagePath: project?.imagePath || '',
    order: project?.order ?? 0,
  });
  const [newTech, setNewTech] = useState('');
  const [saving, setSaving] = useState(false);
  const isEditing = !!project;

  const handleChange = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const addTech = () => {
    const v = newTech.trim();
    if (v && !form.tech.includes(v)) {
      handleChange('tech', [...form.tech, v]);
      setNewTech('');
    }
  };

  const removeTech = (i) => handleChange('tech', form.tech.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert('Il titolo è obbligatorio.');
    setSaving(true);
    try { await onSave(form); } finally { setSaving(false); }
  };

  const inputCls = 'w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onCancel} className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">{isEditing ? 'Modifica Progetto' : 'Nuovo Progetto'}</h2>
          <p className="text-gray-400 text-sm mt-0.5">{isEditing ? `Modifica "${project.title}"` : 'Aggiungi un nuovo progetto al portfolio'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Titolo *</label>
                <input type="text" value={form.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="Nome del progetto" required className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Descrizione</label>
                <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} placeholder="Breve descrizione..." rows={3} className={`${inputCls} resize-none`} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Dettagli Implementativi</label>
                <textarea value={form.details} onChange={(e) => handleChange('details', e.target.value)} placeholder="Dettagli tecnici per la pagina progetto..." rows={4} className={`${inputCls} resize-none`} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tecnologie</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {form.tech.map((t, i) => (
                    <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-300 text-xs rounded-lg border border-blue-500/20">
                      {t}
                      <button type="button" onClick={() => removeTech(i)} className="hover:text-red-400"><X size={12} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={newTech} onChange={(e) => setNewTech(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())} placeholder="Aggiungi tecnologia..." className={`flex-1 ${inputCls}`} />
                  <button type="button" onClick={addTech} className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"><Plus size={18} className="text-white" /></button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">Immagine Card</label>
              <ImageUploader currentImage={form.image} storagePath={form.imagePath} uploadPath="projects"
                onUploadComplete={({ url, storagePath }) => { handleChange('image', url); handleChange('imagePath', storagePath); }}
                onDelete={() => { handleChange('image', ''); handleChange('imagePath', ''); }}
              />
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Categoria</label>
                <input type="text" value={form.category} onChange={(e) => handleChange('category', e.target.value)} placeholder="React, Java..." className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                <input type="url" value={form.github} onChange={(e) => handleChange('github', e.target.value)} placeholder="https://github.com/..." className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Link Live</label>
                <input type="url" value={form.link} onChange={(e) => handleChange('link', e.target.value)} placeholder="https://..." className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Ordine</label>
                <input type="number" value={form.order} onChange={(e) => handleChange('order', parseInt(e.target.value) || 0)} min={0} className={inputCls} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 disabled:opacity-50">
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? 'Salvataggio...' : isEditing ? 'Aggiorna Progetto' : 'Crea Progetto'}
          </motion.button>
          <button type="button" onClick={onCancel} className="px-6 py-4 sm:py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors">Annulla</button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
