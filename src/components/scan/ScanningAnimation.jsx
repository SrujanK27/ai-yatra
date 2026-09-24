import React from 'react';
import { Sparkles, Cpu, Search, CheckCircle2 } from 'lucide-react';

export default function ScanningAnimation({ imageSrc, currentStage }) {
  return (
    <div className="bg-umber rounded-2xl p-5 sm:p-8 text-sandstone-50 border border-gold/50 shadow-2xl relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-terracotta/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Viewfinder Scanner */}
      <div className="relative w-full max-w-md mx-auto aspect-video sm:aspect-square max-h-80 rounded-xl overflow-hidden border-2 border-gold shadow-ai-bloom bg-black/80 mb-6">
        
        {/* Scanned Image */}
        <img
          src={imageSrc}
          alt="Scanning Monument"
          className="w-full h-full object-cover filter brightness-95 contrast-105"
        />

        {/* HUD Matrix Dots Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#FFE082_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-25 pointer-events-none" />

        {/* Animated Full Up-and-Down Laser Scanning Beam & Trailing Glow */}
        <div className="absolute inset-x-0 animate-scan-up-down z-20 pointer-events-none">
          {/* Laser Core Line */}
          <div className="w-full h-1 scan-line" />
          {/* Laser Top Glow Trail */}
          <div className="w-full h-8 bg-gradient-to-b from-transparent via-gold/25 to-transparent" />
        </div>

        {/* Dynamic Scanning Dots with Radar Pings across monument points */}
        {/* Dot 1: Top Right (Shikhara point) */}
        <div className="absolute top-[22%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-light shadow-[0_0_8px_#FFE082]" />
          </div>
          <span className="absolute left-4 top-0 bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-mono text-gold-light border border-gold/40 whitespace-nowrap">
            Point [X: 48, Y: 22] • Shikhara
          </span>
        </div>

        {/* Dot 2: Center Left (Carving Feature) */}
        <div className="absolute top-[52%] left-[28%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping-slow absolute inline-flex h-5 w-5 rounded-full bg-terracotta-light opacity-80" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-terracotta-light shadow-[0_0_8px_#E07A5F]" />
          </div>
          <span className="absolute left-3.5 top-0 bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-mono text-terracotta-light border border-terracotta/40 whitespace-nowrap">
            Mudra Signature: 98.4%
          </span>
        </div>

        {/* Dot 3: Center Right (Epigraph Inscription) */}
        <div className="absolute top-[65%] left-[72%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_#34D399]" />
          </div>
          <span className="absolute right-4 top-0 bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-mono text-emerald-300 border border-emerald-500/40 whitespace-nowrap">
            Epigraphy Index: 578 CE
          </span>
        </div>

        {/* Corner Reticles */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-gold z-30 shadow-[0_0_6px_#C59B27]" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-gold z-30 shadow-[0_0_6px_#C59B27]" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-gold z-30 shadow-[0_0_6px_#C59B27]" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-gold z-30 shadow-[0_0_6px_#C59B27]" />

        {/* Central Feature Matrix Pill */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-gold/70 text-[10px] text-gold-light animate-pulse shadow-md">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>Feature Matrix: Early Chalukya</span>
        </div>

        {/* Bottom telemetry readout */}
        <div className="absolute bottom-2 inset-x-2 z-20 bg-sandstone-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center justify-between text-[11px] text-sandstone-300 font-mono border border-sandstone-700/60">
          <span className="text-gold-light flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 animate-spin text-gold" />
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
