import React from 'react';
import { 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  FileSearch, 
  HeartPulse, 
  ShieldAlert, 
  Sparkles, 
  Wrench, 
  Zap,
  TrendingDown,
  Layers,
  Thermometer,
  CloudRain,
  Cpu
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const workflowSteps = [
    {
      step: '01',
      title: 'Material Details',
      desc: 'Specify material metallurgy, grade, and historical service age in years.',
      icon: Layers,
      highlight: 'Iron, Carbon Steel, Aluminium, etc.',
    },
    {
      step: '02',
      title: 'Environmental Data',
      desc: 'Input ambient exposure, relative humidity, temperature, moisture, and pH level.',
      icon: CloudRain,
      highlight: 'Coastal, Industrial, Acidic, etc.',
    },
    {
      step: '03',
      title: 'Data Analysis',
      desc: 'Rule-based algorithmic model evaluates oxidation kinetics and stress fatigue.',
      icon: Cpu,
      highlight: 'Heuristic material equations',
    },
    {
      step: '04',
      title: 'Rust & Degradation Estimation',
      desc: 'Computes estimated surface rust loss and overall structural degradation percentage.',
      icon: TrendingDown,
      highlight: 'Dual metric calculation',
    },
    {
      step: '05',
      title: 'Risk Level',
      desc: 'Categorizes structural health into Low, Moderate, High, or Critical threat tiers.',
      icon: ShieldAlert,
      highlight: 'Engineering safety thresholds',
    },
    {
      step: '06',
      title: 'Recommendation',
      desc: 'Generates AI-style contextual explanations and preventive engineering actions.',
      icon: Wrench,
      highlight: 'Targeted maintenance strategy',
    },
  ];

  const keyFeatures = [
    {
      title: 'Rust Level Estimation',
      desc: 'Calculates expected surface iron oxide / electrochemical oxidation percentage using humidity curves and pH conditions.',
      icon: Zap,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      title: 'Material Degradation Analysis',
      desc: 'Holistic calculation accounting for micro-cracks, cyclic operating hours, mechanical stress, and cumulative service life.',
      icon: TrendingDown,
      color: 'text-red-600 bg-red-50 border-red-200',
    },
    {
      title: 'Material Health Score',
      desc: 'A normalized 0–100 health index derived from degradation levels, giving immediate visual clarity on component integrity.',
      icon: HeartPulse,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'Risk Level Detection',
      desc: 'Automated 4-tier risk classification (Low, Moderate, High, Critical) designed to support preventive plant maintenance.',
      icon: ShieldAlert,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      title: 'AI-style Analysis',
      desc: 'Dynamic educational synthesis that explains underlying degradation mechanics and pinpoints specific environmental catalysts.',
      icon: Sparkles,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
    {
      title: 'Preventive Recommendations',
      desc: 'Direct, actionable engineering mitigations: protective coatings, cathodic protection, dehumidification, and NDT inspections.',
      icon: Wrench,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
    },
  ];

  return (
    <div className="space-y-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20">
        <div className="relative max-w-5xl mx-auto text-center space-y-6 px-4">
          
          {/* Academic Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            B.Tech Final Year Engineering Project Demo · Materials Science &amp; Structural Mechanics
          </div>

          {/* Exact Required Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            AI Material Rust &amp; Degradation Monitor
          </h1>

          {/* Exact Required Subtitle */}
          <p className="text-lg sm:text-2xl font-semibold text-blue-700 max-w-3xl mx-auto">
            Smart monitoring and estimation of material degradation using AI-based analysis
          </p>

          {/* Exact Required Short Explanation */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            “Material degradation and corrosion can reduce the strength, durability and service life of engineering materials. This system uses material and environmental inputs to estimate degradation levels and provide simple recommendations.”
          </p>

          {/* Primary Action Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                onNavigate('monitor');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Activity className="w-5 h-5" />
              <span>Start Monitoring</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => {
                onNavigate('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base px-6 py-3.5 rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 transition-all cursor-pointer"
            >
              <span>View Dashboard Records</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">Standard Kinetics</div>
              <div className="text-xl font-bold text-slate-900 mt-1">Arrhenius &amp; pH</div>
              <div className="text-xs text-blue-600 mt-0.5">Electrolyte simulation</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">Supported Metals</div>
              <div className="text-xl font-bold text-slate-900 mt-1">6 Metallurgy Types</div>
              <div className="text-xs text-blue-600 mt-0.5">Iron to Stainless Steel</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">Risk Categorization</div>
              <div className="text-xl font-bold text-slate-900 mt-1">4 Hazard Levels</div>
              <div className="text-xs text-blue-600 mt-0.5">Low to Critical safety</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">Offline Storage</div>
              <div className="text-xl font-bold text-slate-900 mt-1">100% Local</div>
              <div className="text-xs text-blue-600 mt-0.5">No login or API required</div>
            </div>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
            Engineering Process Flow
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            How It Works
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Systematic rule-based pipeline converting raw metallurgical and environmental parameters into actionable structural intelligence.
          </p>
          <div className="mt-4 inline-flex items-center text-xs font-semibold text-slate-700 bg-slate-100 px-4 py-1.5 rounded-lg border border-slate-200">
            Material Details → Environmental Data → Data Analysis → Rust &amp; Degradation Estimation → Risk Level → Recommendation
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowSteps.map((stepItem, index) => {
            const Icon = stepItem.icon;
            return (
              <div
                key={stepItem.step}
                className="relative bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                    Step {stepItem.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {stepItem.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {stepItem.desc}
                </p>
                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{stepItem.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Key Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
            System Capabilities
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Key Features
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Equipped with core inspection modules suitable for college lab viva demonstrations, field simulations, and engineering project showcases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-blue-200 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${feat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Academic Demonstration Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 text-white rounded-2xl p-8 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                Viva &amp; Demonstration Ready
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Ready to demonstrate material corrosion estimation?
              </h3>
              <p className="text-sm sm:text-base text-blue-100 max-w-xl leading-relaxed">
                Test pre-configured engineering presets (e.g. Coastal Bridge Girder, Chemical Acid Flange, Substation Copper) with realistic calculation curves and dynamic AI-style reasoning.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={() => {
                  onNavigate('monitor');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white hover:bg-blue-50 text-blue-800 font-bold px-6 py-3 rounded-xl shadow-md transition-colors text-center text-sm cursor-pointer"
              >
                Open Material Monitor Form
              </button>
              <button
                onClick={() => {
                  onNavigate('materials');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-blue-600/40 hover:bg-blue-600/60 border border-blue-300/30 text-white font-medium px-6 py-3 rounded-xl transition-colors text-center text-sm cursor-pointer"
              >
                Browse Materials Database
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
