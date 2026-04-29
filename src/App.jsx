import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProjectDemo from './pages/ProjectDemo';
import BackgroundBlobs from './components/BackgroundBlobs';
import ScrollProgress from './components/ScrollProgress';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="bg-slate-900 min-h-screen text-slate-200 font-sans selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
        <ScrollProgress />
        {/* <BackgroundBlobs /> */}
        
        <div className="relative z-10">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/progetti/:id" element={<ProjectDemo />} />
            </Routes>
          </main>
          <Contact />
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;