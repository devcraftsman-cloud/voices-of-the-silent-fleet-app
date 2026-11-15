import { useState } from 'react';
import { Compass } from 'lucide-react';

interface ArtifactImageProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
}

export function ArtifactImage({ src, alt, title, className = '' }: ArtifactImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#0B1120] to-[#07090E] border border-slate-800 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Compass className="w-8 h-8 text-cyan-400/70 mb-3" strokeWidth={1.5} />
        <p className="text-sm font-medium text-slate-300">{title}</p>
        <p className="text-xs text-slate-500 mt-1">NASA Mission Hardware Illustration</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`object-cover ${className}`}
    />
  );
}
