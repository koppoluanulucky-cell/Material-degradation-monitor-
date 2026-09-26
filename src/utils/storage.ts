import { AnalysisResult, MaterialInput } from '../types';
import { calculateAnalysis } from './calculator';

const STORAGE_KEY = 'rust_monitor_records_v1';

export const SAMPLE_PRESETS: { title: string; subtitle: string; input: MaterialInput }[] = [
  {
    title: 'Coastal Bridge Support Girder',
    subtitle: 'High marine chloride salinity & continuous moisture exposure',
    input: {
      name: 'Pier Beam A-44 (Coastal Highway)',
      type: 'Carbon Steel',
      ageYears: 14,
      environment: 'Coastal',
      temperature: 30,
      humidity: 82,
      moisture: 78,
      ph: 6.2,
      visibleRust: 48,
      crackDamage: 32,
      usageHours: 24,
    },
  },
  {
    title: 'Chemical Plant Effluent Piping',
    subtitle: 'Acidic vapor spillage & thermal stress',
    input: {
      name: 'Discharge Flange Line-B',
      type: 'Stainless Steel',
      ageYears: 7,
      environment: 'Chemical Environment',
      temperature: 42,
      humidity: 68,
      moisture: 72,
      ph: 3.8,
      visibleRust: 22,
      crackDamage: 28,
      usageHours: 18,
    },
  },
  {
    title: 'Aeronautical Frame Spar Bracket',
    subtitle: 'Controlled hangar storage & minimal corrosion',
    input: {
      name: 'Airframe Spar Connector 09',
      type: 'Aluminium',
      ageYears: 3,
      environment: 'Indoor',
      temperature: 21,
      humidity: 42,
      moisture: 25,
      ph: 7.1,
      visibleRust: 4,
      crackDamage: 2,
      usageHours: 8,
    },
  },
  {
    title: 'Heavy Industry Factory Crane Rail',
    subtitle: 'Aggressive SO₂ pollutants & high cyclic duty',
    input: {
      name: 'Gantry Crane Track #3',
      type: 'Iron',
      ageYears: 18,
      environment: 'Industrial',
      temperature: 34,
      humidity: 76,
      moisture: 65,
      ph: 5.4,
      visibleRust: 62,
      crackDamage: 45,
      usageHours: 20,
    },
  },
  {
    title: 'Electrical Substation Grounding Grid',
    subtitle: 'Soil-adjacent copper busbar in outdoor sub-station',
    input: {
      name: 'Substation Busbar Feed-1',
      type: 'Copper',
      ageYears: 9,
      environment: 'Outdoor',
      temperature: 27,
      humidity: 58,
      moisture: 45,
      ph: 6.8,
      visibleRust: 16,
      crackDamage: 8,
      usageHours: 24,
    },
  },
];

export function getStoredAnalyses(): AnalysisResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with initial realistic engineering records for demonstration
      const initial = SAMPLE_PRESETS.map((preset) => calculateAnalysis(preset.input));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load stored records:', e);
    return [];
  }
}

export function saveAnalysis(record: AnalysisResult): AnalysisResult[] {
  try {
    const current = getStoredAnalyses();
    // Prepend new record
    const updated = [record, ...current.filter((r) => r.id !== record.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save record:', e);
    return [];
  }
}

export function deleteAnalysis(id: string): AnalysisResult[] {
  try {
    const current = getStoredAnalyses();
    const updated = current.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete record:', e);
    return [];
  }
}

export function clearAllAnalyses(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear records:', e);
  }
}

export function resetToDemoAnalyses(): AnalysisResult[] {
  try {
    const fresh = SAMPLE_PRESETS.map((preset) => calculateAnalysis(preset.input));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  } catch (e) {
    console.error('Failed to reset records:', e);
    return [];
  }
}

export function exportAnalysesToCSV(records: AnalysisResult[]): void {
  const headers = [
    'Material Name',
    'Material Type',
    'Age (Years)',
    'Environment',
    'Temperature (C)',
    'Humidity (%)',
    'Moisture (%)',
    'pH Value',
    'Visible Rust (%)',
    'Crack/Damage (%)',
    'Usage (Hrs/Day)',
    'Estimated Rust (%)',
    'Degradation (%)',
    'Health Score (%)',
    'Risk Level',
    'Timestamp',
  ];

  const rows = records.map((r) => [
    `"${r.input.name.replace(/"/g, '""')}"`,
    r.input.type,
    r.input.ageYears,
    r.input.environment,
    r.input.temperature,
    r.input.humidity,
    r.input.moisture,
    r.input.ph,
    r.input.visibleRust,
    r.input.crackDamage,
    r.input.usageHours,
    r.rustPercentage,
    r.degradationPercentage,
    r.healthScore,
    r.riskLevel,
    r.timestamp,
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `material_degradation_records_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
