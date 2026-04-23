export default function DashboardSummary({ summary }) {
  const cards = [
    { label: "Total Candidates", value: summary.total, icon: "👥", color: "from-violet-600/30 to-violet-800/10", border: "border-violet-700/30", text: "text-violet-300" },
    { label: "Reviewed", value: summary.reviewed, icon: "✅", color: "from-emerald-600/30 to-emerald-800/10", border: "border-emerald-700/30", text: "text-emerald-300" },
    { label: "Shortlisted", value: summary.shortlisted, icon: "⭐", color: "from-yellow-600/30 to-yellow-800/10", border: "border-yellow-700/30", text: "text-yellow-300" },
    { label: "Pending Review", value: summary.pending, icon: "⏳", color: "from-gray-600/30 to-gray-800/10", border: "border-gray-700/30", text: "text-gray-300" },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((c) => (
          <div key={c.label} className={`rounded-xl bg-gradient-to-br ${c.color} border ${c.border} p-4 flex items-center gap-3`}>
            <span className="text-2xl">{c.icon}</span>
            <div>
              <div className={`text-2xl font-bold ${c.text}`}>{c.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{c.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
