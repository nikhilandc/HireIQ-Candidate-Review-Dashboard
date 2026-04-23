export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-950/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white" style={{fontFamily:"'DM Serif Display',serif"}}>
              HireIQ
            </h1>
            <p className="text-xs text-gray-500 -mt-0.5">Candidate Review Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="px-2 py-1 rounded-full bg-violet-600/20 text-violet-400 border border-violet-600/30 font-medium">
            Recruiter Mode
          </span>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            R
          </div>
        </div>
      </div>
    </header>
  );
}
