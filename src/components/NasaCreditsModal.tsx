import { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { NASA_ARTIFACTS } from '../data/artifacts';

interface NasaCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ARCHIVE_SOURCES = [
  {
    name: 'NASA Science Mission Directorate (SMD)',
    scope: 'Mission timelines, planetary science objectives, and educational briefings for Apollo, Mars Exploration, and Voyager programs.',
    url: 'https://science.nasa.gov/',
  },
  {
    name: 'NASA NSSDC Master Catalog (NSSDCA)',
    scope: 'Official COSPAR/NSSDC spacecraft identifiers, launch vehicle logs, landing coordinates, and instrument registries.',
    url: 'https://nssdc.gsfc.nasa.gov/nmc/',
  },
  {
    name: 'NASA Planetary Data System (PDS)',
    scope: 'Calibrated Mars surface imagery, Opportunity traverse records, InSight seismic event catalogs, and Voyager interstellar plasma logs.',
    url: 'https://pds.nasa.gov/',
  },
  {
    name: 'NASA Jet Propulsion Laboratory (JPL) Mission Archives',
    scope: 'Opportunity 45.16 km traverse records, InSight sol telemetry, Ingenuity 72-flight logbook, and Voyager real-time distance telemetry.',
    url: 'https://www.jpl.nasa.gov/missions/',
  },
];

export function NasaCreditsModal({ isOpen, onClose }: NasaCreditsModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="nasa-credits-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-xl bg-[#0B101A] border border-slate-700 p-6 sm:p-7 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 id="nasa-credits-title" className="text-xl sm:text-2xl font-bold text-slate-50">
              NASA Data &amp; Official Mission Credits
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Every hardware profile, coordinate, and discovery in Voices of the Silent Fleet is grounded in public NASA archives.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close NASA data credits"
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg bg-[#131B2B] hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ARCHIVE_SOURCES.map((source) => (
            <a
              key={source.name}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="group block p-4 rounded-lg bg-[#0F1624] hover:bg-[#151F33] border border-slate-800 hover:border-cyan-500/60 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-cyan-300 group-hover:text-cyan-200">
                  {source.name}
                </h3>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 shrink-0 mt-0.5" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">{source.scope}</p>
            </a>
          ))}
        </div>

        <div className="rounded-lg bg-[#0F1624] border border-amber-500/40 p-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
          <span className="font-semibold text-amber-300">Note on Devcraftsman (2026):</span>{' '}
          Devcraftsman (“Mission Archivist”) is the Earth-based educational relay interface built in 2026 for the NASA Space Apps Challenge (Janesville / Chicago Space Apps Relay) rather than a NASA flight spacecraft. The five historical mission artifacts below are official NASA flight hardware.
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-200 mb-3">
            Verified Spacecraft &amp; Ground Relay Registry
          </h3>
          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0F1624] text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3 font-medium">Artifact / Station</th>
                  <th className="py-2.5 px-3 font-medium">Registry ID</th>
                  <th className="py-2.5 px-3 font-medium">Zone</th>
                  <th className="py-2.5 px-3 font-medium">Coordinates</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {NASA_ARTIFACTS.map((item) => (
                  <tr key={item.id} className="bg-[#090D16]">
                    <td className="py-2.5 px-3 font-medium text-slate-100">
                      {item.name}
                      {item.isGroundStation && (
                        <span className="block text-[11px] font-normal text-amber-300">
                          Earth-Based Educational Relay (Non-Flight)
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 font-mono tabular-nums text-amber-300">
                      {item.telemetry.nssdcId}
                    </td>
                    <td className="py-2.5 px-3">{item.zoneLabel}</td>
                    <td className="py-2.5 px-3 font-mono tabular-nums text-slate-400">
                      {item.telemetry.coordinates}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
