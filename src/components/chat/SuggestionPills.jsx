import React from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

export default function SuggestionPills({ suggestions, onSelectSuggestion }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs text-umber-light font-medium">
        <Sparkles className="w-3.5 h-3.5 text-gold" />
        <span>Ask about architectural details & history:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {suggestions.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => onSelectSuggestion(sug)}
            className="text-left text-xs bg-canvas-card hover:bg-sandstone-300/80 text-umber px-3 py-1.5 rounded-pill border border-sandstone-300 hover:border-terracotta transition-all shadow-2xs hover:scale-[1.01] active:scale-[0.99]"
          >
            {sug}
          </button>
        ))}
      </div>
    </div>
  );
}
