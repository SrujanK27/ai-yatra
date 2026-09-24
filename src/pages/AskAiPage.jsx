import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Sparkles, 
  MessageSquareQuote, 
  MapPin, 
  RotateCcw, 
  Compass, 
  ChevronDown,
  Volume2,
  HelpCircle,
  Landmark,
  ArrowLeft
} from 'lucide-react';
import ChatMessage from '../components/chat/ChatMessage';
import SuggestionPills from '../components/chat/SuggestionPills';
import { HERITAGE_MONUMENTS } from '../data/heritageData';
import { getTranslation } from '../data/translations';

export default function AskAiPage({ initialMonument, navigateTo, activeLanguage = 'EN' }) {
  // Current active monument context
  const [activeMonument, setActiveMonument] = useState(initialMonument || HERITAGE_MONUMENTS[0]);
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const t = getTranslation(activeLanguage);
  const isKn = activeLanguage === 'KN';

  // Auto scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // When active monument changes, reset greeting message tailored to that site
  useEffect(() => {
    const greetingText = isKn 
      ? `ನಮಸ್ಕಾರ! ನಾನು ${activeMonument.kannadaName || activeMonument.name} ಬಗ್ಗೆ ವಿಶೇಷಜ್ಞತೆ ಹೊಂದಿರುವ AI ಇತಿಹಾಸ ಮಾರ್ಗದರ್ಶಿ. ೬ನೇ ಶತಮಾನದ ಬಾದಾಮಿ ಚಾಳುಕ್ಯರ ಶಿಲ್ಪಕಲೆ, ಶಾಸನಗಳು ಹಾಗೂ ಇತಿಹಾಸದ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ.`
      : `Namaskara! I am your AI Heritage Guide specialized in ${activeMonument.name}. Ask me about its 6th-century rock-cut architecture, royal Chalukyan patrons, Sanskrit/Kannada epigraphs, or visiting logistics in Bagalkote.`;

    const greeting = {
      id: 'greeting',
      sender: 'ai',
      monumentContext: isKn ? (activeMonument.kannadaName || activeMonument.name) : activeMonument.name,
      timestamp: isKn ? 'ಈಗಷ್ಟೇ' : 'Just now',
      text: greetingText,
      keyPoints: [
        `${isKn ? 'ವಾಸ್ತು ಶೈಲಿ' : 'Architectural style'}: ${activeMonument.architecturalStyle}`,
        `${isKn ? 'ಐತಿಹಾಸಿಕ ಕಾಲ' : 'Historic era'}: ${activeMonument.period}`,
        `${isKn ? 'ಸ್ಥಳ' : 'Location'}: ${activeMonument.location}`
      ]
    };
    setMessages([greeting]);
  }, [activeMonument, activeLanguage]);

  // Contextual question suggestions based on active monument
  const getSuggestions = () => {
    if (activeMonument.id === 'badami-cave-1') {
      return [
        'Explain the 18 arms and 81 dance mudras of Nataraja in Cave 1',
        'How did artisans excavate these caverns without mortar?',
        'What is the meaning of the coiled Nagaraja ceiling carving?',
        'Who was King Mangalesha?'
      ];
    } else if (activeMonument.id === 'badami-cave-2') {
      return [
        'Describe the cosmic stride of Vishnu Trivikrama in Cave 2',
        'What is the significance of the Varaha rescue panel?',
        'What ceiling motifs and ganas are carved here?'
      ];
    } else if (activeMonument.id === 'badami-cave-3') {
      return [
        'What does the 578 CE Mangalesha foundation inscription say?',
        'Explain the seated Maha Vishnu on Adisesha carving',
        'Why is Cave 3 considered the masterpiece of Badami?'
      ];
    } else if (activeMonument.id === 'badami-cave-4') {
      return [
        'Who are the Jain Tirthankaras carved inside Cave 4?',
        'Explain the figure of Bahubali with entwining creepers',
        'What does Cave 4 tell us about Chalukya religious harmony?'
      ];
    } else if (activeMonument.id === 'badami-caves-general') {
      return [
        'Give me an overview of all 4 Badami rock-cut caves',
        'What is the historical significance of ancient Vatapi?',
        'What is the best route and time of day to visit the caves?'
      ];
    } else if (activeMonument.id === 'pattadakal-virupaksha') {
      return [
        'Why was Pattadakal chosen for Chalukya royal coronations?',
        'How did Queen Lokamahadevi influence the Kailasa temple at Ellora?',
        'What Ramayana episodes are carved on the mandapa pillars?',
        'Who was master architect Gunda Anivaritachari?'
      ];
    } else if (activeMonument.id === 'aihole-durga-temple') {
      return [
        'Why is the Durga temple shaped like an elephant back (apsidal)?',
        'Who were the 500 Lords of Ayyavole merchant guild?',
        'Why is Aihole called the cradle of Indian temple architecture?'
      ];
    } else {
      return [
        `Tell me the origin and significance of ${activeMonument.name}`,
        `What architectural features are unique to this monument?`,
        `How far is this from Badami town?`
      ];
    }
  };

  // Mock AI response generator matching site-specific context
  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate AI thinking and generating detailed site response
    setTimeout(() => {
      let responseText = '';
      let keyPoints = null;
      let epigraphCite = null;

      const lowerQ = query.toLowerCase();

      if (lowerQ.includes('nataraja') || lowerQ.includes('18 arms') || lowerQ.includes('mudra')) {
        responseText = `The 18-armed Shiva Nataraja relief at Badami Cave 1 is an extraordinary sculptural treatise on the Natya Shastra. Rather than depicting random arms, the artisans arranged them in geometric axes such that any combination of adjacent arms represents one of the 81 recognized classical dance postures (karanas).`;
        keyPoints = [
          'Right hands hold damaru, trishula, parashu, and mudras of creation.',
          'Left hands hold Agni flame, snake, and abhayamudra of protection.',
          'Flanked by a percussionist, Ganesha, and a recumbent Nandi.'
        ];
        epigraphCite = 'ಶ್ರೀ ವಲ್ಲಭ ದುರ್ಗ ವಿಜಯಾಂಕಿತ — Inscription of early Chalukyan Shaiva artisans.';
      } else if (lowerQ.includes('kailasa') || lowerQ.includes('ellora') || lowerQ.includes('queen') || lowerQ.includes('lokamahadevi')) {
        responseText = `Queen Lokamahadevi built the Virupaksha Temple at Pattadakal in 740 CE to celebrate King Vikramaditya II's three victories over the Pallavas of Kanchi. The design brought master sculptors from Kanchipuram. Decades later, Rashtrakuta King Krishna I was so inspired by this monumental layout that he copied its exact dimensions to chisel the rock-cut Kailasa Temple at Ellora (Cave 16).`;
        keyPoints = [
          'Pattadakal Virupaksha served as the architectural archetype for Ellora Kailasa.',
          'Features inscriptions acknowledging Tribhuvanachari (master architect).',
          'Designated UNESCO World Heritage Site in 1987.'
        ];
      } else if (lowerQ.includes('apsidal') || lowerQ.includes('elephant') || lowerQ.includes('cradle') || lowerQ.includes('durga')) {
        responseText = `Aihole is universally known as the 'Cradle of Temple Architecture' because between the 5th and 8th centuries CE, artisan guilds experimented with diverse plans. The Durga Temple features a rare Gajaprishta (elephant back / apsidal) sanctum, adapting Buddhist chaitya forms into Hindu temple architecture.`;
        keyPoints = [
          'Peristyle colonnade provides 360-degree shaded ambulatory path.',
          'Originally dedicated to Surya before being used as a medieval fortress (Durg).'
        ];
      } else {
        responseText = `Regarding ${activeMonument.name}: Built under the patronage of the Chalukya dynasty, this monument showcases quintessential ${activeMonument.architecturalStyle} stone craftsmanship. The red sandstone of the Malaprabha basin allowed artists to achieve deeply undercut reliefs and durable columned halls that have survived over 1,400 years.`;
        keyPoints = [
          `Patrons: ${activeMonument.builder}`,
          `Historical Period: ${activeMonument.period}`,
          `Key Feature: ${activeMonument.architecture.overview}`
        ];
        if (activeMonument.epigraphs?.[0]) {
          epigraphCite = activeMonument.epigraphs[0].translation;
        }
      }

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        monumentContext: activeMonument.name,
        text: responseText,
        keyPoints,
        epigraphCite,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 pb-20">
      
      {/* Top Header / Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-umber hover:text-terracotta transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToHome}</span>
        </button>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-terracotta/10 text-terracotta border border-terracotta/30 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-terracotta" />
          {t.interactiveBadge}
        </span>
      </div>

      {/* Contextual Monument Header */}
      <div className="bg-canvas-card rounded-2xl p-4 sm:p-5 border border-sandstone-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-terracotta/15 text-terracotta flex items-center justify-center shrink-0">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta">
                {t.contextualAiGuide}
              </span>
              <span className="text-[10px] text-umber-light font-mono">• {t.district}</span>
            </div>
            <h2 className="font-serif font-bold text-base sm:text-lg text-umber line-clamp-1">
              {isKn ? (activeMonument.kannadaName || activeMonument.name) : activeMonument.name}
            </h2>
          </div>
        </div>

        {/* Monument Context Switcher */}
        <div className="relative w-full sm:w-auto">
          <select
            value={activeMonument.id}
            onChange={(e) => {
              const selected = HERITAGE_MONUMENTS.find(m => m.id === e.target.value);
              if (selected) setActiveMonument(selected);
            }}
            aria-label={t.switchContext}
            className="w-full sm:w-64 appearance-none bg-canvas text-umber text-xs font-semibold px-3.5 py-2 pr-8 rounded-stone border border-sandstone-400 focus:outline-none focus:ring-2 focus:ring-terracotta"
          >
            {HERITAGE_MONUMENTS.map((m) => (
              <option key={m.id} value={m.id}>
                📍 {isKn ? (m.kannadaName || m.name) : m.name}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-umber-light absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Chat Messages Log Area */}
      <div className="bg-canvas-card/60 rounded-3xl p-3 sm:p-6 border border-sandstone-300 min-h-[280px] max-h-[440px] sm:min-h-[400px] sm:max-h-[560px] overflow-y-auto space-y-4 shadow-inner">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
          />
        ))}

        {/* AI Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-umber-light italic pl-12">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" />
            <span>{isKn ? 'AI ಮಾಹಿತಿಯನ್ನು ಸಂಯೋಜಿಸುತ್ತಿದೆ...' : 'AI is consulting Chalukyan archives...'}</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Questions */}
      <SuggestionPills
        suggestions={getSuggestions()}
        onSelectSuggestion={(sug) => handleSendMessage(sug)}
      />

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="relative flex items-center gap-2 bg-canvas-card p-2 rounded-2xl border border-sandstone-400 focus-within:border-terracotta shadow-warm-sm"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={t.askPlaceholder}
          className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-umber placeholder:text-sandstone-600 focus:outline-none"
        />

        <button
          type="submit"
          disabled={!inputQuery.trim() || isTyping}
          className="px-4 py-2.5 rounded-stone bg-terracotta hover:bg-terracotta-deep disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
        >
          <span>{t.send}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Footer disclaimer */}
      <p className="text-[11px] text-center text-umber-light">
        AI responses are synthesized from Archaeological Survey of India (ASI) historical studies and Chalukyan inscriptions.
      </p>

    </div>
  );
}
