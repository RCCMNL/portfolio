import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data';
import { ArrowLeft, Github, ExternalLink, Code2 } from 'lucide-react';

const ProjectDemo = () => {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.title.toLowerCase().replace(/\s+/g, '-') === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Progetto non trovato</h2>
          <Link to="/" className="text-blue-500 hover:underline">Torna alla Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Torna al Portfolio
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              {project.title} <span className="text-blue-500">Demo</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {project.description}
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm uppercase tracking-widest text-blue-500 font-bold mb-3">Tecnologie</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-4 py-1.5 bg-slate-800 rounded-full border border-slate-700 text-sm">{t}</span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-all"
                >
                  <Github size={20} /> Repository Code
                </a>
                <a 
                  href="#" 
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                >
                  <ExternalLink size={20} /> Live Preview
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-video rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800 flex items-center justify-center">
               <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="flex flex-col items-center">
                    <Code2 size={48} className="text-blue-500 mb-2" />
                    <span className="text-sm font-bold">In arrivo demo interattiva...</span>
                  </div>
               </div>
            </div>
            
            <div className="mt-8 p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
               <h4 className="font-bold mb-2">Dettagli Implementativi</h4>
               <p className="text-sm text-gray-400">
                  Questo progetto utilizza architetture moderne e pattern di design ottimizzati per la scalabilità. 
                  In questa sezione demo potremo presto integrare video walkthrough o istanze live del database.
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDemo;
