import React, { useState } from 'react';
import { Camera, Compass, MessageSquareQuote, Sparkles, MapPin, ArrowRight, Award, ShieldCheck, Volume2 } from 'lucide-react';
import { HERITAGE_MONUMENTS, HERITAGE_CATEGORIES } from '../data/heritageData';
import SectionHeader from '../components/common/SectionHeader';
import CategoryChip from '../components/common/CategoryChip';
import HeritageCard from '../components/heritage/HeritageCard';
import Button from '../components/common/Button';
import { getTranslation } from '../data/translations';

export default function HomePage({ navigateTo, onSelectMonument, activeLanguage = 'EN' }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const t = getTranslation(activeLanguage);

  const filteredMonuments = selectedCategory === 'all'
    ? HERITAGE_MONUMENTS
    : HERITAGE_MONUMENTS.filter(m => m.category === selectedCategory);

  const featured = HERITAGE_MONUMENTS.slice(0, 3);

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-canvas-card via-canvas to-canvas pt-8 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-sandstone-300 overflow-hidden">
        {/* Decorative background sun & temple motif */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-umber tracking-tight leading-[1.15]">
            {t.heroTitle}
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-lg text-umber-light max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Core Action Triggers */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              icon={Camera}
              onClick={() => navigateTo('scan')}
              className="w-full sm:w-auto shadow-terracotta-glow"
            >
              {t.scanNow}
            </Button>

            <Button
              variant="secondary"
              size="lg"
              icon={Compass}
              onClick={() => navigateTo('explore')}
              className="w-full sm:w-auto"
            >
              {t.exploreCircuit}
            </Button>
          </div>

          {/* Micro Telemetry / Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-6 max-w-lg mx-auto border-t border-sandstone-300 text-center">
            <div className="p-2">
              <span className="font-serif font-bold text-xl sm:text-2xl text-terracotta block">
                {t.stat1Count}
              </span>
              <span className="text-[11px] text-umber-light font-medium">
                {t.stat1Label}
              </span>
            </div>
            <div className="p-2 border-x border-sandstone-300">
              <span className="font-serif font-bold text-xl sm:text-2xl text-gold-deep block">
                {t.stat2Count}
              </span>
              <span className="text-[11px] text-umber-light font-medium">
                {t.stat2Label}
              </span>
            </div>
            <div className="p-2">
              <span className="font-serif font-bold text-xl sm:text-2xl text-umber block">
                {t.stat3Count}
              </span>
              <span className="text-[11px] text-umber-light font-medium">
                {t.stat3Label}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Quick Access Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Card 1: Instant Scan */}
          <div 
            onClick={() => navigateTo('scan')}
            className="group bg-canvas-card rounded-2xl p-6 border border-sandstone-300 hover:border-terracotta hover:shadow-warm-md transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-terracotta/15 text-terracotta flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-terracotta group-hover:text-white transition-all">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-umber mb-1 group-hover:text-terracotta transition-colors">
              {t.card1Title}
            </h3>
            <p className="text-xs text-umber-light mb-4 leading-relaxed">
              {t.card1Desc}
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-terracotta group-hover:translate-x-1 transition-transform">
              {t.card1Btn} <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 2: Heritage Audio Guide */}
          <div 
            onClick={() => navigateTo('explore')}
            className="group bg-canvas-card rounded-2xl p-6 border border-sandstone-300 hover:border-gold hover:shadow-warm-md transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-gold/20 text-gold-dark flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gold group-hover:text-umber transition-all">
              <Volume2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-umber mb-1 group-hover:text-gold-deep transition-colors">
              {t.card2Title}
            </h3>
            <p className="text-xs text-umber-light mb-4 leading-relaxed">
              {t.card2Desc}
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-gold-dark group-hover:translate-x-1 transition-transform">
              {t.card2Btn} <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 3: Bagalkote Map & Catalog */}
          <div 
            onClick={() => navigateTo('explore')}
            className="group bg-canvas-card rounded-2xl p-6 border border-sandstone-300 hover:border-umber hover:shadow-warm-md transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-umber/15 text-umber flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-umber group-hover:text-white transition-all">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-umber mb-1 group-hover:text-umber transition-colors">
              {t.card3Title}
            </h3>
            <p className="text-xs text-umber-light mb-4 leading-relaxed">
              {t.card3Desc}
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-umber group-hover:translate-x-1 transition-transform">
              {t.card3Btn} <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

        </div>
      </section>

      {/* How AI Yatra Works (3-Step Guide) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-umber text-sandstone-50 rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-xl relative overflow-hidden">
          <div className="max-w-xl mb-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gold-light block mb-1">
              {t.howItWorksEyebrow}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sandstone-50">
              {t.howItWorksTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Step 1 */}
            <div className="bg-sandstone-900/60 rounded-2xl p-5 border border-sandstone-700/80 space-y-3">
              <div className="w-9 h-9 rounded-full bg-terracotta text-white flex items-center justify-center font-bold text-sm shadow-md">
                1
              </div>
              <h4 className="font-serif font-bold text-base text-sandstone-50">
                {t.step1Title}
              </h4>
              <p className="text-xs text-sandstone-300 leading-relaxed">
                {t.step1Desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-sandstone-900/60 rounded-2xl p-5 border border-sandstone-700/80 space-y-3">
              <div className="w-9 h-9 rounded-full bg-gold text-sandstone-950 flex items-center justify-center font-bold text-sm shadow-md">
                2
              </div>
              <h4 className="font-serif font-bold text-base text-sandstone-50">
                {t.step2Title}
              </h4>
              <p className="text-xs text-sandstone-300 leading-relaxed">
                {t.step2Desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-sandstone-900/60 rounded-2xl p-5 border border-sandstone-700/80 space-y-3">
              <div className="w-9 h-9 rounded-full bg-terracotta-dark text-white flex items-center justify-center font-bold text-sm shadow-md">
                3
              </div>
              <h4 className="font-serif font-bold text-base text-sandstone-50">
                {t.step3Title}
              </h4>
              <p className="text-xs text-sandstone-300 leading-relaxed">
                {t.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bagalkote Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t.curatedEyebrow}
          title={t.curatedTitle}
          subtitle={t.curatedSubtitle}
          action={
            <Button
              variant="outline"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigateTo('explore')}
            >
              {t.exploreAll}
            </Button>
          }
        />

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {HERITAGE_CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat.id}
              category={cat}
              isActive={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              count={cat.id === 'all' ? HERITAGE_MONUMENTS.length : HERITAGE_MONUMENTS.filter(m => m.category === cat.id).length}
            />
          ))}
        </div>

        {/* Monuments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMonuments.map((monument) => (
            <HeritageCard
              key={monument.id}
              monument={monument}
              onSelect={onSelectMonument}
              activeLanguage={activeLanguage}
            />
          ))}
        </div>
      </section>

      {/* Historical Epoch Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sandstone-200 rounded-2xl p-6 sm:p-8 border border-sandstone-300 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-widest text-terracotta">
              {t.timelineEyebrow}
            </span>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-umber">
              {t.timelineTitle}
            </h3>
            <p className="text-xs sm:text-sm text-umber-light max-w-xl leading-relaxed">
              {t.timelineDesc}
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => navigateTo('explore')}
            className="shrink-0"
          >
            {t.exploreTimeline}
          </Button>
        </div>
      </section>

    </div>
  );
}
