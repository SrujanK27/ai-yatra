import React from 'react';
import { Sparkles, User, Volume2, Landmark } from 'lucide-react';
import Badge from '../common/Badge';

export default function ChatMessage({ message, onPlaySnippet }) {
  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[85%] sm:max-w-[75%] bg-umber text-sandstone-50 rounded-2xl rounded-tr-sm px-4 py-3 shadow-md border border-sandstone-700">
          <p className="text-xs sm:text-sm leading-relaxed">{message.text}</p>
          <span className="text-[10px] text-sandstone-400 block text-right mt-1 font-mono">
            {message.timestamp}
          </span>
        </div>
      </div>
    );
  }

  // AI Response Card
  return (
    <div className="flex items-start gap-2.5 sm:gap-3 mb-5">
      {/* AI Avatar */}
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-terracotta text-white flex items-center justify-center shrink-0 shadow-sm border border-gold/40 mt-1">
        <Sparkles className="w-4 h-4 text-gold-light" />
      </div>

      <div className="max-w-[90%] sm:max-w-[80%] bg-canvas-card rounded-2xl rounded-tl-sm p-4 sm:p-5 border border-gold/40 shadow-sm space-y-3">
        {/* AI Header Tag */}
        <div className="flex items-center justify-between gap-2 border-b border-sandstone-300 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="font-serif font-bold text-xs sm:text-sm text-umber">
              Chalukyan AI Heritage Guide
            </span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-gold/20 text-gold-deep border border-gold/40">
              Verified Source
            </span>
          </div>
          {message.monumentContext && (
            <span className="text-[10px] text-umber-light font-medium truncate max-w-[120px] hidden sm:inline">
              📍 {message.monumentContext}
            </span>
          )}
        </div>

        {/* Narrative Response */}
        <div className="text-xs sm:text-sm text-umber space-y-2 leading-relaxed">
          <p>{message.text}</p>

          {/* Structured Key Points if any */}
          {message.keyPoints && (
            <ul className="space-y-1.5 mt-2 bg-canvas p-3 rounded-xl border border-sandstone-300/80 text-xs">
              {message.keyPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-1.5 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Epigraph citation if any */}
          {message.epigraphCite && (
            <div className="p-2.5 rounded-lg bg-sandstone-200 text-xs border-l-2 border-gold text-umber italic">
              <span className="font-bold not-italic text-terracotta text-[11px] block mb-0.5">Historical Inscription:</span>
              "{message.epigraphCite}"
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-1 text-[11px] text-umber-light">
          <span className="font-mono text-[10px]">{message.timestamp}</span>
          {onPlaySnippet && (
            <button
              onClick={() => onPlaySnippet(message.text)}
              className="inline-flex items-center gap-1 text-terracotta hover:text-terracotta-deep font-semibold"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Read Aloud</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
