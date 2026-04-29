import React from 'react';
import { Server, Globe, Database, Terminal } from 'lucide-react';
import dressmeImg from '../assets/dressme.png';
import dinoIaImg from '../assets/dino_ia.png';
import portfolioImg from '../assets/portfolio.png';

export const PERSONAL_INFO = {
  name: "Emanuele Riccardi",
  role: "Software Engineer & Full Stack Developer",
  bio: "Studente in Informatica con una forte passione per l'ingegneria del software. Specializzato nello sviluppo di architetture scalabili e soluzioni backend robuste. Alla ricerca di sfide che uniscano complessita algoritmica e impatto utente.",
  email: "riccardiemanuele2016@outlook.it",
  github: "https://github.com/RCCMNL/",
  linkedin: "https://www.linkedin.com/in/emanuele-riccardi-5819b422a/"
};

export const SKILLS = [
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
    items: ["Selenium", "Junit", "XPath", "CSS Selector"]
  },
  {
    category: "Tools & DevOps",
    icon: <Terminal size={24} />,
    items: ["Git & GitHub", "CI/CD Pipelines", "Linux/Bash", "Maven/Gradle", "Agile/Scrum"]
  }
];

export const PROJECTS = [
  {
    title: "E-Commerce DressMe",
    description: "Piattaforma web per un e-commerce di abbigliamento sviluppata per l'esame di Ingegneria del Software.",
    tech: ["Java EE", "MySQL", "JSP"],
    link: "https://github.com/RCCMNL/ProgettoIS",
    github: "https://github.com/RCCMNL/ProgettoIS",
    image: dressmeImg,
    category: "Java"
  },
  {
    title: "Dino-IA",
    description: "Progetto sviluppato per l'esame di Fondamenti di Intelligenza Artificiale presso l'Università di Salerno (UniSa), qui integrato con una simulazione live basata su algoritmi genetici.",
    tech: ["IA", "Algoritmi Genetici", "Neural Networks", "Evolutionary Computing"],
    link: "https://github.com/RCCMNL/progetto-fia-dino-ia/tree/demo-portfolio",
    github: "https://github.com/RCCMNL/progetto-fia-dino-ia/tree/demo-portfolio",
    image: dinoIaImg,
    category: "Java"
  },
  {
    title: "Portfolio Personale",
    description: "Single Page Application reattiva per mostrare competenze frontend.",
    tech: ["React", "Tailwind CSS", "Vite"],
    link: "#",
    github: "#",
    image: portfolioImg,
    category: "React"
  }
];
