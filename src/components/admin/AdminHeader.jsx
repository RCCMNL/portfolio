import React from 'react';
import { LogOut, User, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import DataMigration from './DataMigration';

/**
 * Header per la dashboard admin.
 * Mostra il titolo della sezione e un tasto rapido di logout.
 */
const AdminHeader = ({ title, onMenuClick }) => {
  const { logout, currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Errore logout:', err);
    }
  };

  return (
    <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <User size={20} />
        </button>
        <h1 className="text-xl font-bold text-white capitalize">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <DataMigration />
        <div className="hidden sm:flex flex-col items-end mr-2">
          <span className="text-xs font-medium text-white">{currentUser?.email?.split('@')[0]}</span>
          <span className="text-[10px] text-emerald-400 font-medium">Online</span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="p-2.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-500/20"
          title="Esci"
        >
          <LogOut size={20} />
        </motion.button>
      </div>
    </header>
  );
};

export default AdminHeader;
