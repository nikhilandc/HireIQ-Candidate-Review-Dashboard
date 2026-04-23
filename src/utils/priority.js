export function computePriority(c) {
  return (
    c.assignment_score * 0.30 +
    c.video_score * 0.25 +
    c.ats_score * 0.20 +
    c.github_score * 0.15 +
    c.communication_score * 0.10
  );
}

export function getPriorityLabel(score) {
  if (score >= 80) return "P0";
  if (score >= 65) return "P1";
  if (score >= 50) return "P2";
  return "P3";
}

export const PRIORITY_COLORS = {
  P0: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/40", dot: "bg-emerald-400", badge: "bg-emerald-500" },
  P1: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/40", dot: "bg-yellow-400", badge: "bg-yellow-500" },
  P2: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/40", dot: "bg-orange-400", badge: "bg-orange-500" },
  P3: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/40", dot: "bg-red-400", badge: "bg-red-500" },
};

export const PRIORITY_DESC = {
  P0: "Interview Immediately",
  P1: "Strong Shortlist",
  P2: "Review Later",
  P3: "Reject",
};
