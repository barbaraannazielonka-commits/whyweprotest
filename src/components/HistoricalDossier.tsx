/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileCheck, 
  BookOpen, 
  Award, 
  Printer, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Quote, 
  ChevronRight,
  Download,
  Copy,
  Check
} from 'lucide-react';
import { HISTORICAL_DOSSIERS } from '../data/levels';
import { HistoricalMovementDossier, HistoricalScenarioId } from '../types/simulation';

interface HistoricalDossierProps {
  onLoadScenarioIntoSim: (scenarioId: HistoricalScenarioId) => void;
}

export const HistoricalDossier: React.FC<HistoricalDossierProps> = ({
  onLoadScenarioIntoSim
}) => {
  const [selectedMovementId, setSelectedMovementId] = useState<string>('montgomery');
  const [activeTab, setActiveTab] = useState<'factsheet' | 'investigation' | 'timeline' | 'quotes'>('investigation');

  // Student analytical responses to the 6 core questions
  const [responses, setResponses] = useState<Record<string, Record<number, string>>>({
    montgomery: {
      1: 'Black citizens in Montgomery were protesting against Jim Crow municipal bus segregation laws and daily humiliation by white drivers.',
      2: 'Decades of quiet petitions to city hall had yielded zero reform. When Rosa Parks was arrested, community networks and the Women’s Political Council decided direct nonviolent action was the only way to demand dignity.',
      3: 'They used a 381-day economic boycott of the buses, sustained by an elaborate 300-car volunteer carpool network and mass church meetings.',
      4: 'City officials ticketed carpools, revoked insurance, bombed MLK’s home, and arrested 90 organizers on illegal conspiracy charges.',
      5: 'The bus company lost 75% of ridership and teetered on bankruptcy. The Supreme Court ruled in Browder v. Gayle that bus segregation was unconstitutional.',
      6: 'It proves that protest requires economic leverage, logistical organizing (carpools), and judicial strategy to achieve lasting legal change.'
    },
    suffragettes: {
      1: '', 2: '', 3: '', 4: '', 5: '', 6: ''
    },
    soweto: {
      1: '', 2: '', 3: '', 4: '', 5: '', 6: ''
    },
    polltax: {
      1: '', 2: '', 3: '', 4: '', 5: '', 6: ''
    },
    vietnam: {
      1: '', 2: '', 3: '', 4: '', 5: '', 6: ''
    }
  });

  const [copied, setCopied] = useState<boolean>(false);

  const dossier: HistoricalMovementDossier = HISTORICAL_DOSSIERS[selectedMovementId] || HISTORICAL_DOSSIERS['montgomery'];

  const handleResponseChange = (qIndex: number, text: string) => {
    setResponses(prev => ({
      ...prev,
      [selectedMovementId]: {
        ...(prev[selectedMovementId] || {}),
        [qIndex]: text
      }
    }));
  };

  const currentResponses = responses[selectedMovementId] || {};

  // Formative evaluation
  const completedQuestionsCount = [1, 2, 3, 4, 5, 6].filter(
    q => (currentResponses[q] || '').trim().length >= 10
  ).length;

  const coreQuestions = [
    {
      num: 1,
      title: '1. What were people protesting against?',
      prompt: 'Identify the specific grievance, law, policy, or injustice that people opposed.',
      hint: dossier.historicalFactSheet.whatWasProtestedAgainst
    },
    {
      num: 2,
      title: '2. Why did they decide to take action?',
      prompt: 'Explain why people felt protesting was necessary at that moment, rather than remaining silent or relying on standard channels.',
      hint: dossier.historicalFactSheet.whyActionWasTaken
    },
    {
      num: 3,
      title: '3. What methods of protest did they use?',
      prompt: 'Examine their specific tactics (boycotts, strikes, marches, civil disobedience, carpools, legal appeals).',
      hint: dossier.historicalFactSheet.methodsUsed.join('; ')
    },
    {
      num: 4,
      title: '4. How did those in power respond?',
      prompt: 'Describe the reaction of authorities (arrests, concessions, violence, divide-and-rule, or ignoring).',
      hint: dossier.historicalFactSheet.powerResponse
    },
    {
      num: 5,
      title: '5. What changed as a result?',
      prompt: 'Distinguish between immediate short-term outcomes and lasting institutional or constitutional changes.',
      hint: dossier.historicalFactSheet.whatChangedAsResult
    },
    {
      num: 6,
      title: '6. What does this movement teach us about protest and social change?',
      prompt: 'Synthesize the deeper relationship between circumstances, organization, power, and long-term reform.',
      hint: dossier.historicalFactSheet.socialChangeLesson
    }
  ];

  const handleCopyReport = () => {
    const reportText = `HISTORICAL PROTEST INVESTIGATION DOSSIER
Movement: ${dossier.title} (${dossier.year})
Location: ${dossier.location}

1. What people were protesting against:
${currentResponses[1] || '(Incomplete)'}

2. Why they decided to take action:
${currentResponses[2] || '(Incomplete)'}

3. What methods of protest they used:
${currentResponses[3] || '(Incomplete)'}

4. How those in power responded:
${currentResponses[4] || '(Incomplete)'}

5. What changed as a result:
${currentResponses[5] || '(Incomplete)'}

6. What the movement teaches us about protest and social change:
${currentResponses[6] || '(Incomplete)'}

Generated via WHY WE PROTEST
Nannestad High School- Barbara Anna Zielonka
`;
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header and Movement Switcher */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
              <Award className="w-4 h-4" />
              <span>Final Challenge • Historical Analysis Dossier</span>
            </div>
            <h1 className="text-2xl font-bold text-white">{dossier.title}</h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {dossier.subtitle} · <span className="text-amber-400 font-semibold">{dossier.location} ({dossier.year})</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onLoadScenarioIntoSim(dossier.id)}
              className="px-3.5 py-2 text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>Load into SimCity Sandbox</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Movement Selector Tabs */}
        <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-slate-800">
          {Object.values(HISTORICAL_DOSSIERS).map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMovementId(m.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                selectedMovementId === m.id
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              {m.title}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('investigation')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'investigation' ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            The 6 Core Analytical Questions ({completedQuestionsCount}/6 Completed)
          </button>
          <button
            onClick={() => setActiveTab('factsheet')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'factsheet' ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Historical Evidence Factsheet
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'timeline' ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Chronological Timeline
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'quotes' ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Key Historical Voices
          </button>
        </div>

        <button
          onClick={handleCopyReport}
          className="px-3 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Dossier Copied!' : 'Export Dossier'}</span>
        </button>
      </div>

      {/* Tab 1: The 6 Core Questions Investigation */}
      {activeTab === 'investigation' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start justify-between gap-4">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Investigator Challenge:</strong> Complete your synthesis of {dossier.title} across these 6 analytical pillars. Use upper-secondary English connectives (*because of, as a result, consequently, therefore, this led to*).
              </div>
            </div>
            <div className="text-amber-400 font-bold tabular-nums whitespace-nowrap">
              Progress: {Math.round((completedQuestionsCount / 6) * 100)}%
            </div>
          </div>

          <div className="space-y-4">
            {coreQuestions.map((q) => {
              const currentVal = currentResponses[q.num] || '';
              const isFilled = currentVal.trim().length >= 10;
              return (
                <div key={q.num} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5 shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        {isFilled && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        <span>{q.title}</span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">{q.prompt}</p>
                    </div>

                    <details className="text-[11px] text-amber-400/90 cursor-pointer">
                      <summary className="hover:underline">View Evidence Hint</summary>
                      <div className="mt-1 p-2 bg-slate-950 rounded border border-slate-800 text-slate-300 max-w-md leading-relaxed">
                        {q.hint}
                      </div>
                    </details>
                  </div>

                  <textarea
                    value={currentVal}
                    onChange={(e) => handleResponseChange(q.num, e.target.value)}
                    placeholder="Write your explanation here..."
                    rows={3}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 leading-relaxed font-sans"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Historical Factsheet */}
      {activeTab === 'factsheet' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            Verified Historical Facts (No Fiction / No Invented Events)
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="font-bold text-white text-sm mb-1">The Grievance Opposed:</h4>
              <p className="text-slate-300 leading-relaxed">{dossier.historicalFactSheet.whatWasProtestedAgainst}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="font-bold text-white text-sm mb-1">Why Action Was Taken:</h4>
              <p className="text-slate-300 leading-relaxed">{dossier.historicalFactSheet.whyActionWasTaken}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="font-bold text-white text-sm mb-1">Authentic Methods & Logistics:</h4>
              <ul className="list-disc list-inside space-y-1.5 text-slate-300 mt-1">
                {dossier.historicalFactSheet.methodsUsed.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="font-bold text-white text-sm mb-1">Response of Authorities:</h4>
              <p className="text-slate-300 leading-relaxed">{dossier.historicalFactSheet.powerResponse}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="font-bold text-white text-sm mb-1">What Changed as a Result:</h4>
              <p className="text-slate-300 leading-relaxed">{dossier.historicalFactSheet.whatChangedAsResult}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 border-l-4 border-l-amber-400">
              <h4 className="font-bold text-amber-300 text-sm mb-1">Fish Tank System Dynamics Lesson:</h4>
              <p className="text-slate-200 leading-relaxed">{dossier.systemDynamicsLesson}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Timeline */}
      {activeTab === 'timeline' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            Chronological Milestones
          </div>
          <div className="space-y-3">
            {dossier.timeline.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                <div className="px-2.5 py-1 rounded bg-slate-800 text-amber-300 font-bold text-xs whitespace-nowrap">
                  {item.yearOrMonth}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{item.event}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    {item.significance}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Historical Figures */}
      {activeTab === 'quotes' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            Historical Figures & Words
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dossier.keyFigures.map((fig, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{fig.name}</h4>
                    <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                      {fig.role}
                    </span>
                  </div>
                  <blockquote className="mt-3 text-xs text-slate-300 italic leading-relaxed">
                    "{fig.quote}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
