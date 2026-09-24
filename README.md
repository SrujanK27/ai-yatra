# 🏛️ AI Yatra — Chalukyan Heritage Lens & Bilingual Audio Guide

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Google_Gemini_Vision-orange.svg)](https://deepmind.google/technologies/gemini/)
[![Bilingual](https://img.shields.io/badge/Languages-English_%7C_ಕನ್ನಡ-gold.svg)](#)

> **AI Yatra (ಬಾಗಲಕೋಟೆ • ಚಾಳುಕ್ಯ ಪರಂಪರೆ)** is an intelligent, mobile-first Web Application for discovering the 6th–8th century rock-cut and structural monuments of **Bagalkote District, Karnataka** (Badami, Pattadakal, Aihole, Mahakuta, and Kudalasangama).

---

## 🌟 Key Features

- **📸 AI Vision Monument Identification**: Snap or upload any cliff carving, temple facade, or shikhara to identify the dynasty, builder, period, and architectural style using **Google Gemini Vision**.
- **🎙️ Bilingual Heritage Audio Guide**:
  - **Simple Indian English Male Narrator**: Natural, human-like docent audio with simplified historical phrasing.
  - **Native Kannada Audio Stream**: Fluently spoken native Kannada audio streaming via dedicated serverless engine.
  - **Jitter-Free Scrubber**: Monotonic forward progress bar synchronized with live audio duration.
- **📜 Epigraph & Inscription Drawer**: Read and examine original Sanskrit and Halegannada inscriptions with verified line-by-line English and Kannada translations.
- **🧭 Curated Bagalkote Circuit**: Filter and browse 11+ rock-cut caves, UNESCO World Heritage monuments, fort citadels, and sacred pools with one-tap Google Maps GPS directions.
- **🌐 Full Bilingual Localization**: Instant one-tap toggle between **English** and **ಕನ್ನಡ**.

---

## 🏛️ Master Monument Catalog

| Monument | Location | Period | Architecture |
| :--- | :--- | :--- | :--- |
| **Badami Cave 1** | Badami | c. 575 CE | Rock-Cut Shiva Sanctuary (18-armed Nataraja) |
| **Badami Cave 2** | Badami | Late 6th C. | Rock-Cut Vishnu Sanctuary (Trivikrama & Varaha) |
| **Badami Cave 3** | Badami | 578 CE | King Mangalesha's Inscribed Royal Sanctuary |
| **Badami Cave 4** | Badami | Late 6th–7th C. | Rock-Cut Jain Cave (Parshvanatha & Bahubali) |
| **Bhutanatha Temple Complex** | Badami | 7th–11th C. | Agastya Lake Shoreline Sandstone Temple |
| **Badami North Fort** | Badami | 6th–7th C. | Ancient Vatapi Citadel & Upper Shivalaya |
| **Virupaksha Temple** | Pattadakal | c. 740 CE | Queen Lokamahadevi's UNESCO Masterpiece |
| **Mallikarjuna Temple** | Pattadakal | c. 740 CE | Queen Trailokyamahadevi's UNESCO Temple |
| **Durga Temple** | Aihole | Late 7th C. | Apsidal (Gajaprishta / Elephant-back) Sanctum |
| **Lad Khan Temple** | Aihole | c. 5th–6th C. | Cave-Mandapa Prototype Assembly Hall |
| **Mahakuta Temple Complex** | Mahakuta | Late 6th C. | Freshwater Pushkarini & Hybrid Vesara Shrines |
| **Kudalasangama Sangameshwara** | Kudalasangama | 12th C. | Sacred Confluence & Basaveshwara Aikya Mantapa |

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS, Lucide Icons.
- **Backend / Serverless**: Netlify Functions (`/api/analyze` for Gemini Vision, `/api/tts` for streaming audio).
- **Vision AI**: Google Gemini 2.5 / 1.5 Flash Vision.
- **Styling Tokens**: Custom Chalukyan sandstone palette (`umber`, `terracotta`, `gold`, `sandstone`).

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Run

```bash
# 1. Clone repository
git clone https://github.com/SrujanK27/ai-yatra.git
cd ai-yatra

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

---

## 📂 Project Structure

```
ai-yatra/
├── netlify/
│   └── functions/
│       ├── analyze.js           # Google Gemini Vision analysis endpoint
│       └── tts.js               # Audio stream proxy for Kannada & English
├── public/
│   ├── images/monuments/        # High-resolution heritage catalog photos
│   └── AI_YATRA_PROJECT_OVERVIEW.md
├── src/
│   ├── components/
│   │   ├── common/              # AudioPlayer, Button, Badge, SectionHeader
│   │   ├── heritage/            # HeritageCard, EpigraphDrawer
│   │   ├── layout/              # Header, Footer, MobileNav
│   │   └── scan/                # ScanningAnimation, Viewfinder
│   ├── data/
│   │   ├── heritageData.js      # Complete bilingual dataset for all 11 monuments
│   │   └── translations.js      # English & Kannada UI translation dictionary
│   ├── pages/
│   │   ├── HomePage.jsx         # Hero, Stats, Feature Cards, Timeline
│   │   ├── ScanPage.jsx         # Camera scan & photo upload
│   │   ├── ResultPage.jsx       # Vision analysis, Audio guide, 4 tabs
│   │   └── ExplorePage.jsx      # Monument directory & circuit filters
│   ├── App.jsx                  # Main SPA router & state synchronization
│   ├── index.css                # Custom fonts, typography & Tailwind imports
│   └── main.jsx
├── AI_YATRA_PROJECT_OVERVIEW.md # Comprehensive offline reference handbook
├── README.md                    # Project documentation
├── tailwind.config.js
└── vite.config.js               # Vite config with local serverless API proxy
```

---

## 📜 License & Acknowledgements
- Developed for Karnataka Heritage & Tourism promotion.
- Monument historical epigraphs sourced from Archaeological Survey of India (ASI) reports.
