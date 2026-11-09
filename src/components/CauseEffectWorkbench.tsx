/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Layers, 
  ArrowRight, 
  Lightbulb, 
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { CAUSAL_CONNECTORS, VOCABULARY_LIST } from '../data/vocabulary';
import { SimulationState } from '../types/simulation';

interface CauseEffectWorkbenchProps {
  simulation: SimulationState;
  onOpenVocabulary: () => void;
}

export const CauseEffectWorkbench: React.FC<CauseEffectWorkbenchProps> = ({
  simulation,
  onOpenVocabulary
}) => {
  const [selectedConnector, setSelectedConnector] = useState<string>('because of');
  const [selectedCause, setSelectedCause] = useState<string>(
    'unfair bus segregation rules and daily humiliation'
  );
  const [selectedAction, setSelectedAction] = useState<string>(
    'thousands of citizens organized an economic boycott and carpool network'
  );
  const [selectedConsequence, setSelectedConsequence] = useState<string>(
    'the municipal bus company lost 75% of its revenue, compelling judicial desegregation'
  );
  
  const [customText, setCustomText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Pre-made causal blocks for upper-secondary B1-B2 learners
  const causeTemplates = [
    'unfair bus segregation rules and daily humiliation',
    'severe wage cuts and 12-hour work shifts in the factory yard',
    'the imposition of an unfair flat tax that working families could not afford',
    'the government decree forcing students to study in the language of the oppressor',
    'state denial of voting rights and parliamentary representation for women',
    'the military conscription of 18-year-olds for an overseas war'
  ];

  const actionTemplates = [
    'thousands of citizens organized an economic boycott and carpool network',
    'industrial workers formed picket lines and voted for a general strike',
    '17 million people participated in a disciplined mass non-payment campaign',
    'students walked out of secondary schools in peaceful mass demonstrations',
    'suffragettes adopted "Deeds not words", using hunger strikes and civil disobedience',
    'citizens gathered across cities for nationwide teach-ins and moratorium rallies'
  ];

  const consequenceTemplates = [
    'the municipal bus company lost 75% of its revenue, compelling judicial desegregation',
    'factory management was forced to negotiate fair wages and safer working hours',
    'the prime minister was forced to resign and parliament abolished the unjust tax',
    'the regime faced global condemnation, leading to international economic sanctions',
    'the Representation of the People Act granted millions of women the right to vote',
    'public consensus shifted, leading to the abolition of the military draft'
  ];

  // Helper to assemble the sentence
  const assembleSentence = () => {
    switch (selectedConnector) {
      case 'because of':
        return `Because of ${selectedCause}, ${selectedAction}, which consequently led to ${selectedConsequence}.`;
      case 'as a result of':
        return `As a result of ${selectedCause}, ${selectedAction}; this therefore produced ${selectedConsequence}.`;
      case 'consequently':
        return `Citizens endured ${selectedCause}. Consequently, ${selectedAction}, and this led to ${selectedConsequence}.`;
      case 'therefore':
        return `The population faced ${selectedCause}; therefore, ${selectedAction}. As a result, ${selectedConsequence}.`;
      case 'this led to':
        return `The authorities enforced ${selectedCause}. ${selectedAction}, and this led to ${selectedConsequence}.`;
      case 'in response to':
        return `In response to ${selectedCause}, ${selectedAction}; consequently, ${selectedConsequence}.`;
      default:
        return `Because of ${selectedCause}, ${selectedAction}.`;
    }
  };

  const currentSentence = assembleSentence();

  // Analyze custom writing for B1-B2 vocabulary and causal connectors
  const analyzeStudentWriting = (text: string) => {
    const lower = text.toLowerCase();
    
    // Check causal connectors used
    const foundConnectors = CAUSAL_CONNECTORS.filter(c => 
      lower.includes(c.phrase.toLowerCase())
    ).map(c => c.phrase);

    // Check vocabulary words used
    const foundVocab = VOCABULARY_LIST.filter(v => 
      lower.includes(v.word.toLowerCase())
    ).map(v => v.word);

    const hasGoodLength = text.trim().split(/\s+/).length >= 15;

    return {
      connectors: foundConnectors,
      vocab: foundVocab,
      lengthOk: hasGoodLength,
      score: foundConnectors.length * 20 + foundVocab.length * 15 + (hasGoodLength ? 25 : 0)
    };
  };

  const analysis = analyzeStudentWriting(customText);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>B2 Cause & Effect Studio</span>
            </div>
            <h1 className="text-2xl font-bold text-white">
              The Cause & Effect Connector
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              In social and political history, events do not happen randomly. Historians and social scientists use precise causal language to explain <em>why</em> people act and <em>what</em> changes as a result.
            </p>
          </div>

          <button
            onClick={onOpenVocabulary}
            className="px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Vocabulary Bank</span>
          </button>
        </div>
      </div>

      {/* Part 1: Interactive Sentence Architect */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>1. Interactive Causal Chain Builder</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select causal connectors and historical blocks to construct a sophisticated cause-and-effect argument.
            </p>
          </div>
        </div>

        {/* Connector Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Step A: Select Causal Connector
          </label>
          <div className="flex flex-wrap gap-2">
            {CAUSAL_CONNECTORS.map((c) => (
              <button
                key={c.phrase}
                onClick={() => setSelectedConnector(c.phrase)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  selectedConnector === c.phrase
                    ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                {c.phrase}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Columns: Cause -> Action -> Consequence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Cause Block */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
                Underlying Grievance (Cause)
              </div>
              <div className="space-y-2">
                {causeTemplates.map((cause, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCause(cause)}
                    className={`w-full p-2.5 rounded-lg text-left text-xs transition-all border cursor-pointer ${
                      selectedCause === cause
                        ? 'bg-red-950/40 border-red-500/70 text-white font-medium'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cause}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action / Method Block */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                Collective Action (Method)
              </div>
              <div className="space-y-2">
                {actionTemplates.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAction(action)}
                    className={`w-full p-2.5 rounded-lg text-left text-xs transition-all border cursor-pointer ${
                      selectedAction === action
                        ? 'bg-amber-950/40 border-amber-500/70 text-white font-medium'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Systemic Consequence Block */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                Systemic Outcome (Result)
              </div>
              <div className="space-y-2">
                {consequenceTemplates.map((consequence, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedConsequence(consequence)}
                    className={`w-full p-2.5 rounded-lg text-left text-xs transition-all border cursor-pointer ${
                      selectedConsequence === consequence
                        ? 'bg-emerald-950/40 border-emerald-500/70 text-white font-medium'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {consequence}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Assembled Sentence Display */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-400/40 shadow-inner">
          <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase tracking-wider mb-1.5">
            <span>Synthesized Cause & Effect Statement</span>
            <button
              onClick={() => handleCopy(currentSentence)}
              className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>
          <p className="text-sm font-medium text-white leading-relaxed">
            "{currentSentence}"
          </p>
        </div>
      </div>

      {/* Part 2: Student Free Reflection & Formative Evaluator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>2. Write Your Own Historical Cause-and-Effect Analysis</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Explain why a protest emerged in your simulation or in history. Use at least 2 causal connectors (*because of, as a result, consequently, therefore, this led to*) and 2 key vocabulary terms.
          </p>
        </div>

        <textarea
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Type your explanation here. Example: Because of the municipal government's refusal to repeal discriminatory seating ordinances, citizens organized a comprehensive boycott. As a result, the bus company faced severe financial loss, which led to a historic Supreme Court ruling in favor of civil rights..."
          rows={4}
          className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 leading-relaxed font-sans"
        />

        {/* Live Formative Writing Feedback */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
            <span>Formative Language Analysis</span>
            <span className="text-amber-400">Proficiency Score: {analysis.score} / 100</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Causal Connectors Detected */}
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[11px] text-slate-400 mb-1">Causal Connectors Detected:</div>
              {analysis.connectors.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {analysis.connectors.map((c, i) => (
                    <span key={i} className="px-2 py-0.5 text-[11px] font-bold bg-amber-400/20 text-amber-300 rounded border border-amber-400/30">
                      {c}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-slate-500 italic">None yet. Try adding "because of" or "consequently".</span>
              )}
            </div>

            {/* B1-B2 Key Terms Detected */}
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[11px] text-slate-400 mb-1">B1–B2 Vocabulary Used:</div>
              {analysis.vocab.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {analysis.vocab.map((v, i) => (
                    <span key={i} className="px-2 py-0.5 text-[11px] font-bold bg-emerald-400/20 text-emerald-300 rounded border border-emerald-400/30">
                      {v}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-slate-500 italic">None yet. Try using "solidarity", "boycott", or "injustice".</span>
              )}
            </div>

            {/* Depth & Explanation Quality */}
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[11px] text-slate-400 mb-1">Analytical Depth:</div>
              {analysis.lengthOk ? (
                <div className="flex items-center gap-1 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Substantive explanation length</span>
                </div>
              ) : (
                <span className="text-slate-500 italic">Needs at least 15 words to form a complete causal chain.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
