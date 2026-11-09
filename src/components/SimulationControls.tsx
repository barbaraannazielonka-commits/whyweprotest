/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward, 
  ChevronRight, 
  Flame, 
  Users, 
  ShieldAlert, 
  Coins, 
  Tv, 
  Sparkles,
  Award,
  Zap,
  Building,
  Radio,
  FileCheck2
} from 'lucide-react';
import { SimulationState, ProtestTactic, AuthorityAction } from '../types/simulation';

interface SimulationControlsProps {
  simulation: SimulationState;
  onTogglePlay: () => void;
  onStepDay: () => void;
  onReset: () => void;
  onChangeSpeed: (speed: number) => void;
  onToggleTactic: (tactic: ProtestTactic) => void;
  onChangeAuthorityStance: (stance: AuthorityAction) => void;
  onTriggerEventPrompt: () => void;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  simulation,
  onTogglePlay,
  onStepDay,
  onReset,
  onChangeSpeed,
  onToggleTactic,
  onChangeAuthorityStance,
  onTriggerEventPrompt
}) => {
  const tactics: { id: ProtestTactic; label: string; icon: string }[] = [
    { id: 'economic_boycott', label: 'Boycott', icon: 'Bus' },
    { id: 'labor_strike', label: 'Strike', icon: 'Factory' },
    { id: 'peaceful_march', label: 'March', icon: 'Users' },
    { id: 'carpool_network', label: 'Carpool Aid', icon: 'Car' },
    { id: 'civil_disobedience', label: 'Disobedience', icon: 'Zap' },
    { id: 'legal_petition', label: 'Legal Suit', icon: 'Scale' },
    { id: 'media_expose', label: 'Media Push', icon: 'Tv' },
    { id: 'mass_meeting', label: 'Mass Rally', icon: 'Megaphone' }
  ];

  const authorityStances: { id: AuthorityAction; label: string }[] = [
    { id: 'dialogue_deescalate', label: 'Dialogue & De-escalate' },
    { id: 'token_concession', label: 'Token Minor Offer' },
    { id: 'assembly_ban', label: 'Ban All Assemblies' },
    { id: 'police_dispersal', label: 'Deploy Riot Police' },
    { id: 'arrest_organizers', label: 'Arrest Movement Leaders' },
    { id: 'repeal_law', label: 'Repeal Law (Full Reform)' }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl space-y-4">
      {/* Top Playback Bar & Day Counter */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePlay}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              simulation.isRunning
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-amber-400 text-slate-950 hover:bg-amber-300'
            }`}
          >
            {simulation.isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Sim</span>
              </>
            )}
          </button>

          <button
            onClick={onStepDay}
            disabled={simulation.isRunning}
            className="p-1.5 rounded-lg text-xs bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
            title="Step forward 1 day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onChangeSpeed(simulation.speed === 1 ? 2 : 1)}
            className="px-2 py-1.5 rounded-lg text-xs bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer tabular-nums"
          >
            {simulation.speed}x
          </button>

          <button
            onClick={onReset}
            className="p-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Trigger Event Shock Button */}
        <button
          onClick={onTriggerEventPrompt}
          className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 rounded-lg shadow transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
          <span>Introduce System Shock</span>
        </button>
      </div>

      {/* System Telemetry Gauges (The Fish Tank System Vitals) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* Grievance */}
        <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-lg">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="truncate">Grievance</span>
            <Flame className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div className="text-base font-bold text-white tabular-nums">{simulation.grievance}%</div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-red-500 h-full rounded-full" style={{ width: `${simulation.grievance}%` }} />
          </div>
        </div>

        {/* Solidarity */}
        <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-lg">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="truncate">Solidarity</span>
            <Users className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-base font-bold text-white tabular-nums">{simulation.solidarity}%</div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${simulation.solidarity}%` }} />
          </div>
        </div>

        {/* Fear / Repression Burden */}
        <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-lg">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="truncate">Fear & Risk</span>
            <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-base font-bold text-white tabular-nums">{simulation.fear}%</div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${simulation.fear}%` }} />
          </div>
        </div>

        {/* Economic Pressure */}
        <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-lg">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="truncate">Disruption</span>
            <Coins className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-base font-bold text-white tabular-nums">{simulation.economicPressure}%</div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-amber-400 h-full rounded-full" style={{ width: `${simulation.economicPressure}%` }} />
          </div>
        </div>

        {/* Public Opinion & Media */}
        <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-lg">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="truncate">Public Opinion</span>
            <Tv className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-base font-bold text-white tabular-nums">{simulation.publicSupport}%</div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-purple-400 h-full rounded-full" style={{ width: `${simulation.publicSupport}%` }} />
          </div>
        </div>

        {/* Concessions Won */}
        <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-lg">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="truncate">Reform Won</span>
            <Award className="w-3.5 h-3.5 text-yellow-400" />
          </div>
          <div className="text-base font-bold text-white tabular-nums">{simulation.concessionsWon}%</div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-yellow-400 h-full rounded-full" style={{ width: `${simulation.concessionsWon}%` }} />
          </div>
        </div>
      </div>

      {/* Movement Tactical Levers */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Movement Strategy & Logistics (Toggle Tactics)</span>
          </span>
          <span className="text-[11px] text-slate-500">Click to deploy or recall</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {tactics.map((t) => {
            const isActive = simulation.activeTactics.includes(t.id);
            return (
              <button
                key={t.id}
                onClick={() => onToggleTactic(t.id)}
                className={`p-2 rounded-lg text-xs font-medium border text-left transition-all flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>{t.label}</span>
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-amber-400' : 'bg-slate-700'}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Authority Stance Lever */}
      <div className="pt-2 border-t border-slate-800">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-blue-400" />
            <span>Power & Government Response Posture</span>
          </span>
          <span className="text-[11px] text-slate-400">
            Current: <strong className="text-white capitalize">{simulation.authorityStance.replace('_', ' ')}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {authorityStances.map((s) => {
            const isCurrent = simulation.authorityStance === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onChangeAuthorityStance(s.id)}
                className={`p-2 rounded-lg text-[11px] font-medium border transition-all text-center truncate cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-600/30 border-blue-400 text-white font-semibold shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
