import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Sparkles, FileText, Check } from 'lucide-react';

export default function AudioPlayer({ audioGuide, monumentName }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);

  // Simulated audio progress
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + (0.5 * playbackRate);
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackRate]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const resetAudio = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    setPlaybackRate(speeds[nextIdx]);
  };

  if (!audioGuide) return null;

  return (
    <div className="bg-umber text-sandstone-50 rounded-2xl p-4 sm:p-5 border border-gold/40 shadow-xl relative overflow-hidden">
      {/* Decorative sandstone texture glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-start justify-between gap-3 mb-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold border border-gold/40">
            <Volume2 className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold tracking-widest uppercase text-gold-light">
                Official Audio Guide
              </span>
              <span className="text-[10px] text-sandstone-400">• {audioGuide.duration}</span>
            </div>
            <h4 className="font-serif font-bold text-sm sm:text-base text-sandstone-50 leading-tight line-clamp-1">
              {audioGuide.title}
            </h4>
          </div>
        </div>

        {/* Speed & Transcript buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={cycleSpeed}
            className="px-2 py-0.5 rounded text-[11px] font-bold bg-sandstone-800 text-gold-light border border-sandstone-700 hover:border-gold/50 transition-all"
            title="Change Playback Speed"
          >
            {playbackRate}x
          </button>
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className={`p-1.5 rounded text-xs transition-all ${
              showTranscript 
                ? 'bg-gold text-umber' 
                : 'bg-sandstone-800 text-sandstone-300 hover:text-white border border-sandstone-700'
            }`}
            title="View Audio Guide Transcript"
          >
            <FileText className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scrubber / Progress Bar */}
      <div className="space-y-1 relative z-10 mb-3">
        <div 
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            setProgress(Math.max(0, Math.min(100, pos * 100)));
          }}
          className="h-2 bg-sandstone-800 rounded-full cursor-pointer relative overflow-hidden group"
        >
          <div 
            className="h-full bg-gradient-to-r from-terracotta to-gold transition-all duration-150 rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gold-light rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-sandstone-400 font-mono">
          <span>0:{Math.floor((progress / 100) * 225).toString().padStart(2, '0')}</span>
          <span>{audioGuide.duration}</span>
        </div>
      </div>

      {/* Main Controls Bar */}
      <div className="flex items-center justify-between relative z-10 pt-1">
        <div className="text-[11px] text-sandstone-300 flex items-center gap-1">
          <span className="text-sandstone-400">Narrator:</span>
          <span className="text-sandstone-200 font-medium">{audioGuide.narrator}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetAudio}
            className="p-2 rounded-full hover:bg-sandstone-800 text-sandstone-300 hover:text-white transition-colors"
            title="Restart Audio"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={togglePlay}
            className="px-4 py-1.5 rounded-full bg-terracotta hover:bg-terracotta-deep text-white font-semibold text-xs flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                <span>Listen Audio</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Transcript Drawer / Collapsible */}
      {showTranscript && (
        <div className="mt-4 pt-3 border-t border-sandstone-700/80 relative z-10 text-xs text-sandstone-200 leading-relaxed bg-sandstone-900/60 p-3 rounded-xl">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-gold-light text-[11px]">Narration Transcript</span>
            <span className="text-[10px] text-sandstone-400">English</span>
          </div>
          <p className="italic text-sandstone-300">
            "{audioGuide.transcript}"
          </p>
        </div>
      )}
    </div>
  );
}
