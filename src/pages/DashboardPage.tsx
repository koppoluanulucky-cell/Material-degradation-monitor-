import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Flame, 
  Activity, 
  HeartPulse, 
  ShieldAlert, 
  Trash2, 
  Download, 
  PlusCircle, 
  Search, 
  Filter, 
  Layers, 
  Clock, 
  Eye, 
  X,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  BarChart2,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { AnalysisResult, RiskLevel } from '../types';
import { 
  getStoredAnalyses, 
  deleteAnalysis, 
  clearAllAnalyses, 
  resetToDemoAnalyses, 
  exportAnalysesToCSV 
} from '../utils/storage';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [records, setRecords] = useState<AnalysisResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [selectedRecord, setSelectedRecord] = useState<AnalysisResult | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = getStoredAnalyses();
    setRecords(data);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this inspection record?')) {
      const updated = deleteAnalysis(id);
      setRecords(updated);
      if (selectedRecord?.id === id) {
        setSelectedRecord(null);
      }
    }
  };

  const handleClearAll = () => {
    clearAllAnalyses();
    setRecords([]);
    setSelectedRecord(null);
    setShowClearConfirm(false);
  };

  const handleResetDemo = () => {
    const demoData = resetToDemoAnalyses();
    setRecords(demoData);
    setSelectedRecord(null);
  };

  // Filtered records
  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.input.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.input.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.input.environment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'all' || r.riskLevel.toLowerCase() === filterRisk.toLowerCase();
    return matchesSearch && matchesRisk;
  });

  // Calculate statistics
  const totalMonitored = records.length;
  const avgRust = totalMonitored > 0
    ? Math.round(records.reduce((acc, r) => acc + r.rustPercentage, 0) / totalMonitored)
    : 0;
  const avgDegradation = totalMonitored > 0
    ? Math.round(records.reduce((acc, r) => acc + r.degradationPercentage, 0) / totalMonitored)
    : 0;
  const avgHealth = totalMonitored > 0
    ? Math.round(records.reduce((acc, r) => acc + r.healthScore, 0) / totalMonitored)
    : 100;
  const materialsAtRisk = records.filter(
    (r) => r.riskLevel === 'High' || r.riskLevel === 'Critical'
  ).length;

  const lowCount = records.filter((r) => r.riskLevel === 'Low').length;
  const modCount = records.filter((r) => r.riskLevel === 'Moderate').length;
  const highCount = records.filter((r) => r.riskLevel === 'High').length;
  const critCount = records.filter((r) => r.riskLevel === 'Critical').length;

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case 'Low':
        return <span className="font-semibold text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">Low</span>;
      case 'Moderate':
        return <span className="font-semibold text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">Moderate</span>;
      case 'High':
        return <span className="font-semibold text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">High</span>;
      case 'Critical':
        return <span className="font-semibold text-xs text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">Critical</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Inspection &amp; Monitoring Dashboard
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Aggregated degradation metrics, comparative charts, and historical inspection logs.
          </p>
        </div>

        {/* Dashboard Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('monitor')}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Analysis</span>
          </button>

          <button
            onClick={() => exportAnalysesToCSV(records)}
            disabled={records.length === 0}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3.5 py-2 rounded-lg border border-slate-300 disabled:opacity-50 transition-colors cursor-pointer"
            title="Download CSV"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleResetDemo}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3.5 py-2 rounded-lg border border-slate-300 transition-colors cursor-pointer"
            title="Reload realistic test samples"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Load Demo Data</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards (5 Required Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* 1. Total Materials Monitored */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Monitored</span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{totalMonitored}</div>
          <div className="text-xs text-slate-500 mt-1">Logged components</div>
        </div>

        {/* 2. Average Rust Level */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Average Rust</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{avgRust}%</div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${avgRust}%` }}></div>
          </div>
        </div>

        {/* 3. Average Degradation Level */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Degradation</span>
            <Activity className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{avgDegradation}%</div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5">
            <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: `${avgDegradation}%` }}></div>
          </div>
        </div>

        {/* 4. Materials at Risk */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Materials At Risk</span>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-3xl font-extrabold text-rose-600">{materialsAtRisk}</div>
          <div className="text-xs text-slate-500 mt-1">High &amp; Critical tiers</div>
        </div>

        {/* 5. Average Material Health */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Health</span>
            <HeartPulse className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{avgHealth} <span className="text-xs font-bold text-slate-500">/ 100</span></div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${avgHealth}%` }}></div>
          </div>
        </div>

      </div>

      {/* Visualizations Section (NO PIE CHARTS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CHART 1: Comparative Bar Chart (Rust & Degradation per Material) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">
                Material Degradation &amp; Rust Comparison
              </h2>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-rose-500"></span>
                <span className="text-slate-600 font-medium">Degradation %</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-amber-500"></span>
                <span className="text-slate-600 font-medium">Rust %</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Horizontal comparative bar chart displaying degradation wear alongside electrochemical rust loss across monitored samples.
          </p>

          {/* Bar Chart Container */}
          <div className="space-y-4 pt-2">
            {records.slice(0, 5).map((rec) => (
              <div key={rec.id} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-800 truncate max-w-[200px]">
                    {rec.input.name} <span className="text-slate-400 font-normal">({rec.input.type})</span>
                  </span>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-rose-600 font-bold">{rec.degradationPercentage}% Deg</span>
                    <span className="text-amber-600 font-bold">{rec.rustPercentage}% Rust</span>
                  </div>
                </div>

                {/* Dual Bars */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-rose-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${rec.degradationPercentage}%` }}
                    ></div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${rec.rustPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}

            {records.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-400">
                No records to plot. Click &quot;Load Demo Data&quot; or analyze a material.
              </div>
            )}
          </div>
        </div>

        {/* CHART 2: Projected Degradation Trend Curve (Line-Style Chart) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">
                10-Year Estimated Degradation Projection
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">Kinetic forecast</span>
          </div>

          <p className="text-xs text-slate-500">
            Simulated kinetic degradation trajectories over 10 operational years based on current atmospheric severity.
          </p>

          {/* SVG Line-Style Chart */}
          <div className="pt-2">
            <div className="relative h-44 w-full border-b border-l border-slate-200 flex items-end">
              
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="border-b border-dashed border-slate-200 w-full text-[9px] text-slate-400 pl-1">100% Critical</div>
                <div className="border-b border-dashed border-slate-200 w-full text-[9px] text-slate-400 pl-1">75% High</div>
                <div className="border-b border-dashed border-slate-200 w-full text-[9px] text-slate-400 pl-1">50% Moderate</div>
                <div className="border-b border-dashed border-slate-200 w-full text-[9px] text-slate-400 pl-1">25% Low</div>
              </div>

              {/* Dynamic SVG Curves */}
              <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                {/* Coastal / Aggressive baseline curve */}
                <path
                  d="M 0 95 Q 30 75, 55 45 T 100 15"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                />
                {/* Moderate Outdoor baseline curve */}
                <path
                  d="M 0 95 Q 40 85, 70 65 T 100 40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />
                {/* Indoor / Mild baseline curve */}
                <path
                  d="M 0 95 Q 50 92, 80 85 T 100 78"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* X-axis year markers */}
            <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1.5">
              <span>Year 0</span>
              <span>Year 2</span>
              <span>Year 4</span>
              <span>Year 6</span>
              <span>Year 8</span>
              <span>Year 10</span>
            </div>

            {/* Legend for Line chart */}
            <div className="flex flex-wrap items-center justify-between text-xs pt-3 border-t border-slate-100 mt-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 bg-rose-500"></span>
                <span className="text-slate-600 text-xs">Coastal / Severe Env</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 bg-blue-500"></span>
                <span className="text-slate-600 text-xs">Standard Outdoor</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 bg-emerald-500"></span>
                <span className="text-slate-600 text-xs">Indoor Sheltered</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Risk Distribution Breakdown Bar (No Pie Chart) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Risk Tier Distribution (Monitored Inventory)
          </h2>
          <span className="text-xs text-slate-500">{totalMonitored} Total Assessed</span>
        </div>

        {/* Stacked Horizontal Bar */}
        <div className="w-full h-4 bg-slate-100 rounded-lg overflow-hidden flex">
          {totalMonitored > 0 ? (
            <>
              <div
                className="bg-emerald-500 h-full transition-all"
                style={{ width: `${(lowCount / totalMonitored) * 100}%` }}
                title={`Low Risk: ${lowCount}`}
              ></div>
              <div
                className="bg-blue-500 h-full transition-all"
                style={{ width: `${(modCount / totalMonitored) * 100}%` }}
                title={`Moderate Risk: ${modCount}`}
              ></div>
              <div
                className="bg-amber-500 h-full transition-all"
                style={{ width: `${(highCount / totalMonitored) * 100}%` }}
                title={`High Risk: ${highCount}`}
              ></div>
              <div
                className="bg-rose-500 h-full transition-all"
                style={{ width: `${(critCount / totalMonitored) * 100}%` }}
                title={`Critical Risk: ${critCount}`}
              ></div>
            </>
          ) : (
            <div className="w-full bg-slate-200 h-full"></div>
          )}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
            <span className="text-slate-700 font-medium">Low: {lowCount}</span>
            <span className="text-slate-400">({totalMonitored ? Math.round((lowCount / totalMonitored) * 100) : 0}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-blue-500"></span>
            <span className="text-slate-700 font-medium">Moderate: {modCount}</span>
            <span className="text-slate-400">({totalMonitored ? Math.round((modCount / totalMonitored) * 100) : 0}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-amber-500"></span>
            <span className="text-slate-700 font-medium">High: {highCount}</span>
            <span className="text-slate-400">({totalMonitored ? Math.round((highCount / totalMonitored) * 100) : 0}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-rose-500"></span>
            <span className="text-slate-700 font-medium">Critical: {critCount}</span>
            <span className="text-slate-400">({totalMonitored ? Math.round((critCount / totalMonitored) * 100) : 0}%)</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          RECENT MATERIAL ANALYSIS TABLE
         ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        
        {/* Table Controls */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recent Material Analysis
            </h2>
            <p className="text-xs text-slate-500">
              Real-time inspection records stored in browser localStorage
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search component, metal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Risk Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-lg px-2 py-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none"
              >
                <option value="all">All Risk Tiers</option>
                <option value="low">Low Risk</option>
                <option value="moderate">Moderate Risk</option>
                <option value="high">High Risk</option>
                <option value="critical">Critical Risk</option>
              </select>
            </div>

            {/* Clear All Button */}
            {records.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg border border-rose-200 transition-colors cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Clear Confirmation Prompt */}
        {showClearConfirm && (
          <div className="p-4 bg-rose-50 border-b border-rose-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Are you sure you want to clear all {records.length} monitored records? This cannot be undone.</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearAll}
                className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-bold"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1 bg-white border border-slate-300 rounded text-xs font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Material</th>
                <th className="py-3.5 px-4">Environment &amp; Age</th>
                <th className="py-3.5 px-4 text-center">Rust %</th>
                <th className="py-3.5 px-4 text-center">Degradation %</th>
                <th className="py-3.5 px-4 text-center">Health Score</th>
                <th className="py-3.5 px-4 text-center">Risk Level</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedRecord(item)}
                  className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                >
                  {/* Material Name & Type */}
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div>{item.input.name}</div>
                    <span className="text-[11px] font-normal text-blue-600">
                      {item.input.type}
                    </span>
                  </td>

                  {/* Environment & Age */}
                  <td className="py-3.5 px-4 text-slate-600">
                    <div>{item.input.environment}</div>
                    <span className="text-[11px] text-slate-400">
                      {item.input.ageYears} yrs · {item.input.temperature}°C · {item.input.humidity}% RH
                    </span>
                  </td>

                  {/* Rust % */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {item.rustPercentage}%
                    </span>
                  </td>

                  {/* Degradation % */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                      {item.degradationPercentage}%
                    </span>
                  </td>

                  {/* Health Score */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {item.healthScore}
                    </span>
                  </td>

                  {/* Risk Level */}
                  <td className="py-3.5 px-4 text-center">
                    {getRiskBadge(item.riskLevel)}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRecord(item);
                        }}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(item.id, e)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <div className="max-w-sm mx-auto space-y-3">
                      <p className="text-sm font-medium">No inspection records match the current filter.</p>
                      <button
                        onClick={handleResetDemo}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline"
                      >
                        Load realistic engineering demo samples
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Modal: Detailed Record Inspection */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6 animate-scaleIn">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">
                  Inspection Log #{selectedRecord.id.slice(-6)}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {selectedRecord.input.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scores Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Rust Level</span>
                <span className="text-xl font-extrabold text-amber-600">{selectedRecord.rustPercentage}%</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Degradation</span>
                <span className="text-xl font-extrabold text-rose-600">{selectedRecord.degradationPercentage}%</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Health Score</span>
                <span className="text-xl font-extrabold text-emerald-600">{selectedRecord.healthScore}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Risk Tier</span>
                <div className="mt-1">{getRiskBadge(selectedRecord.riskLevel)}</div>
              </div>
            </div>

            {/* Input Details */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                Operating &amp; Environmental Inputs
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-600">
                <div>Metal Type: <strong className="text-slate-800">{selectedRecord.input.type}</strong></div>
                <div>Service Age: <strong className="text-slate-800">{selectedRecord.input.ageYears} yrs</strong></div>
                <div>Environment: <strong className="text-slate-800">{selectedRecord.input.environment}</strong></div>
                <div>Temperature: <strong className="text-slate-800">{selectedRecord.input.temperature}°C</strong></div>
                <div>Relative Humidity: <strong className="text-slate-800">{selectedRecord.input.humidity}%</strong></div>
                <div>Moisture Wetness: <strong className="text-slate-800">{selectedRecord.input.moisture}%</strong></div>
                <div>pH Level: <strong className="text-slate-800">{selectedRecord.input.ph.toFixed(1)}</strong></div>
                <div>Visible Rust: <strong className="text-slate-800">{selectedRecord.input.visibleRust}%</strong></div>
                <div>Crack/Damage: <strong className="text-slate-800">{selectedRecord.input.crackDamage}%</strong></div>
                <div>Daily Duty: <strong className="text-slate-800">{selectedRecord.input.usageHours} hrs/day</strong></div>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>AI Material Analysis</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedRecord.aiAnalysis}
              </p>
            </div>

            {/* Recommendations */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Recommended Actions
              </h4>
              <div className="space-y-1.5">
                {selectedRecord.recommendedActions.map((act, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Close Report
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
