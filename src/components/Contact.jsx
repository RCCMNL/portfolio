import React from 'react';
import { Mail, Linkedin, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-slate-900 text-white border-t border-slate-800 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Entriamo in <span className="text-blue-500">Contatto</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Sei interessato a collaborare o vuoi semplicemente fare due chiacchiere? Ecco dove puoi trovarmi.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-700 inline-block w-full max-w-2xl shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row justify-around items-center gap-8">
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center group cursor-pointer relative"
              onClick={() => {
                navigator.clipboard.writeText(PERSONAL_INFO.email);
                const toast = document.createElement('div');
                toast.innerText = 'Email copiata!';
                toast.className = 'absolute -top-12 bg-blue-600 text-white text-xs py-2 px-4 rounded-lg shadow-xl animate-bounce whitespace-nowrap';
                document.getElementById('email-container').appendChild(toast);
                setTimeout(() => toast.remove(), 2000);
                window.location.href = `mailto:${PERSONAL_INFO.email}`;
              }}
              id="email-container"
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-3 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-lg">
                <Mail size={32} />
              </div>
              <span className="text-gray-300 group-hover:text-white transition-colors text-sm font-medium">Email</span>
            </motion.div>
            
            <div className="hidden sm:block w-px h-16 bg-slate-700/50"></div>
            
            <motion.a 
              whileHover={{ y: -5 }}
              href={PERSONAL_INFO.linkedin} 
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-3 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-lg">
                <Linkedin size={32} />
              </div>
              <span className="text-gray-300 group-hover:text-white transition-colors text-sm font-medium">LinkedIn</span>
            </motion.a>
            
            <div className="hidden sm:block w-px h-16 bg-slate-700/50"></div>
            
            <motion.a 
              whileHover={{ y: -5 }}
              href="/Riccardi_Emanuele_CV.pdf"
              download="Riccardi_Emanuele_CV.pdf"
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-3 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-lg">
                <Download size={32} />
              </div>
              <span className="text-gray-300 group-hover:text-white transition-colors text-sm font-medium">Resume</span>
            </motion.a>

          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Contact;
