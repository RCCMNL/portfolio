import React, { useState } from 'react';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data';

const ProjectCard = ({ project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const projectPath = `/progetti/${project.title.toLowerCase().replace(/\s+/g, '-')}`;

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 flex flex-col hover:border-blue-500/50 transition-colors shadow-2xl group"
    >
      <div className="h-52 bg-slate-800 relative overflow-hidden">
        <motion.img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/40 backdrop-blur-[2px] gap-4 z-10">
          <motion.a 
            whileHover={{ scale: 1.1, backgroundColor: '#3b82f6', color: '#fff' }}
            whileTap={{ scale: 0.9 }}
            href={project.github} 
            target="_blank" 
            rel="noreferrer"
            className="p-3 bg-white/90 rounded-full text-slate-900 transition-all"
            title="GitHub Repository"
          >
            <Github size={20} />
          </motion.a>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link 
              to={projectPath}
              className="p-3 bg-white/90 rounded-full text-slate-900 transition-all hover:bg-blue-500 hover:text-white flex items-center justify-center"
              title="Project Demo"
            >
              <ExternalLink size={20} />
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
          <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">
            {project.category}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((tech, idx) => (
            <span key={idx} className="px-3 py-1 bg-slate-800/50 text-gray-300 text-xs rounded-full border border-slate-700 group-hover:border-blue-500/30 transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('Tutti');
  const categories = ['Tutti', 'Java', 'React'];

  const filteredProjects = filter === 'Tutti' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-slate-800/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Progetti <span className="text-blue-500">Selezionati</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Una selezione dei miei lavori più recenti, spaziando dal backend complesso al frontend reattivo.</p>
          
          <div className="flex justify-center gap-4 mt-10">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all border ${
                  filter === cat 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/25' 
                    : 'bg-slate-800 border-slate-700 text-gray-400 hover:border-slate-500'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
