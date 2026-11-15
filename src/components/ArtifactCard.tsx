import { ArrowRight } from 'lucide-react';
import { NASAArtifact } from '../data/artifacts';
import { ArtifactImage } from './ArtifactImage';

interface ArtifactCardProps {
  artifact: NASAArtifact;
  onSelect: (id: string) => void;
}

export function ArtifactCard({ artifact, onSelect }: ArtifactCardProps) {
  const statusColorClass =
    artifact.statusTone === 'active'
      ? 'text-cyan-400'
      : artifact.statusTone === 'stationary'
      ? 'text-amber-400'
      : 'text-slate-400';

  return (
    <article className="group flex flex-col bg-[#0C111C] border border-slate-800 hover:border-cyan-500/60 rounded-xl overflow-hidden transition-colors duration-200">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#07090E]">
        <ArtifactImage
          src={artifact.imageUrl}
          alt={artifact.imageAlt}
          title={artifact.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0C111C] via-[#0C111C]/50 to-transparent pointer-events-none" />
      </div>

      <div className="flex-1 flex flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 mb-2">
            <span className="text-slate-200 font-medium">{artifact.zoneLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{artifact.dateSpan}</span>
            <span aria-hidden="true">·</span>
            <span className={`font-mono ${statusColorClass}`}>
              {artifact.statusGlyph} {artifact.statusLabel}
            </span>
          </div>

          <h3 className="text-xl font-semibold text-slate-50 leading-snug">
            {artifact.name}
            {artifact.nickname && artifact.nickname !== artifact.name && (
              <span className="text-amber-400 font-normal"> “{artifact.nickname}”</span>
            )}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed mt-2.5">{artifact.summary}</p>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800/90 space-y-4">
          <div className="flex items-baseline justify-between gap-4 text-xs">
            <div>
              <span className="text-slate-400 block">Planned vs. Actual</span>
              <span className="font-mono tabular-nums text-slate-200 font-medium mt-0.5 block">
                {artifact.telemetry.plannedLifespan} → {artifact.telemetry.actualLifespan}
              </span>
            </div>
            <span className="font-mono tabular-nums text-amber-300 shrink-0">
              {artifact.telemetry.lifespanMultiplierLabel}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onSelect(artifact.id)}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-[#131B2B] hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-slate-700 hover:border-cyan-400 text-sm font-semibold transition-colors flex items-center justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span>Open Mission Story & Chat</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
    </article>
  );
}
