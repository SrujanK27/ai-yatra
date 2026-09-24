import React from 'react';
import { Camera, Compass, MessageSquareQuote, Sparkles } from 'lucide-react';
import { getTranslation } from '../../data/translations';

export default function Header({ currentRoute, navigateTo, activeLanguage = 'EN', setLanguage }) {
  const t = getTranslation(activeLanguage);

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'scan', label: t.scanHeritage, icon: Camera },
    { id: 'explore', label: t.exploreBagalkote, icon: Compass },
    { id: 'ask-ai', label: t.askAi, icon: MessageSquareQuote },
  ];

  return (
    <header className="sticky top-0 z-40 bg-sandstone-50/95 backdrop-blur-md border-b border-sandstone-300 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Identity */}
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 text-left group focus:outline-none focus:ring-2 focus:ring-terracotta rounded-lg p-1"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-stone overflow-hidden shadow-terracotta-glow transition-all group-hover:scale-105 bg-white border border-sandstone-300">
              <img src="/images/app-icon.png" alt="AI Yatra Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-xl sm:text-2xl text-umber tracking-tight leading-none">
                  AI Yatra
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-gold/20 text-gold-dark border border-gold/40">
                  {t.district}
                </span>
              </div>
              <p className="text-[11px] font-medium text-umber-light tracking-wide hidden sm:block">
                {t.subtitle}
              </p>
            </div>
          </button>

          {/* Desktop & Tablet Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = currentRoute === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`px-3.5 py-2 rounded-stone text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-terracotta text-white shadow-warm-sm font-semibold'
                      : 'text-umber hover:bg-canvas-card hover:text-terracotta'
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-terracotta'}`} />}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Language toggle & Scan Shortcut */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-canvas-card p-0.5 rounded-stone border border-sandstone-400/60 text-xs font-semibold">
              <button
                onClick={() => setLanguage && setLanguage('EN')}
                className={`px-2.5 py-1 rounded-sm transition-all ${
                  activeLanguage === 'EN'
                    ? 'bg-umber text-white shadow-sm'
                    : 'text-umber hover:text-terracotta'
                }`}
                aria-label="English Language"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage && setLanguage('KN')}
                className={`px-2.5 py-1 rounded-sm transition-all font-sans ${
                  activeLanguage === 'KN'
                    ? 'bg-umber text-white shadow-sm'
                    : 'text-umber hover:text-terracotta'
                }`}
                aria-label="Kannada Language"
              >
                ಕನ್ನಡ
              </button>
            </div>

            {/* Quick Scan Action */}
            <button
              onClick={() => navigateTo('scan')}
              className="hidden sm:inline-flex items-center gap-2 bg-umber hover:bg-umber-dark text-white px-4 py-2 rounded-stone text-sm font-medium border border-gold/40 shadow-ai-bloom transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-gold-light" />
              <span>{t.scanMonument}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
