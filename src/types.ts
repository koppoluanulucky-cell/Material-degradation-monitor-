export type MaterialType =
  | 'Iron'
  | 'Steel'
  | 'Carbon Steel'
  | 'Stainless Steel'
  | 'Aluminium'
  | 'Copper'
  | 'Other';

export type ExposureEnvironment =
  | 'Indoor'
  | 'Outdoor'
  | 'Coastal'
  | 'Industrial'
  | 'High Moisture'
  | 'Chemical Environment';

export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface MaterialInput {
  name: string;
  type: MaterialType;
  ageYears: number;
  environment: ExposureEnvironment;
  temperature: number; // in Celsius (-20 to 100)
  humidity: number; // 0 - 100%
  moisture: number; // 0 - 100%
  ph: number; // 0.0 - 14.0
  visibleRust: number; // 0 - 100%
  crackDamage: number; // 0 - 100%
  usageHours: number; // 0 - 24 hrs/day
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  input: MaterialInput;
  rustPercentage: number;
  degradationPercentage: number;
  healthScore: number;
  riskLevel: RiskLevel;
  possibleCauses: string[];
  recommendedActions: string[];
  aiAnalysis: string;
  environmentalSeverityScore: number;
  mechanicalFatigueScore: number;
}
