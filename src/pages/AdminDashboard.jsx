import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import AdminSidebar from '../components/admin/AdminSidebar';
import PersonalInfoEditor from '../components/admin/PersonalInfoEditor';
import HeroEditor from '../components/admin/HeroEditor';
import ProjectsManager from '../components/admin/ProjectsManager';
import SkillsManager from '../components/admin/SkillsManager';
import { useSEO } from '../hooks/useSEO';

const sectionComponents = {
  info: PersonalInfoEditor,
  hero: HeroEditor,
  projects: ProjectsManager,
  skills: SkillsManager,
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('info');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useSEO({ title: 'Admin Dashboard - Portfolio', robots: 'noindex, nofollow' });

  const ActiveComponent = sectionComponents[activeSection];

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 min-w-0">
        {/* Header mobile */}
        <div className="lg:hidden flex items-center gap-3 p-4 border-b border-slate-800 bg-slate-900/95 backdrop-blur-xl sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg">
            <Menu size={22} />
          </button>
          <h1 className="text-white font-semibold">Admin</h1>
        </div>

        {/* Contenuto principale */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 lg:p-10 max-w-6xl"
        >
          <ActiveComponent />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
