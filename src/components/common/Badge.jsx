import React from 'react';
import { Sparkles, Award, MapPin, Landmark, Clock } from 'lucide-react';

export default function Badge({
  children,
  variant = 'default', // 'ai', 'unesco', 'category', 'dynasty', 'location', 'gold'
  className = '',
  icon: Icon
}) {
  const base = "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill text-xs font-semibold tracking-wide transition-all";

  const variants = {
    ai: "bg-gold/15 text-gold-deep border border-gold/40 shadow-sm font-bold",
    unesco: "bg-terracotta/10 text-terracotta-deep border border-terracotta/30 font-bold",
    category: "bg-canvas-card text-umber-light border border-sandstone-300",
    dynasty: "bg-umber text-sandstone-50 border border-sandstone-700",
    location: "bg-sandstone-200/80 text-umber border border-sandstone-300",
    gold: "bg-gold text-umber-dark font-bold shadow-ai-bloom",
    default: "bg-sandstone-200 text-umber-light border border-sandstone-300",
  };

  return (
    <span className={`${base} ${variants[variant] || variants.default} ${className}`}>
      {variant === 'ai' && !Icon && <Sparkles className="w-3.5 h-3.5 text-gold" />}
      {variant === 'unesco' && !Icon && <Award className="w-3.5 h-3.5 text-terracotta" />}
      {variant === 'location' && !Icon && <MapPin className="w-3 h-3 text-terracotta" />}
      {variant === 'dynasty' && !Icon && <Clock className="w-3 h-3 text-gold-light" />}
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{children}</span>
    </span>
  );
}
