import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileNav from './components/layout/MobileNav';
import HomePage from './pages/HomePage';
import ScanPage from './pages/ScanPage';
import ResultPage from './pages/ResultPage';
import ExplorePage from './pages/ExplorePage';
import { HERITAGE_MONUMENTS } from './data/heritageData';

export default function App() {
  // Navigation State with persistent Session Storage
  const [currentRoute, setCurrentRoute] = useState(() => {
    return sessionStorage.getItem('ai_yatra_route') || 'home';
  });

  const [selectedMonument, setSelectedMonument] = useState(() => {
    const savedId = sessionStorage.getItem('ai_yatra_monument_id');
    if (savedId) {
      const found = HERITAGE_MONUMENTS.find(m => m.id === savedId);
      if (found) return found;
    }
    return HERITAGE_MONUMENTS[0];
  });

  const [scanVerification, setScanVerification] = useState(() => {
    try {
      const saved = sessionStorage.getItem('ai_yatra_verification');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [scannedImage, setScannedImage] = useState(() => {
    return sessionStorage.getItem('ai_yatra_scanned_img') || null;
  });

  const [activeLanguage, setActiveLanguage] = useState(() => {
    return localStorage.getItem('ai_yatra_lang') || 'EN';
  });

  // Keep Session Storage synchronized on every state change
  useEffect(() => {
    sessionStorage.setItem('ai_yatra_route', currentRoute);
  }, [currentRoute]);

  useEffect(() => {
    if (selectedMonument?.id) {
      sessionStorage.setItem('ai_yatra_monument_id', selectedMonument.id);
    }
  }, [selectedMonument]);

  useEffect(() => {
    if (scanVerification) {
      try {
        sessionStorage.setItem('ai_yatra_verification', JSON.stringify(scanVerification));
      } catch (e) {}
    } else {
      sessionStorage.removeItem('ai_yatra_verification');
    }
  }, [scanVerification]);

  useEffect(() => {
    if (scannedImage) {
      try {
        sessionStorage.setItem('ai_yatra_scanned_img', scannedImage);
      } catch (e) {}
    } else {
      sessionStorage.removeItem('ai_yatra_scanned_img');
    }
  }, [scannedImage]);

  useEffect(() => {
    localStorage.setItem('ai_yatra_lang', activeLanguage);
  }, [activeLanguage]);

  // Handle browser & mobile hardware back button
  useEffect(() => {
    const initRoute = sessionStorage.getItem('ai_yatra_route') || 'home';
    window.history.replaceState({ route: initRoute }, '', '');

    const handlePopState = (event) => {
      if (event.state && event.state.route) {
        setCurrentRoute(event.state.route);
      } else {
        const stored = sessionStorage.getItem('ai_yatra_route');
        setCurrentRoute(stored || 'home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation handlers
  const navigateTo = (route) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (route !== currentRoute) {
      window.history.pushState({ route }, '', '');
      setCurrentRoute(route);
    }
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

  // Called when clicking a nearby attraction
  const handleSelectNearby = (att) => {
    const monumentId = typeof att === 'string' ? att : att.id;
    const attName = typeof att === 'object' ? att.name : monumentId;

    const target = HERITAGE_MONUMENTS.find(
      m => m.id === monumentId || m.name.toLowerCase().includes(monumentId.toLowerCase())
    );
    if (target) {
      setSelectedMonument(target);
      setScanVerification(null);
      setScannedImage(null);
      navigateTo('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Fallback: Open Google Maps search in new tab
      const query = encodeURIComponent(`${attName}, Bagalkote, Karnataka`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
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
            activeLanguage={activeLanguage}
          />
        )}

        {currentRoute === 'scan' && (
          <ScanPage
            navigateTo={navigateTo}
            onScanSuccess={handleScanSuccess}
            activeLanguage={activeLanguage}
          />
        )}

        {currentRoute === 'result' && (
          <ResultPage
            monument={selectedMonument}
            aiVerification={scanVerification}
            scannedImage={scannedImage}
            navigateTo={navigateTo}
            onSelectNearby={handleSelectNearby}
            activeLanguage={activeLanguage}
          />
        )}

        {currentRoute === 'explore' && (
          <ExplorePage
            navigateTo={navigateTo}
            onSelectMonument={handleSelectMonument}
            activeLanguage={activeLanguage}
          />
        )}
      </main>

      {/* Persistent Global Stitch Footer - Hidden on Scan page */}
      {currentRoute !== 'scan' && (
        <Footer navigateTo={navigateTo} activeLanguage={activeLanguage} />
      )}

      {/* Mobile Sticky Bottom Navigation Bar */}
      <MobileNav
        currentRoute={currentRoute}
        navigateTo={navigateTo}
        activeLanguage={activeLanguage}
      />

    </div>
  );
}

