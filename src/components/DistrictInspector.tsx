/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  X, 
  Users, 
  Flame, 
  ShieldAlert, 
  HelpCircle, 
  AlertCircle,
  Megaphone,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { DistrictInfo, ProtestTactic, SimulationState } from '../types/simulation';

interface DistrictInspectorProps {
  district: DistrictInfo | null;
  onClose: () => void;
  simulation: SimulationState;
  onDeployTactic: (tactic: ProtestTactic) => void;
}

export const DistrictInspector: React.FC<DistrictInspectorProps> = ({
  district,
  onClose,
  simulation,
  onDeployTactic
}) => {
  if (!district) return null;

  // Context-appropriate tactics for this district
  const getAvailableTactics = (): { id: ProtestTactic; title: string; desc: string; requirement: string }[] => {
    switch (district.id) {
      case 'transit_hub':
        return [
          {
            id: 'economic_boycott',
            title: 'Organize Transit Boycott',
            desc: 'Refuse to buy bus tickets or board vehicles until discriminatory rules or unfair fares are repealed.',
            requirement: 'Requires high solidarity or alternative transport (carpools).'
          },
          {
            id: 'carpool_network',
            title: 'Establish Volunteer Carpool Fleet',
            desc: 'Coordinate private drivers, church vans, and station wagons to provide free rides for working commuters.',
            requirement: 'Protects commuters from physical exhaustion and employer termination.'
          }
        ];
      case 'factory_district':
        return [
          {
            id: 'labor_strike',
            title: 'Call Factory Shift Strike & Picket',
            desc: 'Halt the assembly lines and establish picket lines outside the factory gates to halt economic production.',
            requirement: 'Exerts severe financial pressure on factory owners and tax revenues.'
          },
          {
            id: 'mass_meeting',
            title: 'Convene Union Hall Meeting',
            desc: 'Gather workers to vote on demands, establish strike solidarity funds, and train in picket line discipline.',
            requirement: 'Builds collective resolve and counters isolation.'
          }
        ];
      case 'university_campus':
        return [
          {
            id: 'media_expose',
            title: 'Print Underground Mimeographed Leaflets',
            desc: 'Distribute handbills explaining the cause across all neighborhoods before morning shift begins.',
            requirement: 'Breaks media blackout and alerts the broader public.'
          },
          {
            id: 'peaceful_march',
            title: 'Organize Student March to Freedom Square',
            desc: 'Mobilize student cohorts in orderly nonviolent lines carrying educational placards.',
            requirement: 'Visible youth presence challenges political legitimacy.'
          }
        ];
      case 'residential_quarter':
        return [
          {
            id: 'mass_meeting',
            title: 'Host Mass Church Rally',
            desc: 'Fill the parish sanctuary with 600 citizens to sing freedom songs, collect mutual aid funds, and listen to speakers.',
            requirement: 'Provides moral inspiration and overcomes individual fear.'
          },
          {
            id: 'carpool_network',
            title: 'Organize Neighborhood Mutual Aid & Care',
            desc: 'Pool community funds to provide groceries and child care for families facing employer retaliation.',
            requirement: 'Vital for sustaining long-term resistance.'
          }
        ];
      case 'freedom_square':
        return [
          {
            id: 'peaceful_march',
            title: 'Launch Massive Public Demonstration',
            desc: 'Assemble thousands of citizens in Freedom Square with disciplined nonviolent rules: no retaliatory violence.',
            requirement: 'Captures nationwide attention and moral authority.'
          },
          {
            id: 'civil_disobedience',
            title: 'Conduct Nonviolent Sit-In / Disobedience',
            desc: 'Peacefully occupy public municipal spaces in open defiance of unjust curfews or assembly bans.',
            requirement: 'Tests state willingness to make mass arrests of peaceful people.'
          }
        ];
      case 'commercial_avenue':
        return [
          {
            id: 'economic_boycott',
            title: 'Downtown Merchant Boycott',
            desc: 'Urge citizens not to spend money in downtown retail stores until business owners urge city council to negotiate.',
            requirement: 'Directly converts economic disruption into political pressure.'
          }
        ];
      case 'press_broadcast':
        return [
          {
            id: 'media_expose',
            title: 'Host National Press Conference',
            desc: 'Present photographic evidence of unjust conditions and invite foreign correspondents to witness the situation.',
            requirement: 'Drives international public opinion and solidarity.'
          }
        ];
      case 'city_hall':
        return [
          {
            id: 'legal_petition',
            title: 'File Constitutional Judicial Challenge',
            desc: 'Lodge formal lawsuits with constitutional courts asserting the laws violate fundamental civil rights.',
            requirement: 'Institutional legal strategy that establishes binding legal precedent.'
          },
          {
            id: 'civil_disobedience',
            title: 'Mass Civil Disobedience Outside Council Chamber',
            desc: 'Nonviolent assembly directly confronting legislators before an ordinance vote.',
            requirement: 'High risk of arrest; tests state moral legitimacy.'
          }
        ];
      default:
        return [];
    }
  };

  const availableTactics = getAvailableTactics();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            District Investigation
          </div>
          <h2 className="text-xl font-bold text-white">{district.name}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{district.tagline}</p>
        </div>

        {/* Citizen Voice & Lived Experience */}
        <div className="mt-5 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
            <Users className="w-4 h-4" />
            <span>Citizen Perspective: {district.citizenName}</span>
          </div>
          <blockquote className="mt-2 text-sm text-slate-200 italic leading-relaxed">
            "{district.citizenQuote}"
          </blockquote>

          {/* The Dilemma (Why protest vs why hesitate) */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs">
            <HelpCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-sky-300">The Dilemma: </strong>
              <span className="text-slate-300">{district.dilemma}</span>
            </div>
          </div>
        </div>

        {/* Local District Social Metrics */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Grievance</span>
              <Flame className="w-3.5 h-3.5 text-red-400" />
            </div>
            <div className="text-lg font-bold text-white tabular-nums">{district.grievance}%</div>
            <div className="w-full bg-slate-950 h-1 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="bg-red-500 h-full rounded-full" 
                style={{ width: `${district.grievance}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Solidarity</span>
              <Users className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-white tabular-nums">{district.organization}%</div>
            <div className="w-full bg-slate-950 h-1 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full" 
                style={{ width: `${district.organization}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Local Tension</span>
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-lg font-bold text-white tabular-nums">{district.tension}%</div>
            <div className="w-full bg-slate-950 h-1 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="bg-amber-400 h-full rounded-full" 
                style={{ width: `${district.tension}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Decision Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Megaphone className="w-4 h-4 text-amber-400" />
              <span>Deploy Action in this District</span>
            </h4>
            <span className="text-[11px] text-slate-500">Decisions reshape system dynamics</span>
          </div>

          <div className="space-y-2.5">
            {availableTactics.map((tactic) => {
              const isAlreadyActive = simulation.activeTactics.includes(tactic.id);
              return (
                <div
                  key={tactic.id}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isAlreadyActive
                      ? 'bg-amber-950/30 border-amber-500/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{tactic.title}</span>
                      {isAlreadyActive && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-400/20 text-amber-300 rounded border border-amber-400/40">
                          Currently Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{tactic.desc}</p>
                    <div className="text-[11px] text-slate-400 mt-1 italic">
                      {tactic.requirement}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onDeployTactic(tactic.id);
                      onClose();
                    }}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 shrink-0 ${
                      isAlreadyActive
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-amber-400 text-slate-950 font-semibold hover:bg-amber-300 shadow-sm'
                    }`}
                  >
                    {isAlreadyActive ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Withdraw Tactic</span>
                      </>
                    ) : (
                      <>
                        <span>Deploy Tactic</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Educational note on cause-and-effect */}
        <div className="mt-5 p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5" />
          <span>
            <strong>SimCity Principle:</strong> In an interconnected system, deploying a boycott in the transit hub will ripple into commercial revenues and municipal tax income, forcing authority reactions.
          </span>
        </div>
      </div>
    </div>
  );
};
