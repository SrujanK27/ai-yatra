# 🏛️ AI YATRA — Comprehensive Project Knowledge Base & AI Handbook

> **Project Name:** AI Yatra (ಬಾಗಲಕೋಟೆ • ಚಾಳುಕ್ಯ ಪರಂಪರೆ)  
> **Tagline:** Chalukyan Heritage Lens — AI Vision & Interactive Bilingual Audio Guide  
> **Focus Region:** Bagalkote District, Karnataka, India (Badami, Pattadakal, Aihole, Mahakuta, Kudalasangama)  
> **Target Dynasties:** Early Chalukyas of Vatapi (543 – 753 CE) & Western Chalukyas (10th – 12th Century CE)  
> **Tech Stack:** React 18, Vite 6, Tailwind CSS, Google Gemini Vision API, Netlify Serverless Functions, Node.js, Web Audio / HTML5 Audio Stream Engine.

---

## 📌 1. Project Mission & Overview
**AI Yatra** is a cutting-edge, mobile-first Web Application designed for tourists, historians, students, and pilgrims visiting the historic heritage circuit of **Bagalkote District in North Karnataka**.

Instead of requiring expensive human guides or reading outdated signboards, visitors can:
1. **📸 Snap or Upload a Photo** of any rock-cut cave, carving, facade, or temple shikhara.
2. **🧠 Get Instant AI Monument Identification** powered by Google Gemini Vision, identifying dynastic period, patron kings/queens, architectural styles (Vesara / Rekha-Nagara / Dravida), and exact historical significance.
3. **🎙️ Listen to Studio Audio Narration** in **Simple Indian English (Male Docent)** or **Fluent Native Kannada**, strictly detailing the historical background and "Did You Know?" facts with seamless scrubber progression.
4. **📜 Read Epigraph & Inscription Translations** in original Sanskrit / Halegannada with line-by-line English & Kannada translations.
5. **🧭 Navigate Bagalkote's Circuit** with curated catalogs, filterable categories, and one-tap Google Maps directions.

---

## 🏗️ 2. System Architecture & Tech Stack

### A. Frontend Architecture
- **Framework:** React 18 SPA (Single Page Application) with Vite 6.
- **Styling:** Tailwind CSS with a custom Chalukyan Sandstone Theme Palette:
  - `umber` (`#2A1810` / `#3B2219`): Deep Badami cliffstone dark shade.
  - `terracotta` (`#C85A32` / `#A8431D`): Red sandstone earth tones.
  - `gold` (`#E5A93C` / `#F3C96A`): Royal Chalukyan crest gold.
  - `sandstone` (`#F7F3EE` / `#EADBC8`): Warm heritage canvas background.
- **Typography:**
  - English: `Playfair Display` (Serif Headings), `Inter` / `Plus Jakarta Sans` (Body).
  - Kannada: `Noto Serif Kannada` / `Noto Sans Kannada` (Authentic Kannada typography).
- **Navigation State:** Robust SPA routing with `sessionStorage` and `window.history.pushState` integration (survives mobile browser refreshes and hardware back buttons).

