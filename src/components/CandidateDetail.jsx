import { useState } from "react";
import PriorityBadge, { ScoreBar } from "./PriorityBadge";
import { PRIORITY_DESC, computePriority, getPriorityLabel } from "../utils/priority";
import AssignmentEval from "./AssignmentEval";
import VideoEval from "./VideoEval";

const SCORE_FIELDS = [
  { key: "assignment_score", label: "Assignment", color: "bg-violet-500", weight: "30%" },
  { key: "video_score", label: "Video", color: "bg-blue-500", weight: "25%" },
  { key: "ats_score", label: "ATS / Resume", color: "bg-emerald-500", weight: "20%" },
  { key: "github_score", label: "GitHub", color: "bg-orange-500", weight: "15%" },
  { key: "communication_score", label: "Communication", color: "bg-pink-500", weight: "10%" },
];

export default function CandidateDetail({ candidate, onClose, onUpdate }) {
  const [tab, setTab] = useState("overview");
  const [scores, setScores] = useState({
    assignment_score: candidate.assignment_score,
    video_score: candidate.video_score,
    ats_score: candidate.ats_score,
    github_score: candidate.github_score,
    communication_score: candidate.communication_score,
  });

  const liveScore = computePriority({ ...candidate, ...scores });
  const liveLabel = getPriorityLabel(liveScore);

  const handleScoreChange = (key, val) => {
    const updated = { ...scores, [key]: val };
    setScores(updated);
    onUpdate(updated);
  };

  const initials = candidate.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const hue = candidate.name.charCodeAt(0) * 7 % 360;

  const TABS = ["overview", "assignment", "video"];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl h-full bg-gray-950 border-l border-gray-800 overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="sticky top-0 bg-gray-950/95 backdrop-blur border-b border-gray-800 px-6 py-4 z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: `hsl(${hue},60%,40%)` }}>
                {initials}
              </div>
              <div>
                <h2 className="font-bold text-white text-lg">{candidate.name}</h2>
                <p className="text-xs text-gray-400">{candidate.college}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <PriorityBadge label={liveLabel} size="lg" />
                <div className="text-xs text-gray-500 mt-1">{Math.round(liveScore)} pts · {PRIORITY_DESC[liveLabel]}</div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition">✕</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-900 rounded-lg p-1">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md capitalize transition ${tab === t ? "bg-violet-600 text-white" : "text-gray-400 hover:text-gray-200"}`}>
                {t === "overview" ? "Overview" : t === "assignment" ? "Assignment Eval" : "Video Eval"}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 py-5">
          {tab === "overview" && (
            <OverviewTab
              candidate={candidate}
              scores={scores}
              onScoreChange={handleScoreChange}
              onUpdate={onUpdate}
            />
          )}
          {tab === "assignment" && (
            <AssignmentEval
              value={candidate.assignmentEval}
              onChange={(val) => onUpdate({ assignmentEval: val })}
            />
          )}
          {tab === "video" && (
            <VideoEval
              value={candidate.videoEval}
              notes={candidate.videoNotes || []}
              onChange={(val) => onUpdate({ videoEval: val })}
              onNotesChange={(notes) => onUpdate({ videoNotes: notes })}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ candidate, scores, onScoreChange, onUpdate }) {
  return (
    <div className="space-y-6">
      {/* Meta */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Applied", value: candidate.applied_date || "—" },
          { label: "Experience", value: candidate.experience || "—" },
          { label: "Reviewed", value: candidate.reviewed ? "Yes ✅" : "No" },
          { label: "Shortlisted", value: candidate.shortlisted ? "Yes ⭐" : "No" },
        ].map((item) => (
          <div key={item.label} className="bg-gray-900 rounded-lg p-3 border border-gray-800">
            <div className="text-xs text-gray-500 mb-1">{item.label}</div>
            <div className="text-sm font-medium text-gray-200">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Scores (editable) */}
      <div>
        <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          Score Breakdown
          <span className="text-xs text-gray-500 font-normal">(drag to edit)</span>
        </h3>
        <div className="space-y-4">
          {SCORE_FIELDS.map(({ key, label, color, weight }) => (
            <div key={key}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">{label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">weight {weight}</span>
                  <span className="font-bold text-gray-100">{scores[key]}</span>
                </div>
              </div>
              <input
                type="range" min="0" max="100" value={scores[key]}
                onChange={(e) => onScoreChange(key, Number(e.target.value))}
                className={`w-full h-1.5 rounded-full appearance-none cursor-pointer accent-violet-500`}
                style={{ accentColor: color.replace("bg-", "").replace("-500", "") }}
              />
              <div className="mt-1">
                <ScoreBar value={scores[key]} colorClass={color} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => onUpdate({ reviewed: !candidate.reviewed, shortlisted: candidate.shortlisted })}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition border ${candidate.reviewed ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "bg-gray-800 text-gray-300 border-gray-700 hover:border-emerald-500"}`}>
          {candidate.reviewed ? "✓ Reviewed" : "Mark as Reviewed"}
        </button>
        <button
          onClick={() => onUpdate({ shortlisted: !candidate.shortlisted, reviewed: candidate.reviewed })}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition border ${candidate.shortlisted ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40" : "bg-gray-800 text-gray-300 border-gray-700 hover:border-yellow-500"}`}>
          {candidate.shortlisted ? "★ Shortlisted" : "Add to Shortlist"}
        </button>
      </div>
    </div>
  );
}
