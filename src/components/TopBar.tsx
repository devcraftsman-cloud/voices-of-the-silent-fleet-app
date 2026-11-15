interface TopBarProps {
  onNavigateHome: () => void;
  onJumpToSection: (sectionId: string) => void;
  onOpenCredits: () => void;
  isDetailView: boolean;
}

export function TopBar({
  onNavigateHome,
  onJumpToSection,
  onOpenCredits,
  isDetailView,
}: TopBarProps) {
  const handleNavClick = (sectionId: string) => {
    if (isDetailView) {
      onNavigateHome();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      onJumpToSection(sectionId);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#07090E]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <button
          type="button"
          onClick={onNavigateHome}
          className="text-base sm:text-lg font-semibold tracking-tight text-slate-100 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm cursor-pointer"
        >
          Voices of the Silent Fleet
        </button>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            type="button"
            onClick={() => handleNavClick('fleet-explorer')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b border-transparent hover:border-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Explorer
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('celestial-scale')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b border-transparent hover:border-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Celestial Scale
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('mission-roster')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b border-transparent hover:border-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Mission Files
          </button>
          <button
            type="button"
            onClick={onOpenCredits}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b border-transparent hover:border-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Archives
          </button>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenCredits}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090E]"
          >
            NASA Data & Credits
          </button>
        </div>
      </div>
    </header>
  );
}
