import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProjectDemo from './pages/ProjectDemo';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import ScrollProgress from './components/ScrollProgress';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rotte admin — layout separato, senza Navbar/Contact/Footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Rotte pubbliche — layout standard con Navbar, Contact, Footer */}
          <Route
            path="*"
            element={
              <div className="bg-slate-900 min-h-screen text-slate-200 font-sans selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
                <a
                  href="#main-content"
                  className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-3 focus:text-white focus:shadow-xl"
                >
                  Vai al contenuto principale
                </a>
                <ScrollProgress />

                <div className="relative z-10">
                  <Navbar />
                  <main id="main-content">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/progetti/:id" element={<ProjectDemo />} />
                    </Routes>
                  </main>
                  <Contact />
                  <Footer />
                </div>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
      <SpeedInsights />
    </Router>
  );
};

export default App;
