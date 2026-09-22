import React from 'react';
import { AlertTriangle, RotateCcw, Compass, HelpCircle } from 'lucide-react';
import Button from '../common/Button';

export default function ScanFailureModal({ onRetry, onBrowseExplore }) {
  return (
    <div className="bg-canvas-card rounded-2xl p-6 sm:p-8 border-2 border-terracotta/40 shadow-xl text-center max-w-md mx-auto">
      <div className="w-14 h-14 mx-auto rounded-full bg-terracotta/15 text-terracotta flex items-center justify-center mb-4">
        <AlertTriangle className="w-7 h-7" />
      </div>

      <span className="text-[11px] font-bold uppercase tracking-widest text-terracotta block mb-1">
        Identification Inconclusive
      </span>
      
      <h3 className="font-serif font-bold text-xl text-umber mb-2">
        Monument Unclear or Outside Circuit
      </h3>

      <p className="text-xs sm:text-sm text-umber-light mb-6 leading-relaxed">
        The uploaded photo did not match known Chalukyan monuments in Badami, Pattadakal, Aihole, or Mahakuta. Ensure good natural lighting and avoid heavy blur.
      </p>

      <div className="space-y-2.5">
        <Button
          variant="primary"
          onClick={onRetry}
          icon={RotateCcw}
          className="w-full"
        >
          Try Scanning Again
        </Button>

        <Button
          variant="secondary"
          onClick={onBrowseExplore}
          icon={Compass}
          className="w-full"
        >
          Browse Bagalkote Monument Catalog
        </Button>
      </div>

      <div className="mt-4 pt-3 border-t border-sandstone-300 text-[11px] text-umber-light flex items-center justify-center gap-1">
        <HelpCircle className="w-3 h-3 text-terracotta" />
        <span>Tip: Try scanning the facade reliefs or temple towers directly.</span>
      </div>
    </div>
  );
}
