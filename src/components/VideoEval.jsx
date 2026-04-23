import { useState } from "react";

const CRITERIA = [
  { key: "clarity", label: "Clarity", desc: "Clear and easy to follow" },
  { key: "confidence", label: "Confidence", desc: "Delivery and presence" },
  { key: "architecture", label: "Architecture Explanation", desc: "System design understanding" },
  { key: "tradeoffs", label: "Tradeoff Reasoning", desc: "Ability to discuss pros/cons" },
  { key: "communication", label: "Communication", desc: "Overall verbal communication" },
];

const DEFAULT = Object.fromEntries(CRITERIA.map((c) => [c.key, 0]));

export default function VideoEval({ value, notes, onChange, onNotesChange }) {
  const [ratings, setRatings] = useState(value || DEFAULT);
  const [newTs, setNewTs] = useState("");
  const [newNote, setNewNote] = useState("");

  const set = (key, val) => {
    const updated = { ...ratings, [key]: val };
    setRatings(updated);
    onChange(updated);
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    const entry = { ts: newTs.trim() || "—:——", note: newNote.trim(), id: Date.now() };
    onNotesChange([...(notes || []), entry]);
    setNewTs("");
    setNewNote("");
  };

  const removeNote = (id) => onNotesChange((notes || []).filter((n) => n.id !== id));

  const avg = CRITERIA.filter(c => ratings[c.key] > 0).length > 0
    ? (CRITERIA.reduce((s, c) => s + ratings[c.key], 0) / CRITERIA.filter(c => ratings[c.key] > 0).length).toFixed(1)
    : "—";

  const STARS = ["★", "★★", "★★★", "★★★★", "★★★★★"];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">Video Evaluation</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-400">{avg}</div>
          <div className="text-xs text-gray-500">avg / 5</div>
        </div>
      </div>

      <div className="space-y-4">
        {CRITERIA.map(({ key, label, desc }) => (
          <div key={key}>
            <div className="flex justify-between mb-1.5">
              <div>
                <span className="text-sm font-medium text-gray-200">{label}</span>
                <span className="text-xs text-gray-500 ml-2">{desc}</span>
              </div>
              <span className="text-sm text-yellow-400">{ratings[key] > 0 ? STARS[ratings[key] - 1] : "—"}</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => set(key, n)}
                  className={`flex-1 py-1.5 rounded text-xs transition ${
                    ratings[key] >= n ? "bg-blue-600/40 text-blue-300 border border-blue-500/50" : "bg-gray-800 text-gray-600 border border-gray-700 hover:border-gray-500"
                  }`}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Timestamp notes */}
      <div>
        <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          Timestamp Notes
          <span className="text-xs text-gray-500 font-normal">optional</span>
        </h4>

        {(notes || []).length > 0 && (
          <div className="space-y-2 mb-3">
            {notes.map((n) => (
              <div key={n.id} className="flex items-start gap-2 bg-gray-800/60 rounded-lg p-2.5 border border-gray-700/50">
                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded px-1.5 py-0.5 shrink-0">{n.ts}</span>
                <span className="text-sm text-gray-300 flex-1">{n.note}</span>
                <button onClick={() => removeNote(n.id)} className="text-gray-600 hover:text-red-400 text-xs transition shrink-0">✕</button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <input
            value={newTs}
            onChange={(e) => setNewTs(e.target.value)}
            placeholder="MM:SS"
            className="w-20 bg-gray-800 border border-gray-700 rounded-lg px-2 py-1.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500 font-mono"
          />
          <input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNote()}
            placeholder="Add a note…"
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500"
          />
          <button onClick={addNote} className="px-3 py-1.5 bg-blue-600 rounded-lg text-sm text-white hover:bg-blue-500 transition">+</button>
        </div>
      </div>
    </div>
  );
}
