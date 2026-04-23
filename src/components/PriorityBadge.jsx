import { PRIORITY_COLORS, PRIORITY_DESC } from "../utils/priority";

export default function PriorityBadge({ label, showDesc = false, size = "sm" }) {
  const c = PRIORITY_COLORS[label] || PRIORITY_COLORS.P3;
  const sz = size === "lg" ? "px-3 py-1.5 text-sm" : "px-2 py-0.5 text-xs";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${sz} ${c.bg} ${c.text} ${c.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}></span>
      {label}
      {showDesc && <span className="font-normal opacity-80">· {PRIORITY_DESC[label]}</span>}
    </span>
  );
}

export function ScoreBar({ value, colorClass = "bg-violet-500" }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-800 rounded-full h-1.5 overflow-hidden">
        <div className={`h-full rounded-full transition-all ${colorClass}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-gray-400 w-6 text-right">{value}</span>
    </div>
  );
}
