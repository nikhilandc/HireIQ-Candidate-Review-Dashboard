import PriorityBadge from './PriorityBadge';
import { PRIORITY_COLORS } from "../utils/priority";

const FIELDS = [
  { key: "assignment_score", label: "Assignment", weight: "30%" },
  { key: "video_score", label: "Video", weight: "25%" },
  { key: "ats_score", label: "ATS", weight: "20%" },
  { key: "github_score", label: "GitHub", weight: "15%" },
  { key: "communication_score", label: "Communication", weight: "10%" },
];

function ScoreCompare({ values }) {
  const max = Math.max(...values);
  return values.map((v, i) => (
    <div key={i} className="flex items-center gap-2">
      <div className="flex-1 bg-gray-800 rounded-full h-2">
        <div
          className={`h-full rounded-full transition-all ${v === max ? "bg-violet-500" : "bg-gray-600"}`}
          style={{ width: `${v}%` }}
        />
      </div>
      <span className={`text-sm font-bold w-8 text-right ${v === max ? "text-violet-400" : "text-gray-400"}`}>{v}</span>
    </div>
  ));
}

export default function ComparePanel({ candidates, onClose, onRemove }) {
  if (candidates.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative bg-gray-950 border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Candidate Comparison</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white">✕</button>
        </div>

        {/* Header row */}
        <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `160px repeat(${candidates.length}, 1fr)` }}>
          <div />
          {candidates.map((c) => {
            const hue = c.name.charCodeAt(0) * 7 % 360;
            const initials = c.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
            return (
              <div key={c.id} className="text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center font-bold text-white text-sm"
                  style={{ background: `hsl(${hue},60%,40%)` }}>
                  {initials}
                </div>
                <div className="font-semibold text-white text-sm">{c.name}</div>
                <div className="text-xs text-gray-500 mb-2">{c.college}</div>
                <PriorityBadge label={c.priorityLabel} />
                <div className="text-xs text-gray-400 mt-1">{Math.round(c.priorityScore)} pts</div>
                <button onClick={() => onRemove(c.id)} className="mt-2 text-xs text-gray-600 hover:text-red-400 transition">Remove</button>
              </div>
            );
          })}
        </div>

        {/* Score rows */}
        <div className="space-y-4">
          {FIELDS.map(({ key, label, weight }) => (
            <div key={key} className="grid gap-4 items-center border-t border-gray-800 pt-4"
              style={{ gridTemplateColumns: `160px repeat(${candidates.length}, 1fr)` }}>
              <div>
                <div className="text-sm font-medium text-gray-300">{label}</div>
                <div className="text-xs text-gray-600">weight {weight}</div>
              </div>
              {candidates.map((c) => (
                <div key={c.id} className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-800 rounded-full h-2">
                    <div
                      className={`h-full rounded-full transition-all ${
                        c[key] === Math.max(...candidates.map((x) => x[key])) ? "bg-violet-500" : "bg-gray-600"
                      }`}
                      style={{ width: `${c[key]}%` }}
                    />
                  </div>
                  <span className={`text-sm font-bold w-8 text-right ${
                    c[key] === Math.max(...candidates.map((x) => x[key])) ? "text-violet-400" : "text-gray-400"
                  }`}>{c[key]}</span>
                </div>
              ))}
            </div>
          ))}

          {/* Priority row */}
          <div className="grid gap-4 items-center border-t border-gray-800 pt-4"
            style={{ gridTemplateColumns: `160px repeat(${candidates.length}, 1fr)` }}>
            <div>
              <div className="text-sm font-semibold text-gray-200">Priority Score</div>
              <div className="text-xs text-gray-600">weighted total</div>
            </div>
            {candidates.map((c) => (
              <div key={c.id} className="flex flex-col items-center gap-1">
                <PriorityBadge label={c.priorityLabel} size="lg" />
                <span className="text-lg font-bold text-white">{Math.round(c.priorityScore)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
