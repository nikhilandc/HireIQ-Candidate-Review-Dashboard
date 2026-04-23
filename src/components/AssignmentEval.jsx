import { useState } from "react";

const CRITERIA = [
  { key: "ui_quality", label: "UI Quality", desc: "Visual design, layout, aesthetics" },
  { key: "component_structure", label: "Component Structure", desc: "Reusability, separation of concerns" },
  { key: "state_handling", label: "State Handling", desc: "State management, data flow" },
  { key: "edge_cases", label: "Edge-Case Handling", desc: "Error states, loading, empty states" },
  { key: "responsiveness", label: "Responsiveness", desc: "Mobile, tablet, desktop layouts" },
  { key: "accessibility", label: "Accessibility", desc: "ARIA, keyboard nav, color contrast" },
];

const DEFAULT = Object.fromEntries(CRITERIA.map((c) => [c.key, 0]));

export default function AssignmentEval({ value, onChange }) {
  const [ratings, setRatings] = useState(value || DEFAULT);
  const [notes, setNotes] = useState(value?.notes || "");

  const set = (key, val) => {
    const updated = { ...ratings, [key]: val, notes };
    setRatings(updated);
    onChange(updated);
  };

  const setNoteVal = (n) => {
    setNotes(n);
    onChange({ ...ratings, notes: n });
  };

  const totalRated = CRITERIA.filter((c) => ratings[c.key] > 0).length;
  const avg = totalRated > 0
    ? (CRITERIA.reduce((s, c) => s + ratings[c.key], 0) / totalRated).toFixed(1)
    : "—";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">Assignment Evaluation</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-violet-400">{avg}</div>
          <div className="text-xs text-gray-500">avg / 5</div>
        </div>
      </div>

      <div className="space-y-4">
        {CRITERIA.map(({ key, label, desc }) => (
          <div key={key}>
            <div className="flex justify-between mb-1">
              <div>
                <span className="text-sm font-medium text-gray-200">{label}</span>
                <span className="text-xs text-gray-500 ml-2">{desc}</span>
              </div>
              <span className="text-sm font-bold text-gray-200">{ratings[key] > 0 ? `${ratings[key]}/5` : "—"}</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => set(key, n)}
                  className={`flex-1 h-8 rounded-md text-xs font-semibold transition border ${
                    ratings[key] >= n
                      ? ratings[key] >= 4 ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                        : ratings[key] >= 3 ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                        : "bg-red-500/20 border-red-500 text-red-400"
                      : "bg-gray-800 border-gray-700 text-gray-600 hover:border-gray-500"
                  }`}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className="text-xs text-gray-400 block mb-1">Reviewer Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNoteVal(e.target.value)}
          rows={3}
          placeholder="Overall impressions, strengths, concerns…"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-violet-500 resize-none"
        />
      </div>
    </div>
  );
}
