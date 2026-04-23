import { useState } from "react";

export default function FilterBar({ search, setSearch, filters, setFilters, sortBy, setSortBy, view, setView, compareIds, onOpenCompare }) {
  const [expanded, setExpanded] = useState(false);

  const setFilter = (key, val) => setFilters((p) => ({ ...p, [key]: val }));

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-4 space-y-3">
      {/* Top row */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search by name or college…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-violet-500 transition"
          />
        </div>

        <select
          value={sortBy} onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-violet-500"
        >
          <option value="priority">Sort: Priority</option>
          <option value="assignment">Sort: Assignment</option>
          <option value="video">Sort: Video</option>
          <option value="ats">Sort: ATS</option>
          <option value="name">Sort: Name</option>
        </select>

        <select
          value={filters.reviewStatus} onChange={(e) => setFilter("reviewStatus", e.target.value)}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-violet-500"
        >
          <option value="all">All Status</option>
          <option value="reviewed">Reviewed</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="pending">Pending</option>
        </select>

        <div className="flex gap-1 bg-gray-800 rounded-lg p-1 border border-gray-700">
          {["table","grid"].map((v) => (
            <button key={v} onClick={() => setView(v)}
              className={`px-3 py-1 rounded text-xs font-medium transition ${view === v ? "bg-violet-600 text-white" : "text-gray-400 hover:text-gray-200"}`}>
              {v === "table" ? "Table" : "Cards"}
            </button>
          ))}
        </div>

        <button onClick={() => setExpanded(!expanded)}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-violet-500 transition flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
          </svg>
          Filters {expanded ? "▲" : "▼"}
        </button>

        {compareIds.length > 0 && (
          <button onClick={onOpenCompare}
            className="px-3 py-2 bg-violet-600 rounded-lg text-sm text-white font-medium hover:bg-violet-500 transition flex items-center gap-2">
            Compare ({compareIds.length})
          </button>
        )}
      </div>

      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-gray-800">
          {[
            { label: "Assignment Score", minKey: "assignmentMin", maxKey: "assignmentMax" },
            { label: "Video Score", minKey: "videoMin", maxKey: "videoMax" },
            { label: "ATS Score", minKey: "atsMin", maxKey: "atsMax" },
          ].map(({ label, minKey, maxKey }) => (
            <div key={label}>
              <label className="text-xs text-gray-400 mb-2 block">{label}: {filters[minKey]} – {filters[maxKey]}</label>
              <div className="flex gap-2 items-center">
                <input type="range" min="0" max="100" value={filters[minKey]}
                  onChange={(e) => setFilter(minKey, Number(e.target.value))}
                  className="flex-1 accent-violet-500" />
                <input type="range" min="0" max="100" value={filters[maxKey]}
                  onChange={(e) => setFilter(maxKey, Number(e.target.value))}
                  className="flex-1 accent-violet-500" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
