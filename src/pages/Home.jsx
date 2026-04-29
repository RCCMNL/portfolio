import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import { useSEO } from '../hooks/useSEO';

const Home = () => {
  const { hash } = useLocation();

  useSEO({
    title: 'Emanuele Riccardi | Software Engineer & Full Stack Developer',
    description:
      'Portfolio di Emanuele Riccardi: progetti web, backend engineering, React, Java e soluzioni scalabili.',
    path: '/',
  });

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <Projects />
      <Skills />
    </>
  );
};

export default Home;
