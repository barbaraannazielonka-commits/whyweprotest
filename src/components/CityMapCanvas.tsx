/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building2, 
  Bus, 
  Factory, 
  GraduationCap, 
  Home, 
  ShoppingBag, 
  Landmark, 
  Radio, 
  Users, 
  ShieldAlert, 
  AlertTriangle,
  Flame,
  CheckCircle2,
  Tv
} from 'lucide-react';
import { DistrictId, DistrictInfo, SimulationState } from '../types/simulation';

interface CityMapCanvasProps {
  districts: DistrictInfo[];
  selectedDistrict: DistrictId | null;
  onSelectDistrict: (id: DistrictId) => void;
  simulation: SimulationState;
  activeView: 'normal' | 'grievance' | 'solidarity' | 'repression';
  onChangeView: (view: 'normal' | 'grievance' | 'solidarity' | 'repression') => void;
  onTriggerPrediction: () => void;
}

export const CityMapCanvas: React.FC<CityMapCanvasProps> = ({
  districts,
  selectedDistrict,
  onSelectDistrict,
  simulation,
  activeView,
  onChangeView,
  onTriggerPrediction
}) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictId | null>(null);

  // Helper to get district icon
  const getDistrictIcon = (id: DistrictId) => {
    switch (id) {
      case 'city_hall': return <Landmark className="w-6 h-6 text-indigo-400" />;
      case 'transit_hub': return <Bus className="w-6 h-6 text-amber-400" />;
      case 'factory_district': return <Factory className="w-6 h-6 text-orange-400" />;
      case 'university_campus': return <GraduationCap className="w-6 h-6 text-emerald-400" />;
      case 'residential_quarter': return <Home className="w-6 h-6 text-sky-400" />;
      case 'commercial_avenue': return <ShoppingBag className="w-6 h-6 text-rose-400" />;
      case 'freedom_square': return <Users className="w-6 h-6 text-yellow-400" />;
      case 'press_broadcast': return <Radio className="w-6 h-6 text-purple-400" />;
    }
  };

  // Determine district visual mood based on view mode
  const getDistrictMoodClass = (district: DistrictInfo) => {
    if (activeView === 'grievance') {
      if (district.grievance >= 70) return 'border-red-500/80 bg-red-950/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]';
      if (district.grievance >= 40) return 'border-amber-500/70 bg-amber-950/20';
      return 'border-slate-700/60 bg-slate-900/60';
    }
    if (activeView === 'solidarity') {
      if (district.organization >= 60) return 'border-emerald-500/80 bg-emerald-950/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]';
      if (district.organization >= 35) return 'border-teal-500/60 bg-teal-950/20';
      return 'border-slate-700/60 bg-slate-900/60';
    }
    if (activeView === 'repression') {
      if (simulation.repressionLevel >= 60) return 'border-blue-500/80 bg-blue-950/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]';
      return 'border-slate-700/60 bg-slate-900/60';
    }
    // Normal view:
    if (selectedDistrict === district.id) return 'border-amber-400 bg-slate-800/90 ring-2 ring-amber-400/40 shadow-xl';
    return 'border-slate-800/80 bg-slate-900/70 hover:border-slate-700 hover:bg-slate-800/60';
  };

  return (
    <div className="relative flex flex-col h-full bg-slate-950 rounded-xl border border-slate-800/80 overflow-hidden shadow-2xl">
      {/* Simulation Stage Header & Overlay Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-slate-800/80 bg-slate-900/50">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Fish Tank Sandbox City
            </span>
          </div>
          <span className="text-slate-600 text-xs">|</span>
          <span className="text-xs text-slate-400">
            Day <strong className="text-amber-400 tabular-nums">{simulation.day}</strong>
          </span>
          {simulation.activeTactics.length > 0 && (
            <span className="text-xs text-amber-300 font-medium ml-1">
              Active: {simulation.activeTactics.map(t => t.replace('_', ' ')).join(', ')}
            </span>
          )}
        </div>

        {/* View mode filters */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => onChangeView('normal')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeView === 'normal' ? 'bg-slate-800 text-amber-400 font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            City Life
          </button>
          <button
            onClick={() => onChangeView('grievance')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
              activeView === 'grievance' ? 'bg-red-950/60 text-red-400 font-medium border border-red-800/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-3 h-3" />
            <span>Grievances</span>
          </button>
          <button
            onClick={() => onChangeView('solidarity')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
              activeView === 'solidarity' ? 'bg-emerald-950/60 text-emerald-400 font-medium border border-emerald-800/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3 h-3" />
            <span>Solidarity</span>
          </button>
          <button
            onClick={() => onChangeView('repression')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
              activeView === 'repression' ? 'bg-blue-950/60 text-blue-400 font-medium border border-blue-800/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3 h-3" />
            <span>State Power</span>
          </button>
        </div>
      </div>

      {/* The Map Stage Canvas */}
      <div className="relative flex-1 p-4 md:p-6 overflow-y-auto">
        {/* Subtle grid backdrop lines representing roads & avenues */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="city-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#city-grid)" />
          </svg>
        </div>

        {/* Dynamic Simulation Event Banner if an event or shock just happened */}
        {simulation.eventHistory.length > 0 && (
          <div className="mb-4 p-3 bg-slate-900/90 border border-slate-700/80 rounded-lg flex items-start justify-between gap-3 shadow-md animate-fadeIn">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white flex items-center gap-2">
                  <span>Day {simulation.eventHistory[simulation.eventHistory.length - 1].day}:</span>
                  <span className="text-amber-300">{simulation.eventHistory[simulation.eventHistory.length - 1].title}</span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  {simulation.eventHistory[simulation.eventHistory.length - 1].description}
                </p>
                <div className="text-[11px] text-amber-400/90 font-medium mt-1">
                  Causal Link: {simulation.eventHistory[simulation.eventHistory.length - 1].causalLink}
                </div>
              </div>
            </div>

            <button
              onClick={onTriggerPrediction}
              className="px-3 py-1.5 text-xs font-medium bg-amber-400 hover:bg-amber-300 text-slate-950 rounded shadow-sm whitespace-nowrap transition-colors cursor-pointer shrink-0"
            >
              Formulate Prediction
            </button>
          </div>
        )}

        {/* District Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          {districts.map((district) => {
            const isSelected = selectedDistrict === district.id;
            const hasPicket = simulation.activeTactics.includes('labor_strike') && district.id === 'factory_district';
            const hasBoycott = simulation.activeTactics.includes('economic_boycott') && (district.id === 'transit_hub' || district.id === 'commercial_avenue');
            const hasMarch = simulation.activeTactics.includes('peaceful_march') && (district.id === 'freedom_square' || district.id === 'city_hall');
            const hasMeeting = simulation.activeTactics.includes('mass_meeting') && district.id === 'residential_quarter';
            const hasMedia = simulation.activeTactics.includes('media_expose') && district.id === 'press_broadcast';
            const hasPolice = simulation.repressionLevel > 50 && (district.id === 'freedom_square' || district.id === 'city_hall');

            return (
              <div
                key={district.id}
                onClick={() => onSelectDistrict(district.id)}
                onMouseEnter={() => setHoveredDistrict(district.id)}
                onMouseLeave={() => setHoveredDistrict(null)}
                className={`relative p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[175px] ${getDistrictMoodClass(
                  district
                )}`}
              >
                {/* Top row of card */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 shadow-sm">
                        {getDistrictIcon(district.id)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                          {district.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 line-clamp-1">
                          {district.primaryGroup}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                        Selected
                      </span>
                    )}
                  </div>

                  {/* Citizen Voice Snippet */}
                  <div className="mt-3 p-2 bg-slate-950/60 rounded border border-slate-800/70 text-xs">
                    <div className="text-[11px] font-medium text-amber-300/90 mb-0.5">
                      {district.citizenName}:
                    </div>
                    <p className="text-slate-300 italic text-[11px] leading-relaxed line-clamp-2">
                      "{district.citizenQuote}"
                    </p>
                  </div>
                </div>

                {/* Visual Living Animation Layer based on active tactics */}
                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  {/* Status indicators */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1" title="Local Grievance level">
                      <span className="text-[10px] text-slate-400 uppercase">Grievance</span>
                      <span className={`text-xs font-bold tabular-nums ${district.grievance >= 60 ? 'text-red-400' : 'text-slate-300'}`}>
                        {district.grievance}%
                      </span>
                    </div>

                    <div className="flex items-center gap-1" title="Solidarity / Organization">
                      <span className="text-[10px] text-slate-400 uppercase">Solidarity</span>
                      <span className={`text-xs font-bold tabular-nums ${district.organization >= 50 ? 'text-emerald-400' : 'text-slate-300'}`}>
                        {district.organization}%
                      </span>
                    </div>
                  </div>

                  {/* Live Simulation Agent Sprites / Status Badges */}
                  <div className="flex items-center gap-1.5">
                    {hasMarch && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 rounded flex items-center gap-1 animate-pulse">
                        <Users className="w-3 h-3" /> Marching
                      </span>
                    )}
                    {hasBoycott && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded flex items-center gap-1 animate-pulse">
                        <Bus className="w-3 h-3" /> Boycott
                      </span>
                    )}
                    {hasPicket && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40 rounded flex items-center gap-1 animate-pulse">
                        <Factory className="w-3 h-3" /> Strike Line
                      </span>
                    )}
                    {hasMeeting && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40 rounded flex items-center gap-1">
                        <Users className="w-3 h-3" /> Mass Meeting
                      </span>
                    )}
                    {hasMedia && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded flex items-center gap-1 animate-pulse">
                        <Tv className="w-3 h-3" /> Broadcasting
                      </span>
                    )}
                    {hasPolice && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" /> Cordon
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress bar visual indicator */}
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mt-2">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      activeView === 'grievance' 
                        ? 'bg-gradient-to-r from-yellow-500 to-red-500' 
                        : activeView === 'solidarity'
                        ? 'bg-gradient-to-r from-teal-500 to-emerald-400'
                        : 'bg-amber-400'
                    }`}
                    style={{ 
                      width: `${activeView === 'solidarity' ? district.organization : district.grievance}%` 
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Tactical Legend & Help Footer */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-5">
            <span className="font-semibold text-slate-300">Fish Tank Micro-world:</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-red-500"></span> Grievance (dissatisfaction with rules)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Solidarity (mutual trust & networks)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-blue-500"></span> State Power (laws & police)
            </span>
          </div>

          <div className="text-slate-400 text-[11px]">
            Click any district to inspect citizen voices, dilemmas & deploy local action.
          </div>
        </div>
      </div>
    </div>
  );
};
