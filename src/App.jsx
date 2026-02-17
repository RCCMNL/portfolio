import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Server, 
  Database, 
  Terminal, 
  Globe,
  Download,
  Menu,
  X
} from 'lucide-react';

// --- DATI PERSONALIZZABILI ---
const PERSONAL_INFO = {
  name: "Emanuele Riccardi",
  role: "Software Engineer & Full Stack Developer",
  bio: "Neolaureato in Informatica con una forte passione per l'ingegneria del software. Specializzato nello sviluppo di architetture scalabili e soluzioni backend robuste. Alla ricerca di sfide che uniscano complessità algoritmica e impatto utente.",
  email: "riccardiemanuele2016@outlook.it",
  github: "https://github.com/RCCMNL/",
  linkedin: "https://www.linkedin.com/in/emanuele-riccardi-5819b422a/"
};

const SKILLS = [
  {
    category: "Backend & Data",
    icon: <Server size={24} />,
    items: ["Java Enterprise (EE/Jakarta)", "Spring Boot", "Python", "Node.js", "MySQL"]
  },
  {
    category: "Frontend & UI",
    icon: <Globe size={24} />,
    items: ["React.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3", "Responsive Design"]
  },
  {
    category: "Software Testing",
    icon: <Database size={24} />,
    items: ["Selenium", "Junit" ,"X-path", "css-Selector"]
  },
  {
    category: "Tools & DevOps",
    icon: <Terminal size={24} />,
    items: ["Git & GitHub", "CI/CD Pipelines", "Linux/Bash", "Maven/Gradle", "Agile/Scrum"]
  }
];

const PROJECTS = [
  {
    title: "E-Commerce DressMe",
    description: "Piattaforma web per un e-commerce di abbigliamento esame di Ingegneria del software",
    tech: ["Java EE", "MySQL", "JSP"],
    link: "https://github.com/RCCMNL/ProgettoIS",
    github: "https://github.com/RCCMNL/ProgettoIS"
  },
  {
    title: "Dino-IA",
    description: "Algotitmo genetico svilippato per esame di FIA",
    tech: ["java", "js"],
    link: "https://github.com/RCCMNL/Progetto-FIA",
    github: "https://github.com/RCCMNL/Progetto-FIA"
  },
  {
    title: "Portfolio Personale",
    description: "Single Page Application reattiva per mostrare competenze frontend.",
    tech: ["React", "Tailwind CSS", "Vite"],
    link: "#",
    github: "#"
  }
];

// --- COMPONENTI UI ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Competenze', href: '#skills' },
    { name: 'Progetti', href: '#projects' },
    { name: 'Contatti', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-bold text-xl text-blue-400">
            &lt;{PERSONAL_INFO.name.split(' ')[0]} /&gt;
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-gray-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-slate-900 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold border border-blue-500/20">
            Disponibile per nuove opportunità
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Ciao, sono <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{PERSONAL_INFO.name}</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-400 font-light">{PERSONAL_INFO.role}</h2>
          <p className="text-gray-300 max-w-lg mx-auto md:mx-0 leading-relaxed">{PERSONAL_INFO.bio}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <a href="#projects" className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
              <Code2 size={20} /> Vedi Progetti
            </a>
            <a href="#contact" className="px-8 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all border border-slate-600 flex items-center justify-center gap-2">
              <Mail size={20} /> Contattami
            </a>
          </div>
          <div className="flex justify-center md:justify-start gap-6 pt-6 text-gray-400">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Github size={24} /></a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors"><Linkedin size={24} /></a>
          </div>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <div className="relative z-10 w-full h-full rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 flex flex-col justify-between shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="space-y-4 font-mono text-sm text-gray-300">
                <p><span className="text-purple-400">class</span> <span className="text-yellow-300">Dev</span> {'{'}</p>
                <p className="pl-4">status: <span className="text-green-400">"Contattami..."</span>;</p>
                <p className="pl-4">skills: [<span className="text-green-400">"Java"</span>, <span className="text-green-400">"React"</span>];</p>
                <p className="pl-4">coffee: <span className="text-blue-400">Infinity</span>;</p>
                <p>{'}'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Competenze</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {SKILLS.map((skill, index) => (
            <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 group">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all">
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-100">{skill.category}</h3>
              <ul className="space-y-2">
                {skill.items.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-400 text-sm">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Progetti</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <div key={index} className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 flex flex-col hover:border-blue-500/30 transition-all">
              <div className="h-48 bg-slate-700 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/60 backdrop-blur-sm gap-4">
                  <a href={project.github} className="p-3 bg-white rounded-full text-slate-900 hover:bg-blue-500 hover:text-white transition-colors"><Github size={20} /></a>
                  <a href={project.link} className="p-3 bg-white rounded-full text-slate-900 hover:bg-blue-500 hover:text-white transition-colors"><ExternalLink size={20} /></a>
                </div>
                <Code2 className="absolute bottom-4 left-4 text-white/20 w-24 h-24 transform translate-y-8 -translate-x-4" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-800 text-blue-300 text-xs rounded-full border border-slate-700">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-slate-900 text-white border-t border-slate-800 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Contatti</h2>
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 inline-block w-full max-w-2xl shadow-2xl">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-3 group-hover:bg-blue-500 group-hover:text-white transition-all"><Mail size={32} /></div>
              <span className="text-gray-300 group-hover:text-white">Email</span>
            </a>
            <div className="hidden md:block w-px h-24 bg-slate-700"></div>
            <a href={PERSONAL_INFO.linkedin} className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-3 group-hover:bg-blue-500 group-hover:text-white transition-all"><Linkedin size={32} /></div>
              <span className="text-gray-300 group-hover:text-white">LinkedIn</span>
            </a>
            <div className="hidden md:block w-px h-24 bg-slate-700"></div>
            <div className="flex flex-col items-center group cursor-pointer" onClick={() => alert("Funzionalità PDF da implementare!")}>
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-3 group-hover:bg-blue-500 group-hover:text-white transition-all"><Download size={32} /></div>
              <span className="text-gray-300 group-hover:text-white">Resume</span>
            </div>
          </div>
        </div>
        <footer className="mt-20 text-gray-600 text-sm"><p>© {new Date().getFullYear()} {PERSONAL_INFO.name}</p></footer>
      </div>
    </section>
  );
};

const App = () => {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-200 font-sans selection:bg-blue-500 selection:text-white">
      <Navbar /><Hero /><Skills /><Projects /><Contact />
    </div>
  );
};

export default App;