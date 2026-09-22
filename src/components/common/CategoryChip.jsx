import React from 'react';
import { Sparkles, Landmark, Award, Crown, Waves } from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Landmark,
  Award,
  Crown,
  Waves
};

export default function CategoryChip({
  category,
  isActive = false,
  onClick,
  count
}) {
  const IconComponent = ICON_MAP[category.icon] || Landmark;

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-terracotta/40 ${
        isActive
          ? 'bg-umber text-sandstone-50 shadow-md ring-1 ring-gold/40'
          : 'bg-canvas-card hover:bg-sandstone-300/80 text-umber border border-sandstone-300 hover:border-sandstone-400'
      }`}
    >
      <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-gold-light' : 'text-terracotta'}`} />
      <span>{category.label}</span>
      {typeof count === 'number' && (
        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
          isActive ? 'bg-gold/30 text-sandstone-50' : 'bg-sandstone-300 text-umber-light'
        }`}>
          {count}
        </span>
      )}
    </button>
  );
}
