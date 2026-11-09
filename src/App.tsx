/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { TopBar } from './components/TopBar';
import { CityMapCanvas } from './components/CityMapCanvas';
import { DistrictInspector } from './components/DistrictInspector';
import { PredictionModal } from './components/PredictionModal';
import { SimulationOutcomeModal } from './components/SimulationOutcomeModal';
import { SimulationControls } from './components/SimulationControls';
import { CauseEffectWorkbench } from './components/CauseEffectWorkbench';
import { HistoricalDossier } from './components/HistoricalDossier';
import { FishTankLevelsView } from './components/FishTankLevelsView';
import { VocabularyDrawer } from './components/VocabularyDrawer';
import { FishTankExplainerModal } from './components/FishTankExplainerModal';

import { 
  DistrictId, 
  DistrictInfo, 
  FishTankLevelId, 
  HistoricalScenarioId, 
  PredictionHypothesis, 
  ProtestTactic, 
  AuthorityAction, 
  SimulationState, 
  SimulationEventLog 
} from './types/simulation';

import { INITIAL_DISTRICTS, FISH_TANK_LEVELS, HISTORICAL_DOSSIERS } from './data/levels';

export default function App() {
  // Navigation
  const [currentTab, setCurrentTab] = useState<'simulation' | 'levels' | 'history' | 'language' | 'dossier'>('simulation');

  // Modals
  const [isVocabularyOpen, setIsVocabularyOpen] = useState<boolean>(false);
  const [isFishTankGuideOpen, setIsFishTankGuideOpen] = useState<boolean>(false);
  const [isPredictionOpen, setIsPredictionOpen] = useState<boolean>(false);
  const [isOutcomeOpen, setIsOutcomeOpen] = useState<boolean>(false);
  const [selectedDistrictId, setSelectedDistrictId] = useState<DistrictId | null>(null);

  // Map view overlay mode
  const [activeMapView, setActiveMapView] = useState<'normal' | 'grievance' | 'solidarity' | 'repression'>('normal');

  // Current Level & Historical Scenario
  const [currentLevelId, setCurrentLevelId] = useState<FishTankLevelId>('level1');
  const [currentScenarioId, setCurrentScenarioId] = useState<HistoricalScenarioId | undefined>(undefined);

  // Districts living state
  const [districts, setDistricts] = useState<DistrictInfo[]>(INITIAL_DISTRICTS);

  // Simulation State
  const [simulation, setSimulation] = useState<SimulationState>({
    levelId: 'level1',
    scenarioId: undefined,
    day: 1,
    isRunning: false,
    speed: 1,
    grievance: 50,
    solidarity: 30,
    fear: 35,
    economicPressure: 15,
    publicSupport: 40,
    repressionLevel: 25,
    concessionsWon: 0,
    eventHistory: [
      {
        id: 'log_0',
        day: 1,
        title: 'Municipal Gathering Restriction Decree',
        description: 'City Hall decrees that public gatherings exceeding five persons without police permits are prohibited.',
        category: 'grievance',
        causalLink: 'Because the city restricted assembly, working-class communities experienced heightened injustice.'
      }
    ],
    activeTactics: [],
    authorityStance: 'assembly_ban',
    freedomOfSpeech: true,
    freedomOfAssembly: false,
    pressCensored: false,
    communityFund: 40
  });

  // Scientific Hypothesis state
  const [currentHypothesis, setCurrentHypothesis] = useState<PredictionHypothesis | null>(null);
  const [pendingEventShock, setPendingEventShock] = useState<{
    title: string;
    description: string;
    historicalParallel?: string;
  }>({
    title: 'Transit Fare Hike & Segregation Ordinance',
    description: 'City administration imposes a 40% fare increase on municipal bus routes while continuing strict segregation enforcement.',
    historicalParallel: 'Montgomery, Alabama, 1955: Segregation on public transport sparked city-wide resistance.'
  });

  // Track simulation ticks during a hypothesis run
  const hypothesisTicksRemainingRef = useRef<number>(0);

  // Simulation timer loop
  useEffect(() => {
    if (!simulation.isRunning) return;

    const intervalTime = simulation.speed === 2 ? 750 : 1500;
    const timer = setInterval(() => {
      setSimulation((prev) => {
        const nextDay = prev.day + 1;

        // Dynamic Systemic Interactions (Gee's Fish Tank Feedback Loops)
        let deltaGrievance = 0;
        let deltaSolidarity = 0;
        let deltaFear = 0;
        let deltaEconomic = 0;
        let deltaPublicSupport = 0;
        let deltaConcessions = 0;

        const hasBoycott = prev.activeTactics.includes('economic_boycott');
        const hasCarpool = prev.activeTactics.includes('carpool_network');
        const hasStrike = prev.activeTactics.includes('labor_strike');
        const hasMarch = prev.activeTactics.includes('peaceful_march');
        const hasDisobedience = prev.activeTactics.includes('civil_disobedience');
        const hasMedia = prev.activeTactics.includes('media_expose');
        const hasLegal = prev.activeTactics.includes('legal_petition');
        const hasMeeting = prev.activeTactics.includes('mass_meeting');

        // Boycott dynamics
        if (hasBoycott) {
          deltaEconomic += 2.5; // Commercial & transit revenue declines
          if (!hasCarpool) {
            // Without carpools, workers are exhausted and fear losing jobs
            deltaFear += 1.8;
            deltaSolidarity -= 0.8;
          } else {
            // With carpool infrastructure, resistance is sustainable!
            deltaFear -= 1.2;
            deltaSolidarity += 2.2;
          }
        }

        // Strike dynamics
        if (hasStrike) {
          deltaEconomic += 3.5;
          deltaGrievance += 1.0;
          if (prev.communityFund > 30) {
            deltaSolidarity += 1.5;
          } else {
            deltaFear += 2.0; // Workers run out of savings
          }
        }

        // Mass Meeting dynamics
        if (hasMeeting) {
          deltaSolidarity += 2.0;
          deltaFear -= 1.5; // Moral resilience overcomes isolation
        }

        // March and Assembly dynamics
        if (hasMarch) {
          deltaPublicSupport += 1.5;
        }

        // Civil Disobedience
        if (hasDisobedience) {
          deltaGrievance += 1.5;
        }

        // Legal Petitions
        if (hasLegal) {
          if (prev.day > 10 && deltaEconomic > 20) {
            deltaConcessions += 3.0; // Courts respond to sustained public pressure
          }
        }

        // Authority Reactions & Repression Paradox
        switch (prev.authorityStance) {
          case 'dialogue_deescalate':
            deltaFear -= 2.0;
            deltaConcessions += 2.5;
            break;
          case 'token_concession':
            deltaConcessions += 1.0;
            // Token offer might temporarily divide the movement if solidarity < 50
            if (prev.solidarity < 50) {
              deltaSolidarity -= 1.5;
            }
            break;
          case 'assembly_ban':
            deltaFear += 1.0;
            deltaGrievance += 1.5;
            break;
          case 'police_dispersal':
            // THE REPRESSION PARADOX (BACKFIRE EFFECT):
            if (hasMarch || hasDisobedience) {
              if (hasMedia) {
                // When brutality is witnessed on camera, sympathy surges!
                deltaPublicSupport += 4.5;
                deltaSolidarity += 3.0;
                deltaFear -= 0.5; // Anger overcomes intimidation
              } else {
                // In dark/censored environment, fear dominates
                deltaFear += 3.5;
                deltaSolidarity -= 1.5;
              }
            }
            break;
          case 'arrest_organizers':
            if (prev.solidarity > 60) {
              // Mass turnout at courthouse (Montgomery parallel)
              deltaSolidarity += 3.5;
              deltaPublicSupport += 2.5;
            } else {
              deltaFear += 3.0;
              deltaSolidarity -= 2.5;
            }
            break;
          case 'repeal_law':
            deltaConcessions = 100 - prev.concessionsWon; // Full victory!
            break;
        }

        // Natural decay or equilibrium
        if (prev.activeTactics.length === 0 && prev.authorityStance === 'dialogue_deescalate') {
          deltaGrievance -= 1.0;
        }

        const newGrievance = Math.min(100, Math.max(0, Math.round(prev.grievance + deltaGrievance)));
        const newSolidarity = Math.min(100, Math.max(0, Math.round(prev.solidarity + deltaSolidarity)));
        const newFear = Math.min(100, Math.max(0, Math.round(prev.fear + deltaFear)));
        const newEconomic = Math.min(100, Math.max(0, Math.round(prev.economicPressure + deltaEconomic)));
        const newPublicSupport = Math.min(100, Math.max(0, Math.round(prev.publicSupport + deltaPublicSupport)));
        const newConcessions = Math.min(100, Math.max(0, Math.round(prev.concessionsWon + deltaConcessions)));

        // Generate periodic event log if significant milestones occur
        let newLogs = [...prev.eventHistory];
        if (nextDay % 5 === 0) {
          let logTitle = `Day ${nextDay} Societal Summary`;
          let logDesc = `Solidarity stands at ${newSolidarity}%, with economic disruption reaching ${newEconomic}%.`;
          let causalText = 'Because collective action persisted, authorities felt increasing pressure.';

          if (hasBoycott && hasCarpool) {
            logTitle = 'Carpool Fleet Sustains Bus Boycott';
            logDesc = 'Volunteer drivers shuttled 15,000 workers to factory shifts, preventing economic collapse.';
            causalText = 'As a result of community carpools, citizens maintained resistance without losing jobs.';
          } else if (prev.authorityStance === 'police_dispersal' && hasMedia) {
            logTitle = 'National Outrage Over Police Crackdown';
            logDesc = 'Photographs of police batons used against peaceful marchers appeared in morning newspapers.';
            causalText = 'Because press cameras captured the violence, public sympathy surged nationwide.';
          } else if (newConcessions >= 80) {
            logTitle = 'Historic Reform Enacted';
            logDesc = 'Municipal council voted unanimously to abolish discriminatory regulations.';
            causalText = 'Consequently, sustained civic pressure resulted in lasting social change.';
          }

          newLogs.push({
            id: `log_${nextDay}`,
            day: nextDay,
            title: logTitle,
            description: logDesc,
            category: 'action',
            causalLink: causalText
          });
        }

        // Check if hypothesis run is completing
        if (hypothesisTicksRemainingRef.current > 0) {
          hypothesisTicksRemainingRef.current -= 1;
          if (hypothesisTicksRemainingRef.current === 0) {
            setIsOutcomeOpen(true);
            return {
              ...prev,
              day: nextDay,
              isRunning: false, // pause when hypothesis simulation finishes
              grievance: newGrievance,
              solidarity: newSolidarity,
              fear: newFear,
              economicPressure: newEconomic,
              publicSupport: newPublicSupport,
              concessionsWon: newConcessions,
              eventHistory: newLogs
            };
          }
        }

        return {
          ...prev,
          day: nextDay,
          grievance: newGrievance,
          solidarity: newSolidarity,
          fear: newFear,
          economicPressure: newEconomic,
          publicSupport: newPublicSupport,
          concessionsWon: newConcessions,
          eventHistory: newLogs
        };
      });

      // Update district levels dynamically
      setDistricts((prevDistricts) =>
        prevDistricts.map((d) => {
          let deltaG = 0;
          let deltaO = 0;
          if (d.id === 'transit_hub' && simulation.activeTactics.includes('economic_boycott')) {
            deltaG += 1;
            deltaO += 2;
          }
          if (d.id === 'factory_district' && simulation.activeTactics.includes('labor_strike')) {
            deltaG += 1;
            deltaO += 2;
          }
          if (d.id === 'residential_quarter' && simulation.activeTactics.includes('carpool_network')) {
            deltaO += 3;
          }
          return {
            ...d,
            grievance: Math.min(100, Math.max(10, d.grievance + deltaG)),
            organization: Math.min(100, Math.max(10, d.organization + deltaO))
          };
        })
      );
    }, intervalTime);

    return () => clearInterval(timer);
  }, [simulation.isRunning, simulation.speed, simulation.activeTactics, simulation.authorityStance]);

  // Handlers for Simulation Controls
  const handleTogglePlay = () => {
    setSimulation((prev) => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const handleStepDay = () => {
    setSimulation((prev) => ({ ...prev, day: prev.day + 1 }));
  };

  const handleReset = () => {
    const currentConfig = FISH_TANK_LEVELS.find((l) => l.id === currentLevelId) || FISH_TANK_LEVELS[0];
    setSimulation({
      levelId: currentLevelId,
      scenarioId: currentScenarioId,
      day: 1,
      isRunning: false,
      speed: 1,
      ...currentConfig.initialMetrics,
      concessionsWon: 0,
      eventHistory: [
        {
          id: 'log_reset',
          day: 1,
          title: 'Simulation Initialized',
          description: `Loaded ${currentConfig.title}. Society is in baseline balance.`,
          category: 'grievance',
          causalLink: 'Baseline conditions established.'
        }
      ],
      activeTactics: [],
      authorityStance: 'dialogue_deescalate',
      freedomOfSpeech: true,
      freedomOfAssembly: currentLevelId !== 'level1',
      pressCensored: false,
      communityFund: 40
    });
    setDistricts(INITIAL_DISTRICTS);
  };

  const handleToggleTactic = (tactic: ProtestTactic) => {
    setSimulation((prev) => {
      const exists = prev.activeTactics.includes(tactic);
      const updated = exists
        ? prev.activeTactics.filter((t) => t !== tactic)
        : [...prev.activeTactics, tactic];

      const tacticName = tactic.replace('_', ' ');
      const actionVerb = exists ? 'recalled' : 'deployed';

      return {
        ...prev,
        activeTactics: updated,
        eventHistory: [
          ...prev.eventHistory,
          {
            id: `log_tact_${prev.day}_${Date.now()}`,
            day: prev.day,
            title: `Tactical Movement: ${tacticName.toUpperCase()} ${actionVerb}`,
            description: `Citizens ${actionVerb} ${tacticName}. This directly alters organizational leverage.`,
            category: 'action',
            causalLink: `Because organizers ${actionVerb} ${tacticName}, community dynamics shifted.`
          }
        ]
      };
    });
  };

  const handleChangeAuthorityStance = (stance: AuthorityAction) => {
    setSimulation((prev) => ({
      ...prev,
      authorityStance: stance,
      repressionLevel: stance === 'police_dispersal' || stance === 'arrest_organizers' ? 75 : 30,
      eventHistory: [
        ...prev.eventHistory,
        {
          id: `log_auth_${prev.day}_${Date.now()}`,
          day: prev.day,
          title: `Government Stance: ${stance.replace('_', ' ').toUpperCase()}`,
          description: `Authorities adopted the posture: ${stance.replace('_', ' ')}.`,
          category: 'authority',
          causalLink: `In response to public mobilization, power chose ${stance.replace('_', ' ')}.`
        }
      ]
    }));
  };

  // Select Level
  const handleSelectLevel = (levelId: FishTankLevelId) => {
    setCurrentLevelId(levelId);
    setCurrentScenarioId(undefined);
    const config = FISH_TANK_LEVELS.find((l) => l.id === levelId) || FISH_TANK_LEVELS[0];

    setSimulation({
      levelId,
      scenarioId: undefined,
      day: 1,
      isRunning: false,
      speed: 1,
      ...config.initialMetrics,
      concessionsWon: 0,
      eventHistory: [
        {
          id: `lvl_init_${levelId}`,
          day: 1,
          title: `Entered Level ${config.number}: ${config.title}`,
          description: config.description,
          category: 'grievance',
          causalLink: config.fishTankPrinciple
        }
      ],
      activeTactics: [],
      authorityStance: 'dialogue_deescalate',
      freedomOfSpeech: true,
      freedomOfAssembly: config.number >= 2,
      pressCensored: false,
      communityFund: 50
    });

    if (config.eventOptions.length > 0) {
      setPendingEventShock({
        title: config.eventOptions[0].title,
        description: config.eventOptions[0].description,
        historicalParallel: config.eventOptions[0].historicalParallel
      });
    }

    setCurrentTab('simulation');
  };

  // Load Historical Scenario into Sim
  const handleLoadScenarioIntoSim = (scenarioId: HistoricalScenarioId) => {
    const dossier = HISTORICAL_DOSSIERS[scenarioId];
    if (!dossier) return;

    setCurrentScenarioId(scenarioId);
    setCurrentLevelId('level6');

    setSimulation({
      levelId: 'level6',
      scenarioId,
      day: 1,
      isRunning: false,
      speed: 1,
      grievance: 85,
      solidarity: 65,
      fear: 45,
      economicPressure: 50,
      publicSupport: 50,
      repressionLevel: 60,
      concessionsWon: 0,
      eventHistory: [
        {
          id: `hist_init_${scenarioId}`,
          day: 1,
          title: `Historical Lab: ${dossier.title}`,
          description: dossier.historicalFactSheet.whatWasProtestedAgainst,
          category: 'grievance',
          causalLink: dossier.systemDynamicsLesson
        }
      ],
      activeTactics:
        scenarioId === 'montgomery'
          ? ['economic_boycott', 'carpool_network']
          : scenarioId === 'suffragettes'
          ? ['peaceful_march', 'civil_disobedience']
          : scenarioId === 'soweto'
          ? ['peaceful_march', 'media_expose']
          : ['economic_boycott'],
      authorityStance:
        scenarioId === 'soweto'
          ? 'police_dispersal'
          : scenarioId === 'montgomery'
          ? 'assembly_ban'
          : 'token_concession',
      freedomOfSpeech: true,
      freedomOfAssembly: scenarioId !== 'soweto',
      pressCensored: false,
      communityFund: 70
    });

    setPendingEventShock({
      title: dossier.title,
      description: dossier.historicalFactSheet.whyActionWasTaken,
      historicalParallel: `${dossier.location} (${dossier.year})`
    });

    setCurrentTab('simulation');
  };

  // Trigger scientific prediction modal
  const handleTriggerPrediction = () => {
    setIsPredictionOpen(true);
  };

  // Commit scientific hypothesis & start automated simulation run
  const handleSubmitPrediction = (hypothesis: PredictionHypothesis) => {
    setCurrentHypothesis(hypothesis);

    // Apply predicted shock to the simulation state
    setSimulation((prev) => ({
      ...prev,
      grievance: Math.min(100, prev.grievance + 15),
      isRunning: true,
      eventHistory: [
        ...prev.eventHistory,
        {
          id: `hypo_run_${Date.now()}`,
          day: prev.day,
          title: `Hypothesis Committed: Testing System Dynamics`,
          description: `Hypothesis: ${hypothesis.impactedGroup} will deploy ${hypothesis.anticipatedProtestMethod.replace('_', ' ')}. Anticipated authority stance: ${hypothesis.anticipatedAuthorityReaction.replace('_', ' ')}.`,
          category: 'action',
          causalLink: hypothesis.studentReasoning
        }
      ]
    }));

    // Run for 12 ticks then debrief
    hypothesisTicksRemainingRef.current = 12;
  };

  // Find currently selected district object
  const currentSelectedDistrict = districts.find((d) => d.id === selectedDistrictId) || null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Bar Header */}
      <TopBar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenVocabulary={() => setIsVocabularyOpen(true)}
        onOpenFishTankGuide={() => setIsFishTankGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        {/* TAB 1: LIVING SIMULATION STAGE */}
        {currentTab === 'simulation' && (
          <div className="space-y-5">
            {/* Simulation Canvas View */}
            <div className="h-[460px] md:h-[500px]">
              <CityMapCanvas
                districts={districts}
                selectedDistrict={selectedDistrictId}
                onSelectDistrict={(id) => setSelectedDistrictId(id)}
                simulation={simulation}
                activeView={activeMapView}
                onChangeView={setActiveMapView}
                onTriggerPrediction={handleTriggerPrediction}
              />
            </div>

            {/* Simulation Controls & Fish Tank Dashboard */}
            <SimulationControls
              simulation={simulation}
              onTogglePlay={handleTogglePlay}
              onStepDay={handleStepDay}
              onReset={handleReset}
              onChangeSpeed={(speed) => setSimulation((p) => ({ ...p, speed }))}
              onToggleTactic={handleToggleTactic}
              onChangeAuthorityStance={handleChangeAuthorityStance}
              onTriggerEventPrompt={handleTriggerPrediction}
            />
          </div>
        )}

        {/* TAB 2: FISH TANK LEVELS (1-6) */}
        {currentTab === 'levels' && (
          <FishTankLevelsView
            currentLevelId={currentLevelId}
            onSelectLevel={handleSelectLevel}
          />
        )}

        {/* TAB 3: HISTORICAL CASE LAB */}
        {currentTab === 'history' && (
          <HistoricalDossier
            onLoadScenarioIntoSim={handleLoadScenarioIntoSim}
          />
        )}

        {/* TAB 4: CAUSE & EFFECT STUDIO (B1-B2 LANGUAGE) */}
        {currentTab === 'language' && (
          <CauseEffectWorkbench
            simulation={simulation}
            onOpenVocabulary={() => setIsVocabularyOpen(true)}
          />
        )}

        {/* TAB 5: FINAL INVESTIGATION DOSSIER */}
        {currentTab === 'dossier' && (
          <HistoricalDossier
            onLoadScenarioIntoSim={handleLoadScenarioIntoSim}
          />
        )}
      </main>

      {/* District Inspector Modal */}
      {selectedDistrictId && (
        <DistrictInspector
          district={currentSelectedDistrict}
          onClose={() => setSelectedDistrictId(null)}
          simulation={simulation}
          onDeployTactic={handleToggleTactic}
        />
      )}

      {/* Scientific Prediction Modal */}
      <PredictionModal
        isOpen={isPredictionOpen}
        onClose={() => setIsPredictionOpen(false)}
        eventTitle={pendingEventShock.title}
        eventDescription={pendingEventShock.description}
        historicalParallel={pendingEventShock.historicalParallel}
        districts={districts}
        onSubmitPrediction={handleSubmitPrediction}
      />

      {/* Simulation Outcome & Debrief Modal */}
      <SimulationOutcomeModal
        isOpen={isOutcomeOpen}
        onClose={() => setIsOutcomeOpen(false)}
        hypothesis={currentHypothesis}
        simulation={simulation}
        onOpenLanguageWorkbench={() => setCurrentTab('language')}
      />

      {/* Vocabulary Drawer */}
      <VocabularyDrawer
        isOpen={isVocabularyOpen}
        onClose={() => setIsVocabularyOpen(false)}
      />

      {/* Fish Tank Concept Explainer */}
      <FishTankExplainerModal
        isOpen={isFishTankGuideOpen}
        onClose={() => setIsFishTankGuideOpen(false)}
      />

      {/* Quiet Footer */}
      <footer className="mt-auto px-6 py-4 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between gap-4">
        <div>
          <span>WHY WE PROTEST</span>
          <span className="mx-2">·</span>
          <span>Nannestad High School- Barbara Anna Zielonka</span>
        </div>
      </footer>
    </div>
  );
}
