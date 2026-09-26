import React, { useState } from 'react';
import { 
  Layers, 
  ShieldCheck, 
  AlertTriangle, 
  Wrench, 
  Activity, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  Search
} from 'lucide-react';
import { MaterialType } from '../types';

interface MaterialsPageProps {
  onSelectMaterialToMonitor: (material: MaterialType) => void;
}

interface MetalDetail {
  name: MaterialType;
  chemicalSymbol: string;
  properties: string[];
  commonUses: string[];
  corrosionBehaviour: string;
  factorsAffectingDegradation: string[];
  basicProtectionMethods: string[];
  corrosionResistance: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';
  tensileYield: string;
  density: string;
  badgeColor: string;
}

export const MaterialsPage: React.FC<MaterialsPageProps> = ({ onSelectMaterialToMonitor }) => {
  const [activeTab, setActiveTab] = useState<MaterialType | 'all'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const metals: MetalDetail[] = [
    {
      name: 'Iron',
      chemicalSymbol: 'Fe',
      properties: [
        'High magnetic permeability and high density (7.87 g/cm³)',
        'Malleable and ductile in pure form, but relatively brittle when cast',
        'Strong affinity for atmospheric oxygen and moisture',
      ],
      commonUses: [
        'Cast iron pipes and drainage fittings',
        'Heavy engine cylinder blocks and machine tool beds',
        'Architectural railings and decorative structural frames',
      ],
      corrosionBehaviour:
        'Iron undergoes rapid electrochemical oxidation in the presence of water and oxygen, forming reddish-brown hydrated ferric oxide [Fe₂O₃·nH₂O]. Because rust scale is porous and flaky, it does not adhere to the surface, allowing moisture to continuously penetrate deeper into the metal.',
      factorsAffectingDegradation: [
        'Relative humidity crossing the critical 60% threshold',
        'Electrolyte salinity and acidic contaminants (pH < 6.5)',
        'Continuous wetness and lack of ventilation',
      ],
      basicProtectionMethods: [
        'Barrier painting and oil/grease film coatings',
        'Hot-dip galvanizing (sacrificial zinc layer)',
        'Epoxy powder coating and red-oxide primer coats',
      ],
      corrosionResistance: 'Very Low',
      tensileYield: '130 - 250 MPa',
      density: '7.87 g/cm³',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
    },
    {
      name: 'Steel',
      chemicalSymbol: 'Fe + C (<0.3%)',
      properties: [
        'Versatile structural strength with good ductility and weldability',
        'Standard structural alloy for civil and mechanical engineering',
        'Uniform grain structure compared to raw iron',
      ],
      commonUses: [
        'Structural I-beams, girders, and building rebar columns',
        'Automotive chassis, brackets, and rail transport tracks',
        'Bridges, highway guardrails, and transmission towers',
      ],
      corrosionBehaviour:
        'Standard structural steel oxidizes similarly to iron. In open air, it forms an oxide layer that spalls over time. Under cyclic mechanical loading, corrosion pits act as stress concentrators, promoting stress corrosion cracking (SCC) and fatigue failure.',
      factorsAffectingDegradation: [
        'Marine coastal aerosol salts (chlorides)',
        'Industrial sulfur dioxide (SO₂) gas forming weak sulfurous acid',
        'Cyclic fatigue, vibration, and dynamic loading',
      ],
      basicProtectionMethods: [
        'Structural painting systems (primer + intermediate + polyurethane topcoat)',
        'Zinc hot-dip galvanization (ASTM A123 standard)',
        'Impressed current or galvanic cathodic protection (ICCP)',
      ],
      corrosionResistance: 'Low',
      tensileYield: '250 - 355 MPa',
      density: '7.85 g/cm³',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    },
    {
      name: 'Carbon Steel',
      chemicalSymbol: 'Fe + C (0.3% - 2.0%)',
      properties: [
        'Significantly higher hardness and tensile strength than mild steel',
        'Reduced ductility and lower impact toughness with higher carbon',
        'Widely used in high-wear mechanical shafts and pressurized vessels',
      ],
      commonUses: [
        'High-pressure steam pipes and petroleum pipelines',
        'Heavy-duty industrial gears, shafts, fasteners, and axles',
        'Storage tanks, boilers, and excavation blades',
      ],
      corrosionBehaviour:
        'High carbon content creates microscopic galvanic micro-cells between ferrite and cementite (Fe₃C) phases, increasing uniform corrosion rates. Highly susceptible to hydrogen-induced cracking (HIC) and localized pitting in sour (H₂S) or acidic environments.',
      factorsAffectingDegradation: [
        'Acidic environments (pH < 6.0) causing hydrogen embrittlement',
        'Stagnant water inducing differential aeration cell corrosion',
        'High operating temperatures accelerating oxidation rates',
      ],
      basicProtectionMethods: [
        'Internal chemical corrosion inhibitors (e.g. amine inhibitors in pipes)',
        'Thermal spray aluminium (TSA) or zinc metallization',
        'Fusion-bonded epoxy (FBE) pipe coatings',
      ],
      corrosionResistance: 'Low',
      tensileYield: '350 - 650 MPa',
      density: '7.84 g/cm³',
      badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-300',
    },
    {
      name: 'Stainless Steel',
      chemicalSymbol: 'Fe + Cr (>10.5%) + Ni',
      properties: [
        'High corrosion and oxidation resistance over broad temperatures',
        'Forms a microscopic, self-repairing chromium oxide (Cr₂O₃) passive film',
        'Excellent hygiene, aesthetic finish, and chemical durability',
      ],
      commonUses: [
        'Chemical and pharmaceutical processing tanks and valves',
        'Food & dairy processing equipment and kitchen cutlery',
        'Marine hardware, architectural cladding, and medical instruments',
      ],
      corrosionBehaviour:
        'Under normal oxidizing conditions, stainless steel is virtually immune to uniform rust. However, in the presence of concentrated chloride ions (marine water or de-icing salts), the passive film can locally break down, causing severe localized pitting, crevice corrosion, and stress corrosion cracking.',
      factorsAffectingDegradation: [
        'Aqueous chloride (Cl⁻) ions penetrating micro-crevices',
        'Strong reducing acids (hydrochloric acid, sulfuric acid)',
        'Sensitization during welding where chromium carbide precipitates',
      ],
      basicProtectionMethods: [
        'Chemical passivation bath (citric or nitric acid cleaning)',
        'Selecting molybdenum-alloyed grades (such as AISI 316 or Duplex 2205)',
        'Avoiding tight crevices and maintaining oxygen aeration',
      ],
      corrosionResistance: 'Very High',
      tensileYield: '205 - 450 MPa',
      density: '7.90 g/cm³',
      badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    },
    {
      name: 'Aluminium',
      chemicalSymbol: 'Al',
      properties: [
        'Very lightweight (density 2.70 g/cm³, ~1/3 of steel)',
        'High thermal and electrical conductivity with high strength-to-weight ratio',
        'Spontaneously forms a protective aluminium oxide (Al₂O₃) passive layer',
      ],
      commonUses: [
        'Aircraft fuselages, wings, and aerospace brackets',
        'Automotive engine radiators, heat exchangers, and wheel rims',
        'Architectural window frames, high-voltage overhead transmission cables',
      ],
      corrosionBehaviour:
        'Aluminium does not rust in the ferrous sense. When exposed to air, it immediately passivates with a 2-4 nm thin oxide layer. Because it is amphoteric, this protective film dissolves in both strong acids (pH < 4.5) and strong alkalis (pH > 8.5), leading to rapid dissolution and white pitting powder.',
      factorsAffectingDegradation: [
        'Extreme acidic (pH < 4) or strongly alkaline (pH > 8.5) solutions',
        'Galvanic contact with noble metals (e.g. copper or steel) in wet conditions',
        'Trapped marine sea-salt deposits causing pitting',
      ],
      basicProtectionMethods: [
        'Anodizing (electrochemical thickening of the protective oxide layer)',
        'Alodine / chromate conversion coating and epoxy priming',
        'Galvanic isolation gaskets when bolting to dissimilar metals',
      ],
      corrosionResistance: 'High',
      tensileYield: '70 - 280 MPa',
      density: '2.70 g/cm³',
      badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
    },
    {
      name: 'Copper',
      chemicalSymbol: 'Cu',
      properties: [
        'Exceptional electrical and thermal conductivity',
        'Naturally antimicrobial, malleable, and easy to braze/solder',
        'High noble electrode potential (+0.34 V vs Standard Hydrogen Electrode)',
      ],
      commonUses: [
        'Electrical wiring, substation busbars, and motor windings',
        'Potable water plumbing tubes and heat exchanger tubes',
        'Architectural roofing, gutters, and bronze/brass engineering alloys',
      ],
      corrosionBehaviour:
        'Copper exhibits noble corrosion resistance. Upon prolonged atmospheric exposure, it slowly reacts with moist CO₂ and airborne sulfur to develop a stable, protective green/blue surface layer called patina (basic copper carbonate [CuCO₃·Cu(OH)₂] and brochantite). This patina shields the core metal for decades.',
      factorsAffectingDegradation: [
        'Aggressive acidic soil or acid rain (pH < 5.5)',
        'Ammonia and sulfide vapors causing rapid stress corrosion cracking',
        'High-velocity turbulent water flow causing erosion-corrosion',
      ],
      basicProtectionMethods: [
        'Tin plating on electrical busbars and wire terminals',
        'Corrosion inhibitors such as Benzotriazole (BTA)',
        'Controlled water flow velocity (<1.5 m/s) in piping networks',
      ],
      corrosionResistance: 'High',
      tensileYield: '70 - 220 MPa',
      density: '8.96 g/cm³',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
  ];

  const filteredMetals = metals.filter((m) => {
    const matchesTab = activeTab === 'all' || m.name === activeTab;
    const matchesSearch =
      m.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.corrosionBehaviour.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.commonUses.some((u) => u.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Metallurgical Knowledge Base
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Engineering Materials Database
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              Fundamental corrosion mechanisms, environmental sensitivities, and mitigation protocols tailored for first-year engineering students and viva demonstrations.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search properties, uses..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All 6 Metals
          </button>
          {metals.map((m) => (
            <button
              key={m.name}
              onClick={() => setActiveTab(m.name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === m.name
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {m.name} ({m.chemicalSymbol.split(' ')[0]})
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMetals.map((metal) => (
          <div
            key={metal.name}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
          >
            <div className="p-6 space-y-5">
              
              {/* Card Title & Chemistry Badge */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{metal.name}</h3>
                  <span className="font-mono text-xs text-blue-700 font-semibold">
                    Formula: {metal.chemicalSymbol}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-md border ${metal.badgeColor}`}>
                    {metal.corrosionResistance} Res.
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">{metal.density}</div>
                </div>
              </div>

              {/* 1. Properties */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  Properties
                </h4>
                <ul className="space-y-1 text-xs text-slate-600">
                  {metal.properties.map((prop, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-slate-400">·</span>
                      <span>{prop}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. Common Uses */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                  Common Uses
                </h4>
                <ul className="space-y-1 text-xs text-slate-600">
                  {metal.commonUses.map((use, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-slate-400">·</span>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. Corrosion Behaviour */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  Corrosion Behaviour
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {metal.corrosionBehaviour}
                </p>
              </div>

              {/* 4. Factors Affecting Degradation */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                  Factors Affecting Degradation
                </h4>
                <ul className="space-y-1 text-xs text-slate-600">
                  {metal.factorsAffectingDegradation.map((factor, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 5. Basic Protection Methods */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-blue-600" />
                  Basic Protection Methods
                </h4>
                <ul className="space-y-1 text-xs text-slate-600">
                  {metal.basicProtectionMethods.map((prot, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{prot}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Card Action: Pre-fill in Monitor */}
            <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Yield: {metal.tensileYield}</span>
              <button
                onClick={() => onSelectMaterialToMonitor(metal.name)}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-white bg-blue-50 hover:bg-blue-600 px-3 py-1.5 rounded-lg border border-blue-200 hover:border-blue-600 transition-all cursor-pointer"
              >
                <span>Test in Monitor</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Engineering Metallurgy Comparison Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Metallurgical Performance Comparison Table
          </h2>
          <p className="text-xs text-slate-500">
            Side-by-side comparison for B.Tech project presentation and viva evaluation.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Material</th>
                <th className="py-3 px-4">Yield Strength</th>
                <th className="py-3 px-4">Electrochemical Resistance</th>
                <th className="py-3 px-4">Primary Passivation Film</th>
                <th className="py-3 px-4">Marine Coastal Vulnerability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Iron</td>
                <td className="py-3 px-4 font-mono">130–250 MPa</td>
                <td className="py-3 px-4 text-rose-600 font-semibold">Very Low (Rapid oxidation)</td>
                <td className="py-3 px-4">None (porous flaky rust scale)</td>
                <td className="py-3 px-4 text-rose-600">Extreme degradation</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Steel (Structural)</td>
                <td className="py-3 px-4 font-mono">250–355 MPa</td>
                <td className="py-3 px-4 text-amber-600 font-semibold">Low (Uniform rust)</td>
                <td className="py-3 px-4">None unalloyed (requires paint/zinc)</td>
                <td className="py-3 px-4 text-amber-600">High without coating</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Carbon Steel</td>
                <td className="py-3 px-4 font-mono">350–650 MPa</td>
                <td className="py-3 px-4 text-amber-700 font-semibold">Low (Galvanic micro-cells)</td>
                <td className="py-3 px-4">None (Cementite galvanic pairs)</td>
                <td className="py-3 px-4 text-rose-600">High stress corrosion risk</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Stainless Steel</td>
                <td className="py-3 px-4 font-mono">205–450 MPa</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">Very High</td>
                <td className="py-3 px-4 font-medium text-blue-700">Chromium Oxide (Cr₂O₃)</td>
                <td className="py-3 px-4 text-amber-600">Pitting/Crevice susceptible in Cl⁻</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Aluminium</td>
                <td className="py-3 px-4 font-mono">70–280 MPa</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">High</td>
                <td className="py-3 px-4 font-medium text-blue-700">Alumina (Al₂O₃)</td>
                <td className="py-3 px-4 text-slate-600">Moderate (Pitting under salt crust)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Copper</td>
                <td className="py-3 px-4 font-mono">70–220 MPa</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">High (Noble standard potential)</td>
                <td className="py-3 px-4 font-medium text-blue-700">Basic Copper Carbonate Patina</td>
                <td className="py-3 px-4 text-emerald-700">Low (Stable green patina)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
