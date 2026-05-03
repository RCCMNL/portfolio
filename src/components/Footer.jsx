import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { motion } from 'framer-motion';

const Footer = () => {
  const { settings: PERSONAL_INFO } = useSettings();

  return (
    <footer className="py-12 bg-slate-950 border-t border-slate-800 text-center text-gray-500 text-sm">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p>© {new Date().getFullYear()} {PERSONAL_INFO.name} • Sviluppato con React & Tailwind</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
