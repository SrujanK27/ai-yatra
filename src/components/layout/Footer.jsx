import { Sparkles, MapPin, Compass } from 'lucide-react';

export default function Footer({ navigateTo }) {
  return (
    <footer className="bg-umber text-sandstone-100 pt-6 pb-20 md:pt-10 md:pb-10 border-t-2 border-gold/30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Compact 2-col on mobile, 4-col on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 mb-6 md:mb-8">
          
          {/* Brand & Mission (Spans full width 2 cols on mobile) */}
          <div className="col-span-2 space-y-2 md:space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-stone bg-terracotta text-white flex items-center justify-center font-serif text-lg md:text-xl font-bold shadow-sm">
                ಯ
              </div>
              <div>
                <span className="font-serif font-bold text-lg md:text-xl text-sandstone-50 tracking-tight block leading-tight">
                  AI Yatra
                </span>
                <span className="text-[10px] md:text-xs font-semibold text-gold-light tracking-wide block">
                  ಬಾಗಲಕೋಟೆ ಪರಂಪರೆ • Bagalkote Heritage
                </span>
              </div>
            </div>

            <p className="text-xs text-sandstone-300 max-w-md leading-relaxed hidden sm:block">
              Bridging the monolithic 6th-century rock-cut architecture of the Badami Chalukyas with predictive AI vision intelligence and contextual storytelling.
            </p>

            <div className="flex items-center gap-1.5 text-[11px] text-gold-light">
              <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>Calibrated with ASI historical epigraphy</span>
            </div>
          </div>

          {/* Bagalkote Heritage Circuit */}
          <div>
            <h4 className="font-serif text-xs md:text-sm font-semibold text-sandstone-50 mb-2 md:mb-3 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-terracotta-light shrink-0" />
              Circuit
            </h4>
            <ul className="space-y-1.5 text-[11px] md:text-xs text-sandstone-300">
              <li>
                <button onClick={() => navigateTo('explore')} className="hover:text-gold-light transition-colors text-left line-clamp-1">
                  Badami Caves & Fort
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('explore')} className="hover:text-gold-light transition-colors text-left line-clamp-1">
                  Pattadakal (UNESCO)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('explore')} className="hover:text-gold-light transition-colors text-left line-clamp-1">
                  Aihole Apsidal Complex
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('explore')} className="hover:text-gold-light transition-colors text-left line-clamp-1">
                  Mahakuta Sacred Pool
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('explore')} className="hover:text-gold-light transition-colors text-left line-clamp-1">
                  Kudalasangama
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Platform Navigation */}
          <div>
            <h4 className="font-serif text-xs md:text-sm font-semibold text-sandstone-50 mb-2 md:mb-3 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-terracotta-light shrink-0" />
              Navigation
            </h4>
            <ul className="space-y-1.5 text-[11px] md:text-xs text-sandstone-300">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-gold-light transition-colors text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('scan')} className="hover:text-gold-light transition-colors text-left">
                  Scan Monument
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('explore')} className="hover:text-gold-light transition-colors text-left">
                  Explore Sites
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('ask-ai')} className="hover:text-gold-light transition-colors text-left">
                  Ask AI Guide
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Compact copyright */}
        <div className="pt-3 md:pt-4 border-t border-sandstone-400/20 text-center sm:text-left text-[10px] sm:text-xs text-sandstone-400">
          <p>
            © {new Date().getFullYear()} AI Yatra • Dedicated to the stone craftsmen of Bagalkote, Karnataka.
          </p>
        </div>
      </div>
    </footer>
  );
}
