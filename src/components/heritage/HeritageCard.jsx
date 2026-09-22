import React from 'react';
import { MapPin, Volume2, Sparkles, ArrowRight, Award } from 'lucide-react';
import Badge from '../common/Badge';

export default function HeritageCard({ monument, onSelect, onAskAi }) {
  if (!monument) return null;

  return (
    <div 
      onClick={() => onSelect(monument)}
      className="group bg-canvas-card rounded-2xl border border-sandstone-300 hover:border-terracotta hover:shadow-warm-md transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Thumbnail Image with Overlays */}
      <div className="relative aspect-[16/10] overflow-hidden bg-sandstone-300">
        <img
          src={monument.thumbnail || monument.image}
          alt={monument.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-umber/80 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-umber/90 text-sandstone-50 backdrop-blur-md border border-sandstone-500/40">
            {monument.region}
          </span>
          {monument.isUnesco && (
            <Badge variant="unesco" className="shadow-md bg-sandstone-50/95">
              UNESCO
            </Badge>
          )}
        </div>

        {/* Audio Duration pill on image bottom */}
        {monument.audioGuide && (
          <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-black/60 text-gold-light backdrop-blur-md border border-gold/30">
            <Volume2 className="w-3 h-3 text-gold" />
            <span>{monument.audioGuide.duration}</span>
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-umber-light mb-1">
            <MapPin className="w-3.5 h-3.5 text-terracotta shrink-0" />
            <span className="line-clamp-1">{monument.location}</span>
          </div>

          <h3 className="font-serif font-bold text-base sm:text-lg text-umber group-hover:text-terracotta transition-colors line-clamp-1 mb-1">
            {monument.name}
          </h3>

          <p className="text-xs text-umber-light line-clamp-2 leading-relaxed mb-3">
            {monument.about}
          </p>
        </div>

        {/* Card Footer: Period & Action */}
        <div className="pt-3 border-t border-sandstone-300 flex items-center justify-between text-xs">
          <span className="text-[11px] text-umber-light font-medium line-clamp-1">
            {monument.period}
          </span>

          <span className="inline-flex items-center gap-1 font-semibold text-terracotta group-hover:translate-x-0.5 transition-transform shrink-0">
            Explore <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
