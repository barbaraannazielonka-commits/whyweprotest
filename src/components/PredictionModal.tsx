/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  ShieldAlert, 
  Users, 
  TrendingUp,
  FileText
} from 'lucide-react';
import { DistrictId, DistrictInfo, PredictionHypothesis, ProtestTactic, AuthorityAction } from '../types/simulation';

interface PredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventDescription: string;
  historicalParallel?: string;
  districts: DistrictInfo[];
  onSubmitPrediction: (hypothesis: PredictionHypothesis) => void;
}

export const PredictionModal: React.FC<PredictionModalProps> = ({
  isOpen,
  onClose,
  eventTitle,
  eventDescription,
  historicalParallel,
  districts,
  onSubmitPrediction
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictId>('transit_hub');
  const [impactedGroup, setImpactedGroup] = useState<string>('Working Commuters');
  const [anticipatedTactic, setAnticipatedTactic] = useState<ProtestTactic>('economic_boycott');
  const [anticipatedAuthority, setAnticipatedAuthority] = useState<AuthorityAction>('assembly_ban');
  const [anticipatedOutcome, setAnticipatedOutcome] = useState<'concessions' | 'backfire_growth' | 'movement_crushed' | 'stalemate'>('backfire_growth');
  const [causalExplanation, setCausalExplanation] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitPrediction({
      epicenterDistrict: selectedDistrict,
      impactedGroup,
      anticipatedProtestMethod: anticipatedTactic,
      anticipatedAuthorityReaction: anticipatedAuthority,
      predictedOutcome: anticipatedOutcome,
      studentReasoning: causalExplanation.trim() || 'Formulated based on systemic feedback loops.'
    });
    onClose();
  };

  const tacticOptions: { id: ProtestTactic; label: string }[] = [
    { id: 'economic_boycott', label: 'Economic Boycott (Refusal to buy/use)' },
    { id: 'labor_strike', label: 'Labor Strike & Picket Line' },
    { id: 'peaceful_march', label: 'Mass Nonviolent March' },
    { id: 'civil_disobedience', label: 'Direct Civil Disobedience (Law Refusal)' },
    { id: 'legal_petition', label: 'Formal Constitutional Court Petition' },
    { id: 'mass_meeting', label: 'Grassroots Community Mass Meeting' },
    { id: 'media_expose', label: 'Investigative Media Broadcast' }
  ];

  const authorityOptions: { id: AuthorityAction; label: string }[] = [
    { id: 'dialogue_deescalate', label: 'Invite Negotiation & De-escalate' },
    { id: 'token_concession', label: 'Offer Minor / Token Compromise' },
    { id: 'assembly_ban', label: 'Declare Assembly Illegal & Issue Fines' },
    { id: 'police_dispersal', label: 'Deploy Riot Police & Disperse Crowd' },
    { id: 'arrest_organizers', label: 'Arrest Community Leaders & Pastors' },
    { id: 'repeal_law', label: 'Abolish the Unjust Law Completely' }
  ];

  const outcomeOptions: { id: 'concessions' | 'backfire_growth' | 'movement_crushed' | 'stalemate'; label: string; desc: string }[] = [
    {
      id: 'backfire_growth',
      label: 'The Repression Paradox (Backfire Effect)',
      desc: 'State violence or unfair arrests anger neutral onlookers and multiply solidarity.'
    },
    {
      id: 'concessions',
      label: 'Economic Pressure Forces Reform',
      desc: 'Loss of revenue or disruption compels decision-makers to compromise.'
    },
    {
      id: 'movement_crushed',
      label: 'Fear and Exhaustion Suppress Action',
      desc: 'Without strike funds or carpools, people return to work out of necessity.'
    },
    {
      id: 'stalemate',
      label: 'Prolonged Deadlock & Attrition',
      desc: 'Neither side yields; situation becomes an endurance contest.'
    }
  ];

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
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gee Fish Tank • Hypothesis Formulation</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            Predict System Dynamics Before Simulation
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            In a living social system, policies and events do not cause uniform outcomes. Formulate your hypothesis on who will act, where tensions will rise, and how power will react.
          </p>
        </div>

        {/* Impending Event Box */}
        <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            Incoming Scenario Shock:
          </div>
          <h3 className="text-base font-bold text-white mt-0.5">{eventTitle}</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{eventDescription}</p>
          {historicalParallel && (
            <div className="mt-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 italic">
              <strong>Historical Context: </strong> {historicalParallel}
            </div>
          )}
        </div>

        {/* Prediction Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          {/* 1. Mark Epicenter District on Scene */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>1. Mark Flashpoint Epicenter on the Scene</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {districts.map((d) => (
                <button
                  type="button"
                  key={d.id}
                  onClick={() => setSelectedDistrict(d.id)}
                  className={`p-2.5 rounded-lg text-left border transition-all cursor-pointer ${
                    selectedDistrict === d.id
                      ? 'bg-amber-400/10 border-amber-400 text-white shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold truncate">{d.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-slate-500 truncate">{d.primaryGroup.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Group Most Impacted */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>2. Most Impacted Group</span>
              </label>
              <select
                value={impactedGroup}
                onChange={(e) => setImpactedGroup(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="Working Commuters">Working Commuters & Bus Riders</option>
                <option value="Industrial Factory Workers">Industrial Factory Workers</option>
                <option value="University Students & Youth">University Students & Youth</option>
                <option value="Working-Class Families & Church Parishioners">Working-Class Families & Parishioners</option>
                <option value="Downtown Retail Merchants">Downtown Retail Merchants</option>
                <option value="Neutral Public Bystanders">Neutral Public Bystanders</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                <span>3. Anticipated Public Action</span>
              </label>
              <select
                value={anticipatedTactic}
                onChange={(e) => setAnticipatedTactic(e.target.value as ProtestTactic)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {tacticOptions.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Authority Reaction & Net Outcome */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
                <span>4. Anticipated Government Stance</span>
              </label>
              <select
                value={anticipatedAuthority}
                onChange={(e) => setAnticipatedAuthority(e.target.value as AuthorityAction)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {authorityOptions.map((a) => (
                  <option key={a.id} value={a.id}>{a.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>5. Hypothesized Systemic Outcome</span>
              </label>
              <select
                value={anticipatedOutcome}
                onChange={(e) => setAnticipatedOutcome(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {outcomeOptions.map((o) => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. Causal Explanation (Upper-secondary English practice) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>6. Explain Your Causal Reasoning (B1–B2 Connectors)</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                Use: because of, as a result, consequently, therefore, this led to
              </span>
            </label>
            <textarea
              value={causalExplanation}
              onChange={(e) => setCausalExplanation(e.target.value)}
              placeholder="Example: Because of the steep fare increase, working commuters will refuse to ride the buses. As a result, commercial revenues will drop, forcing authorities to reconsider..."
              rows={3}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 leading-relaxed"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-between gap-4 border-t border-slate-800">
            <div className="text-[11px] text-slate-400 italic">
              After submitting, the simulation will execute 15 days of dynamic interactions.
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg transition-colors flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Commit Prediction & Run Sim</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
