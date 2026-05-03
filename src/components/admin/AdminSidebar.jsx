import React from 'react';
import { motion } from 'framer-motion';
import { User, Layout, FolderOpen, Zap, LogOut, Home } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const sections = [
  { id: 'info', label: 'Informazioni', icon: User },
  { id: 'hero', label: 'Hero', icon: Layout },
  { id: 'projects', label: 'Progetti', icon: FolderOpen },
  { id: 'skills', label: 'Competenze', icon: Zap },
];

/**
 * Sidebar di navigazione per il pannello admin.
 * Mostra le sezioni disponibili e gestisce la navigazione interna.
 */
const AdminSidebar = ({ activeSection, onSectionChange, isOpen, onClose }) => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Errore logout:', err);
    }
  };

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed top-0 left-0 h-full w-72 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 z-50 flex flex-col lg:translate-x-0 lg:static lg:z-auto`}
        style={{ transform: undefined }}
      >
        {/* Header sidebar */}
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-blue-400">&lt;</span>
            Admin
            <span className="text-blue-400">/&gt;</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1 truncate">{currentUser?.email}</p>
        </div>

        {/* Navigazione */}
        <nav className="flex-1 p-4 space-y-1.5">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => {
                  onSectionChange(section.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon size={18} />
                {section.label}
                {isActive && (
                  <motion.div
                    layoutId="admin-sidebar-active"
                    className="ml-auto w-1.5 h-1.5 bg-blue-400 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer sidebar */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            <Home size={18} />
            Vai al Portfolio
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={18} />
            Esci
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;
