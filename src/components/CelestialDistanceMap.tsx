import { NASAArtifact, CelestialZone } from '../data/artifacts';

interface CelestialDistanceMapProps {
  artifacts: NASAArtifact[];
  activeZone: 'all' | CelestialZone;
  onSelectArtifact: (artifactId: string) => void;
}

const ZONE_STATIONS: Array<{
  zone: CelestialZone;
  title: string;
  distance: string;
  lightTime: string;
}> = [
  {
    zone: 'earth',
    title: 'Earth Relay',
    distance: '0 km',
    lightTime: 'Ground Control',
  },
  {
    zone: 'moon',
    title: 'The Moon',
    distance: '384,400 km',
    lightTime: '1.28 light-sec',
  },
  {
    zone: 'mars',
    title: 'Mars',
    distance: '~225 million km',
    lightTime: '12.5 light-min avg',
  },
  {
    zone: 'deep-space',
    title: 'Interstellar Space',
    distance: '~24.9 billion km',
    lightTime: '22+ light-hours',
  },
];

export function CelestialDistanceMap({
  artifacts,
  activeZone,
  onSelectArtifact,
}: CelestialDistanceMapProps) {
  return (
    <section
      id="celestial-scale"
      aria-label="Celestial Distance Map"
      className="bg-[#0B101A] border border-slate-800 rounded-xl p-5 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-100">
            Outpost Distances Across the Solar System
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Select any beacon—from Earth Mission Control to interstellar space—to open its 3-chapter story and start a conversation.
          </p>
        </div>
        <span className="text-xs font-mono tabular-nums text-slate-400 whitespace-nowrap">
          Scale: Logarithmic Distance from Earth
        </span>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ZONE_STATIONS.map((station, index) => {
          const zoneArtifacts = artifacts.filter((a) => a.zone === station.zone);
          const isDimmed = activeZone !== 'all' && activeZone !== station.zone;

          return (
            <div
              key={station.zone}
              className={`relative flex flex-col justify-between p-4 rounded-lg border transition-opacity duration-200 ${
                isDimmed
                  ? 'border-slate-800/50 bg-[#080C14] opacity-45'
                  : 'border-slate-700/80 bg-[#0F1624]'
              }`}
            >
              <div>
                <div className="flex items-baseline justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono tabular-nums text-cyan-400">
                      0{index + 1}
                    </span>
                    <h3 className="text-base font-semibold text-slate-100">{station.title}</h3>
                  </div>
                  <span className="text-xs font-mono tabular-nums text-slate-400">
                    {station.distance}
                  </span>
                </div>

                <p className="text-xs font-mono tabular-nums text-slate-400 mt-2 mb-3">
                  One-way signal time: <span className="text-slate-200">{station.lightTime}</span>
                </p>
              </div>

              <div className="space-y-2">
                {zoneArtifacts.map((artifact) => (
                  <button
                    key={artifact.id}
                    type="button"
                    onClick={() => onSelectArtifact(artifact.id)}
                    className="w-full text-left px-3 py-2.5 rounded-md bg-[#090D16] hover:bg-[#141E30] border border-slate-800 hover:border-cyan-500/60 transition-colors flex items-center justify-between gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[44px]"
                  >
                    <span className="text-sm font-medium text-slate-100 truncate">
                      {artifact.nickname ? `${artifact.name.split(' ')[0]} (${artifact.nickname})` : artifact.name}
                    </span>
                    <span
                      className={`text-xs font-mono whitespace-nowrap shrink-0 ${
                        artifact.statusTone === 'active'
                          ? 'text-cyan-400'
                          : artifact.statusTone === 'stationary'
                          ? 'text-amber-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {artifact.statusGlyph} {artifact.statusLabel}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
