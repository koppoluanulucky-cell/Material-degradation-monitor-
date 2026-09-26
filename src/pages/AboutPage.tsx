import React from 'react';
import { 
  Info, 
  Target, 
  Cpu, 
  Users, 
  HelpCircle, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  FileCode, 
  Database,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const vivaQuestions = [
    {
      q: 'What is the fundamental difference between Corrosion (Rust) and Material Degradation?',
      a: 'Corrosion (specifically rust in ferrous metals) is an electrochemical surface oxidation process converting refined metals into chemically stable oxides (like Fe₂O₃·nH₂O). Degradation is a broader structural phenomenon encompassing not just chemical corrosion, but also physical micro-cracking, mechanical fatigue from cyclic operating duty, thermal spalling, and loss of load-bearing cross-sectional area.',
    },
    {
      q: 'Why does relative humidity over 60% drastically accelerate rust kinetics?',
      a: 'At relative humidity above ~60% (known as the critical humidity threshold), water vapor condensates at the microscopic surface crevices to form a continuous electrolyte film. This thin aqueous film allows free ionic migration between anodic and cathodic micro-sites on the metal, accelerating galvanic cell reactions.',
    },
    {
      q: 'How does pH impact the corrosion rate of steel vs aluminium?',
      a: 'For carbon steel, corrosion is relatively uniform and slow in neutral to mildly alkaline water (pH 7 to 10) due to passive oxide protection, but spikes exponentially below pH 6 due to rapid hydrogen ion (H⁺) reduction. Aluminium, being an amphoteric metal, dissolves in both acids (pH < 4.5) and alkalis (pH > 8.5) because both H⁺ and OH⁻ attack its Al₂O₃ passive film.',
    },
    {
      q: 'Why was a rule-based AI-style analysis chosen instead of a black-box deep learning model?',
      a: 'In engineering education and project demonstrations, interpretability is paramount. A rule-based heuristic model grounds calculations in explicit material science equations (Arrhenius temperature kinetics, electrolyte conductivity, and cyclic duty factors), making it transparent, verifiable, and easy for students to explain during viva presentations.',
    },
    {
      q: 'What real-world non-destructive testing (NDT) methods would be used in actual industrial inspection?',
      a: 'In actual plant inspections, engineers verify structural integrity using Ultrasonic Thickness Gauging (UT), Magnetic Particle Inspection (MPI), Eddy Current Testing, Radiographic Testing (X-ray), and Dye Penetrant Inspection (DPI) to measure exact remaining wall thickness.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
          <GraduationCap className="w-4 h-4 text-blue-600" />
          B.Tech Engineering Capstone Project
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About the Project
        </h1>
        <p className="text-base text-slate-600">
          Academic documentation, design rationale, and project viva preparation guide.
        </p>
      </div>

      {/* Problem & Proposed Solution Cards (Required) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* The Problem */}
        <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Problem</h2>
          <blockquote className="p-3 bg-rose-50/50 rounded-xl border-l-4 border-rose-500 text-sm font-medium text-slate-700 italic">
            “Rust and material degradation can reduce the strength, durability and service life of engineering materials.”
          </blockquote>
          <p className="text-xs text-slate-600 leading-relaxed pt-2">
            In industrial, civil, and marine infrastructure, undetected corrosion causes premature structural failure, sudden breakdowns, severe safety hazards, and billions in annual economic losses. Traditional manual inspections are often irregular, leaving engineers without quick preliminary estimation tools.
          </p>
        </div>

        {/* Proposed Solution */}
        <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Proposed Solution</h2>
          <blockquote className="p-3 bg-blue-50/50 rounded-xl border-l-4 border-blue-500 text-sm font-medium text-slate-700 italic">
            “This project provides a simple digital system for entering material and environmental information and estimating rust and degradation levels.”
          </blockquote>
          <p className="text-xs text-slate-600 leading-relaxed pt-2">
            By inputting standard metallurgical data alongside environmental parameters (such as relative humidity, temperature, electrolyte pH, and operational duty), the system instantly computes calibrated corrosion indices, structural health scores, hazard risk tiers, and mitigation advice.
          </p>
        </div>

      </div>

      {/* Technologies Used & Target Users (Required) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Technologies Used */}
        <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <FileCode className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">Technologies Used</h2>
          </div>
          
          <ul className="space-y-2.5 text-xs text-slate-700">
            <li className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>HTML</strong> — Semantic markup structure and accessible document hierarchy</span>
            </li>
            <li className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>CSS</strong> — Modern responsive engineering layout with Tailwind styling</span>
            </li>
            <li className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>JavaScript / TypeScript</strong> — Reactive frontend logic, state management, and real-time inputs</span>
            </li>
            <li className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Rule-based AI-style analysis</strong> — Algorithmic electrochemical kinetic heuristics</span>
            </li>
            <li className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Local Storage</strong> — Client-side persistent logging without external server dependency</span>
            </li>
          </ul>
        </div>

        {/* Target Users */}
        <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Target Users</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <h3 className="font-bold text-indigo-900 mb-1">Engineering Students</h3>
              <p className="text-slate-600 leading-relaxed">
                Undergraduate students studying mechanical, materials, civil, or chemical disciplines.
              </p>
            </div>
            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <h3 className="font-bold text-indigo-900 mb-1">Material Science Students</h3>
              <p className="text-slate-600 leading-relaxed">
                Learners exploring oxidation kinetics, passivation mechanisms, and environmental corrosion.
              </p>
            </div>
            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <h3 className="font-bold text-indigo-900 mb-1">College Project Demonstrations</h3>
              <p className="text-slate-600 leading-relaxed">
                Presenting a working interactive prototype during project evaluation and viva committees.
              </p>
            </div>
            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <h3 className="font-bold text-indigo-900 mb-1">Educational Applications</h3>
              <p className="text-slate-600 leading-relaxed">
                Classroom demonstrations and laboratory simulations for preventive plant maintenance.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* College Project Viva / Q&A Demonstration Guide */}
      <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Viva Demonstration &amp; Examiner Q&amp;A Guide
              </h2>
              <p className="text-xs text-slate-500">
                Comprehensive answers to common questions asked during academic evaluation
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
            5 Key Viva Topics
          </span>
        </div>

        <div className="space-y-4">
          {vivaQuestions.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                <span className="text-blue-600 font-mono">Q{idx + 1}.</span>
                <span>{item.q}</span>
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed pl-6 border-l-2 border-blue-400">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold">Ready to demonstrate live in your viva?</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-lg">
            Switch to the Material Monitor to enter live test parameters or load pre-configured college demo cases.
          </p>
        </div>
        <button
          onClick={() => {
            onNavigate('monitor');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-md transition-colors cursor-pointer shrink-0"
        >
          <span>Launch Material Monitor</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
