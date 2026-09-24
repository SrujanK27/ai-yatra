import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Sparkles, 
  MessageSquareQuote, 
  Compass, 
  Landmark, 
  Share2, 
  Bookmark, 
  Layers, 
  HelpCircle, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import AudioPlayer from '../components/common/AudioPlayer';
import EpigraphDrawer from '../components/heritage/EpigraphDrawer';
import { HERITAGE_MONUMENTS } from '../data/heritageData';
import { getTranslation } from '../data/translations';

export default function ResultPage({ 
  monument, 
  aiVerification, 
  scannedImage,
  navigateTo, 
  onAskAiWithMonument,
  onSelectNearby,
  activeLanguage = 'EN'
}) {
  const [activeTab, setActiveTab] = useState('about'); // 'about' | 'architecture' | 'epigraphs' | 'map'
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewScannedPhoto, setViewScannedPhoto] = useState(Boolean(scannedImage));
  const t = getTranslation(activeLanguage);
  const isKn = activeLanguage === 'KN';

  // Fallback to Badami Cave 1 if accessed directly
  const data = monument || HERITAGE_MONUMENTS[0];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 pb-16">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-umber hover:text-terracotta transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToHome}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSaved(!saved)}
            className={`p-2 rounded-stone border transition-all ${
              saved 
                ? 'bg-terracotta text-white border-terracotta shadow-sm' 
                : 'bg-canvas-card text-umber hover:text-terracotta border-sandstone-300'
            }`}
            title="Save to Itinerary"
          >
            <Bookmark className="w-4 h-4" />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-stone bg-canvas-card hover:bg-sandstone-300 text-umber border border-sandstone-300 transition-all"
            title="Share Monument"
          >
            {copied ? <Check className="w-4 h-4 text-terracotta" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* AI Identification & Live Verification Banner */}
      <div className="bg-canvas-card rounded-2xl p-4 sm:p-5 border border-gold/50 shadow-ai-bloom space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 text-gold-deep flex items-center justify-center shrink-0 border border-gold/40">
              <Sparkles className="w-5 h-5 text-gold animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-gold-deep">
                  {aiVerification?.badgeText || '✨ Identified by AI'}
                </span>
                <span className="text-[11px] text-umber-light font-mono">
                  • {data.period}
                </span>
                {aiVerification?.model && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-sandstone-200 text-umber font-mono border border-sandstone-300">
                    {aiVerification.model}
                  </span>
                )}
              </div>
              <p className="text-xs text-umber-light mt-0.5">
                Matched against the Chalukyan Epigraphical & Archaeological Index
              </p>
            </div>
          </div>

          <button
            onClick={() => onAskAiWithMonument(data)}
            className="w-full sm:w-auto px-4 py-2 rounded-stone bg-umber hover:bg-umber-dark text-sandstone-50 text-xs font-semibold flex items-center justify-center gap-2 border border-gold/40 shadow-sm transition-all"
          >
            <MessageSquareQuote className="w-3.5 h-3.5 text-gold-light" />
            <span>{t.askAiAboutThis}</span>
          </button>
        </div>

        {/* Live Detected Features Chips */}
        {aiVerification?.featuresDetected && aiVerification.featuresDetected.length > 0 && (
          <div className="pt-2 border-t border-gold/20">
            <span className="text-[11px] font-bold text-umber uppercase tracking-wider block mb-1.5">
              🔍 Vision Features Identified:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {aiVerification.featuresDetected.map((feat, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs bg-amber-500/10 text-amber-950 font-medium border border-amber-500/30 flex items-center gap-1.5"
                >
                  <span className="text-terracotta font-bold">✓</span>
                  {feat}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Monument Hero Image & Title Card */}
      <div className="bg-canvas-card rounded-3xl overflow-hidden border border-sandstone-300 shadow-warm-md">
        
        {/* Photo View Controls if user scanned their own image */}
        {scannedImage && (
          <div className="bg-sandstone-200/80 px-4 py-2 flex items-center justify-between border-b border-sandstone-300 text-xs">
            <span className="text-umber-light font-medium">Image View:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewScannedPhoto(true)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  viewScannedPhoto
                    ? 'bg-terracotta text-white shadow-xs'
                    : 'bg-canvas text-umber hover:bg-sandstone-300'
                }`}
              >
                📸 Your Scanned Photo
              </button>
              <button
                onClick={() => setViewScannedPhoto(false)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  !viewScannedPhoto
                    ? 'bg-terracotta text-white shadow-xs'
                    : 'bg-canvas text-umber hover:bg-sandstone-300'
                }`}
              >
                🏛️ Catalog Master
              </button>
            </div>
          </div>
        )}

        {/* Large Hero Image */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-sandstone-300">
          <img
            src={viewScannedPhoto && scannedImage ? scannedImage : data.image}
            alt={isKn ? (data.kannadaName || data.name) : data.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-umber/90 via-umber/30 to-transparent pointer-events-none" />

          {/* Overlaid Badges on Image */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-sandstone-50 space-y-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-terracotta text-white shadow-sm">
                {data.region}
              </span>
              {viewScannedPhoto && scannedImage && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm">
                  Live User Upload
                </span>
              )}
              {data.isUnesco && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-umber-dark shadow-sm">
                  UNESCO World Heritage
                </span>
              )}
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
              {isKn ? (data.kannadaName || data.name) : data.name}
            </h1>
            <p className="text-xs sm:text-sm text-sandstone-200 font-medium font-sans">
              {isKn ? data.name : data.kannadaName}
            </p>
          </div>
        </div>

        {/* Quick Specs Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 bg-sandstone-200/70 border-t border-sandstone-300 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-umber-light tracking-wider block">
              {t.locationLabel}
            </span>
            <span className="font-semibold text-umber flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-terracotta" />
              {data.location}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-umber-light tracking-wider block">
              {t.patronLabel}
            </span>
            <span className="font-semibold text-umber mt-0.5 block truncate">
              {data.builder}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-umber-light tracking-wider block">
              {t.styleLabel}
            </span>
            <span className="font-semibold text-umber mt-0.5 block truncate">
              {data.architecturalStyle}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-umber-light tracking-wider block">
              {t.dynastyLabel}
            </span>
            <span className="font-semibold text-umber mt-0.5 block truncate">
              {data.period}
            </span>
          </div>
        </div>
      </div>

      {/* Audio Guide Player */}
      {data.audioGuide && (
        <AudioPlayer
          audioGuide={data.audioGuide}
          monumentName={isKn ? (data.kannadaName || data.name) : data.name}
        />
      )}

      {/* Section Content Navigation Tabs */}
      <div className="space-y-6">
        <div className="flex border-b border-sandstone-300 gap-4 overflow-x-auto no-scrollbar">
          {[
            { id: 'about', label: t.tabs.about },
            { id: 'architecture', label: t.tabs.architecture },
            { id: 'epigraphs', label: t.tabs.epigraphs },
            { id: 'map', label: t.tabs.nearby }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-terracotta text-terracotta'
                  : 'border-transparent text-umber-light hover:text-umber'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: ABOUT & HISTORY */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="bg-canvas-card rounded-2xl p-5 sm:p-6 border border-sandstone-300 space-y-3">
              <h3 className="font-serif font-bold text-lg text-umber">
                Historical Background
              </h3>
              <p className="text-xs sm:text-sm text-umber leading-relaxed">
                {data.about}
              </p>
            </div>

            {/* Did You Know? */}
            {data.didYouKnow && (
              <div className="bg-sandstone-200 rounded-2xl p-5 border border-sandstone-300 space-y-3">
                <div className="flex items-center gap-2 text-gold-deep font-bold text-xs uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-gold" />
                  <span>Did You Know?</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-umber">
                  {data.didYouKnow.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-terracotta font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ARCHITECTURE HIGHLIGHTS */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="bg-canvas-card rounded-2xl p-5 sm:p-6 border border-sandstone-300 space-y-3">
              <h3 className="font-serif font-bold text-lg text-umber">
                Vesara & Chalukyan Architecture Overview
              </h3>
              <p className="text-xs sm:text-sm text-umber leading-relaxed">
                {data.architecture.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {data.architecture.highlights.map((h, idx) => (
                <div 
                  key={idx}
                  className="bg-canvas-card rounded-xl p-4 border border-sandstone-300 space-y-2"
                >
                  <span className="w-6 h-6 rounded-full bg-terracotta/15 text-terracotta font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-umber">
                    {h.title}
                  </h4>
                  <p className="text-xs text-umber-light leading-relaxed">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EPIGRAPHS */}
        {activeTab === 'epigraphs' && (
          <EpigraphDrawer epigraphs={data.epigraphs} />
        )}

        {/* TAB 4: MAP PLACEHOLDER */}
        {activeTab === 'map' && (
          <div className="bg-canvas-card rounded-2xl p-5 sm:p-6 border border-sandstone-300 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-umber">
                  Geographic Coordinates
                </h3>
                <p className="text-xs text-umber-light">
                  Lat: {data.coordinates.lat}° N, Lng: {data.coordinates.lng}° E
                </p>
              </div>
              <a
                href={`https://maps.google.com/?q=${data.coordinates.lat},${data.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-stone bg-terracotta text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Stylized Map Canvas */}
            <div className="relative aspect-video rounded-xl bg-sandstone-300 overflow-hidden border border-sandstone-400 flex items-center justify-center text-center p-6">
              <div className="space-y-2 relative z-10">
                <div className="w-12 h-12 mx-auto rounded-full bg-terracotta text-white flex items-center justify-center shadow-lg animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-sm text-umber">
                  {data.name}
                </h4>
                <p className="text-xs text-umber-light">
                  {data.location} • Bagalkote Malaprabha Circuit
                </p>
              </div>

              {/* Decorative contours */}
              <div className="absolute inset-0 bg-[radial-gradient(#B8592E_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      {/* Contextual Ask AI Banner CTA */}
      <div className="bg-umber text-sandstone-50 rounded-2xl p-6 border border-gold/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-gold-light text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Interactive Archaeological Assistant</span>
          </div>
          <h3 className="font-serif font-bold text-lg sm:text-xl text-sandstone-50">
            Curious about {data.name}?
          </h3>
          <p className="text-xs text-sandstone-300 max-w-md">
            Ask about carving techniques, historical battle epigraphs, or travel times from Bagalkote town.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => onAskAiWithMonument(data)}
          icon={MessageSquareQuote}
          className="shrink-0 w-full sm:w-auto shadow-terracotta-glow"
        >
          Ask AI About This Site
        </Button>
      </div>

      {/* Nearby Attractions in Circuit */}
      {data.nearbyAttractions && data.nearbyAttractions.length > 0 && (
        <div className="space-y-3 pt-4">
          <h3 className="font-serif font-bold text-lg text-umber flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-terracotta" />
            Nearby in the Bagalkote Circuit
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.nearbyAttractions.map((att) => (
              <button
                key={att.id}
                onClick={() => onSelectNearby && onSelectNearby(att.id)}
                className="bg-canvas-card hover:bg-sandstone-200/90 text-left p-3.5 rounded-xl border border-sandstone-300 hover:border-terracotta transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="font-serif font-bold text-xs text-umber group-hover:text-terracotta transition-colors">
                    {att.name}
                  </h4>
                  <span className="text-[10px] text-umber-light flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-terracotta" />
                    {att.distance} away
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-sandstone-400 group-hover:text-terracotta group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
