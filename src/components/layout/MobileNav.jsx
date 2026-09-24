import React from 'react';
import { Home, Camera, Compass, MessageSquareQuote } from 'lucide-react';
import { getTranslation } from '../../data/translations';

export default function MobileNav({ currentRoute, navigateTo, activeLanguage = 'EN' }) {
  const t = getTranslation(activeLanguage);

  const tabs = [
    { id: 'home', label: t.mobileHome, icon: Home },
    { id: 'scan', label: t.mobileScan, icon: Camera },
    { id: 'explore', label: t.mobileExplore, icon: Compass },
    { id: 'ask-ai', label: t.mobileAskAi, icon: MessageSquareQuote },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-1 pointer-events-none">
      <nav className="pointer-events-auto max-w-md mx-auto bg-umber/95 backdrop-blur-md rounded-2xl border border-sandstone-400/30 shadow-2xl px-2 py-2 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = currentRoute === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => navigateTo(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all focus:outline-none ${
                isActive 
                  ? 'text-gold-light font-bold' 
                  : 'text-sandstone-300 hover:text-sandstone-100'
              }`}
              aria-label={tab.label}
            >
              <div className="relative flex items-center justify-center">
                <div className={`p-1 rounded-lg transition-all ${
                  isActive ? 'bg-terracotta/30 text-gold-light' : ''
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-gold-light' : 'text-sandstone-300'}`} />
                </div>
                {tab.id === 'ask-ai' && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-0.5 tracking-tight ${
                isActive ? 'text-gold-light font-bold' : 'text-sandstone-300'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

