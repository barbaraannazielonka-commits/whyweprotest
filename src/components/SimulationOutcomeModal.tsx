/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  ArrowRight, 
  Scale, 
  Lightbulb, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { PredictionHypothesis, SimulationState } from '../types/simulation';

interface SimulationOutcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  hypothesis: PredictionHypothesis | null;
  simulation: SimulationState;
  onOpenLanguageWorkbench: () => void;
}

export const SimulationOutcomeModal: React.FC<SimulationOutcomeModalProps> = ({
  isOpen,
  onClose,
  hypothesis,
  simulation,
  onOpenLanguageWorkbench
}) => {
  if (!isOpen || !hypothesis) return null;

  // Evaluate systemic outcome based on simulation state
  const determineActualOutcome = () => {
    if (simulation.concessionsWon >= 60) {
      return {
        id: 'concessions',
        title: 'Substantive Concessions & Reform Won',
        summary: 'Sustained economic leverage and public pressure compelled the authorities to repeal the policy or grant historic reform.',
        fishTankMechanism: 'Grievance was channeled into disciplined economic pressure (boycott or strike). Because alternative mutual aid protected the community, the cost of continuing the injustice became higher for power than conceding.'
      };
    }
    if (simulation.repressionLevel > 50 && simulation.solidarity > 65 && simulation.publicSupport > 60) {
      return {
        id: 'backfire_growth',
        title: 'The Repression Paradox (The Backfire Effect)',
        summary: 'Heavy-handed police action against nonviolent citizens destroyed the state’s moral standing and dramatically mobilized neutral onlookers.',
        fishTankMechanism: 'State repression against nonviolent, organized citizens generated moral shock. When cameras and witnesses documented the cruelty, public sympathy and international pressure surged.'
      };
    }
    if (simulation.fear > 70 && simulation.solidarity < 40) {
      return {
        id: 'movement_crushed',
        title: 'Dissipation Through Fear and Exhaustion',
        summary: 'Without sufficient mutual aid funds, carpool logistics, or legal protection, fear of losing jobs and arrests caused participation to decline.',
        fishTankMechanism: 'Protesting has immense personal costs. Without mobilizing structures (churches, unions, student networks), individuals cannot endure prolonged pressure alone.'
      };
    }
    return {
      id: 'stalemate',
      title: 'Prolonged Deadlock & Attrition',
      summary: 'Neither side holds decisive leverage. The authorities refuse to negotiate, while the movement maintains resistance.',
      fishTankMechanism: 'A battle of endurance. The outcome will depend on whether organizers can secure outside funds/media or whether the authorities suffer economic exhaustion.'
    };
  };

  const actualOutcome = determineActualOutcome();
  const predictionMatched = hypothesis.predictedOutcome === actualOutcome.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
            <Scale className="w-3.5 h-3.5" />
            <span>Gee Fish Tank • Simulation Debrief</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            Comparing Your Hypothesis With System Dynamics
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Examine how your prediction compared with what actually emerged in the simulated society.
          </p>
        </div>

        {/* Prediction vs Actual Verdict Banner */}
        <div className={`mt-5 p-4 rounded-xl border flex items-start gap-3.5 ${
          predictionMatched 
            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
            : 'bg-amber-950/40 border-amber-500/50 text-amber-200'
        }`}>
          <div className={`p-2 rounded-lg mt-0.5 ${predictionMatched ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
            {predictionMatched ? <CheckCircle2 className="w-5 h-5" /> : <Lightbulb className="w-5 h-5" />}
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider">
              {predictionMatched ? 'Hypothesis Confirmed by Emergence' : 'Surprising Systemic Interaction'}
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">{actualOutcome.title}</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{actualOutcome.summary}</p>
          </div>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Your Prediction */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              Your Hypothesis
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400">Target Group: </span>
                <span className="text-white font-medium">{hypothesis.impactedGroup}</span>
              </div>
              <div>
                <span className="text-slate-400">Epicenter District: </span>
                <span className="text-white font-medium capitalize">{hypothesis.epicenterDistrict.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-slate-400">Anticipated Action: </span>
                <span className="text-white font-medium capitalize">{hypothesis.anticipatedProtestMethod.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-slate-400">Authority Stance: </span>
                <span className="text-white font-medium capitalize">{hypothesis.anticipatedAuthorityReaction.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-slate-400">Predicted Outcome: </span>
                <span className="text-white font-medium capitalize">{hypothesis.predictedOutcome.replace('_', ' ')}</span>
              </div>
              {hypothesis.studentReasoning && (
                <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-300 italic">
                  "{hypothesis.studentReasoning}"
                </div>
              )}
            </div>
          </div>

          {/* Actual System State */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
              Emergent Simulation State (Day {simulation.day})
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Public Grievance:</span>
                <span className="text-red-400 font-bold tabular-nums">{simulation.grievance}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Community Solidarity:</span>
                <span className="text-emerald-400 font-bold tabular-nums">{simulation.solidarity}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Fear & Repression:</span>
                <span className="text-blue-400 font-bold tabular-nums">{simulation.fear}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Economic Disruption:</span>
                <span className="text-amber-400 font-bold tabular-nums">{simulation.economicPressure}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Public & Media Sympathy:</span>
                <span className="text-purple-400 font-bold tabular-nums">{simulation.publicSupport}%</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                <span className="text-slate-400">Concessions Won:</span>
                <span className="text-yellow-400 font-bold tabular-nums">{simulation.concessionsWon}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Dive into Gee's Fish Tank Mechanism */}
        <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>The Systemic Mechanism Behind This Outcome</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            {actualOutcome.fishTankMechanism}
          </p>
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Key Takeaway:</strong> Protests do not follow a simple script. Protests emerge from the complex interaction of grievances, organizational resources, media exposure, and the strategic choices made by both citizens and those in power.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Return to Simulation Map
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenLanguageWorkbench();
            }}
            className="px-4 py-2 text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Reflect in Cause & Effect Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
