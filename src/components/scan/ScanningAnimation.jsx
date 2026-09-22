import React from 'react';
import { Sparkles, Cpu, Search, CheckCircle2 } from 'lucide-react';

export default function ScanningAnimation({ imageSrc, currentStage }) {
  return (
    <div className="bg-umber rounded-2xl p-5 sm:p-8 text-sandstone-50 border border-gold/50 shadow-2xl relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-terracotta/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Viewfinder Scanner */}
      <div className="relative w-full max-w-md mx-auto aspect-video sm:aspect-square max-h-80 rounded-xl overflow-hidden border-2 border-gold shadow-ai-bloom bg-black/60 mb-6">
        
        {/* Scanned Image */}
        <img
          src={imageSrc}
          alt="Scanning Monument"
          className="w-full h-full object-cover filter brightness-90 contrast-110"
        />

        {/* Animated Laser Scanning Beam */}
        <div className="absolute inset-x-0 h-1 scan-line animate-scan-laser z-20 pointer-events-none" />

        {/* HUD Overlay Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#C59B27_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

        {/* Corner Reticles */}
        <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-gold z-30" />
        <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-gold z-30" />
        <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-gold z-30" />
        <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-gold z-30" />

        {/* Simulated Detection Target Pins */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-gold/70 text-[10px] text-gold-light animate-pulse">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>Feature Matrix: Early Chalukya</span>
        </div>

        {/* Bottom telemetry readout */}
        <div className="absolute bottom-2 inset-x-2 z-20 bg-sandstone-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center justify-between text-[11px] text-sandstone-300 font-mono">
          <span className="text-gold-light flex items-center gap-1.5">
            <Cpu className="w-3 h-3 animate-spin" />
            AI Multimodal Vision
          </span>
          <span className="text-sandstone-400">Bagalkote Index #578</span>
        </div>
      </div>

      {/* Progress Telemetry */}
      <div className="max-w-md mx-auto space-y-3 text-center">
        <div className="flex items-center justify-center gap-2 text-gold-light font-serif text-lg sm:text-xl font-semibold">
          <Sparkles className="w-5 h-5 text-gold animate-bounce" />
          <span>Analyzing Monument Architecture</span>
        </div>

        <p className="text-xs sm:text-sm text-sandstone-200 h-10 flex items-center justify-center px-4 font-sans bg-sandstone-900/40 rounded-lg border border-sandstone-700/60">
          {currentStage?.label || 'Calibrating vision neural network...'}
        </p>

        {/* Animated Bar */}
        <div className="w-full bg-sandstone-800 h-1.5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-terracotta via-gold to-terracotta-light animate-pulse w-full rounded-full" />
        </div>
      </div>

    </div>
  );
}
