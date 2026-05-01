import React from 'react';
import { Code2, Mail, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-24 pb-12 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-center md:text-left space-y-6 max-w-xl"
        >
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold border border-blue-500/20"
          >
            Disponibile per nuove opportunità
          </motion.div> */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight">
            Ciao, sono <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{PERSONAL_INFO.name}</span>
          </h1>
          <h2 className="text-lg md:text-2xl text-gray-400 font-light">{PERSONAL_INFO.role}</h2>
          <p className="text-gray-300 max-w-lg mx-auto md:mx-0 leading-relaxed text-sm md:text-base">{PERSONAL_INFO.bio}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects" 
              className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
            >
              <Code2 size={20} /> Vedi Progetti
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              className="px-8 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors border border-slate-600 flex items-center justify-center gap-2"
            >
              <Mail size={20} /> Contattami
            </motion.a>
          </div>
          <div className="flex justify-center md:justify-start gap-6 pt-6 text-gray-400">
            <motion.a whileHover={{ y: -5, color: '#ffffff' }} href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="transition-colors"><Github size={24} /></motion.a>
            <motion.a whileHover={{ y: -5, color: '#60a5fa' }} href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="transition-colors"><Linkedin size={24} /></motion.a>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative"
        >
          <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md aspect-square">
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <motion.div 
              animate={{ 
                rotate: [3, -3, 3],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10 w-full h-full rounded-2xl bg-slate-800/80 md:bg-slate-800/50 md:backdrop-blur-xl border border-slate-700 p-6 md:p-4 lg:p-8 flex flex-col justify-between shadow-2xl transition-transform duration-500"
            >
              <div className="space-y-4 font-mono text-xs lg:text-sm text-gray-300">
                <p><span className="text-purple-400">class</span> <span className="text-yellow-300">Dev</span> {'{'}</p>
                <p className="pl-4">status: <span className="text-green-400">"Contattami..."</span>;</p>
                <p className="pl-4">skills: [<span className="text-green-400">"Java"</span>, <span className="text-green-400">"React"</span>];</p>
                <p className="pl-4">coffee: <span className="text-blue-400">Infinity</span>;</p>
                <p>{'}'}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
