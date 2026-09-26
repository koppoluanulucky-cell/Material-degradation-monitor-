import { MaterialInput, AnalysisResult, RiskLevel } from '../types';

/**
 * AI-style rule-based educational estimation model for rust and degradation.
 * Grounded in material science principles (corrosion kinetics, pH depassivation,
 * environmental salinity, mechanical fatigue, and material oxidation resistance).
 */
export function calculateAnalysis(input: MaterialInput): AnalysisResult {
  const {
    type,
    ageYears,
    environment,
    temperature,
    humidity,
    moisture,
    ph,
    visibleRust,
    crackDamage,
    usageHours,
  } = input;

  // 1. Material Susceptibility Coefficient (M_c)
  // Higher value = higher susceptibility to electrochemical oxidation / rust
  let materialFactor = 1.0;
  switch (type) {
    case 'Iron':
      materialFactor = 1.45; // Readily oxidizes into hydrated ferric oxide
      break;
    case 'Carbon Steel':
      materialFactor = 1.35; // Susceptible to uniform and pitting corrosion
      break;
    case 'Steel':
      materialFactor = 1.20; // Structural/mild steel
      break;
    case 'Copper':
      materialFactor = 0.55; // Forms protective patina (verdigris)
      break;
    case 'Aluminium':
      materialFactor = 0.40; // Passivating Al2O3 layer; vulnerable in extreme pH/halides
      break;
    case 'Stainless Steel':
      materialFactor = 0.20; // Chromium oxide passive film gives high resistance
      break;
    case 'Other':
    default:
      materialFactor = 1.00;
      break;
  }

  // 2. Exposure Environment Severity Multiplier (E_m)
  let envMultiplier = 1.0;
  switch (environment) {
    case 'Indoor':
      envMultiplier = 0.35; // Sheltered, lower airborne contaminants
      break;
    case 'Outdoor':
      envMultiplier = 1.00; // Weathering, rain, atmospheric oxygen
      break;
    case 'High Moisture':
      envMultiplier = 1.30; // Sustained electrolyte surface film
      break;
    case 'Industrial':
      envMultiplier = 1.45; // SO2, NOx, acid rain precursors
      break;
    case 'Coastal':
      envMultiplier = 1.55; // Marine aerosols with sodium chloride (Cl-) depassivators
      break;
    case 'Chemical Environment':
      envMultiplier = 1.70; // Direct aggressive fumes/chemical spillage
      break;
  }

  // 3. Humidity and Moisture Acceleration Factor (H_f)
  // Corrosion kinetics surge when relative humidity crosses the critical threshold (~60%)
  const avgAtmosphericWater = (humidity * 0.45) + (moisture * 0.55);
  let moistureFactor = 0.1;
  if (avgAtmosphericWater > 60) {
    moistureFactor = 0.5 + ((avgAtmosphericWater - 60) / 40) * 0.5; // Scaled up to 1.0
  } else {
    moistureFactor = (avgAtmosphericWater / 60) * 0.5;
  }

  // 4. Temperature Effect (T_f)
  // Aqueous electrochemical reactions accelerate with temperature (~15C to ~55C doubles rate)
  let tempFactor = 1.0;
  if (temperature <= 0) {
    tempFactor = 0.4; // Frozen water greatly slows electrolyte ion transport
  } else if (temperature > 0 && temperature <= 25) {
    tempFactor = 0.7 + (temperature / 25) * 0.3; // 0.7 to 1.0
  } else if (temperature > 25 && temperature <= 60) {
    tempFactor = 1.0 + ((temperature - 25) / 35) * 0.45; // 1.0 to 1.45
  } else {
    // Very high temperatures may dry thin water films or induce thermal degradation
    tempFactor = 1.3;
  }

  // 5. pH Depassivation Effect (pH_f)
  // For Steels/Iron: Acidic (pH < 6.0) causes rapid proton reduction and dissolution.
  // For Aluminium: Amphoteric - attacks at pH < 4.5 and pH > 8.5.
  let phFactor = 1.0;
  if (ph < 5.0) {
    // Strongly acidic
    phFactor = 1.6 + ((5.0 - ph) / 5.0) * 0.6; // Up to 2.2
  } else if (ph < 6.8) {
    // Slightly acidic
    phFactor = 1.1 + ((6.8 - ph) / 1.8) * 0.4;
  } else if (ph >= 6.8 && ph <= 8.5) {
    // Neutral/passive zone
    phFactor = 0.85;
  } else if (ph > 8.5 && ph <= 11.0) {
    // Mildly alkaline
    if (type === 'Aluminium') {
      phFactor = 1.5; // Aluminium dissolves in alkali
    } else {
      phFactor = 0.75; // Mild alkaline passivates steel
    }
  } else {
    // Highly alkaline (pH > 11.0)
    if (type === 'Aluminium') {
      phFactor = 2.1;
    } else {
      phFactor = 1.1; // Caustic embrittlement risks
    }
  }

  // 6. Age & Service Fatigue Multiplier
  // Sub-linear accumulation over years: age contributes to cumulative exposure
  const ageFactor = Math.min(2.5, 0.4 + Math.log10(Math.max(1, ageYears) + 1) * 0.9);
  const dailyDutyRatio = usageHours / 24; // 0 to 1

  // -------------------------------------------------------------------------
  // RUST PERCENTAGE CALCULATION
  // -------------------------------------------------------------------------
  // Rust is predominantly oxidation of ferrous or active metals.
  // Combine environmental corrosion pressure with material susceptibility and visible rust.
  const environmentalCorrosionPressure =
    (moistureFactor * 42) * envMultiplier * (tempFactor * 0.9) * phFactor;

  const baselineRustEstimate = environmentalCorrosionPressure * materialFactor * (0.6 + ageFactor * 0.25);
  
  // Blend estimated environmental rust with visible physical observation
  // (If user observed rust, give strong weight to visual confirmation)
  let calculatedRust = 0;
  if (visibleRust > 0) {
    calculatedRust = (visibleRust * 0.65) + (baselineRustEstimate * 0.35);
  } else {
    calculatedRust = baselineRustEstimate * 0.75;
  }

  // Stainless steel and aluminium develop surface oxidation or pitting rather than traditional red rust
  if (type === 'Stainless Steel') {
    calculatedRust = calculatedRust * 0.35;
  } else if (type === 'Aluminium') {
    calculatedRust = calculatedRust * 0.45;
  } else if (type === 'Copper') {
    calculatedRust = calculatedRust * 0.50;
  }

  const rustPercentage = Math.round(Math.min(100, Math.max(0, calculatedRust)));

  // -------------------------------------------------------------------------
  // DEGRADATION PERCENTAGE CALCULATION
  // -------------------------------------------------------------------------
  // Degradation accounts for:
  // - Surface rust and chemical loss (40% weight)
  // - Structural crack and mechanical damage (35% weight)
  // - Material age & cyclic mechanical fatigue from daily usage (25% weight)
  const crackContribution = crackDamage * 0.85;
  const cyclicDutyFatigue = (dailyDutyRatio * 18) + (ageYears * 1.2);
  const environmentalWear = (envMultiplier - 0.35) * 12;

  let calculatedDegradation =
    (rustPercentage * 0.45) +
    (crackContribution * 0.38) +
    (cyclicDutyFatigue * 0.12) +
    (environmentalWear * 0.05);

  // If heavy crack damage exists, degradation accelerates via stress concentration
  if (crackDamage > 40) {
    calculatedDegradation += (crackDamage - 40) * 0.25;
  }

  const degradationPercentage = Math.round(Math.min(100, Math.max(0, calculatedDegradation)));

  // -------------------------------------------------------------------------
  // MATERIAL HEALTH SCORE & RISK LEVEL
  // -------------------------------------------------------------------------
  const healthScore = Math.max(0, Math.min(100, 100 - degradationPercentage));

  let riskLevel: RiskLevel = 'Low';
  if (degradationPercentage <= 20) {
    riskLevel = 'Low';
  } else if (degradationPercentage <= 40) {
    riskLevel = 'Moderate';
  } else if (degradationPercentage <= 70) {
    riskLevel = 'High';
  } else {
    riskLevel = 'Critical';
  }

  // -------------------------------------------------------------------------
  // POSSIBLE CAUSES IDENTIFICATION
  // -------------------------------------------------------------------------
  const possibleCauses: string[] = [];

  if (environment === 'Coastal') {
    possibleCauses.push('Airborne marine chloride (Cl⁻) ions accelerating pitting and oxide breakdown.');
  }
  if (environment === 'Industrial') {
    possibleCauses.push('Industrial gaseous pollutants (SO₂/NOₓ) inducing atmospheric acidification.');
  }
  if (environment === 'Chemical Environment') {
    possibleCauses.push('Direct exposure to reactive chemical vapors and corrosive condensate.');
  }
  if (humidity > 70 || moisture > 70) {
    possibleCauses.push('Persistent micro-electrolyte water layer on the surface promoting galvanic cell action.');
  }
  if (ph < 6.0) {
    possibleCauses.push(`Acidic electrolyte condition (pH ${ph.toFixed(1)}) accelerating hydrogen-evolution corrosion.`);
  } else if (ph > 9.0 && type === 'Aluminium') {
    possibleCauses.push(`Alkaline attack on amphoteric aluminium protective oxide layer (pH ${ph.toFixed(1)}).`);
  }
  if (crackDamage > 25) {
    possibleCauses.push('Mechanical micro-cracks creating localized stress concentration and crevice corrosion pathways.');
  }
  if (usageHours >= 16) {
    possibleCauses.push(`Heavy cyclic operating duty (${usageHours} hrs/day) generating cyclic fatigue and vibrational micro-fretting.`);
  }
  if (ageYears > 12) {
    possibleCauses.push(`Long-term cumulative service life (${ageYears} years) exceeding initial barrier coating durability.`);
  }
  if (visibleRust > 30) {
    possibleCauses.push('Existing localized oxidation penetrating the substrate and spalling protective scale.');
  }
  if (possibleCauses.length === 0) {
    possibleCauses.push('Normal ambient environmental exposure and gradual baseline material weathering.');
  }

  // -------------------------------------------------------------------------
  // AI-STYLE DYNAMIC EXPLANATION
  // -------------------------------------------------------------------------
  let aiAnalysis = '';
  switch (riskLevel) {
    case 'Low':
      aiAnalysis =
        `The ${type} material currently shows a low estimated degradation level (${degradationPercentage}%). Environmental conditions appear relatively suitable, with ambient parameters within manageable thresholds for this material type. Regular inspection and routine maintenance are recommended to sustain protective passivation.`;
      break;
    case 'Moderate':
      aiAnalysis =
        `The ${type} material shows moderate estimated degradation (${degradationPercentage}%). Increased humidity, moisture or environmental exposure (${environment}) may be contributing to corrosion kinetics. Periodic inspection, surface cleaning, and reapplication of protective coatings are recommended before localized pitting deepens.`;
      break;
    case 'High':
      aiAnalysis =
        `The ${type} material shows a high estimated degradation level (${degradationPercentage}%). Severe environmental exposure (${environment}) and visible physical damage or rust are accelerating oxidation. Detailed engineering inspection, non-destructive testing (NDT), and active preventive maintenance are recommended to prevent mechanical compromise.`;
      break;
    case 'Critical':
      aiAnalysis =
        `The ${type} material shows a critical estimated degradation level (${degradationPercentage}%). Significant corrosion, structural damage, or severe chemical degradation may be present. Professional engineering inspection is strongly recommended; continued load-bearing without physical structural evaluation carries high failure risk.`;
      break;
  }

  // -------------------------------------------------------------------------
  // RECOMMENDED ACTIONS
  // -------------------------------------------------------------------------
  const recommendedActions: string[] = [];

  switch (riskLevel) {
    case 'Low':
      recommendedActions.push('Continue regular scheduled monitoring and visual logging.');
      recommendedActions.push('Keep the material dry and clear of accumulated debris.');
      recommendedActions.push('Perform periodic inspection at standard service intervals.');
      break;
    case 'Moderate':
      recommendedActions.push('Apply protective barrier coating (e.g., epoxy, polyurethane, or zinc-rich primer).');
      recommendedActions.push('Reduce moisture exposure through improved drainage or dehumidification.');
      recommendedActions.push('Increase inspection frequency to quarterly review cycles.');
      break;
    case 'High':
      recommendedActions.push('Perform detailed ultrasonic or dye-penetrant non-destructive testing (NDT).');
      recommendedActions.push('Repair visible crack damage and mechanically remove loose scale.');
      recommendedActions.push('Apply suitable heavy-duty corrosion protection or cathodic protection systems.');
      break;
    case 'Critical':
      recommendedActions.push('Stop relying on the material without certified professional engineering inspection.');
      recommendedActions.push('Perform detailed engineering structural integrity and residual thickness assessment.');
      recommendedActions.push('Consider immediate structural repair, reinforcement, or material replacement where required.');
      break;
  }

  // Material-specific supplementary engineering tip
  if (type === 'Aluminium' && (ph < 5 || ph > 8.5)) {
    recommendedActions.push('Neutralize surrounding chemical environment or apply hard-anodized sealed film to resist amphoteric chemical attack.');
  } else if ((type === 'Steel' || type === 'Carbon Steel' || type === 'Iron') && environment === 'Coastal') {
    recommendedActions.push('Implement hot-dip galvanization or sacrificial zinc/magnesium anodes to combat airborne chloride pitting.');
  } else if (type === 'Stainless Steel' && environment === 'Coastal') {
    recommendedActions.push('Passivate with citric or nitric acid bath and upgrade to marine-grade 316/316L molybdenum-alloyed stainless steel.');
  }

  return {
    id: `ANALYSIS-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    timestamp: new Date().toISOString(),
    input,
    rustPercentage,
    degradationPercentage,
    healthScore,
    riskLevel,
    possibleCauses,
    recommendedActions,
    aiAnalysis,
    environmentalSeverityScore: Math.round(envMultiplier * 20 + moistureFactor * 30),
    mechanicalFatigueScore: Math.round(dailyDutyRatio * 40 + (crackDamage / 100) * 60),
  };
}
