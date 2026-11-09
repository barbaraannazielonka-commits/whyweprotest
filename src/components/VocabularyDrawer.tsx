/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Search, 
  BookOpen, 
  Volume2, 
  Sparkles, 
  Lightbulb,
  Check
} from 'lucide-react';
import { VOCABULARY_LIST, CAUSAL_CONNECTORS } from '../data/vocabulary';
import { VocabularyTerm } from '../types/simulation';

interface VocabularyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VocabularyDrawer: React.FC<VocabularyDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedWord, setSelectedWord] = useState<VocabularyTerm>(VOCABULARY_LIST[0]);
  const [activeTab, setActiveTab] = useState<'words' | 'connectors'>('words');

  if (!isOpen) return null;

  const filteredWords = VOCABULARY_LIST.filter(item => 
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl relative">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                B2 Vocabulary Bank
              </h2>
              <p className="text-xs text-slate-400">
                Key protest vocabulary & cause-and-effect linguistic scaffolds
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher: Vocabulary vs Causal Connectors */}
        <div className="flex items-center gap-1 p-2 bg-slate-950 border-b border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('words')}
            className={`flex-1 py-1.5 text-center rounded-md font-medium transition-colors cursor-pointer ${
              activeTab === 'words' ? 'bg-slate-800 text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Core Vocabulary ({VOCABULARY_LIST.length})
          </button>
          <button
            onClick={() => setActiveTab('connectors')}
            className={`flex-1 py-1.5 text-center rounded-md font-medium transition-colors cursor-pointer ${
              activeTab === 'connectors' ? 'bg-slate-800 text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Causal Connectors ({CAUSAL_CONNECTORS.length})
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'words' ? (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Word list sidebar */}
            <div className="w-full md:w-5/12 border-r border-slate-800 flex flex-col h-full bg-slate-950/40">
              {/* Search input */}
              <div className="p-3 border-b border-slate-800">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search terms..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {filteredWords.map((term) => (
                  <button
                    key={term.word}
                    onClick={() => setSelectedWord(term)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      selectedWord.word === term.word
                        ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/40'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{term.word}</span>
                    <span className="text-[10px] text-slate-500 font-normal">{term.partOfSpeech.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Word detail view */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-bold text-white">{selectedWord.word}</h3>
                  <span className="text-xs text-amber-400 italic font-mono">{selectedWord.partOfSpeech}</span>
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  {selectedWord.pronunciation}
                </div>
              </div>

              {/* Definition */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Definition
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {selectedWord.definition}
                </p>
              </div>

              {/* Example in Context */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">
                  Example Sentence in Context
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{selectedWord.exampleSentence}"
                </p>
              </div>

              {/* Causal Connector Example */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 border-l-2 border-l-amber-400">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300 mb-1">
                  Cause & Effect Formulation
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {selectedWord.causalConnectorExample}
                </p>
              </div>

              {/* B2 Language Tip */}
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    B1–B2 Usage & Grammar Tip
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    {selectedWord.b2Tip}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Causal Connectors list */
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              Use these transitional phrases to link grievances, actions, and consequences in historical essays and analyses:
            </p>

            <div className="space-y-3">
              {CAUSAL_CONNECTORS.map((conn, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-amber-400">{conn.phrase}</span>
                    <span className="text-[11px] text-slate-400">{conn.role}</span>
                  </div>

                  <div className="text-xs font-mono text-slate-300 bg-slate-900 p-2 rounded border border-slate-800">
                    {conn.pattern}
                  </div>

                  <p className="text-xs text-slate-200 italic leading-relaxed">
                    "{conn.example}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
