import React, { useRef, useState } from 'react';
import { Camera, Upload, Sparkles, Image as ImageIcon, Smartphone } from 'lucide-react';
import { SAMPLE_SCANS } from '../../data/sampleScans';

const MAX_IMAGE_DIM = 1024;
const JPEG_QUALITY = 0.8;

/**
 * Reads a file as Data URL
 */
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });
}

/**
 * Compresses image using HTML5 Canvas (max 1024px, JPEG 0.8)
 * Ensures fast upload, no timeout, and clean base64 encoding.
 */
function compressImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;

      if (width > MAX_IMAGE_DIM || height > MAX_IMAGE_DIM) {
        const ratio = Math.min(MAX_IMAGE_DIM / width, MAX_IMAGE_DIM / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const jpegDataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
      const base64 = jpegDataUrl.split(',')[1];
      resolve({
        dataUrl: jpegDataUrl,
        base64,
        dimensions: `${width} × ${height} px`
      });
    };
    img.onerror = () => reject(new Error('Failed to process image.'));
    img.src = dataUrl;
  });
}

export default function CameraViewfinder({
  onImageSelected,
  onSampleSelected,
  onTriggerFailureDemo
}) {
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    try {
      setIsProcessing(true);
      const rawDataUrl = await readFileAsDataURL(file);
      const { dataUrl, base64, dimensions } = await compressImage(rawDataUrl);

      onImageSelected({
        src: dataUrl,
        base64: base64,
        name: file.name || 'Captured_Photo.jpg',
        size: `${((base64.length * 0.75) / 1024).toFixed(1)} KB (Optimized)`,
        dimensions: dimensions,
        type: 'image/jpeg',
        monumentHintId: null
      });
    } catch (err) {
      console.error('Error processing image:', err);
      alert('Could not process the selected image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCameraChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
    e.target.value = '';
  };

  const handleGalleryChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Hidden file inputs for Camera and Gallery */}
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleCameraChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />
      <input
        type="file"
        ref={galleryInputRef}
        onChange={handleGalleryChange}
        accept="image/*"
        className="hidden"
      />

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
          Scan Bagalkote Heritage Monument
        </h3>
        <p className="text-xs sm:text-sm text-umber-light max-w-sm mb-6 leading-relaxed">
          Take a live photo using your phone camera or select from your gallery to identify carvings, caves, and inscriptions.
        </p>

        {/* Action Triggers: Camera, Gallery & Presets */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => cameraInputRef.current?.click()}
            disabled={isProcessing}
            className="px-5 py-2.5 rounded-stone bg-terracotta hover:bg-terracotta-deep text-white font-semibold text-sm flex items-center gap-2 shadow-warm-sm hover:shadow-terracotta-glow transition-all active:scale-95 disabled:opacity-50"
          >
            <Camera className="w-4 h-4" />
            <span>{isProcessing ? 'Processing...' : 'Scan (Open Camera)'}</span>
          </button>

          <button
            onClick={() => galleryInputRef.current?.click()}
            disabled={isProcessing}
            className="px-4 py-2.5 rounded-stone bg-canvas-card hover:bg-sandstone-300 text-umber border border-sandstone-400 font-semibold text-sm flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            <Upload className="w-4 h-4 text-terracotta" />
            <span>Gallery (Pick Photo)</span>
          </button>

          <button
            onClick={() => onSampleSelected(SAMPLE_SCANS[0])}
            disabled={isProcessing}
            className="px-4 py-2.5 rounded-stone bg-canvas hover:bg-sandstone-300/60 text-umber border border-sandstone-400 font-medium text-sm flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Try Demo Preset</span>
          </button>
        </div>

        <div className="mt-4 text-[11px] text-umber-light flex items-center gap-2">
          <span>Camera & Gallery</span>
          <span>•</span>
          <span>In-Memory Image Optimization</span>
          <span>•</span>
          <span>Instant Vision Lens</span>
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
