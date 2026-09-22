import React from 'react';
import { Home, Camera, Compass, MessageSquareQuote, Sparkles } from 'lucide-react';

export default function MobileNav({ currentRoute, navigateTo }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'scan', label: 'Scan', icon: Camera, isCenter: true },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'ask-ai', label: 'Ask AI', icon: MessageSquareQuote },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-1 pointer-events-none">
      <nav className="pointer-events-auto max-w-md mx-auto bg-umber/95 backdrop-blur-md rounded-2xl border border-sandstone-400/30 shadow-2xl px-2 py-1.5 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = currentRoute === tab.id;
          const Icon = tab.icon;

          if (tab.isCenter) {
            return (
              <button
                key={tab.id}
                onClick={() => navigateTo(tab.id)}
                className="relative -top-3 flex flex-col items-center group focus:outline-none"
                aria-label="Scan Heritage Monument"
              >
                <div className={`w-13 h-13 p-3 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                  isActive 
                    ? 'bg-terracotta text-white ring-4 ring-gold/40 shadow-ai-bloom scale-105' 
                    : 'bg-terracotta text-white hover:bg-terracotta-deep ring-2 ring-umber'
                }`}>
                  <Camera className="w-6 h-6" />
                </div>
                <span className={`text-[10px] font-semibold mt-0.5 tracking-tight ${
                  isActive ? 'text-gold-light' : 'text-sandstone-300'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => navigateTo(tab.id)}
              className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all focus:outline-none ${
                isActive 
                  ? 'text-gold-light font-semibold' 
                  : 'text-sandstone-300 hover:text-sandstone-100'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-gold-light' : 'text-sandstone-300'}`} />
                {tab.id === 'ask-ai' && (
                  <span className="absolute -top-1 -right-1.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
