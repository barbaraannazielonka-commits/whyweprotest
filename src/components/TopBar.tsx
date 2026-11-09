/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, HelpCircle } from 'lucide-react';

interface TopBarProps {
  currentTab: 'simulation' | 'levels' | 'history' | 'language' | 'dossier';
  onSelectTab: (tab: 'simulation' | 'levels' | 'history' | 'language' | 'dossier') => void;
  onOpenVocabulary: () => void;
  onOpenFishTankGuide: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  onSelectTab,
  onOpenVocabulary,
  onOpenFishTankGuide
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-950/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <button 
          onClick={() => onSelectTab('simulation')} 
          className="text-left group cursor-pointer"
        >
          <span className="text-base font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors whitespace-nowrap">
            WHY WE PROTEST
          </span>
          <span className="hidden sm:inline text-xs text-slate-400 ml-2 font-normal">
            Forces of Social Change
          </span>
        </button>
      </div>

      {/* Zone 2: 4–5 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
        <button
          onClick={() => onSelectTab('simulation')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
            currentTab === 'simulation' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : ''
          }`}
        >
          Living Simulation
        </button>

        <button
          onClick={() => onSelectTab('levels')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
            currentTab === 'levels' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : ''
          }`}
        >
          Fish Tank Levels (1–6)
        </button>

        <button
          onClick={() => onSelectTab('history')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
            currentTab === 'history' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : ''
          }`}
        >
          Historical Lab
        </button>

        <button
          onClick={() => onSelectTab('language')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
            currentTab === 'language' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : ''
          }`}
        >
          Cause & Effect Studio
        </button>

        <button
          onClick={() => onSelectTab('dossier')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
            currentTab === 'dossier' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : ''
          }`}
        >
          Final Investigation
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onOpenFishTankGuide}
          className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          title="Learn about James Paul Gee's Fish Tank Principle"
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Fish Tank Concept</span>
        </button>

        <button
          onClick={onOpenVocabulary}
          className="px-3 py-1.5 text-xs font-medium text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-sm cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>B2 Vocabulary</span>
        </button>
      </div>
    </header>
  );
};
