import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import AdminHeader from '../components/admin/AdminHeader';
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

const sectionLabels = {
  info: 'Informazioni Personali',
  hero: 'Configurazione Hero',
  projects: 'Gestione Progetti',
  skills: 'Competenze & Skills',
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

      <div className="flex-1 min-w-0 flex flex-col">
        <AdminHeader 
          title={sectionLabels[activeSection]} 
          onMenuClick={() => setSidebarOpen(true)} 
        />

        {/* Contenuto principale */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 lg:p-10 max-w-6xl overflow-y-auto"
        >
          <ActiveComponent />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
