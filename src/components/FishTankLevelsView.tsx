/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  ShieldAlert, 
  Tv, 
  Users, 
  Award,
  Play
} from 'lucide-react';
import { FISH_TANK_LEVELS, LevelConfig } from '../data/levels';
import { FishTankLevelId } from '../types/simulation';

interface FishTankLevelsViewProps {
  currentLevelId: FishTankLevelId;
  onSelectLevel: (levelId: FishTankLevelId) => void;
}

export const FishTankLevelsView: React.FC<FishTankLevelsViewProps> = ({
  currentLevelId,
  onSelectLevel
}) => {
  const getLevelIcon = (num: number) => {
    switch (num) {
      case 1: return <Layers className="w-5 h-5 text-amber-400" />;
      case 2: return <ShieldAlert className="w-5 h-5 text-sky-400" />;
      case 3: return <Tv className="w-5 h-5 text-purple-400" />;
      case 4: return <Users className="w-5 h-5 text-emerald-400" />;
      case 5: return <Sparkles className="w-5 h-5 text-rose-400" />;
      case 6: return <Award className="w-5 h-5 text-yellow-400" />;
      default: return <Layers className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-1">
          <Layers className="w-4 h-4" />
          <span>James Paul Gee's "Fish Tank" Principle</span>
        </div>
        <h1 className="text-2xl font-bold text-white">
          Systemic Levels of Social Complexity
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
          In real life, politics and social change are dizzyingly complex. James Paul Gee’s <strong>“fish tank” principle</strong> teaches that beginners learn best in a simplified, bounded system where they can clearly see how variables influence one another before adding more real-world layers.
        </p>
      </div>

      {/* Levels Progression List */}
      <div className="space-y-4">
        {FISH_TANK_LEVELS.map((lvl) => {
          const isCurrent = currentLevelId === lvl.id;
          return (
            <div
              key={lvl.id}
              className={`p-6 rounded-2xl border transition-all shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                isCurrent
                  ? 'bg-slate-900 border-amber-400/80 ring-1 ring-amber-400/30'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 shadow-sm">
                    {getLevelIcon(lvl.number)}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-amber-400">
                      Level {lvl.number}
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {lvl.title}: <span className="text-slate-300 font-medium text-base">{lvl.subtitle}</span>
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {lvl.description}
                </p>

                {/* Gee Principle Quote for this Level */}
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs">
                  <span className="font-semibold text-amber-300">The Fish Tank Mechanism: </span>
                  <span className="text-slate-300 italic">{lvl.fishTankPrinciple}</span>
                </div>

                {/* Unlocked Mechanics */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                    Unlocked Levers:
                  </span>
                  {lvl.unlockedMechanics.map((mech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[11px] bg-slate-800 text-slate-200 rounded border border-slate-700/60"
                    >
                      {mech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 flex items-center lg:flex-col justify-end gap-2">
                <button
                  onClick={() => onSelectLevel(lvl.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                    isCurrent
                      ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                      : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isCurrent ? 'Currently Loaded' : 'Enter This Level'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
