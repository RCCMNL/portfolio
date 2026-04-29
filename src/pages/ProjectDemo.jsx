import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data';
import { ArrowLeft, Github, ExternalLink, Code2 } from 'lucide-react';

const DINO_PROJECT_ID = 'dino-ia';

const ProjectDemo = () => {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.title.toLowerCase().replace(/\s+/g, '-') === id);
  const isDinoProject = id === DINO_PROJECT_ID;
  const [isDemoLoaded, setIsDemoLoaded] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsDemoLoaded(false);
  }, [id]);

  useEffect(() => {
    if (isDemoLoaded) {
      previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isDemoLoaded]);

  const handleLoadPreview = () => {
    setIsDemoLoaded(true);
  };

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
    <div className="min-h-screen bg-slate-900 text-white pt-32 pb-20 px-4 sm:px-6 lg:px-10 xl:px-12">
      <div className="mx-auto w-full max-w-[1500px]">
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

        <div className="space-y-12">
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
              <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                <h4 className="font-bold mb-2">Dettagli Implementativi</h4>
                {isDinoProject ? (
                  <p className="text-sm text-gray-400 leading-relaxed">
                    La demo esegue una simulazione canvas di Chrome Dino in cui una popolazione di dinosauri apprende con algoritmo genetico.
                    Questa integrazione nel portfolio usa una mini-app isolata per mantenere intatto il motore di gioco, evitare conflitti CSS
                    con Tailwind e offrire una preview live stabile dentro la pagina progetto.
                  </p>
                ) : (
                  <p className="text-sm text-gray-400">
                    Questo progetto utilizza architetture moderne e pattern di design ottimizzati per la scalabilita.
                    In questa sezione demo potremo presto integrare video walkthrough o istanze live del database.
                  </p>
                )}
              </div>

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
                {isDinoProject ? (
                  <button
                    type="button"
                    onClick={handleLoadPreview}
                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                  >
                    <ExternalLink size={20} /> {isDemoLoaded ? 'Preview attiva' : 'Live Preview'}
                  </button>
                ) : (
                  <a
                    href="#"
                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                  >
                    <ExternalLink size={20} /> Live Preview
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
            ref={previewRef}
          >
            <div className="rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800">
              {isDinoProject ? (
                <div className="bg-slate-950">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-blue-400 font-semibold">Demo interattiva</p>
                      <h2 className="text-lg font-semibold text-white mt-1">Simulazione Chrome Dino AI</h2>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true"></span>
                      {isDemoLoaded ? 'Live' : 'Standby'}
                    </div>
                  </div>
                  {isDemoLoaded ? (
                    <iframe
                      src="/demos/dino-ia/index.html"
                      title="Dino IA Demo"
                      className="block w-full bg-white h-[860px] sm:h-[920px] lg:h-[860px]"
                    />
                  ) : (
                    <div className="flex min-h-[320px] sm:min-h-[380px] items-center justify-center bg-slate-950 px-6 py-10 text-center">
                      <div className="max-w-md">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-blue-400 font-semibold">Preview on demand</p>
                        <h3 className="mt-3 text-2xl font-semibold text-white">Avvia la simulazione quando vuoi</h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-300">
                          La demo resta in pausa finche non premi <span className="font-semibold text-white">Live Preview</span>
                        </p>
                        <button
                          type="button"
                          onClick={handleLoadPreview}
                          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                        >
                          <ExternalLink size={18} /> Avvia Live Preview
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video relative overflow-hidden bg-slate-800 flex items-center justify-center">
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
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDemo;
