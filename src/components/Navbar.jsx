import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { PERSONAL_INFO } from '../data';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

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
    if (!isMobile) {
      if (latest > previous && latest > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    } else {
      setHidden(false);
    }
    
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'Competenze', href: 'skills' },
    { name: 'Progetti', href: 'projects' },
    { name: 'Contatti', href: 'contact' },
  ];

  const handleNavClick = (e, href) => {
    // Chiudiamo subito il menu mobile
    setIsOpen(false);

    // Se siamo già nella home, gestiamo lo scroll manualmente
    if (location.pathname === '/' || location.pathname === '') {
      const element = document.getElementById(href);
      if (element) {
        e.preventDefault();
        
        // Un piccolo timeout permette al menu di iniziare a chiudersi
        // evitando conflitti di layout durante lo scroll
        setTimeout(() => {
          const yOffset = -80; // Offset per non far coprire la sezione dalla navbar
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
    // Se non siamo in home, lasciamo che React Router gestisca la navigazione
  };

  return (
    <>
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
            stiffness: 100, 
            damping: 25,
            layout: { duration: 0.6 } 
          }}
          className={`flex items-center justify-between w-full border transition-all duration-700 ${
            scrolled 
              ? isMobile 
                ? 'max-w-full bg-slate-900/95 backdrop-blur-xl border-slate-800/50 border-b-1 border-x-0 border-t-0 py-4 px-6 shadow-xl'
                : 'max-w-5xl bg-slate-900/70 backdrop-blur-xl border-white/10 rounded-full py-2 px-8 shadow-2xl shadow-blue-500/5' 
              : 'max-w-7xl bg-transparent border-transparent py-5 px-6 rounded-none'
          }`}
        >
          <motion.div 
            layout="position"
            className="flex-shrink-0 font-bold text-xl text-blue-400"
          >
            <Link to="/" onClick={(e) => handleNavClick(e, 'home')} className="hover:opacity-80 transition-opacity">
              &lt;{PERSONAL_INFO.name.split(' ')[0]} /&gt;
            </Link>
          </motion.div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <motion.div layout="position" key={link.name}>
                  <Link 
                    to={`/#${link.href}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors group"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <motion.span 
                      className="absolute inset-0 bg-blue-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      layoutId="nav-hover"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div 
              layout="position"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPhotoOpen(true)}
              className="w-10 h-10 rounded-full border-2 border-slate-700 overflow-hidden shadow-lg hover:border-blue-500 transition-colors cursor-pointer ml-2"
            >
              <img src="/profilo.png" alt="Emanuele Riccardi" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div layout="position" className="lg:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-gray-400 hover:text-white p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </motion.div>
          </div>
        </motion.div>

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
                  <Link 
                    key={link.name} 
                    to={`/#${link.href}`}
                    className="text-gray-300 hover:text-blue-400 block text-2xl font-semibold transition-all"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Modal Foto Grande */}
      <AnimatePresence>
        {isPhotoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPhotoOpen(false)}
            className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="w-full max-w-lg aspect-square rounded-full border-8 border-slate-800 shadow-2xl overflow-hidden"
              >
                <img src="/profilo.png" alt="Emanuele Riccardi" className="w-full h-full object-cover" />
              </motion.div>
              
              {/* Tasto X esterno vicino alla foto */}
              <motion.button 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setIsPhotoOpen(false)}
                className="absolute -top-4 -right-4 p-3 bg-red-600 hover:bg-red-500 text-white rounded-full shadow-2xl z-[120] border-4 border-slate-900 transition-all hover:scale-110"
              >
                <X size={24} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
