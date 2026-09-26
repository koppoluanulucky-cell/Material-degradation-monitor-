import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MonitorPage } from './pages/MonitorPage';
import { DashboardPage } from './pages/DashboardPage';
import { MaterialsPage } from './pages/MaterialsPage';
import { AboutPage } from './pages/AboutPage';
import { MaterialType } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    if (['home', 'monitor', 'dashboard', 'materials', 'about'].includes(hash)) {
      return hash;
    }
    return 'home';
  });

  const [prefillMaterial, setPrefillMaterial] = useState<MaterialType | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'monitor', 'dashboard', 'materials', 'about'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMaterialToMonitor = (material: MaterialType) => {
    setPrefillMaterial(material);
    setCurrentPage('monitor');
    window.location.hash = 'monitor';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content View Container */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'monitor' && (
          <MonitorPage
            onNavigate={handleNavigate}
            prefillMaterial={prefillMaterial}
          />
        )}
        {currentPage === 'dashboard' && <DashboardPage onNavigate={handleNavigate} />}
        {currentPage === 'materials' && (
          <MaterialsPage onSelectMaterialToMonitor={handleSelectMaterialToMonitor} />
        )}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
      </main>

      {/* Standardized Educational Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
