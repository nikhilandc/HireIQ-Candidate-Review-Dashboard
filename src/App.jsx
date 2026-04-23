import { useState, useMemo, useCallback } from "react";
import { generateCandidates } from "./data/candidates";
import CandidateList from "./components/CandidateList";
import CandidateDetail from "./components/CandidateDetail";
import ComparePanel from "./components/ComparePanel";
import DashboardSummary from "./components/DashboardSummary";
import FilterBar from "./components/FilterBar";
import Header from "./components/Header";
import { computePriority } from "./utils/priority";

const initialCandidates = generateCandidates(100).map((c) => ({
  ...c,
  reviewed: false,
  shortlisted: false,
  assignmentEval: null,
  videoEval: null,
  videoNotes: [],
}));

export default function App() {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [selected, setSelected] = useState(null);
  const [compareIds, setCompareIds] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    assignmentMin: 0, assignmentMax: 100,
    videoMin: 0, videoMax: 100,
    atsMin: 0, atsMax: 100,
    reviewStatus: "all",
  });
  const [sortBy, setSortBy] = useState("priority");
  const [view, setView] = useState("table");

  const updateCandidate = useCallback((id, patch) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch } : c))
    );
    if (selected?.id === id) {
      setSelected((prev) => ({ ...prev, ...patch }));
    }
  }, [selected]);

  const enriched = useMemo(() =>
    candidates.map((c) => ({
      ...c,
      priorityScore: computePriority(c),
      priorityLabel: (() => {
        const s = computePriority(c);
        if (s >= 80) return "P0";
        if (s >= 65) return "P1";
        if (s >= 50) return "P2";
        return "P3";
      })(),
    })), [candidates]);

  const filtered = useMemo(() => {
    let result = enriched.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.college.toLowerCase().includes(search.toLowerCase());
      const matchAssignment = c.assignment_score >= filters.assignmentMin && c.assignment_score <= filters.assignmentMax;
      const matchVideo = c.video_score >= filters.videoMin && c.video_score <= filters.videoMax;
      const matchAts = c.ats_score >= filters.atsMin && c.ats_score <= filters.atsMax;
      const matchStatus =
        filters.reviewStatus === "all" ? true :
        filters.reviewStatus === "reviewed" ? c.reviewed :
        filters.reviewStatus === "shortlisted" ? c.shortlisted :
        !c.reviewed;
      return matchSearch && matchAssignment && matchVideo && matchAts && matchStatus;
    });

    result.sort((a, b) => {
      if (sortBy === "priority") return b.priorityScore - a.priorityScore;
      if (sortBy === "assignment") return b.assignment_score - a.assignment_score;
      if (sortBy === "video") return b.video_score - a.video_score;
      if (sortBy === "ats") return b.ats_score - a.ats_score;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
    return result;
  }, [enriched, search, filters, sortBy]);

  const summary = useMemo(() => ({
    total: candidates.length,
    reviewed: candidates.filter((c) => c.reviewed).length,
    shortlisted: candidates.filter((c) => c.shortlisted).length,
    pending: candidates.filter((c) => !c.reviewed).length,
  }), [candidates]);

  const toggleCompare = (id) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) :
      prev.length < 3 ? [...prev, id] : prev
    );
  };

  const compareCandidates = useMemo(() =>
    enriched.filter((c) => compareIds.includes(c.id)), [enriched, compareIds]);

  const openDetail = (c) => {
    setSelected(enriched.find((x) => x.id === c.id) || c);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <Header />
      <DashboardSummary summary={summary} />

      <div className="max-w-screen-2xl mx-auto px-4 pb-10">
        <FilterBar
          search={search} setSearch={setSearch}
          filters={filters} setFilters={setFilters}
          sortBy={sortBy} setSortBy={setSortBy}
          view={view} setView={setView}
          compareIds={compareIds}
          onOpenCompare={() => setCompareOpen(true)}
        />

        <CandidateList
          candidates={filtered}
          view={view}
          onSelect={openDetail}
          compareIds={compareIds}
          onToggleCompare={toggleCompare}
          onUpdateCandidate={updateCandidate}
        />
      </div>

      {selected && (
        <CandidateDetail
          candidate={enriched.find((c) => c.id === selected.id) || selected}
          onClose={() => setSelected(null)}
          onUpdate={(patch) => updateCandidate(selected.id, patch)}
        />
      )}

      {compareOpen && (
        <ComparePanel
          candidates={compareCandidates}
          onClose={() => setCompareOpen(false)}
          onRemove={(id) => setCompareIds((p) => p.filter((x) => x !== id))}
        />
      )}
    </div>
  );
}
