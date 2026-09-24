import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, RotateCcw, Volume2, Sparkles, FileText } from 'lucide-react';

/**
 * Phonetically polish and format historical text for maximum clarity and simple, natural English narration.
 */
function polishTextForSpeech(text, isKn) {
  if (!text) return '';
  if (isKn) {
    return text
      .replace(/\s+/g, ' ')
      .trim();
  }

  return text
    // Simplify dates into natural conversational phrasing
    .replace(/\b(\d+)\s*CE\b/gi, 'in the year $1')
    .replace(/\b(\d+)\s*BCE\b/gi, '$1 Before Common Era')
    .replace(/\b(\d+)(st|nd|rd|th)\s*c\.\s*CE\b/gi, '$1$2 century')
    .replace(/\b(\d+)(st|nd|rd|th)\s*century\s*CE\b/gi, '$1$2 century')
    .replace(/\bc\.\s*(\d+)/gi, 'around $1')
    .replace(/\bca\.\s*(\d+)/gi, 'around $1')
    // Measurements
    .replace(/\b(sq\.?\s*ft|sqft)\b/gi, 'square feet')
    .replace(/\b(sq\.?\s*m|sqm)\b/gi, 'square meters')
    .replace(/\b(\d+)\s*km\b/gi, '$1 kilometers')
    .replace(/\b(\d+)\s*m\b/gi, '$1 meters')
    .replace(/\b(\d+)\s*ft\b/gi, '$1 feet')
    .replace(/\bASI\b/g, 'Archaeological Survey of India')
    // Turn parenthetical notes into smooth natural pauses
    .replace(/\(([^)]+)\)/g, ', $1, ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function AudioPlayer({ 
  audioGuide, 
  monumentName, 
  overviewText = '', 
  didYouKnowList = [], 
  activeLanguage = 'EN' 
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [currentTime, setCurrentTime] = useState(0); // in seconds
  const [totalDuration, setTotalDuration] = useState(0); // in seconds
  const [showTranscript, setShowTranscript] = useState(false);
  const [voices, setVoices] = useState([]);

  const isKn = activeLanguage === 'KN';
  const audioRef = useRef(null);
  const chunkIndexRef = useRef(0);
  const timerRef = useRef(null);
  const isCancelledRef = useRef(false);
  const utteranceRef = useRef(null);

  // Construct pure, rich narration text (Overview + Did You Know)
  const introPart = monumentName ? `${monumentName}. ` : '';
  const overviewPart = overviewText ? `${overviewText} ` : '';
  const dykLabel = isKn ? 'ವಿಶೇಷ ಐತಿಹಾಸಿಕ ಮಾಹಿತಿ: ' : 'Did you know? ';
  const dykPart = (didYouKnowList && didYouKnowList.length > 0)
    ? `${dykLabel}${didYouKnowList.join('. ')}`
    : '';

  const rawNarrationText = `${introPart}${overviewPart}${dykPart}`.trim();
  const speechText = useMemo(() => polishTextForSpeech(rawNarrationText, isKn), [rawNarrationText, isKn]);

  // Split narration text into small sentences/chunks for streaming TTS (< 150 chars each)
  const audioChunks = useMemo(() => {
    if (!speechText) return [];

    const rawSentences = speechText.split(/(?<=[.?!।\n])\s+/);
    const chunks = [];
    let currentChunk = '';

    for (const s of rawSentences) {
      if ((currentChunk + ' ' + s).trim().length <= 140) {
        currentChunk = (currentChunk + ' ' + s).trim();
      } else {
        if (currentChunk) chunks.push(currentChunk);
        if (s.length > 140) {
          const words = s.split(' ');
          let temp = '';
          for (const w of words) {
            if ((temp + ' ' + w).trim().length <= 140) {
              temp = (temp + ' ' + w).trim();
            } else {
              if (temp) chunks.push(temp);
              temp = w;
            }
          }
          if (temp) currentChunk = temp;
          else currentChunk = '';
        } else {
          currentChunk = s;
        }
      }
    }
    if (currentChunk) chunks.push(currentChunk);
    return chunks.filter(c => c.trim().length > 0);
  }, [speechText]);

  // Load available system voices (for offline fallback)
  useEffect(() => {
    const updateVoices = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        setVoices(window.speechSynthesis.getVoices());
      }
    };

    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      stopAllAudio();
    };
  }, []);

  // Estimate total duration based on text length and language
  useEffect(() => {
    if (!speechText) {
      setTotalDuration(0);
      return;
    }
    const words = speechText.trim().split(/\s+/).length;
    // Clear, comfortable Indian broadcast pace ~130 wpm (2.1 wps), Kannada ~85 wpm (1.4 wps)
    const wordsPerSec = isKn ? 1.4 : 2.1;
    const estimated = Math.max(6, Math.round(words / wordsPerSec));
    setTotalDuration(estimated);
  }, [speechText, isKn]);

  // Stop everything when text or language changes
  useEffect(() => {
    stopAllAudio();
  }, [speechText, activeLanguage]);

  const stopAllAudio = () => {
    isCancelledRef.current = true;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.ontimeupdate = null;
      audioRef.current.src = '';
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    setCurrentTime(0);
    chunkIndexRef.current = 0;
  };

  // Select an authentic, deep, articulate Male voice for offline English fallback
  const selectMaleEnglishVoice = () => {
    if (!voices || voices.length === 0) return null;

    // 1. Indian English Male Natural voices (Microsoft Prabhat Online Natural)
    const prabhat = voices.find(v => 
      v.name.toLowerCase().includes('prabhat') || 
      (v.lang === 'en-IN' && v.name.toLowerCase().includes('male'))
    );
    if (prabhat) return prabhat;

    // 2. Microsoft Ravi (Indian English Male)
    const ravi = voices.find(v => 
      v.name.toLowerCase().includes('ravi') || 
      (v.lang === 'en-IN' && !v.name.toLowerCase().includes('heera') && !v.name.toLowerCase().includes('neerja'))
    );
    if (ravi) return ravi;

    // 3. Clear Male voices (Google Male, Guy, Ryan, Daniel, George, David)
    const knownMale = voices.find(v => 
      v.lang.startsWith('en') && (
        v.name.toLowerCase().includes('male') || 
        v.name.toLowerCase().includes('guy') || 
        v.name.toLowerCase().includes('ryan') || 
        v.name.toLowerCase().includes('daniel') || 
        v.name.toLowerCase().includes('george') || 
        v.name.toLowerCase().includes('david') || 
        v.name.toLowerCase().includes('arthur') || 
        v.name.toLowerCase().includes('oliver')
      )
    );
    if (knownMale) return knownMale;

    // 4. Any English voice that is not explicitly female
    const nonFemale = voices.find(v => 
      v.lang.startsWith('en') && 
      !['neerja', 'heera', 'sonia', 'libby', 'aria', 'jenny', 'samantha', 'zira', 'female', 'karen', 'victoria', 'moira'].some(f => v.name.toLowerCase().includes(f))
    );
    return nonFemale || voices[0];
  };

  // Monotonically advance progress (never jump backwards during playback)
  const setMonotonicProgress = (pct) => {
    setProgress((prev) => {
      const target = Math.min(99, Math.max(0, Math.round(pct)));
      return Math.max(prev, target);
    });
  };

  // High-definition audio playback engine (Simple clear Male voice for English, native streaming for Kannada)
  const playStreamChunk = (chunkIndex) => {
    if (isCancelledRef.current) return;

    if (chunkIndex >= audioChunks.length) {
      // Completed all narration chunks
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      setCurrentTime(totalDuration);
      chunkIndexRef.current = 0;
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    chunkIndexRef.current = chunkIndex;
    const chunkText = audioChunks[chunkIndex];
    const targetLang = isKn ? 'kn' : 'en-IN';
    const ttsUrl = `/api/tts?lang=${targetLang}&text=${encodeURIComponent(chunkText)}`;

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;
    audio.src = ttsUrl;

    audio.ontimeupdate = () => {
      if (audio.duration && audioChunks.length > 0) {
        const chunkBase = (chunkIndex / audioChunks.length) * 100;
        const chunkPiece = (audio.currentTime / audio.duration) * (100 / audioChunks.length);
        setMonotonicProgress(chunkBase + chunkPiece);
      }
    };

    audio.onended = () => {
      if (!isCancelledRef.current) {
        playStreamChunk(chunkIndex + 1);
      }
    };

    audio.onerror = (e) => {
      console.warn('Audio stream error on chunk, advancing or falling back:', e);
      if (!isCancelledRef.current) {
        if (chunkIndex + 1 < audioChunks.length) {
          playStreamChunk(chunkIndex + 1);
        } else {
          fallbackToSpeechSynthesis();
        }
      }
    };

    audio.play().then(() => {
      if (!isCancelledRef.current) {
        setIsPlaying(true);
        setIsPaused(false);
      }
    }).catch(err => {
      console.warn('Audio play prevented or failed, falling back to speech synthesis:', err);
      fallbackToSpeechSynthesis();
    });
  };

  // Web SpeechSynthesis with deep, clear Male voice & cadence
  const fallbackToSpeechSynthesis = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    isCancelledRef.current = false;

    const utterance = new SpeechSynthesisUtterance(speechText);
    utteranceRef.current = utterance;

    if (isKn) {
      const kn = voices.find(v => v.lang.startsWith('kn') || v.name.toLowerCase().includes('kannada'));
      if (kn) utterance.voice = kn;
      utterance.lang = 'kn-IN';
      utterance.pitch = 1.0;
      utterance.rate = 0.95;
    } else {
      // Dedicated Indian English Male Voice
      const maleVoice = selectMaleEnglishVoice();
      if (maleVoice) utterance.voice = maleVoice;
      utterance.lang = maleVoice?.lang || 'en-IN';
      // Warm, deep, authoritative documentary male pitch & pace
      utterance.pitch = 0.92;
      utterance.rate = 0.93;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    // Smooth monotonic forward progress tracking on every spoken word boundary
    utterance.onboundary = (event) => {
      if (typeof event.charIndex === 'number' && speechText.length > 0) {
        const charPct = (event.charIndex / speechText.length) * 100;
        setMonotonicProgress(charPct);
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      setCurrentTime(totalDuration);
      if (timerRef.current) clearInterval(timerRef.current);
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis utterance error:', e);
      setIsPlaying(false);
      setIsPaused(false);
      if (timerRef.current) clearInterval(timerRef.current);
    };

    window.speechSynthesis.speak(utterance);
  };

  const startPlayback = () => {
    if (!speechText || audioChunks.length === 0) return;
    isCancelledRef.current = false;

    chunkIndexRef.current = 0;
    setCurrentTime(0);
    setProgress(0);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 1;
        // Smoothly guide time progress forward (never backward)
        const timeRatio = (next / Math.max(1, totalDuration)) * 98;
        setMonotonicProgress(timeRatio);
        return Math.min(totalDuration, next);
      });
    }, 1000);

    playStreamChunk(0);
  };

  const togglePlay = () => {
    if (audioRef.current && audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setIsPaused(true);
        if (timerRef.current) clearInterval(timerRef.current);
      } else if (isPaused) {
        audioRef.current.play();
        setIsPlaying(true);
        setIsPaused(false);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          setCurrentTime(prev => prev + 1);
        }, 1000);
      } else {
        startPlayback();
      }
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
        setIsPaused(false);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          setCurrentTime(prev => prev + 1);
        }, 1000);
      } else {
        window.speechSynthesis.pause();
        setIsPlaying(false);
        setIsPaused(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }
      return;
    }

    startPlayback();
  };

  const resetAudio = () => {
    stopAllAudio();
  };

  const formatTime = (seconds) => {
    const s = Math.max(0, Math.floor(seconds));
    const mins = Math.floor(s / 60);
    const rem = s % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const currentTitle = isKn 
    ? (audioGuide?.kannadaTitle || audioGuide?.titleKannada || (audioGuide?.title && /[\u0C80-\u0CFF]/.test(audioGuide.title) ? audioGuide.title : null) || monumentName || 'ಧ್ವನಿ ವಿವರಣೆ') 
    : (audioGuide?.titleEnglish || audioGuide?.title || monumentName || 'Official Audio Guide');

  return (
    <div className={`bg-umber text-sandstone-50 rounded-2xl p-4 sm:p-5 border border-gold/40 shadow-xl relative overflow-hidden ${isKn ? 'font-kannada' : ''}`}>
      {/* Decorative sandstone glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gold/15 rounded-full blur-2xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-start justify-between gap-3 mb-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold border border-gold/40 shrink-0">
            <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse text-gold-light' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold tracking-wider uppercase text-gold-light">
                {isKn ? 'ಅಧಿಕೃತ ಧ್ವನಿ ವಿವರಣೆ (Overview & Did You Know)' : 'Official Audio Guide (Overview & Did You Know)'}
              </span>
              <span className="text-[10px] text-sandstone-400 font-sans">
                • {isKn ? 'ಕನ್ನಡ ಧ್ವನಿ' : 'Indian English'}
              </span>
            </div>
            <h4 className={`${isKn ? 'font-kannada-serif text-base font-bold' : 'font-serif font-bold text-sm sm:text-base'} text-sandstone-50 leading-tight line-clamp-1`}>
              {currentTitle}
            </h4>
          </div>
        </div>

        {/* Transcript Drawer Toggle Button */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className={`p-2 rounded-md text-xs transition-all flex items-center gap-1.5 ${
              showTranscript 
                ? 'bg-gold text-umber font-bold shadow-xs' 
                : 'bg-sandstone-800/90 text-sandstone-300 hover:text-white border border-sandstone-700'
            }`}
            title={isKn ? "ಧ್ವನಿ ಪ್ರತಿ ವೀಕ್ಷಿಸಿ" : "View Audio Guide Transcript"}
          >
            <FileText className="w-4 h-4" />
            <span className="text-[11px] hidden sm:inline font-medium">
              {showTranscript ? (isKn ? 'ಪ್ರತಿ ಮುಚ್ಚಿ' : 'Hide Script') : (isKn ? 'ಪ್ರತಿ ನೋಡಿ' : 'Transcript')}
            </span>
          </button>
        </div>
      </div>

      {/* Scrubber / Progress Bar (without numeric percentage) */}
      <div className="space-y-1.5 relative z-10 mb-3.5">
        <div className="h-2 bg-sandstone-800 rounded-full relative overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-terracotta via-amber-500 to-gold transition-all duration-300 rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-gold rounded-full shadow" />
          </div>
        </div>
        <div className="flex justify-between items-center text-[10px] text-sandstone-300 font-mono">
          <span className="flex items-center gap-1">
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-sandstone-500'}`} />
            <span>
              {isPlaying 
                ? (isKn ? 'ಧ್ವನಿ ಪ್ರಸಾರವಾಗುತ್ತಿದೆ...' : 'Narrating aloud...') 
                : isPaused
                ? (isKn ? 'ವಿರಾಮದಲ್ಲಿದೆ' : 'Paused')
                : (progress >= 100 ? (isKn ? 'ಪೂರ್ಣಗೊಂಡಿದೆ' : 'Completed') : (isKn ? 'ಸಿದ್ಧವಾಗಿದೆ' : 'Ready'))}
            </span>
          </span>
          <span className="font-semibold text-sandstone-200 tracking-wider">
            {formatTime(currentTime)} / {formatTime(totalDuration)}
          </span>
        </div>
      </div>

      {/* Main Controls Bar */}
      <div className="flex items-center justify-between relative z-10 pt-1">
        <div className="text-[11px] text-sandstone-300 flex items-center gap-2 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span className="text-sandstone-300">
            {isKn ? 'ಪಾರಂಪರಿಕ ಧ್ವನಿ ವಿವರಣೆ' : 'Heritage Audio Narration'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetAudio}
            className="p-2 rounded-full hover:bg-sandstone-800 text-sandstone-300 hover:text-white transition-colors"
            title={isKn ? "ಮರುಪ್ರಾರಂಭಿಸಿ" : "Restart Audio"}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={togglePlay}
            className="px-4 py-1.5 rounded-full bg-terracotta hover:bg-terracotta-deep text-white font-semibold text-xs flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>{isKn ? 'ವಿರಾಮ' : 'Pause'}</span>
              </>
            ) : isPaused ? (
              <>
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                <span>{isKn ? 'ಮುಂದುವರಿಸಿ' : 'Resume'}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                <span>{isKn ? 'ಧ್ವನಿ ಆಲಿಸಿ' : 'Listen Audio'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Transcript Drawer / Collapsible */}
      {showTranscript && (
        <div className="mt-4 pt-3 border-t border-sandstone-700/80 relative z-10 text-xs text-sandstone-200 leading-relaxed bg-sandstone-900/80 p-3.5 rounded-xl space-y-2">
          <div className="flex items-center justify-between pb-1 border-b border-sandstone-700/50">
            <span className="font-bold text-gold-light text-[11px]">
              {isKn ? 'ಧ್ವನಿ ವಿವರಣೆಯ ಪೂರ್ಣ ಪ್ರತಿ (Overview + Did You Know)' : 'Full Audio Transcript (Overview + Did You Know)'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-sandstone-800 text-sandstone-300 font-mono">
              {isKn ? 'ಕನ್ನಡ' : 'English'}
            </span>
          </div>
          <p className="text-sandstone-200 leading-relaxed">
            {rawNarrationText}
          </p>
        </div>
      )}
    </div>
  );
}



