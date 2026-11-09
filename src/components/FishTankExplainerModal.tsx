/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Layers, Lightbulb, Compass, Sparkles } from 'lucide-react';

interface FishTankExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FishTankExplainerModal: React.FC<FishTankExplainerModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pr-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
            <Layers className="w-4 h-4" />
            <span>Pedagogical Foundation</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            James Paul Gee’s “Fish Tank” Principle
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Why simplified sandbox games help us understand complex political systems.
          </p>
        </div>

        <div className="mt-5 space-y-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>What is a "Fish Tank"?</span>
            </h3>
            <p>
              In his research on learning in video games, cognitive scientist <strong>James Paul Gee</strong> observed that real-world systems (like an ocean or a whole society) are too overwhelming for beginners. If you drop a learner into the open ocean, there are thousands of interacting variables and they drown in complexity.
            </p>
            <p className="mt-2">
              A <strong>fish tank</strong> is a simplified, bounded slice of the system containing only two or three essential elements (e.g. some water, fish, and plants). In a fish tank, the learner can clearly see how each variable influences the others: if you cut the light, the plants wilt; if the plants wilt, oxygen drops and the fish suffer.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
              <Compass className="w-4 h-4 text-sky-400" />
              <span>How This Applies to Protest & Social Change</span>
            </h3>
            <p>
              In this game, our fish tank begins with just three elements:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-200">
              <li><strong>Grievances:</strong> What unfair laws or costs hurt people’s everyday lives?</li>
              <li><strong>People & Communities:</strong> What are people’s daily dilemmas, fears, and willingness to cooperate?</li>
              <li><strong>Power & Decision-Making:</strong> How do authorities respond—through dialogue, token concessions, or repression?</li>
            </ul>
            <p className="mt-2">
              As you master the basic relationships, the simulation adds new layers: freedom of assembly, investigative media, organizing logistics (carpools and strike funds), and the <em>Repression Paradox</em> (the backfire effect).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200">
            <div className="flex items-center gap-2 font-bold mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Not a Quiz, But a Living Sandbox</span>
            </div>
            <p className="text-slate-300">
              There is no single "winning formula". Harsh crackdowns sometimes crush movements, but in other contexts backfire and awaken global outrage. Boycotts collapse if workers cannot get to work, but succeed when mutual aid carpools are organized. Your job is to experiment, predict, and observe how forces interact.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg transition-colors cursor-pointer"
          >
            Got it, Let's Simulate
          </button>
        </div>
      </div>
    </div>
  );
};
