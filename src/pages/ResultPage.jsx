import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Sparkles, 
  MessageSquareQuote, 
  Compass, 
  Landmark, 
  Layers, 
  HelpCircle, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Check,
  Navigation
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
  onSelectNearby,
  activeLanguage = 'EN'
}) {
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem('ai_yatra_result_tab') || 'about';
  });
  const [viewScannedPhoto, setViewScannedPhoto] = useState(Boolean(scannedImage));
  const t = getTranslation(activeLanguage);
  const isKn = activeLanguage === 'KN';

  // Synchronize activeTab to session storage
  React.useEffect(() => {
    sessionStorage.setItem('ai_yatra_result_tab', activeTab);
  }, [activeTab]);

  // Always get the latest rich data from HERITAGE_MONUMENTS using id
  const monumentFromDb = monument?.id ? HERITAGE_MONUMENTS.find(m => m.id === monument.id) : null;
  const data = monumentFromDb ? { ...monumentFromDb, ...monument } : (monument || HERITAGE_MONUMENTS[0]);

  const monumentDisplayName = isKn ? (data.kannadaName || data.name) : data.name;
  const monumentSubtitle = isKn ? data.name : (data.kannadaName || '');
  const monumentPeriod = isKn ? (data.kannadaPeriod || data.period) : data.period;
  const monumentStyle = isKn ? (data.kannadaStyle || data.architecturalStyle) : data.architecturalStyle;
  const monumentBuilder = isKn ? (data.kannadaBuilder || data.builder) : data.builder;
  const monumentLocation = isKn ? (data.kannadaLocation || data.location) : data.location;
  const monumentAbout = isKn ? (data.kannadaAbout || data.about) : data.about;
  const monumentDidYouKnow = (isKn && data.kannadaDidYouKnow && data.kannadaDidYouKnow.length > 0) 
    ? data.kannadaDidYouKnow 
    : (data.didYouKnow || []);
  const monumentArchitecture = (isKn && data.kannadaArchitecture) 
    ? data.kannadaArchitecture 
    : (data.architecture || { overview: '', highlights: [] });

  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 pb-16 ${isKn ? 'font-kannada' : ''}`}>
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-umber hover:text-terracotta transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToHome}</span>
        </button>
      </div>

      {/* AI Identification & Live Verification Banner */}
      <div className="bg-canvas-card rounded-2xl p-5 sm:p-6 border border-gold/50 shadow-ai-bloom space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-sandstone-300">
          
          {/* Header Left: Icon & AI Status */}
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gold/20 text-gold-deep flex items-center justify-center shrink-0 border border-gold/40 shadow-sm">
              <Sparkles className="w-5 h-5 text-gold animate-spin-slow" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`${isKn ? 'font-kannada font-bold text-sm sm:text-base' : 'font-serif font-bold text-base'} text-gold-deep flex items-center gap-1.5`}>
                  {aiVerification?.badgeText || (isKn ? '✨ AI ಗುರುತಿಸಿದ ಸ್ಮಾರಕ' : '✨ Identified by AI')}
                </span>
                {aiVerification?.model && (
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-sandstone-200 text-umber font-mono border border-sandstone-300">
                    {aiVerification.model}
                  </span>
                )}
              </div>
              <p className="text-xs text-umber-light">
                {isKn 
                  ? 'ಚಾಳುಕ್ಯ ಶಾಸನಗಳು ಹಾಗೂ ಪುರಾತತ್ವ ಸೂಚ್ಯಂಕದೊಂದಿಗೆ ತಾಳೆ ನೋಡಲಾಗಿದೆ' 
                  : 'Matched against the Chalukyan Epigraphical & Archaeological Index'}
              </p>
            </div>
          </div>

          {/* Action Right: Quick Scan / Explore */}
          <button
            onClick={() => navigateTo('scan')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-stone bg-umber hover:bg-umber-dark text-sandstone-50 text-xs font-semibold flex items-center justify-center gap-2 border border-gold/40 shadow-md transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-gold-light" />
            <span>{isKn ? 'ಇನ್ನೊಂದು ಸ್ಮಾರಕ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' : 'Scan Another Monument'}</span>
          </button>
        </div>

        {/* Monument Epoch & Dynasty Strip */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-umber font-medium pt-1">
          <div className="flex items-center gap-1.5">
            <span className="text-umber-light font-bold uppercase text-[10px] tracking-wider">{t.dynastyLabel}:</span>
            <span className="font-semibold text-umber bg-sandstone-200/80 px-2 py-0.5 rounded-stone border border-sandstone-300">{monumentPeriod}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-umber-light font-bold uppercase text-[10px] tracking-wider">{t.styleLabel}:</span>
            <span className="font-semibold text-umber bg-sandstone-200/80 px-2 py-0.5 rounded-stone border border-sandstone-300">{monumentStyle}</span>
          </div>
        </div>

        {/* Live Detected Features Chips */}
        {aiVerification?.featuresDetected && aiVerification.featuresDetected.length > 0 && (
          <div className="pt-2 border-t border-gold/20">
            <span className="text-[11px] font-bold text-umber uppercase tracking-wider block mb-2">
              🔍 {isKn ? 'ಗುರುತಿಸಲಾದ ವಾಸ್ತುಶಿಲ್ಪ ವೈಶಿಷ್ಟ್ಯಗಳು:' : 'Vision Features Identified:'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {aiVerification.featuresDetected.map((feat, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-lg text-xs bg-amber-500/10 text-amber-950 font-medium border border-amber-500/25 flex items-start gap-2"
                >
                  <span className="text-terracotta font-bold shrink-0 mt-0.5">✓</span>
                  <span className="leading-snug">{feat}</span>
                </div>
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
            <span className="text-umber-light font-medium">{isKn ? 'ಚಿತ್ರ ವೀಕ್ಷಣೆ:' : 'Image View:'}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewScannedPhoto(true)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  viewScannedPhoto
                    ? 'bg-terracotta text-white shadow-xs'
                    : 'bg-canvas text-umber hover:bg-sandstone-300'
                }`}
              >
                {isKn ? '📸 ನಿಮ್ಮ ಸ್ಕ್ಯಾನ್ ಫೋಟೋ' : '📸 Your Scanned Photo'}
              </button>
              <button
                onClick={() => setViewScannedPhoto(false)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  !viewScannedPhoto
                    ? 'bg-terracotta text-white shadow-xs'
                    : 'bg-canvas text-umber hover:bg-sandstone-300'
                }`}
              >
                {isKn ? '🏛️ ಪಾರಂಪರಿಕ ಚಿತ್ರ' : '🏛️ Catalog Master'}
              </button>
            </div>
          </div>
        )}

        {/* Large Hero Image */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-sandstone-300">
          <img
            src={viewScannedPhoto && scannedImage ? scannedImage : data.image}
            alt={monumentDisplayName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-umber/90 via-umber/30 to-transparent pointer-events-none" />

          {/* Overlaid Badges on Image */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-sandstone-50 space-y-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-terracotta text-white shadow-sm">
                {isKn ? (data.kannadaRegion || data.region || 'ಬಾಗಲಕೋಟೆ') : data.region}
              </span>
              {viewScannedPhoto && scannedImage && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm">
                  {isKn ? 'ನೇರ ಅಪ್ಲೋಡ್' : 'Live User Upload'}
                </span>
              )}
              {data.isUnesco && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-umber-dark shadow-sm">
                  {isKn ? 'ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ' : 'UNESCO World Heritage'}
                </span>
              )}
            </div>

            <h1 className={`${isKn ? 'font-kannada-serif text-2xl sm:text-3xl font-bold' : 'font-serif text-2xl sm:text-4xl font-bold'} tracking-tight text-white leading-snug`}>
              {monumentDisplayName}
            </h1>
            {monumentSubtitle && (
              <p className="text-xs sm:text-sm text-sandstone-200 font-medium font-sans">
                {monumentSubtitle}
              </p>
            )}
          </div>
        </div>

        {/* Quick Specs Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 bg-sandstone-200/70 border-t border-sandstone-300 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-umber-light tracking-wider block">
              {t.locationLabel}
            </span>
            <span className="font-semibold text-umber flex items-center gap-1 mt-0.5 truncate">
              <MapPin className="w-3 h-3 text-terracotta shrink-0" />
              <span className="truncate">{monumentLocation}</span>
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-umber-light tracking-wider block">
              {t.patronLabel}
            </span>
            <span className="font-semibold text-umber mt-0.5 block truncate">
              {monumentBuilder}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-umber-light tracking-wider block">
              {t.styleLabel}
            </span>
            <span className="font-semibold text-umber mt-0.5 block truncate">
              {monumentStyle}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-umber-light tracking-wider block">
              {t.dynastyLabel}
            </span>
            <span className="font-semibold text-umber mt-0.5 block truncate">
              {monumentPeriod}
            </span>
          </div>
        </div>
      </div>

      {/* Audio Guide Player with Live Speech Synthesis (Overview + Did You Know) */}
      {data && (
        <AudioPlayer
          audioGuide={{
            ...data.audioGuide,
            kannadaTitle: data.kannadaAudioGuide?.title || data.audioGuide?.kannadaTitle || data.kannadaAudioGuideTitle
          }}
          monumentName={monumentDisplayName}
          overviewText={monumentAbout}
          didYouKnowList={monumentDidYouKnow}
          activeLanguage={activeLanguage}
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
              <h3 className={`${isKn ? 'font-kannada-serif text-lg font-bold' : 'font-serif font-bold text-lg'} text-umber`}>
                {isKn ? 'ಐತಿಹಾಸಿಕ ಹಿನ್ನೆಲೆ' : 'Historical Background'}
              </h3>
              <p className="text-xs sm:text-sm text-umber leading-relaxed">
                {monumentAbout}
              </p>
            </div>

            {/* Did You Know? */}
            {monumentDidYouKnow && monumentDidYouKnow.length > 0 && (
              <div className="bg-sandstone-200 rounded-2xl p-5 border border-sandstone-300 space-y-3">
                <div className="flex items-center gap-2 text-gold-deep font-bold text-xs uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-gold" />
                  <span>{isKn ? 'ತಿಳಿಯಿರಿ (ವಿಶೇಷ ಐತಿಹಾಸಿಕ ಮಾಹಿತಿ)' : 'Did You Know?'}</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-umber">
                  {monumentDidYouKnow.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-terracotta font-bold">•</span>
                      <span className="leading-relaxed">{item}</span>
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
              <h3 className={`${isKn ? 'font-kannada-serif text-lg font-bold' : 'font-serif font-bold text-lg'} text-umber`}>
                {isKn ? 'ವಾಸ್ತುಶಿಲ್ಪ ವಿನ್ಯಾಸ ಮತ್ತು ಶೈಲಿಯ ವಿವರಣೆ' : 'Vesara & Chalukyan Architecture Overview'}
              </h3>
              <p className="text-xs sm:text-sm text-umber leading-relaxed">
                {monumentArchitecture.overview}
              </p>
            </div>

            {monumentArchitecture.highlights && monumentArchitecture.highlights.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {monumentArchitecture.highlights.map((h, idx) => (
                  <div 
                    key={idx}
                    className="bg-canvas-card rounded-xl p-4 border border-sandstone-300 space-y-2"
                  >
                    <span className="w-6 h-6 rounded-full bg-terracotta/15 text-terracotta font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className={`${isKn ? 'font-kannada font-bold text-sm' : 'font-serif font-bold text-sm'} text-umber`}>
                      {h.title}
                    </h4>
                    <p className="text-xs text-umber-light leading-relaxed">
                      {h.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: EPIGRAPHS */}
        {activeTab === 'epigraphs' && (
          <EpigraphDrawer epigraphs={data.epigraphs} activeLanguage={activeLanguage} />
        )}

        {/* TAB 4: REAL INTERACTIVE MAP & NAVIGATION */}
        {activeTab === 'map' && (
          <div className="bg-canvas-card rounded-2xl p-4 sm:p-6 border border-sandstone-300 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-sandstone-300">
              <div className="space-y-0.5">
                <h3 className={`${isKn ? 'font-kannada font-bold text-base sm:text-lg' : 'font-serif font-bold text-base sm:text-lg'} text-umber flex items-center gap-2`}>
                  <MapPin className="w-4 h-4 text-terracotta" />
                  {isKn ? 'ನಿಖರ ನಕ್ಷೆ ಮತ್ತು ಸ್ಥಳ' : 'Live Monument Map & Location'}
                </h3>
                <p className="text-xs text-umber-light font-mono">
                  {data.location} • GPS: {data.coordinates.lat}° N, {data.coordinates.lng}° E
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${data.coordinates.lat},${data.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-stone bg-terracotta hover:bg-terracotta-dark text-white text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{isKn ? 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ದಾರಿ ನೋಡಿ' : 'Get Directions (Google Maps)'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Live Interactive Map Iframe */}
            <div className="relative aspect-[16/10] sm:aspect-[21/9] rounded-xl overflow-hidden border border-sandstone-400 bg-sandstone-200 shadow-inner">
              <iframe
                title={`${data.name} Real Map`}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={`https://maps.google.com/maps?q=${data.coordinates.lat},${data.coordinates.lng}&hl=en&z=15&output=embed`}
                className="w-full h-full filter contrast-[1.05]"
                loading="lazy"
              />
              
              {/* Overlay Location Badge on Map Bottom */}
              <div className="absolute bottom-3 left-3 bg-umber/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gold/40 text-[11px] text-sandstone-50 font-sans shadow-lg pointer-events-none hidden sm:flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold-light" />
                <span className="font-bold">{monumentDisplayName}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contextual Ask AI Banner CTA */}
      {/* Discover More Monuments in Bagalkote Banner */}
      <div className="bg-umber text-sandstone-50 rounded-2xl p-6 border border-gold/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-gold-light text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-gold" />
            <span>{isKn ? 'ಬಾಗಲಕೋಟೆ ಪರಂಪರೆ ಅನ್ವೇಷಣೆ' : 'Explore Bagalkote Heritage'}</span>
          </div>
          <h3 className={`${isKn ? 'font-kannada-serif text-lg sm:text-xl font-bold' : 'font-serif font-bold text-lg sm:text-xl'} text-sandstone-50`}>
            {isKn ? 'ಇನ್ನಷ್ಟು ಐತಿಹಾಸಿಕ ತಾಣಗಳನ್ನು ನೋಡಿ' : 'Discover More Chalukyan Sanctuaries'}
          </h3>
          <p className="text-xs text-sandstone-300 max-w-md leading-relaxed">
            {isKn 
              ? 'ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು, ಐಹೊಳೆ ಹಾಗೂ ಮಹಾಕೂಟದ ಎಲ್ಲಾ ಪ್ರಮುಖ ದೇವಾಲಯಗಳು ಹಾಗೂ ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.' 
              : 'Browse all 11 cataloged UNESCO & ASI rock-cut monuments, architectural plans, and driving directions.'}
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigateTo('explore')}
          icon={Compass}
          className="shrink-0 w-full sm:w-auto shadow-terracotta-glow"
        >
          {isKn ? 'ಎಲ್ಲಾ ತಾಣಗಳನ್ನು ನೋಡಿ' : 'Explore All Monuments'}
        </Button>
      </div>

      {/* Nearby Attractions in Circuit */}
      {data.nearbyAttractions && data.nearbyAttractions.length > 0 && (
        <div className="space-y-3 pt-4">
          <div className="flex items-center justify-between">
            <h3 className={`${isKn ? 'font-kannada font-bold text-base sm:text-lg' : 'font-serif font-bold text-lg'} text-umber flex items-center gap-1.5`}>
              <Compass className="w-4 h-4 text-terracotta" />
              {isKn ? 'ಬಾಗಲಕೋಟೆ ಸರ್ಕ್ಯೂಟ್‌ನಲ್ಲಿ ಸಮೀಪದ ತಾಣಗಳು' : 'Nearby in the Bagalkote Circuit'}
            </h3>
            <span className="text-[11px] text-umber-light">
              {isKn ? 'ಮಾಹಿತಿ ಅಥವಾ ನಕ್ಷೆ ವೀಕ್ಷಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Click to view info or map'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.nearbyAttractions.map((att) => {
              const inCatalog = HERITAGE_MONUMENTS.some(
                m => m.id === att.id || m.name.toLowerCase().includes(att.name.toLowerCase())
              );

              return (
                <div
                  key={att.id}
                  className="bg-canvas-card hover:bg-sandstone-200/90 p-4 rounded-xl border border-sandstone-300 hover:border-terracotta transition-all flex items-center justify-between group shadow-sm"
                >
                  <button
                    onClick={() => onSelectNearby && onSelectNearby(att)}
                    className="flex-1 text-left pr-2 focus:outline-none"
                  >
                    <h4 className={`${isKn ? 'font-kannada font-bold text-xs sm:text-sm' : 'font-serif font-bold text-xs sm:text-sm'} text-umber group-hover:text-terracotta transition-colors line-clamp-1`}>
                      {isKn ? (att.kannadaName || att.name) : att.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] text-umber-light flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-terracotta shrink-0" />
                        {att.distance} {isKn ? 'ದೂರ' : 'away'}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        inCatalog 
                          ? 'bg-gold/20 text-umber font-semibold' 
                          : 'bg-sandstone-200 text-umber-light'
                      }`}>
                        {inCatalog ? (isKn ? '📖 ವಿವರಣೆ ಲಭ್ಯ' : '📖 View Info') : (isKn ? '🗺️ ನಕ್ಷೆ' : '🗺️ Open Map')}
                      </span>
                    </div>
                  </button>

                  {/* Direct Maps Action Icon Button */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(att.name + ', Bagalkote, Karnataka')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg bg-sandstone-200 hover:bg-terracotta hover:text-white text-umber-light transition-all shrink-0 ml-1 shadow-2xs"
                    title={isKn ? "ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ವೀಕ್ಷಿಸಿ" : "Open in Google Maps"}
                    aria-label={`Open ${att.name} in Google Maps`}
                  >
                    <Navigation className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
