import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FolderOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';

const NotFound = () => {
  useSEO({
    title: '404 | Pagina non trovata - Emanuele Riccardi',
    description: 'La pagina richiesta non esiste o e stata spostata. Torna alla home o visita i progetti del portfolio.',
    robots: 'noindex, follow',
  });

  return (
    <section className="min-h-[72vh] px-4 sm:px-6 lg:px-10 xl:px-12 pt-32 pb-20 bg-slate-900 text-white flex items-center">
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-slate-700 bg-slate-800/45 backdrop-blur-xl p-8 sm:p-12 shadow-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">Errore 404</p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-white">
            Questa pagina non esiste.
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300">
            Il link potrebbe essere cambiato oppure la risorsa che stai cercando non e disponibile.
            Puoi tornare alla home o ripartire dai progetti principali del portfolio.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              <ArrowLeft size={18} /> Torna alla Home
            </Link>
            <Link
              to="/#projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-900/70 px-6 py-3 font-medium text-slate-100 transition-all hover:border-blue-500/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              <FolderOpen size={18} /> Vedi i Progetti
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;
