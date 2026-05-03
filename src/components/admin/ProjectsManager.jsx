import React, { useState } from 'react';
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useProjects } from '../../hooks/useProjects';
import { deleteImage } from '../../firebase/storage';
import ProjectForm from './ProjectForm';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, GripVertical, ExternalLink } from 'lucide-react';

/**
 * Gestore CRUD per i progetti del portfolio.
 * Permette di aggiungere, modificare, eliminare e riordinare i progetti.
 */
const ProjectsManager = () => {
  const { projects, loading } = useProjects(true);
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const handleSave = async (projectData) => {
    try {
      if (editingProject?.id) {
        // Aggiornamento progetto esistente
        await updateDoc(doc(db, 'projects', editingProject.id), projectData);
      } else {
        // Nuovo progetto — assegna ordine in coda
        await addDoc(collection(db, 'projects'), {
          ...projectData,
          order: projects.length,
          createdAt: new Date().toISOString(),
        });
      }
      setShowForm(false);
      setEditingProject(null);
    } catch (err) {
      console.error('Errore salvataggio progetto:', err);
      alert('Errore durante il salvataggio.');
    }
  };

  const handleDelete = async (project) => {
    if (!window.confirm(`Eliminare il progetto "${project.title}"?`)) return;
    setDeleting(project.id);
    try {
      // Elimina l'immagine dallo storage se presente
      if (project.imagePath) {
        await deleteImage(project.imagePath);
      }
      await deleteDoc(doc(db, 'projects', project.id));
    } catch (err) {
      console.error('Errore eliminazione:', err);
      alert('Errore durante l\'eliminazione.');
    } finally {
      setDeleting(null);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="animate-spin text-blue-400" />
      </div>
    );
  }

  // Mostra il form se attivo
  if (showForm) {
    return (
      <ProjectForm
        project={editingProject}
        onSave={handleSave}
        onCancel={() => { setShowForm(false); setEditingProject(null); }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Progetti</h2>
          <p className="text-gray-400 text-sm mt-1">{projects.length} progetti nel portfolio</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20 text-sm"
        >
          <Plus size={18} />
          Nuovo Progetto
        </motion.button>
      </div>

      {/* Lista progetti */}
      <div className="space-y-3">
        <AnimatePresence>
          {projects.map((project) => (
            <motion.div
              key={project.id || project.title}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-slate-800/40 backdrop-blur-xl rounded-xl border border-slate-700/50 p-4 flex items-center gap-4 group hover:border-slate-600 transition-colors"
            >
              <GripVertical size={18} className="text-gray-600 flex-shrink-0 cursor-grab" />

              {/* Thumbnail */}
              <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-700 flex-shrink-0">
                {project.image && (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm truncate">{project.title}</h3>
                <p className="text-gray-500 text-xs truncate">{project.description}</p>
                <div className="flex gap-1.5 mt-1.5">
                  {(project.tech || []).slice(0, 3).map((t, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-700/50 text-gray-400 text-[10px] rounded">
                      {t}
                    </span>
                  ))}
                  {(project.tech || []).length > 3 && (
                    <span className="text-gray-500 text-[10px]">+{project.tech.length - 3}</span>
                  )}
                </div>
              </div>

              {/* Categoria */}
              <span className="hidden sm:inline-block px-2.5 py-1 bg-blue-500/10 text-blue-400 text-[10px] uppercase tracking-wider rounded border border-blue-500/20">
                {project.category}
              </span>

              {/* Azioni */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                    title="GitHub"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                  title="Modifica"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(project)}
                  disabled={deleting === project.id}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                  title="Elimina"
                >
                  {deleting === project.id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {projects.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg mb-2">Nessun progetto presente</p>
            <p className="text-sm">Clicca "Nuovo Progetto" per iniziare.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsManager;
