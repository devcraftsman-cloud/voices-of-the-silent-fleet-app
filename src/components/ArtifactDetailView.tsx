import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { NASAArtifact } from '../data/artifacts';
import { ArtifactImage } from './ArtifactImage';
import { StorytellerChat } from './StorytellerChat';

interface ArtifactDetailViewProps {
  artifact: NASAArtifact;
  allArtifacts: NASAArtifact[];
  onBack: () => void;
  onSelectArtifact: (id: string) => void;
}

export function ArtifactDetailView({
  artifact,
  allArtifacts,
  onBack,
  onSelectArtifact,
}: ArtifactDetailViewProps) {
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);

  useEffect(() => {
    setActiveChapterIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [artifact.id]);

  const currentChapter = artifact.chapters[activeChapterIdx];
  const currentIndex = allArtifacts.findIndex((a) => a.id === artifact.id);
  const prevArtifact =
    allArtifacts[(currentIndex - 1 + allArtifacts.length) % allArtifacts.length];
  const nextArtifact = allArtifacts[(currentIndex + 1) % allArtifacts.length];

  const statusColorClass =
    artifact.statusTone === 'active'
      ? 'text-cyan-400'
      : artifact.statusTone === 'stationary'
      ? 'text-amber-400'
      : 'text-slate-400';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[40px] px-3.5 py-2 rounded-lg bg-[#0F1624] hover:bg-[#172136] border border-slate-700 text-sm font-medium text-slate-200 transition-colors flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Fleet Explorer</span>
        </button>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => onSelectArtifact(prevArtifact.id)}
            className="min-h-[40px] px-3 py-2 rounded-lg bg-[#0B101A] hover:bg-[#131B2B] border border-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{prevArtifact.nickname || prevArtifact.name}</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectArtifact(nextArtifact.id)}
            className="min-h-[40px] px-3 py-2 rounded-lg bg-[#0B101A] hover:bg-[#131B2B] border border-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>{nextArtifact.nickname || nextArtifact.name}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Asymmetric Split Mission Dossier Header */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-slate-800 bg-[#0B101A] min-h-[280px]">
          <ArtifactImage
            src={artifact.imageUrl}
            alt={artifact.imageAlt}
            title={artifact.name}
            className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07090E]/90 via-[#07090E]/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300">
            <span>
              {artifact.isGroundStation ? 'Station ID' : 'NSSDC ID'}: {artifact.telemetry.nssdcId}
            </span>
            <span>{artifact.telemetry.distanceFromEarthLabel}</span>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-between bg-[#0B101A] border border-slate-800 rounded-xl p-6 sm:p-7">
          <div>
            {artifact.specialBadge && (
              <div className="mb-3">
                <span className="inline-block px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/50 text-xs font-mono font-medium text-amber-300">
                  {artifact.specialBadge}
                </span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-400 mb-2">
              <span className="text-slate-200 font-medium">{artifact.zoneLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{artifact.dateSpan}</span>
              <span aria-hidden="true">·</span>
              <span className={`font-mono ${statusColorClass}`}>
                {artifact.statusGlyph} {artifact.statusLabel}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 leading-tight text-balance">
              {artifact.name}
              {artifact.nickname && artifact.nickname !== artifact.name && (
                <span className="text-amber-400 font-semibold"> (“{artifact.nickname}”)</span>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-3">
              {artifact.summary}
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <span className="text-xs text-slate-400 block">
                {artifact.isGroundStation ? 'Commissioned & Platform' : 'Launch Date & Vehicle'}
              </span>
              <span className="text-sm font-mono tabular-nums font-medium text-slate-100 mt-0.5 block">
                {artifact.telemetry.launchDate}
              </span>
              <span className="text-xs text-slate-400 mt-0.5 block">
                {artifact.telemetry.launchVehicle}
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 block">
                {artifact.isGroundStation ? 'Ground Station Coordinates' : 'Landing / Location Coordinates'}
              </span>
              <span className="text-sm font-mono tabular-nums font-medium text-cyan-300 mt-0.5 block">
                {artifact.telemetry.coordinates}
              </span>
              <span className="text-xs text-slate-400 mt-0.5 block">
                {artifact.telemetry.locationName}
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 block">Planned vs. Actual Lifespan</span>
              <span className="text-sm font-mono tabular-nums font-medium text-amber-300 mt-0.5 block">
                {artifact.telemetry.actualLifespan}
              </span>
              <span className="text-xs text-slate-400 mt-0.5 block">
                Originally planned: {artifact.telemetry.plannedLifespan}
              </span>
              <div
                className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden"
                aria-label={`Planned lifespan was ${artifact.telemetry.plannedRatioPercent}% of actual mission achievement`}
              >
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${artifact.telemetry.plannedRatioPercent}%` }}
                />
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 block">
                {artifact.isGroundStation ? 'Primary Relay Mission' : 'Key Scientific Discovery'}
              </span>
              <span className="text-sm text-slate-100 leading-snug mt-0.5 block">
                {artifact.telemetry.keyDiscovery}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Story & Chat Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 3-Chapter Mission Story Timeline */}
        <section
          aria-label="3-Chapter Mission Story Timeline"
          className="lg:col-span-7 bg-[#0B101A] border border-slate-800 rounded-xl p-6 sm:p-7 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-amber-400 shrink-0" />
              <h2 className="text-xl font-semibold text-slate-100">Mission Story Timeline</h2>
            </div>
            <span className="text-xs font-mono tabular-nums text-slate-400">
              Chapter {activeChapterIdx + 1} of 3
            </span>
          </div>

          {/* Interactive 3-Chapter Switcher */}
          <div
            role="tablist"
            aria-label="Mission story chapters"
            className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-xl bg-[#07090E] border border-slate-800"
          >
            {artifact.chapters.map((chapter, idx) => {
              const isSelected = idx === activeChapterIdx;
              const shortLabel = chapter.label.replace(`Chapter ${chapter.id}: `, '');
              return (
                <button
                  key={chapter.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveChapterIdx(idx)}
                  className={`text-left px-3.5 py-2.5 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isSelected
                      ? 'bg-[#152033] text-slate-50 border border-cyan-500/50'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#0E1522] border border-transparent'
                  }`}
                >
                  <span
                    className={`block text-[11px] font-mono tabular-nums ${
                      isSelected ? 'text-cyan-400' : 'text-slate-500'
                    }`}
                  >
                    Chapter {chapter.id}
                  </span>
                  <span className="block text-xs sm:text-sm font-medium truncate mt-0.5">
                    {shortLabel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Chapter Body */}
          <article className="space-y-5 pt-2">
            <div>
              <p className="text-xs font-mono tabular-nums text-amber-400">
                {currentChapter.timeframe}
              </p>
              <h3 className="text-2xl font-bold text-slate-50 mt-1">
                {currentChapter.title}
              </h3>
            </div>

            <div className="space-y-4 text-base text-slate-200 leading-relaxed max-w-[68ch]">
              {currentChapter.narrative.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Plain-English Science Field Note (no thick left border) */}
            <div className="rounded-xl bg-[#0F1624] border border-slate-700/80 p-5">
              <p className="text-xs font-mono text-cyan-400 mb-1.5">
                Science Field Note · How It Works
              </p>
              <h4 className="text-base font-semibold text-slate-100">
                {currentChapter.fieldNoteTitle}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed mt-1.5">
                {currentChapter.fieldNoteText}
              </p>
            </div>
          </article>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              disabled={activeChapterIdx === 0}
              onClick={() => setActiveChapterIdx((prev) => Math.max(0, prev - 1))}
              className="min-h-[44px] px-4 py-2 rounded-lg bg-[#0F1624] hover:bg-[#172236] disabled:opacity-40 border border-slate-700 text-sm font-medium text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Chapter</span>
            </button>

            <button
              type="button"
              disabled={activeChapterIdx === artifact.chapters.length - 1}
              onClick={() =>
                setActiveChapterIdx((prev) =>
                  Math.min(artifact.chapters.length - 1, prev + 1)
                )
              }
              className="min-h-[44px] px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
            >
              <span>Next Chapter</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Right: Ask the Hardware Gemini Storyteller */}
        <div className="lg:col-span-5">
          <StorytellerChat artifact={artifact} />
        </div>
      </div>
    </div>
  );
}
