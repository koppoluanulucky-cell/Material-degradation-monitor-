import React from 'react';
import { AlertTriangle, BookOpen, Layers, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Project Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-white font-bold text-lg">
                AI Material Rust &amp; Degradation Monitor
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              An engineering decision-support model developed for B.Tech project demonstrations. 
              Estimates surface oxidation, electrochemical degradation kinetics, and structural health 
              under diverse atmospheric and industrial operating conditions.
            </p>
            <div className="text-xs text-slate-500 pt-1">
              Department of Engineering Sciences · Academic Project Viva Demonstration
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-400" />
              System Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('monitor'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Material Monitor Tool
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Inspection Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('materials'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Engineering Materials Base
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  About the Project &amp; Viva Q&amp;A
                </button>
              </li>
            </ul>
          </div>

          {/* Supported Metals */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-400" />
              Evaluated Materials
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-400">
              <span className="py-1">Iron (Fe)</span>
              <span className="py-1">Structural Steel</span>
              <span className="py-1">Carbon Steel</span>
              <span className="py-1">Stainless Steel</span>
              <span className="py-1">Aluminium (Al)</span>
              <span className="py-1">Copper (Cu)</span>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-500">
              Rule-based heuristic kinetics model
            </div>
          </div>

        </div>

        {/* Mandatory Educational Disclaimer */}
        <div className="mt-10 pt-6 border-t border-slate-800">
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
                Academic &amp; Educational Disclaimer
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                “This system is an educational prototype and provides estimated results for demonstration purposes. It is not a substitute for professional material inspection, laboratory testing or engineering assessment.”
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 text-xs text-slate-500 gap-2">
            <div>
              © {new Date().getFullYear()} AI Material Rust &amp; Degradation Monitor. B.Tech Engineering Capstone.
            </div>
            <div>
              Designed for local college demonstration · No external server or API keys required
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
