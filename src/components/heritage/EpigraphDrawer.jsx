import React from 'react';
import { Scroll, Sparkles, Languages } from 'lucide-react';

export default function EpigraphDrawer({ epigraphs }) {
  if (!epigraphs || epigraphs.length === 0) return null;

  return (
    <div className="bg-canvas-card rounded-2xl p-5 border border-sandstone-300 space-y-4">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-gold/20 text-gold-dark border border-gold/40">
          <Scroll className="w-4 h-4" />
        </div>
        <div>
          <h4 className="font-serif font-bold text-base text-umber">
            Architectural Epigraphs & Stone Inscriptions
          </h4>
          <p className="text-[11px] text-umber-light">
            Deciphered historical inscriptions directly engraved on monument masonry
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {epigraphs.map((ep, idx) => (
          <div 
            key={idx}
            className="p-4 rounded-xl bg-canvas border border-sandstone-300/80 space-y-2"
          >
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-terracotta flex items-center gap-1">
                <Languages className="w-3.5 h-3.5" />
                {ep.language}
              </span>
              <span className="text-sandstone-600 font-mono text-[10px]">
                Stone Slab Inscription
              </span>
            </div>

            {/* Original Kannada / Sanskrit Script */}
            <p className="font-serif text-sm sm:text-base font-medium text-umber leading-relaxed tracking-wide bg-sandstone-200/50 p-2.5 rounded-lg border border-sandstone-300/50">
              "{ep.text}"
            </p>

            {/* English Academic Translation */}
            <div className="text-xs text-umber-light italic pl-2 border-l-2 border-gold leading-relaxed">
              <span className="font-semibold text-umber not-italic mr-1">Translation:</span>
              "{ep.translation}"
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
