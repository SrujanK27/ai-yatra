import React, { useRef } from 'react';
import { Camera, Upload, Sparkles, Image as ImageIcon } from 'lucide-react';
import { SAMPLE_SCANS } from '../../data/sampleScans';

export default function CameraViewfinder({
  onImageSelected,
  onSampleSelected,
  onTriggerFailureDemo
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageSelected({
          src: event.target?.result,
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          type: file.type,
          monumentHintId: 'badami-cave-1' // Default target for uploaded custom image
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Viewfinder Target Area */}
      <div className="relative bg-canvas-card rounded-2xl border-2 border-dashed border-sandstone-400/80 p-6 sm:p-10 flex flex-col items-center justify-center text-center overflow-hidden group hover:border-terracotta transition-colors shadow-warm-sm">
        
        {/* Stone-cut Corner Brackets */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-terracotta rounded-tl-sm pointer-events-none" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-terracotta rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-terracotta rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-terracotta rounded-br-sm pointer-events-none" />

        {/* Central Camera Action */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-terracotta group-hover:text-white transition-all shadow-sm">
          <Camera className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>

        <h3 className="font-serif font-bold text-lg sm:text-xl text-umber mb-1.5">
          Scan Bagalkote Monument
        </h3>
        <p className="text-xs sm:text-sm text-umber-light max-w-sm mb-6 leading-relaxed">
          Point camera at rock-cut carvings, temples, or upload a photo to identify architecture & history.
        </p>

        {/* Action Triggers */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-5 py-2.5 rounded-stone bg-terracotta hover:bg-terracotta-deep text-white font-semibold text-sm flex items-center gap-2 shadow-warm-sm hover:shadow-terracotta-glow transition-all active:scale-95"
          >
            <Camera className="w-4 h-4" />
            <span>Capture or Upload</span>
          </button>

          <button
            onClick={() => onSampleSelected(SAMPLE_SCANS[0])}
            className="px-4 py-2.5 rounded-stone bg-canvas hover:bg-sandstone-300/60 text-umber border border-sandstone-400 font-medium text-sm flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Try Demo Preset</span>
          </button>
        </div>

        <div className="mt-4 text-[11px] text-umber-light flex items-center gap-2">
          <span>Supports JPEG, PNG, WEBP</span>
          <span>•</span>
          <span>Instant Vision Analysis</span>
        </div>
      </div>

      {/* Instant Demo Presets Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-umber-light flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-terracotta" />
            Or Select a Sample Monument for Instant AI Scan:
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SAMPLE_SCANS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onSampleSelected(sample)}
              className="group text-left bg-canvas-card rounded-xl p-2.5 border border-sandstone-300 hover:border-terracotta hover:shadow-md transition-all flex flex-col focus:outline-none focus:ring-2 focus:ring-terracotta"
            >
              <div className="w-full h-24 rounded-lg overflow-hidden relative mb-2 bg-sandstone-300">
                <img
                  src={sample.image}
                  alt={sample.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-umber/80 text-sandstone-50 backdrop-blur-sm">
                  {sample.location}
                </span>
              </div>
              <h4 className="font-serif font-bold text-xs text-umber line-clamp-1 group-hover:text-terracotta transition-colors">
                {sample.name}
              </h4>
              <p className="text-[10px] text-umber-light line-clamp-1 mt-0.5">
                {sample.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Failure State Tester (Developer / Verification Helper) */}
      <div className="pt-2 text-center">
        <button
          onClick={onTriggerFailureDemo}
          className="text-xs text-sandstone-600 hover:text-terracotta underline font-medium"
        >
          [Test Unrecognized Monument / Failure State]
        </button>
      </div>
    </div>
  );
}
