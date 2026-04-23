import PriorityBadge, { ScoreBar } from './PriorityBadge';
import { PRIORITY_COLORS } from "../utils/priority";

function ScoreCell({ value }) {
  const color =
    value >= 80
      ? "text-emerald-400"
      : value >= 60
      ? "text-yellow-400"
      : "text-red-400";

  return <span className={`font-semibold ${color}`}>{value}</span>;
}

// ✅ Keep ONLY ONE Avatar component
function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const hue = (name.charCodeAt(0) * 7) % 360;

  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
      style={{ background: `hsl(${hue},60%,40%)` }}
    >
      {initials}
    </div>
  );
}

export default function CandidateList({
  candidates,
  view,
  onSelect,
  compareIds,
  onToggleCompare,
  onUpdateCandidate,
}) {
  if (candidates.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <div className="text-4xl mb-3">🔍</div>
        <p>No candidates match your filters.</p>
      </div>
    );
  }

  if (view === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {candidates.map((c) => (
          <CardView
            key={c.id}
            c={c}
            onSelect={onSelect}
            compareIds={compareIds}
            onToggleCompare={onToggleCompare}
            onUpdateCandidate={onUpdateCandidate}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-900 border-b border-gray-800 text-xs text-gray-400 uppercase tracking-wide">
              <th className="px-4 py-3 text-left w-8">#</th>
              <th className="px-4 py-3 text-left">Candidate</th>
              <th className="px-4 py-3 text-center">Assignment</th>
              <th className="px-4 py-3 text-center">Video</th>
              <th className="px-4 py-3 text-center">ATS</th>
              <th className="px-4 py-3 text-center">GitHub</th>
              <th className="px-4 py-3 text-center">Comm.</th>
              <th className="px-4 py-3 text-center">Priority</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Compare</th>
            </tr>
          </thead>

          <tbody>
            {candidates.map((c, idx) => {
              const isCompared = compareIds.includes(c.id);

              return (
                <tr
                  key={c.id}
                  onClick={() => onSelect(c)}
                  className={`border-b border-gray-800/60 cursor-pointer transition-colors hover:bg-gray-800/60 ${
                    isCompared
                      ? "bg-violet-900/10"
                      : idx % 2 === 0
                      ? "bg-gray-900/20"
                      : ""
                  }`}
                >
                  <td className="px-4 py-3 text-gray-600 text-xs">
                    {idx + 1}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={c.name} />
                      <div>
                        <div className="font-medium text-gray-100">
                          {c.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {c.college}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <ScoreCell value={c.assignment_score} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <ScoreCell value={c.video_score} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <ScoreCell value={c.ats_score} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <ScoreCell value={c.github_score} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <ScoreCell value={c.communication_score} />
                  </td>

                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-col items-center gap-0.5">
                      <PriorityBadge label={c.priorityLabel} />
                      <span className="text-xs text-gray-500">
                        {Math.round(c.priorityScore)}
                      </span>
                    </div>
                  </td>

                  <td
                    className="px-4 py-3 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-center gap-1.5">
                      <button
                        onClick={() =>
                          onUpdateCandidate(c.id, {
                            reviewed: !c.reviewed,
                          })
                        }
                        className={`text-xs px-2 py-0.5 rounded-full border transition ${
                          c.reviewed
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                            : "bg-gray-800 text-gray-500 border-gray-700"
                        }`}
                      >
                        {c.reviewed ? "✓" : "Rev"}
                      </button>

                      <button
                        onClick={() =>
                          onUpdateCandidate(c.id, {
                            shortlisted: !c.shortlisted,
                          })
                        }
                        className={`text-xs px-2 py-0.5 rounded-full border transition ${
                          c.shortlisted
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
                            : "bg-gray-800 text-gray-500 border-gray-700"
                        }`}
                      >
                        {c.shortlisted ? "★" : "List"}
                      </button>
                    </div>
                  </td>

                  <td
                    className="px-4 py-3 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => onToggleCompare(c.id)}
                      className={`text-xs px-2 py-1 rounded border transition ${
                        isCompared
                          ? "bg-violet-600/20 text-violet-400 border-violet-500/40"
                          : "bg-gray-800 text-gray-500 border-gray-700"
                      }`}
                    >
                      {isCompared ? "−" : "+"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CardView({
  c,
  onSelect,
  compareIds,
  onToggleCompare,
  onUpdateCandidate,
}) {
  const isCompared = compareIds.includes(c.id);

  return (
    <div
      onClick={() => onSelect(c)}
      className={`bg-gray-900 border rounded-xl p-4 cursor-pointer transition-all ${
        isCompared
          ? "border-violet-500/50 bg-violet-900/10"
          : "border-gray-800"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Avatar name={c.name} />
          <div>
            <div className="font-semibold text-gray-100 text-sm">
              {c.name}
            </div>
            <div className="text-xs text-gray-500">
              {c.college}
            </div>
          </div>
        </div>
        <PriorityBadge label={c.priorityLabel} />
      </div>

      <div className="space-y-1.5 mb-3">
        <ScoreBar value={c.assignment_score} colorClass="bg-violet-500" />
        <ScoreBar value={c.video_score} colorClass="bg-blue-500" />
        <ScoreBar value={c.ats_score} colorClass="bg-emerald-500" />
      </div>

      <div
        className="flex gap-2 justify-end"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() =>
            onUpdateCandidate(c.id, { reviewed: !c.reviewed })
          }
          className={`text-xs px-2 py-0.5 rounded-full border transition ${
            c.reviewed
              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
              : "bg-gray-800 text-gray-500 border-gray-700"
          }`}
        >
          {c.reviewed ? "✓ Reviewed" : "Mark Reviewed"}
        </button>

        <button
          onClick={() => onToggleCompare(c.id)}
          className={`text-xs px-2 py-0.5 rounded-full border transition ${
            isCompared
              ? "bg-violet-600/20 text-violet-400 border-violet-500/40"
              : "bg-gray-800 text-gray-500 border-gray-700"
          }`}
        >
          {isCompared ? "−" : "+ Compare"}
        </button>
      </div>
    </div>
  );
}