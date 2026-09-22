import React, { useState } from 'react';
import { Camera, Sparkles, RefreshCw, ArrowLeft, CheckCircle2, Image as ImageIcon, RotateCcw } from 'lucide-react';
import CameraViewfinder from '../components/scan/CameraViewfinder';
import ScanningAnimation from '../components/scan/ScanningAnimation';
import ScanFailureModal from '../components/scan/ScanFailureModal';
import Button from '../components/common/Button';
// Helper to request approximate browser location without blocking
function getApproximateLocation(timeoutMs = 3000) {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      resolve({ latitude: null, longitude: null });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          latitude: Number(pos.coords.latitude.toFixed(6)),
          longitude: Number(pos.coords.longitude.toFixed(6))
        });
      },
      () => {
        // Denied, unavailable, or timed out -> continue with null
        resolve({ latitude: null, longitude: null });
      },
      {
        enableHighAccuracy: false,
        timeout: timeoutMs,
        maximumAge: 60000
      }
    );
  });
}

export default function ScanPage({ onScanSuccess, navigateTo }) {
  // State: 'idle' | 'selected' | 'scanning' | 'failure'
  const [scanState, setScanState] = useState('idle');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentStage, setCurrentStage] = useState(null);

  // Handle image selected via upload
  const handleImageSelected = (imgData) => {
    setSelectedImage(imgData);
    setScanState('selected');
  };

  // Handle sample monument selected
  const handleSampleSelected = (sample) => {
    setSelectedImage({
      src: sample.image,
      name: sample.name,
      size: sample.fileSize,
      dimensions: sample.dimensions,
      monumentHintId: sample.targetMonumentId,
      description: sample.description
    });
    setScanState('selected');
  };

  // Trigger developer failure demo
  const handleTriggerFailureDemo = () => {
    setSelectedImage({
      src: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      name: 'Unrecognized_Rock_Formation.jpg',
      size: '1.2 MB',
      isFailureDemo: true
    });
    setScanState('selected');
  };

  // Perform AI Analysis with optional browser geolocation
  const handleStartAnalysis = async () => {
    if (!selectedImage) return;

    setScanState('scanning');

    // 1. Request user's approximate GPS coordinates (non-blocking with timeout)
    const coords = await getApproximateLocation(2500);

    try {
      const result = await simulateAiAnalysis({
        ...selectedImage,
        latitude: coords.latitude,
        longitude: coords.longitude
      }, (stage) => {
        setCurrentStage(stage);
      });
      // Pass identified result to parent app for Result page view
      onScanSuccess(result);
    } catch (err) {
      setScanState('failure');
    }
  };

  // Reset to idle viewfinder
  const handleReset = () => {
    setSelectedImage(null);
    setCurrentStage(null);
    setScanState('idle');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-umber hover:text-terracotta transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-gold/15 text-gold-deep border border-gold/40 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          AI Vision Multimodal Lens
        </span>
      </div>

      {/* STATE 1: IDLE / EMPTY VIEWFINDER */}
      {scanState === 'idle' && (
        <CameraViewfinder
          onImageSelected={handleImageSelected}
          onSampleSelected={handleSampleSelected}
          onTriggerFailureDemo={handleTriggerFailureDemo}
        />
      )}

      {/* STATE 2: IMAGE SELECTED STATE (PREVIEW & ANALYZE CTA) */}
      {scanState === 'selected' && selectedImage && (
        <div className="bg-canvas-card rounded-2xl p-5 sm:p-8 border border-sandstone-300 shadow-warm-md space-y-6 max-w-2xl mx-auto">
          
          <div className="flex items-center justify-between border-b border-sandstone-300 pb-3">
            <div>
              <h3 className="font-serif font-bold text-lg text-umber">
                Monument Image Selected
              </h3>
              <p className="text-xs text-umber-light">
                Ready to run Chalukyan architectural feature extraction
              </p>
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-terracotta hover:underline font-semibold"
            >
              Choose Different
            </button>
          </div>

          {/* Image Preview Container */}
          <div className="relative aspect-[16/10] sm:aspect-video rounded-xl overflow-hidden bg-sandstone-300 border border-sandstone-400/80 shadow-sm">
            <img
              src={selectedImage.src}
              alt="Selected Monument"
              className="w-full h-full object-cover"
            />
            {selectedImage.isFailureDemo && (
              <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-amber-800/90 text-white text-[11px] font-bold">
                Demo: Out of circuit sample
              </div>
            )}
          </div>

          {/* Metadata chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-umber-light bg-canvas p-3 rounded-xl border border-sandstone-300">
            <span className="font-medium text-umber truncate max-w-[200px]">
              📁 {selectedImage.name || 'Captured_Monument.jpg'}
            </span>
            <span>•</span>
            <span>{selectedImage.size || '2.4 MB'}</span>
            {selectedImage.dimensions && (
              <>
                <span>•</span>
                <span>{selectedImage.dimensions}</span>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <Button
              variant="primary"
              size="lg"
              icon={Sparkles}
              onClick={handleStartAnalysis}
              className="w-full shadow-terracotta-glow"
            >
              Analyze with AI Lens
            </Button>

            <Button
              variant="ghost"
              size="md"
              icon={RotateCcw}
              onClick={handleReset}
              className="w-full text-xs"
            >
              Cancel & Reselect
            </Button>
          </div>

        </div>
      )}

      {/* STATE 3: SCANNING / AI TELEMETRY STATE */}
      {scanState === 'scanning' && selectedImage && (
        <ScanningAnimation
          imageSrc={selectedImage.src}
          currentStage={currentStage}
        />
      )}

      {/* STATE 4: FAILURE / RECOVERY STATE */}
      {scanState === 'failure' && (
        <ScanFailureModal
          onRetry={handleReset}
          onBrowseExplore={() => navigateTo('explore')}
        />
      )}

    </div>
  );
}
