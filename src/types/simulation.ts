/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FishTankLevelId = 
  | 'level1' // Grievances, People, Power
  | 'level2' // Freedom of Speech & Right to Assemble
  | 'level3' // Media, Communication & Public Awareness
  | 'level4' // Leadership, Organization & Solidarity
  | 'level5' // Government Repression, Paradox & Negotiation
  | 'level6' // Historical Movement Lab
  | 'sandbox'; // Full Free Simulation

export type HistoricalScenarioId = 
  | 'montgomery' // Montgomery Bus Boycott (1955-56)
  | 'suffragettes' // UK Suffragette Movement (1903-1918)
  | 'soweto' // Soweto Youth Uprising (1976)
  | 'polltax' // UK Anti-Poll Tax Rebellion (1989-90)
  | 'vietnam'; // Vietnam Moratorium & Student Movement (1968-70)

export type DistrictId = 
  | 'city_hall'
  | 'transit_hub'
  | 'factory_district'
  | 'university_campus'
  | 'residential_quarter'
  | 'commercial_avenue'
  | 'freedom_square'
  | 'press_broadcast';

export interface DistrictInfo {
  id: DistrictId;
  name: string;
  tagline: string;
  gridCol: number;
  gridRow: number;
  primaryGroup: string;
  baseActivity: string;
  grievance: number; // 0 - 100
  tension: number; // 0 - 100
  organization: number; // 0 - 100
  activeTactics: string[];
  citizenQuote: string;
  citizenName: string;
  dilemma: string;
}

export type ProtestTactic = 
  | 'peaceful_march'
  | 'economic_boycott'
  | 'labor_strike'
  | 'legal_petition'
  | 'civil_disobedience'
  | 'mass_meeting'
  | 'carpool_network'
  | 'media_expose';

export type AuthorityAction = 
  | 'dialogue_deescalate'
  | 'token_concession'
  | 'assembly_ban'
  | 'police_dispersal'
  | 'arrest_organizers'
  | 'repeal_law';

export interface SimulationState {
  levelId: FishTankLevelId;
  scenarioId?: HistoricalScenarioId;
  day: number;
  isRunning: boolean;
  speed: number; // 1x, 2x
  // Core Fish Tank system metrics
  grievance: number; // 0 - 100
  solidarity: number; // 0 - 100
  fear: number; // 0 - 100
  economicPressure: number; // 0 - 100
  publicSupport: number; // 0 - 100 (wider public & international)
  repressionLevel: number; // 0 - 100
  concessionsWon: number; // 0 - 100
  // System logs
  eventHistory: SimulationEventLog[];
  // Active protest methods deployed
  activeTactics: ProtestTactic[];
  // Active government policy stance
  authorityStance: AuthorityAction;
  // Freedom conditions
  freedomOfSpeech: boolean;
  freedomOfAssembly: boolean;
  pressCensored: boolean;
  // Resources
  communityFund: number; // 0 - 100
}

export interface SimulationEventLog {
  id: string;
  day: number;
  title: string;
  description: string;
  category: 'grievance' | 'action' | 'authority' | 'outcome' | 'media';
  causalLink: string; // "Because of X, Y occurred"
}

export interface PredictionHypothesis {
  impactedGroup: string;
  epicenterDistrict: DistrictId;
  anticipatedProtestMethod: ProtestTactic;
  anticipatedAuthorityReaction: AuthorityAction;
  predictedOutcome: 'concessions' | 'backfire_growth' | 'movement_crushed' | 'stalemate';
  studentReasoning: string;
}

export interface SimulationEvent {
  id: string;
  title: string;
  historicalContext?: string;
  dateOrEra?: string;
  summary: string;
  affectedDistricts: DistrictId[];
  grievanceDelta: number;
  fearDelta: number;
  promptHypothesis: {
    question: string;
    context: string;
  };
}

export interface HistoricalMovementDossier {
  id: HistoricalScenarioId;
  title: string;
  subtitle: string;
  year: string;
  location: string;
  bannerTag: string;
  historicalFactSheet: {
    whatWasProtestedAgainst: string;
    whyActionWasTaken: string;
    methodsUsed: string[];
    powerResponse: string;
    whatChangedAsResult: string;
    socialChangeLesson: string;
  };
  keyFigures: { name: string; role: string; quote: string }[];
  timeline: { yearOrMonth: string; event: string; significance: string }[];
  systemDynamicsLesson: string;
}

export interface VocabularyTerm {
  word: string;
  partOfSpeech: string;
  definition: string;
  exampleSentence: string;
  causalConnectorExample: string;
  pronunciation: string;
  b2Tip: string;
}
