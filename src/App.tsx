/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { NASA_ARTIFACTS, CelestialZone } from './data/artifacts';
import { TopBar } from './components/TopBar';
import { CelestialDistanceMap } from './components/CelestialDistanceMap';
import { ArtifactCard } from './components/ArtifactCard';
import { ArtifactDetailView } from './components/ArtifactDetailView';
import { NasaCreditsModal } from './components/NasaCreditsModal';

type FilterZone = 'all' | CelestialZone;

const FILTER_TABS: Array<{ id: FilterZone; label: string }> = [
  { id: 'all', label: 'All Artifacts' },
  { id: 'moon', label: 'The Moon' },
  { id: 'mars', label: 'Mars' },
  { id: 'deep-space', label: 'Deep Space' },
  { id: 'earth', label: 'Earth Relay' },
];

export default function App() {
  const [activeZone, setActiveZone] = useState<FilterZone>('all');
  const [selectedArtifactId, setSelectedArtifactId] = useState<string | null>(null);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);

  const selectedArtifact = useMemo(
    () => NASA_ARTIFACTS.find((a) => a.id === selectedArtifactId) ?? null,
    [selectedArtifactId]
  );

  const filteredArtifacts = useMemo(() => {
    if (activeZone === 'all') return NASA_ARTIFACTS;
    return NASA_ARTIFACTS.filter((a) => a.zone === activeZone);
  }, [activeZone]);

  const zoneCounts = useMemo(
    () => ({
      all: NASA_ARTIFACTS.length,
      moon: NASA_ARTIFACTS.filter((a) => a.zone === 'moon').length,
      mars: NASA_ARTIFACTS.filter((a) => a.zone === 'mars').length,
      'deep-space': NASA_ARTIFACTS.filter((a) => a.zone === 'deep-space').length,
      earth: NASA_ARTIFACTS.filter((a) => a.zone === 'earth').length,
    }),
    []
  );

  const handleJumpToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07090E] text-slate-100">
      <TopBar
        onNavigateHome={() => setSelectedArtifactId(null)}
        onJumpToSection={handleJumpToSection}
        onOpenCredits={() => setIsCreditsOpen(true)}
        isDetailView={Boolean(selectedArtifact)}
      />

      <main className="flex-1">
        {selectedArtifact ? (
          <ArtifactDetailView
            artifact={selectedArtifact}
            allArtifacts={NASA_ARTIFACTS}
            onBack={() => setSelectedArtifactId(null)}
            onSelectArtifact={(id) => setSelectedArtifactId(id)}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
            {/* Editorial Hero Section */}
            <section id="fleet-explorer" className="space-y-8">
              <div className="max-w-3xl space-y-4">
                <p className="text-xs sm:text-sm font-mono text-amber-400">
                  2026 NASA Space Apps Challenge · Abandoned but not Forgotten
                </p>
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-50 leading-[1.12] text-balance">
                  Left behind on distant worlds, still speaking through science.
                </h1>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  From a silent glass mirror on the Moon to a golden record drifting past the stars—plus our 2026 Earth Mission Control relay—explore the real stories of NASA’s historic spacecraft and talk directly with them.
                </p>
              </div>

              {/* Clean 4-Column Mission Summary Strip (Zero Nested Cards) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 border-y border-slate-800 py-5 gap-y-4">
                <div className="lg:pr-6">
                  <span className="text-xs text-slate-400 block">Fleet &amp; Relay Roster</span>
                  <span className="text-xl sm:text-2xl font-semibold font-mono tabular-nums text-slate-100 mt-1 block">
                    5 NASA + 1 Relay
                  </span>
                </div>
                <div className="pl-4 lg:px-6">
                  <span className="text-xs text-slate-400 block">Celestial Zones</span>
                  <span className="text-xl sm:text-2xl font-semibold font-mono tabular-nums text-slate-100 mt-1 block">
                    Earth + 3 Frontiers
                  </span>
                </div>
                <div className="pt-4 lg:pt-0 lg:px-6">
                  <span className="text-xs text-slate-400 block">Active Span</span>
                  <span className="text-xl sm:text-2xl font-semibold font-mono tabular-nums text-cyan-400 mt-1 block">
                    1969 – Present
                  </span>
                </div>
                <div className="pt-4 pl-4 lg:pt-0 lg:pl-6">
                  <span className="text-xs text-slate-400 block">Longest Flight Record</span>
                  <span className="text-xl sm:text-2xl font-semibold font-mono tabular-nums text-amber-400 mt-1 block">
                    24.9B km
                  </span>
                </div>
              </div>
            </section>

            {/* Interactive Celestial Distance Scale */}
            <CelestialDistanceMap
              artifacts={NASA_ARTIFACTS}
              activeZone={activeZone}
              onSelectArtifact={(id) => setSelectedArtifactId(id)}
            />

            {/* Filterable Spacecraft Explorer */}
            <section id="mission-roster" className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-50">
                    Explore the Silent Fleet
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Filter by celestial body and open any mission dossier to read its 3 chapters or ask questions.
                  </p>
                </div>

                {/* Interactive Segmented Filter Controls */}
                <div
                  role="tablist"
                  aria-label="Filter spacecraft by celestial zone"
                  className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#0B101A] border border-slate-800 self-start md:self-auto"
                >
                  {FILTER_TABS.map((tab) => {
                    const isActive = activeZone === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveZone(tab.id)}
                        className={`min-h-[40px] px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                          isActive
                            ? 'bg-cyan-500 text-slate-950 font-semibold'
                            : 'text-slate-300 hover:text-white hover:bg-[#131B2B]'
                        }`}
                      >
                        {tab.label}{' '}
                        <span
                          className={`font-mono tabular-nums ml-1 ${
                            isActive ? 'text-slate-900' : 'text-slate-500'
                          }`}
                        >
                          ({zoneCounts[tab.id]})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArtifacts.map((artifact) => (
                  <ArtifactCard
                    key={artifact.id}
                    artifact={artifact}
                    onSelect={(id) => setSelectedArtifactId(id)}
                  />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Clean Grounded Footer with Direct NASA Archive Citations */}
      <footer className="border-t border-slate-800/80 bg-[#07090E] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <p className="text-sm font-semibold text-slate-200">
              Voices of the Silent Fleet
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
              Mission facts &amp; telemetry sourced from the NASA Science Mission Directorate, NASA NSSDC Master Catalog, NASA Planetary Data System (PDS), and JPL Mission Archives.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 shrink-0">
            <button
              type="button"
              onClick={() => setIsCreditsOpen(true)}
              className="px-3.5 py-2 rounded-lg bg-[#0E1420] hover:bg-[#151F31] border border-slate-700 text-cyan-300 font-medium transition-colors cursor-pointer"
            >
              View NASA Sources &amp; NSSDC Registry
            </button>
          </div>
        </div>
      </footer>

      <NasaCreditsModal
        isOpen={isCreditsOpen}
        onClose={() => setIsCreditsOpen(false)}
      />
    </div>
  );
}
