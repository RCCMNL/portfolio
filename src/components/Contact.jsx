import React, { useState } from 'react';
import { Mail, Linkedin, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSettings } from '../hooks/useSettings';

const Contact = () => {
  const { settings: PERSONAL_INFO } = useSettings();
  const [copied, setCopied] = useState(false);

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }

    window.location.href = `mailto:${PERSONAL_INFO.email}`;
  };

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
            
            <motion.button 
              type="button"
              whileHover={{ y: -5 }}
              className="flex flex-col items-center group cursor-pointer relative rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              onClick={handleEmailClick}
              id="email-container"
              aria-describedby={copied ? 'email-copy-feedback' : undefined}
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-3 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-lg">
                <Mail size={32} />
              </div>
              <span className="text-gray-300 group-hover:text-white transition-colors text-sm font-medium">Email</span>
              <span
                id="email-copy-feedback"
                aria-live="polite"
                className={`absolute -top-12 rounded-lg bg-blue-600 px-4 py-2 text-xs text-white shadow-xl whitespace-nowrap transition-all ${
                  copied ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-2'
                }`}
              >
                Email copiata!
              </span>
            </motion.button>
            
            <div className="hidden sm:block w-px h-16 bg-slate-700/50"></div>
            
            <motion.a 
              whileHover={{ y: -5 }}
              href={PERSONAL_INFO.linkedin} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 rounded-2xl"
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
              className="flex flex-col items-center group cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 rounded-2xl"
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