### B. Backend & Serverless API Architecture
- **`/api/analyze` ([netlify/functions/analyze.js](file:///d:/Projects/AI%20Yatra/netlify/functions/analyze.js)):**
  - Receives base64 scanned images.
  - Invokes **Google Gemini Vision API (`gemini-2.5-flash` / `gemini-1.5-flash`)**.
  - Performs intelligent visual feature matching against the Bagalkote Archaeological Database.
  - If a user uploads a new/uncataloged monument, dynamically generates a complete bilingual record (architecture, history, epigraphs, audio guide script) on the fly.
- **`/api/tts` ([netlify/functions/tts.js](file:///d:/Projects/AI%20Yatra/netlify/functions/tts.js)):**
  - Dedicated server-side proxy for Google Neural TTS stream.
  - Converts text into pure `audio/mpeg` MP3 streams.
  - Completely bypasses browser CORS and eliminates dependencies on client-side installed speech packs.
  - Supports `lang=en-IN` (Indian English Male Voice) and `lang=kn` (Native Kannada Voice).
- **Vite Dev Proxy ([vite.config.js](file:///d:/Projects/AI%20Yatra/vite.config.js)):**
  - Direct local middleware that routes `/api/analyze` and `/api/tts` to Netlify function handlers with zero configuration.

---

## 🏛️ 3. Curated Monument Database (11 Master Catalog Sites)

| Monument ID | English Name | Kannada Name | Dynasty & Period | Architectural Style | Key Highlight |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `badami-cave-1` | Badami Cave 1 | ಬಾದಾಮಿ ಗುಹೆ ೧ (ಶೈವ ಗುಹೆ) | Early Chalukya (c. 575 CE) | Rock-Cut Cave Temple | 18-armed Shiva Nataraja depicting 81 classical dance mudras. |
| `badami-cave-2` | Badami Cave 2 | ಬಾದಾಮಿ ಗುಹೆ ೨ (ವೈಷ್ಣವ ಗುಹೆ) | Early Chalukya (Late 6th Century) | Rock-Cut Cave Temple | Monumental celestial reliefs of Vishnu Trivikrama & Varaha avatar. |
| `badami-cave-3` | Badami Cave 3 | ಬಾದಾಮಿ ಗುಹೆ ೩ (ಮಹಾ ವಿಷ್ಣು ಗುಹೆ) | Early Chalukya (Firmly dated 578 CE) | Rock-Cut Monolithic Masterpiece | King Mangalesha's dated foundation inscription & seated Maha Vishnu on Adisesha. |
| `badami-cave-4` | Badami Cave 4 | ಬಾದಾಮಿ ಗುಹೆ ೪ (ಜೈನ ಗುಹೆ) | Early Chalukya (Late 6th–7th Century) | Rock-Cut Cave Temple | Parshvanatha sheltered by Dharanendra snake hood & Gommateshwara Bahubali. |
| `badami-caves-general`| Badami Cave Temples Complex | ಬಾದಾಮಿ ಗುಹಾ ದೇವಾಲಯಗಳ ಸಂಕೀರ್ಣ | Early Chalukya (575 – 600 CE) | Rock-Cut Cliff Sanctuaries | Complete 4-cave tiered complex overlooking Agastya Lake. |
| `bhutanatha-temple` | Bhutanatha Temple Complex | ಭೂತನಾಥ ದೇವಾಲಯ ಸಂಕೀರ್ಣ | Early & Western Chalukya (7th–11th C.) | Structural Sandstone Temple | Stepped temple extending directly into the sacred waters of Agastya Lake. |
| `badami-north-fort` | Badami North Fort & Upper Shivalaya | ಬಾದಾಮಿ ಉತ್ತರ ಕೋಟೆ | Early Chalukya (6th–7th Century) | Rock-Citadel & Dravidian Shikhara | High watchtower citadel guarding ancient Vatapi with granaries and cannons. |
| `pattadakal-virupaksha`| Virupaksha Temple, Pattadakal | ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ, ಪಟ್ಟದಕಲ್ಲು | Early Chalukya (c. 740 CE) | Dravida (UNESCO World Heritage) | Commissioned by Queen Lokamahadevi; served as archetype for Kailasa Temple at Ellora. |
| `pattadakal-mallikarjuna`| Mallikarjuna Temple, Pattadakal | ಮಲ್ಲಿಕಾರ್ಜುನ ದೇವಾಲಯ, ಪಟ್ಟದಕಲ್ಲು | Early Chalukya (c. 740 CE) | Dravida (UNESCO World Heritage) | Commissioned by Queen Trailokyamahadevi with intricate Mahabharata/Ramayana pillars. |
| `aihole-durga-temple` | Durga Temple Complex, Aihole | ದುರ್ಗಾ ದೇವಾಲಯ, ಐಹೊಳೆ | Early Chalukya (Late 7th–Early 8th C.) | Apsidal (Gajaprishta / Elephant-back) | Unique curved peristyle colonnade resembling Buddhist chaitya hall. |
| `aihole-lad-khan` | Lad Khan Temple, Aihole | ಲಾಡ್ ಖಾನ್ ದೇವಾಲಯ, ಐಹೊಳೆ | Early Chalukya (c. 5th–6th Century) | Primitive Cave-Mandapa Prototype | Ancient Chalukyan assembly hall with log-cabin style interlocking stone slabs. |
| `mahakuta-temple` | Mahakuta Temple Complex | ಮಹಾಕೂಟ ದೇವಾಲಯ ಸಂಕೀರ್ಣ | Early Chalukya (Late 6th–7th Century) | Hybrid Vesara & Nagara | Natural freshwater Pushkarini (Vishnu Pushkarini) with underwater Shiva shrine. |
| `kudalasangama-temple`| Kudalasangama Sangameshwara | ಕೂಡಲಸಂಗಮ ಸಂಗಮೇಶ್ವರ ದೇವಾಲಯ | Early & Western Chalukya (12th C.) | Kalyana Chalukya Structural | Holy confluence of Krishna and Malaprabha rivers; Aikya Mantapa of Basaveshwara. |

---

## 🎙️ 4. Audio Guide Engine Specifications

### A. Narration Script & Scope
- Speaks strictly **Overview (Historical Background)** + **Did You Know? (ವಿಶೇಷ ಐತಿಹಾಸಿಕ ಮಾಹಿತಿ)**.
- No narrator names or intrusive intros.

### B. Simple Male English Narrator
- Streams via `/api/tts?lang=en-IN` (with offline SpeechSynthesis fallback).
- **Voice Character:** Clear, simple, warm Indian Male Docent voice (human-like broadcast clarity, zero metallic or robotic distortion).
- **Text Polisher (`polishTextForSpeech`):** Automatically expands and simplifies historical phrasing:
  - `578 CE` → *"in the year 578"*
  - `6th c. CE` → *"6th century"*
  - `BCE` → *"Before Common Era"*
  - `sq ft` → *"square feet"*
  - `km` → *"kilometers"*
  - `m` → *"meters"*
  - `ASI` → *"Archaeological Survey of India"*
  - Brackets `(...)` are converted to natural speech pauses.

### C. Native Kannada Audio Stream
- Streams via `/api/tts?lang=kn`.
- Splits Kannada text into sentence chunks (< 140 chars) to prevent stream timeouts.
- Preloads and queues chunks seamlessly.
- Guarantees 100% audible playback on all devices (Windows, Mac, Android, iOS).

### D. Glitch-Free Monotonic Progress Bar & Scrubber
- **Monotonic Progression (`setMonotonicProgress`):** Guarantees that the progress bar only moves forward continuously and **never jumps backward, repeats, or freezes**.
- **Clean Time Display:** Shows exact elapsed vs total duration formatted as `0:27 / 0:38` (percentages and speed toggles cleanly removed).

---

## 📱 5. UI Layout & User Experience

### 1. Navigation Header & Mobile Bar
- **Header:** Logo ("AI Yatra • Bagalkote"), 3 core links (**Home**, **Scan Heritage**, **Explore Bagalkote**), language toggle (**EN / ಕನ್ನಡ**), and quick "Scan Monument" button.
- **Mobile Sticky Bar:** Bottom dock with Home, Scan, and Explore tabs.
- **Footer:** Heritage circuits, quick links, ASI disclaimer, and copyright.

### 2. Main Pages
- **Home Page (`/home`):**
  - Hero banner with camera scan CTA.
  - Micro stats: 120+ Chalukya Temples, UNESCO site, 100% Calibrated.
  - 3 Core Feature Cards (AI Scanner, Heritage Audio Guide, Catalog Explorer).
  - 3-Step "How AI Yatra Works" guide.
  - Featured monuments with Category Filter Chips (All, Rock-Cut Caves, UNESCO, Temples, Forts).
  - Historical timeline of Badami Chalukyas (543–753 CE).
- **Scan Page (`/scan`):**
  - Live Camera Viewfinder with permission handler.
  - Gallery Photo Upload / Drag-and-Drop.
  - Preset Sample Photo quick testing strip.
  - Laser grid scanning animation while analyzing with Gemini Vision.
- **Result Page (`/result`):**
  - AI Vision status banner with identified features chips.
  - Photo Toggle (Switch between user's scanned upload and catalog master photo).
  - Quick specs grid (Builder, Period, Style, Location).
  - Heritage Audio Player.
  - 4 Navigation Tabs:
    1. **Overview:** Historical background, architectural highlights, "Did You Know?" facts.
    2. **Architecture:** Layout diagrams, column details, ceiling medallions, sanctum design.
    3. **Epigraphs:** Original Sanskrit/Kannada inscriptions with translation drawer.
    4. **Nearby Sites:** Interactive cards with one-tap Google Maps GPS directions.
- **Explore Page (`/explore`):**
  - Complete Bagalkote circuit directory with category filters and location badges.

---

## 🛠️ 6. How to Run & Develop

### Prerequisites
- Node.js v18+ (tested up to Node.js v24).
- npm installed.

### Commands
```bash
# Install dependencies
npm install

# Run local development server (runs on http://localhost:3000/)
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```

### Environment Variables (`.env`)
```env
# Optional: Gemini API key for live online vision analysis
VITE_GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 💡 7. ChatGPT Prompting Guide (How to use this file with ChatGPT)

When asking ChatGPT for assistance, modifications, or code additions, paste this prompt:

```text
I am working on "AI Yatra", a React 18 + Vite web app for Bagalkote heritage exploration (Badami, Pattadakal, Aihole).
Here are the core rules:
1. Tech Stack: React 18, Tailwind CSS, Netlify Functions (/api/analyze, /api/tts).
2. Supported Languages: English (EN) and Kannada (KN).
3. Audio Guide Engine: Uses streaming /api/tts?lang=en-IN (Simple Male Docent) and /api/tts?lang=kn (Kannada).
4. Do NOT re-add "Ask AI" or "Verified Match" badges.
5. All monument data lives in src/data/heritageData.js and translations in src/data/translations.js.

Context from Project Knowledge Base:
[Paste sections of this markdown file here]

My Question: [Insert your question or feature request]
```
