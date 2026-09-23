import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileNav from './components/layout/MobileNav';
import HomePage from './pages/HomePage';
import ScanPage from './pages/ScanPage';
import ResultPage from './pages/ResultPage';
import AskAiPage from './pages/AskAiPage';
import ExplorePage from './pages/ExplorePage';
import { HERITAGE_MONUMENTS } from './data/heritageData';

export default function App() {
  // Navigation State
  const [currentRoute, setCurrentRoute] = useState('home'); // 'home' | 'scan' | 'result' | 'ask-ai' | 'explore'
  const [selectedMonument, setSelectedMonument] = useState(HERITAGE_MONUMENTS[0]);
  const [scanVerification, setScanVerification] = useState(null);
  const [scannedImage, setScannedImage] = useState(null);
  const [activeLanguage, setActiveLanguage] = useState('EN');

  // Navigation handlers
  const navigateTo = (route) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentRoute(route);
  };

  // Called when AI Scan completes successfully
  const handleScanSuccess = (scanResult) => {
    setSelectedMonument(scanResult.monument);
    setScanVerification(scanResult.aiVerification || null);
    setScannedImage(scanResult.scannedImage || null);
    navigateTo('result');
  };

  // Called when user selects a monument card anywhere
  const handleSelectMonument = (monument) => {
    setSelectedMonument(monument);
    setScanVerification(null);
    setScannedImage(null);
    navigateTo('result');
  };

  // Called when user clicks "Ask AI about this monument"
  const handleAskAiWithMonument = (monument) => {
    setSelectedMonument(monument);
    navigateTo('ask-ai');
  };

  // Called when clicking a nearby attraction
  const handleSelectNearby = (monumentId) => {
    const target = HERITAGE_MONUMENTS.find(m => m.id === monumentId);
    if (target) {
      setSelectedMonument(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-basalt antialiased selection:bg-terracotta/20 selection:text-terracotta-dark">
      
      {/* Top Header */}
      <Header
        currentRoute={currentRoute}
        navigateTo={navigateTo}
        activeLanguage={activeLanguage}
        setLanguage={setActiveLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomePage
            navigateTo={navigateTo}
            onSelectMonument={handleSelectMonument}
          />
        )}

        {currentRoute === 'scan' && (
          <ScanPage
            navigateTo={navigateTo}
            onScanSuccess={handleScanSuccess}
          />
        )}

        {currentRoute === 'result' && (
          <ResultPage
            monument={selectedMonument}
            aiVerification={scanVerification}
            scannedImage={scannedImage}
            navigateTo={navigateTo}
            onAskAiWithMonument={handleAskAiWithMonument}
            onSelectNearby={handleSelectNearby}
          />
        )}

        {currentRoute === 'ask-ai' && (
          <AskAiPage
            initialMonument={selectedMonument}
            navigateTo={navigateTo}
          />
        )}

        {currentRoute === 'explore' && (
          <ExplorePage
            navigateTo={navigateTo}
            onSelectMonument={handleSelectMonument}
          />
        )}
      </main>

      {/* Persistent Global Stitch Footer */}
      <Footer navigateTo={navigateTo} />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <MobileNav
        currentRoute={currentRoute}
        navigateTo={navigateTo}
      />

    </div>
  );
}
