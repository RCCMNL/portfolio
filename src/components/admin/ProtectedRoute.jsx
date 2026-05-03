import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { ShieldX, Loader2 } from 'lucide-react';

/**
 * Wrapper che protegge le rotte admin.
 * - Se in caricamento: mostra spinner
 * - Se non autenticato: redirect a /admin/login
 * - Se autenticato ma non admin: mostra pagina "Accesso negato"
 * - Se admin: renderizza i children
 */
const ProtectedRoute = ({ children }) => {
  const { currentUser, isAdmin, loading, logout } = useAuth();

  // Stato di caricamento iniziale dell'auth
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        >
          <Loader2 size={40} className="text-blue-400" />
        </motion.div>
      </div>
    );
  }

  // Utente non autenticato → redirect al login
  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  // Utente autenticato ma non admin → accesso negato
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
            <ShieldX size={40} className="text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Accesso Negato</h2>
          <p className="text-gray-400 mb-6">
            L'account <span className="text-white font-medium">{currentUser.email}</span> non è autorizzato ad accedere al pannello di amministrazione.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors text-center"
            >
              Torna al Portfolio
            </a>
            <button
              onClick={() => logout()}
              className="px-6 py-3 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/20 rounded-xl transition-all font-medium"
            >
              Cambia Account
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
