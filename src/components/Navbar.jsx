import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { PERSONAL_INFO } from '../data';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    // Su desktop (isMobile = false), nascondi allo scroll giù
    if (!isMobile) {
      if (latest > previous && latest > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    } else {
      // Su mobile/tablet è sempre visibile
      setHidden(false);
    }
    
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Competenze', href: '#skills' },
    { name: 'Progetti', href: '#projects' },
    { name: 'Contatti', href: '#contact' },
  ];

  return (
    <motion.nav 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed w-full z-50 flex justify-center transition-all duration-300 ${
        isMobile ? 'top-0 px-0' : 'top-4 px-4'
      }`}
    >
      <motion.div 
        layout
        initial={false}
        transition={{ 
          type: "spring", 
          stiffness: 120, 
          damping: 25,
          layout: { duration: 0.5 } 
        }}
        className={`flex items-center justify-between w-full transition-all duration-500 ${
          scrolled 
            ? isMobile 
              ? 'max-w-full bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 py-4 px-6 shadow-xl'
              : 'max-w-5xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-full py-2 px-6 shadow-2xl shadow-blue-900/10' 
            : 'max-w-7xl bg-transparent py-4 px-6'
        }`}
      >
        <motion.div 
          layout="position"
          className="flex-shrink-0 font-bold text-xl text-blue-400"
        >
          <a href="#home" className="hover:opacity-80 transition-opacity">
            &lt;{PERSONAL_INFO.name.split(' ')[0]} /&gt;
          </a>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <motion.a 
              layout="position"
              key={link.name} 
              href={link.href} 
              className="relative text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors group"
            >
              <span className="relative z-10">{link.name}</span>
              <motion.span 
                className="absolute inset-0 bg-blue-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                layoutId="nav-hover"
              />
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <motion.div layout="position" className="lg:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-gray-400 hover:text-white p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-slate-900/98 backdrop-blur-2xl border-b border-slate-700/50 shadow-2xl overflow-hidden lg:hidden"
          >
            <div className="px-6 py-8 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-gray-300 hover:text-blue-400 block text-2xl font-semibold transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
