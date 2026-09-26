import React, { useState, useRef } from 'react';
import { 
  Activity, 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  Wrench, 
  Layers, 
  Thermometer, 
  Droplets, 
  Gauge, 
  Clock, 
  Flame, 
  Info,
  Save,
  ArrowRight,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { ExposureEnvironment, MaterialInput, MaterialType, AnalysisResult } from '../types';
import { calculateAnalysis } from '../utils/calculator';
import { saveAnalysis, SAMPLE_PRESETS } from '../utils/storage';

interface MonitorPageProps {
  onNavigate: (page: string) => void;
  prefillMaterial?: MaterialType | null;
}

const DEFAULT_INPUT: MaterialInput = {
  name: 'Structural Support Beam A-12',
  type: 'Steel',
  ageYears: 5,
  environment: 'Outdoor',
  temperature: 28,
  humidity: 65,
  moisture: 50,
  ph: 7.0,
  visibleRust: 15,
  crackDamage: 10,
  usageHours: 12,
};

export const MonitorPage: React.FC<MonitorPageProps> = ({ onNavigate, prefillMaterial }) => {
  const [formData, setFormData] = useState<MaterialInput>(() => {
    if (prefillMaterial) {
      return { ...DEFAULT_INPUT, type: prefillMaterial, name: `${prefillMaterial} Structural Sample` };
    }
    return DEFAULT_INPUT;
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const materialOptions: MaterialType[] = [
    'Iron',
    'Steel',
    'Carbon Steel',
    'Stainless Steel',
    'Aluminium',
    'Copper',
    'Other',
  ];

  const environmentOptions: ExposureEnvironment[] = [
    'Indoor',
    'Outdoor',
    'Coastal',
    'Industrial',
    'High Moisture',
    'Chemical Environment',
  ];

  const handleInputChange = (field: keyof MaterialInput, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (validationError) setValidationError(null);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      type: 'Steel',
      ageYears: 1,
      environment: 'Outdoor',
      temperature: 25,
      humidity: 50,
      moisture: 30,
      ph: 7.0,
      visibleRust: 0,
      crackDamage: 0,
      usageHours: 8,
    });
    setResult(null);
    setValidationError(null);
    setSaveSuccess(false);
  };

  const handleLoadPreset = (index: number) => {
    const preset = SAMPLE_PRESETS[index];
    if (preset) {
      setFormData(preset.input);
      setValidationError(null);
      setResult(null);
      setSaveSuccess(false);
    }
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setValidationError('Please enter a Material Name (e.g., "Bridge Support Girder", "Piping Section #4").');
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    if (formData.ageYears < 0) {
      setValidationError('Age of material cannot be negative.');
      return;
    }

    setValidationError(null);
    setIsAnalyzing(true);

    // Simulate realistic engineering calculation processing
    setTimeout(() => {
      const calculated = calculateAnalysis(formData);
      setResult(calculated);
      // Auto-save to localStorage
      saveAnalysis(calculated);
      setIsAnalyzing(false);
      setSaveSuccess(true);

      // Smooth scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 400);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          badge: 'bg-emerald-600 text-white',
          bar: 'bg-emerald-500',
          text: 'text-emerald-700',
          border: 'border-emerald-300',
        };
      case 'Moderate':
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          badge: 'bg-blue-600 text-white',
          bar: 'bg-blue-500',
          text: 'text-blue-700',
          border: 'border-blue-300',
        };
      case 'High':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          badge: 'bg-amber-600 text-white',
          bar: 'bg-amber-500',
          text: 'text-amber-700',
          border: 'border-amber-300',
        };
      case 'Critical':
      default:
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          badge: 'bg-rose-600 text-white',
          bar: 'bg-rose-500',
          text: 'text-rose-700',
          border: 'border-rose-300',
        };
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Material Rust &amp; Degradation Monitor
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Provide material metallurgy, environmental exposure, and observed physical attributes to run the evaluation model.
            </p>
          </div>

          {/* Quick Preset Selector for Student Demo */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Quick Test Cases:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleLoadPreset(0)}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 transition-colors"
                title="Coastal Marine Pier"
              >
                Coastal Steel
              </button>
              <button
                type="button"
                onClick={() => handleLoadPreset(1)}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 transition-colors"
                title="Acidic Chemical Piping"
              >
                Acidic Stainless
              </button>
              <button
                type="button"
                onClick={() => handleLoadPreset(3)}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 transition-colors"
                title="Industrial Iron Crane Rail"
              >
                Industrial Iron
              </button>
              <button
                type="button"
                onClick={() => handleLoadPreset(2)}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 transition-colors"
                title="Aircraft Aluminium"
              >
                Aero Aluminium
              </button>
            </div>
          </div>
        </div>

        {/* Friendly Validation Alert */}
        {validationError && (
          <div className="mt-4 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 flex items-start gap-3 animate-shake">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-sm font-medium">{validationError}</div>
          </div>
        )}
      </div>

      {/* Main Monitoring Input Form */}
      <form onSubmit={handleAnalyze} className="space-y-8">
        
        {/* SECTION 1: Material Details */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">1. Material Details</h2>
              <p className="text-xs text-slate-500">Metallurgical categorization and operational history</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Material Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Material Name / Component ID <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g. Storage Tank Flange T-04"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
              <span className="text-xs text-slate-500 mt-1 block">Identifier used in inspection logging</span>
            </div>

            {/* Material Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Material Type <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value as MaterialType)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                {materialOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span className="text-xs text-slate-500 mt-1 block">Determines baseline electrochemical oxidation rate</span>
            </div>

            {/* Age of Material */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Age of Material (Years)
                </label>
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {formData.ageYears} {formData.ageYears === 1 ? 'Year' : 'Years'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="0.5"
                  value={formData.ageYears}
                  onChange={(e) => handleInputChange('ageYears', parseFloat(e.target.value) || 0)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.ageYears}
                  onChange={(e) => handleInputChange('ageYears', Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-18 px-2 py-1.5 text-center font-mono text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>
              <span className="text-xs text-slate-500 mt-1 block">Accumulated service lifecycle</span>
            </div>

          </div>
        </div>

        {/* SECTION 2: Environmental Conditions */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">2. Environmental Conditions</h2>
              <p className="text-xs text-slate-500">Atmospheric exposure, moisture content, and chemical environment</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Exposure Environment */}
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Exposure Environment <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.environment}
                onChange={(e) => handleInputChange('environment', e.target.value as ExposureEnvironment)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                {environmentOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className="text-xs text-slate-500 mt-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                {formData.environment === 'Coastal' && '⚠️ High airborne sodium chloride (Cl⁻) accelerating pitting corrosion.'}
                {formData.environment === 'Industrial' && '⚠️ Acid-forming SO₂ and NOₓ combustion pollutants.'}
                {formData.environment === 'Chemical Environment' && '⚠️ Corrosive chemical splashes and solvent vapours.'}
                {formData.environment === 'High Moisture' && '⚠️ Continuous electrolyte surface water layer.'}
                {formData.environment === 'Outdoor' && 'Standard atmospheric weathering, solar UV and rain.'}
                {formData.environment === 'Indoor' && 'Sheltered ambient environment with minimal corrosive salts.'}
              </div>
            </div>

            {/* Sliders for Temp, Humidity, Moisture, pH */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Temperature */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Temperature (°C)
                  </label>
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {formData.temperature}°C
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="-20"
                    max="100"
                    step="1"
                    value={formData.temperature}
                    onChange={(e) => handleInputChange('temperature', parseInt(e.target.value) || 0)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <input
                    type="number"
                    min="-20"
                    max="100"
                    value={formData.temperature}
                    onChange={(e) => handleInputChange('temperature', parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-1 text-center font-mono text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">Ambient or operating temperature</span>
              </div>

              {/* Humidity */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Relative Humidity (%)
                  </label>
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {formData.humidity}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={formData.humidity}
                    onChange={(e) => handleInputChange('humidity', parseInt(e.target.value) || 0)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.humidity}
                    onChange={(e) => handleInputChange('humidity', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-16 px-2 py-1 text-center font-mono text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">Critical threshold &gt;60% accelerates rust</span>
              </div>

              {/* Moisture Level */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Moisture Level (%)
                  </label>
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {formData.moisture}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={formData.moisture}
                    onChange={(e) => handleInputChange('moisture', parseInt(e.target.value) || 0)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.moisture}
                    onChange={(e) => handleInputChange('moisture', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-16 px-2 py-1 text-center font-mono text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">Surface wetness duration factor</span>
              </div>

              {/* pH Value */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    pH Value (0 – 14)
                  </label>
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    pH {formData.ph.toFixed(1)} {formData.ph < 6.5 ? '(Acidic)' : formData.ph > 8.5 ? '(Alkaline)' : '(Neutral)'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="14"
                    step="0.1"
                    value={formData.ph}
                    onChange={(e) => handleInputChange('ph', parseFloat(e.target.value) || 7)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <input
                    type="number"
                    min="0"
                    max="14"
                    step="0.1"
                    value={formData.ph}
                    onChange={(e) => handleInputChange('ph', Math.min(14, Math.max(0, parseFloat(e.target.value) || 7)))}
                    className="w-16 px-2 py-1 text-center font-mono text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">pH &lt; 6.0 depassivates steel rapidly</span>
              </div>

            </div>

          </div>
        </div>

        {/* SECTION 3: Material Condition */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">3. Material Condition</h2>
              <p className="text-xs text-slate-500">Physical visual observations and operational duty cycles</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Visible Rust Level */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Visible Rust Level (%)
                </label>
                <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {formData.visibleRust}%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.visibleRust}
                  onChange={(e) => handleInputChange('visibleRust', parseInt(e.target.value) || 0)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.visibleRust}
                  onChange={(e) => handleInputChange('visibleRust', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-16 px-2 py-1 text-center font-mono text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">Visual inspection estimate of surface rust scale</span>
            </div>

            {/* Crack / Damage Level */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Crack/Damage Level (%)
                </label>
                <span className="font-mono text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                  {formData.crackDamage}%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.crackDamage}
                  onChange={(e) => handleInputChange('crackDamage', parseInt(e.target.value) || 0)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.crackDamage}
                  onChange={(e) => handleInputChange('crackDamage', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-16 px-2 py-1 text-center font-mono text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">Physical cracks, gouges, spalling, or pitted areas</span>
            </div>

            {/* Usage Hours Per Day */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Usage Hours Per Day
                </label>
                <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {formData.usageHours} hrs/day
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={formData.usageHours}
                  onChange={(e) => handleInputChange('usageHours', parseInt(e.target.value) || 0)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <input
                  type="number"
                  min="0"
                  max="24"
                  value={formData.usageHours}
                  onChange={(e) => handleInputChange('usageHours', Math.min(24, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-16 px-2 py-1 text-center font-mono text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">Cyclic mechanical stress &amp; dynamic load</span>
            </div>

          </div>
        </div>

        {/* Buttons: Analyze Material & Reset */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Evaluating Material Degradation Kinetics...</span>
              </>
            ) : (
              <>
                <Activity className="w-5 h-5" />
                <span>Analyze Material</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3.5 rounded-xl border border-slate-300 hover:border-slate-400 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Reset</span>
          </button>
        </div>

      </form>

      {/* =========================================================================
          4. RESULT SECTION (Displayed after analysis)
         ========================================================================= */}
      {result && (
        <div ref={resultRef} className="pt-6 space-y-8 animate-fadeIn">
          
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-8">
            
            {/* Header & Save Confirmation */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  Analysis Outcome
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">
                  Material Condition: {result.input.name}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span>Type: <strong className="text-slate-700">{result.input.type}</strong></span>
                  <span>·</span>
                  <span>Environment: <strong className="text-slate-700">{result.input.environment}</strong></span>
                  <span>·</span>
                  <span>Age: <strong className="text-slate-700">{result.input.ageYears} yrs</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {saveSuccess && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    Saved to Dashboard Records
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
                >
                  <span>Open Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Core Metrics Cards (NO PIE CHARTS!) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Rust Level Card */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Estimated Rust Level
                  </span>
                  <Flame className="w-4 h-4 text-amber-500" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {result.rustPercentage}%
                  </span>
                  <span className="text-xs text-slate-500 font-medium">oxidation</span>
                </div>
                {/* Horizontal Progress Bar */}
                <div className="mt-3 w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-amber-500 h-2.5 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${result.rustPercentage}%` }}
                  ></div>
                </div>
                <span className="text-[11px] text-slate-500 mt-2 block">
                  Electrochemical &amp; visual corrosion index
                </span>
              </div>

              {/* Degradation Level Card */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Degradation Level
                  </span>
                  <Activity className="w-4 h-4 text-rose-500" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {result.degradationPercentage}%
                  </span>
                  <span className="text-xs text-slate-500 font-medium">loss</span>
                </div>
                {/* Horizontal Progress Bar */}
                <div className="mt-3 w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-rose-500 h-2.5 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${result.degradationPercentage}%` }}
                  ></div>
                </div>
                <span className="text-[11px] text-slate-500 mt-2 block">
                  Combined structural wear &amp; crack fatigue
                </span>
              </div>

              {/* Material Health Score Card */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Material Health Score
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {result.healthScore}
                  </span>
                  <span className="text-sm font-bold text-slate-600">/ 100</span>
                </div>
                {/* Horizontal Progress Bar */}
                <div className="mt-3 w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2.5 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${result.healthScore}%` }}
                  ></div>
                </div>
                <span className="text-[11px] text-slate-500 mt-2 block">
                  Health = 100 - Degradation
                </span>
              </div>

              {/* Risk Level Card */}
              <div className={`rounded-xl p-5 border ${getRiskColor(result.riskLevel).bg}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Risk Classification
                  </span>
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-extrabold tracking-tight">
                    {result.riskLevel}
                  </span>
                </div>
                {/* Risk Spectrum Meter */}
                <div className="mt-3 grid grid-cols-4 gap-1 h-2 rounded-full overflow-hidden bg-slate-200">
                  <div className={`h-full ${result.riskLevel === 'Low' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                  <div className={`h-full ${result.riskLevel === 'Moderate' ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
                  <div className={`h-full ${result.riskLevel === 'High' ? 'bg-amber-500' : 'bg-slate-300'}`}></div>
                  <div className={`h-full ${result.riskLevel === 'Critical' ? 'bg-rose-500' : 'bg-slate-300'}`}></div>
                </div>
                <div className="flex justify-between text-[9px] font-bold text-slate-500 mt-1 uppercase">
                  <span>0-20%</span>
                  <span>21-40%</span>
                  <span>41-70%</span>
                  <span>&gt;70%</span>
                </div>
              </div>

            </div>

            {/* Risk Spectrum Legend */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-3">
              <span className="font-semibold text-slate-700">Engineering Safety Tiers:</span>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>0–20% Low Risk</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span>21–40% Moderate Risk</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span>41–70% High Risk</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span>&gt;70% Critical Risk</span>
                </div>
              </div>
            </div>

            {/* =========================================================================
                5. AI-STYLE ANALYSIS
               ========================================================================= */}
            <div className="bg-gradient-to-br from-indigo-50/70 via-blue-50/50 to-slate-50 rounded-2xl p-6 border border-indigo-100 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900">AI Material Analysis</h3>
                </div>
                <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-100/80 px-2.5 py-1 rounded-md border border-indigo-200">
                  AI-style educational analysis
                </span>
              </div>

              {/* Dynamic AI Explanation */}
              <div className="p-4 bg-white/90 rounded-xl border border-indigo-100/80 shadow-xs">
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {result.aiAnalysis}
                </p>
              </div>

              {/* Identified Catalysts / Causes */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Identified Contributing Stress Factors &amp; Causes:
                </h4>
                <ul className="space-y-1.5">
                  {result.possibleCauses.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-[11px] text-slate-500 italic pt-1 border-t border-indigo-100/60">
                Note: This simulation applies rule-based electrochemical kinetics formulas for student engineering demonstrations.
              </div>
            </div>

            {/* =========================================================================
                6. RECOMMENDED ACTIONS
               ========================================================================= */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 space-y-4">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-700" />
                <h3 className="text-base font-bold text-slate-900">
                  Recommended Engineering Actions ({result.riskLevel} Risk Tier)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.recommendedActions.map((action, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-slate-700 leading-relaxed">
                      {action}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                ↑ Modify Input Values
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <span>Go to Historical Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
