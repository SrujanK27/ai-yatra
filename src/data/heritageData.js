/**
 * Curated Bagalkote Heritage Knowledge Base
 * 
 * Source of truth for monuments, architectural identification markers, 
 * historical context for AI Vision/Gemini prompting, and client UI data.
 */

export const HERITAGE_MONUMENTS = [
  {
    id: 'badami-cave-1',
    name: 'Badami Cave Temples — Cave 1 (Nataraja)',
    aliases: ['Vatapi', 'Badami Caves', 'Cave 1 Shiva Nataraja', 'Badami Rock-Cut Cave 1'],
    kannadaName: 'ಬಾದಾಮಿ ಗುಹೆ ೧ (ನಟರಾಜ ಶಿಲ್ಪ)',
    location: 'Badami, Bagalkote District',
    region: 'Badami',
    category: 'Cave Temples',
    coordinates: { lat: 15.9189, lng: 75.6766 },
    period: 'Early Chalukya Dynasty (c. 578 CE)',
    historicalSignificance: 'Capital of the Early Chalukya empire founded by Pulakeshin I; Cave 1 is the oldest amongst the four rock-cut sanctuaries, excavated from sheer red sandstone cliffs overlooking Agastya Lake.',
    distinctiveArchitecturalFeatures: [
      'Monolithic red sandstone cliff excavation with no masonry joints',
      '18-armed Shiva Nataraja bas-relief depicting 81 Natya Shastra dance mudras',
      'Syncretic Ardhanarishwara and Harihara monolithic pillar niches',
      'Coiled five-hooded Nagaraja serpent deity relief on veranda ceiling'
    ],
    keyStructures: [
      'Cave 1 (Shaivite Nataraja & Harihara)',
      'Cave 2 (Vaishnavite Trivikrama & Varaha)',
      'Cave 3 (Maha Vishnu dated 578 CE by King Mangalesha)',
      'Cave 4 (Jain Tirthankara Parshvanatha and Mahavira)'
    ],
    architecturalStyle: 'Rock-Cut Vesara / Karnata Dravida',
    builder: 'King Mangalesha & Pulakeshin I',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80',
    tags: ['Cave Temples', 'Rock-Cut', 'Early Chalukya', 'Shiva Nataraja'],
    isUnesco: false,
    audioGuide: {
      duration: '3 min 45 sec',
      title: 'Echoes of the 18-Armed Cosmic Dance',
      narrator: 'Dr. Sharada Hebbar (ASI Heritage Scholar)',
      transcript: 'Welcome to Cave 1 of Badami, carved out of the red sandstone cliffs in the late 6th century under the patronage of the Early Chalukyas. As you step onto the plinth, gaze upon the monumental 18-armed Nataraja on the right facade. Each arm represents distinct mudras of cosmic dance, holding drums, tridents, and weapons, flanked by Ganesha and the sacred Nandi bull.'
    },
    about: 'Carved straight into sheer red-sandstone cliffs overlooking the serene Agastya Lake, Cave 1 is the oldest amongst the four rock-cut sanctuaries at Badami. Dedicated to Lord Shiva, the cave exemplifies the daring rock-cutting engineering pioneered by the Early Chalukyan guild.',
    architecture: {
      overview: 'The cave comprises a veranda with massive rectangular pillars, a columned hall (sabhamantapa), and a square sanctum housing a linga.',
      highlights: [
        {
          title: '18-Armed Tandava Nataraja',
          description: 'A 5-foot bas-relief depicting Lord Shiva in 81 distinct mudra permutations, demonstrating deep mastery of the Natya Shastra.'
        },
        {
          title: 'Ardhanarishwara & Harihara',
          description: 'Harmonious syncretic representations fusing Shiva-Parvati and Shiva-Vishnu within monolithic pillared niches.'
        },
        {
          title: 'Carved Nagaraja Ceiling',
          description: 'Intricately coiled five-hooded serpent deity hovering in deep relief above the entrance portico.'
        }
      ]
    },
    didYouKnow: [
      'The 18 arms can be paired in combinations to portray 81 distinct classical dance poses.',
      'The Chalukya artisans used no mortar or added blocks; the entire cavern, columns, and idols were subtracted from a single cliff mass.'
    ],
    epigraphs: [
      {
        language: 'Halegannada (Old Kannada script)',
        text: 'ಶ್ರೀ ವಲ್ಲಭ ದುರ್ಗ ವಿಜಯಾಂಕಿತ ಶಾಲಿವಾಹನ ಶಕ...',
        translation: 'Under the victorious banner of the illustrious Vallabha Chalukya sovereigns, this mountain retreat was established.'
      }
    ],
    nearbyAttractions: [
      { id: 'badami-cave-2', name: 'Badami Cave 2 (Vishnu Trivikrama)', distance: '150 m' },
      { id: 'bhutanatha-group', name: 'Bhutanatha Group of Temples', distance: '600 m' },
      { id: 'agastya-lake', name: 'Agastya Teertha & Fort', distance: '400 m' }
    ]
  },
  {
    id: 'pattadakal-virupaksha',
    name: 'Pattadakal Virupaksha Temple',
    aliases: ['Pattada Kisuvolal', 'Raktapura', 'Virupaksha Temple Pattadakal', 'Lokeshwara Temple'],
    kannadaName: 'ಪಟ್ಟದಕಲ್ಲು ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ',
    location: 'Pattadakal, Bagalkote District',
    region: 'Pattadakal',
    category: 'UNESCO World Heritage',
    coordinates: { lat: 15.9492, lng: 75.8164 },
    period: 'Early Chalukya Dynasty (c. 740 CE)',
    historicalSignificance: 'UNESCO World Heritage coronation capital of the Chalukyas on the holy north-flowing Malaprabha river; commissioned by Queen Lokamahadevi to commemorate Vikramaditya II\'s triple victory over Kanchipuram. Served as the direct architectural blueprint for the Kailasa Temple at Ellora.',
    distinctiveArchitecturalFeatures: [
      'Pinnacle of Early Chalukyan Dravida (Southern) Vimana structural architecture',
      'Monolithic sculpted pillars with cinematic narrative friezes from Ramayana, Mahabharata, and Panchatantra',
      'Architect inscriptions naming Gunda Anivaritachari with the royal title "Tribhuvanachari"',
      'Monolithic black stone polished Nandi pavilion facing the sanctum'
    ],
    keyStructures: [
      'Virupaksha Temple (Lokeshwara)',
      'Mallikarjuna Temple (Trailokyeshwara)',
      'Sangameshwara Temple (Vijayeshwara)',
      'Papanatha Temple (Nagara tower style)',
      'Kadasiddheshwara and Jambulinga Shrines'
    ],
    architecturalStyle: 'Dravida / Southern Vimana Prototype',
    builder: 'Queen Lokamahadevi (Wife of King Vikramaditya II)',
    image: 'https://images.unsplash.com/photo-1600100397608-f010e42e5bf4?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1600100397608-f010e42e5bf4?auto=format&fit=crop&w=600&q=80',
    tags: ['UNESCO World Heritage', 'Structural Temple', 'Dravidian Prototype', 'Mahakuta'],
    isUnesco: true,
    audioGuide: {
      duration: '4 min 20 sec',
      title: 'Queen Lokamahadevi\'s Victory Monument',
      narrator: 'Venkatesh Murthy (Karnataka Tourism Voice)',
      transcript: 'You are standing before the crown jewel of Pattadakal, a designated UNESCO World Heritage monument. Commissioned by Queen Lokamahadevi to commemorate Vikramaditya II\'s triple triumph over the Pallavas of Kanchipuram, this temple served as the direct inspiration for the Kailasa temple at Ellora.'
    },
    about: 'Pattadakal was the ceremonial coronation capital ("Pattada Kisuvolal") of the Badami Chalukyas on the banks of the north-flowing Malaprabha river. The Virupaksha Temple is the most monumental and refined structural temple of the ensemble.',
    architecture: {
      overview: 'Massive sandstone enclosure with east & west gopura gateways, a grand hypostyle mandapa with 18 intricately sculpted monolithic pillars, and an imposing multi-tiered Dravida shikhara.',
      highlights: [
        {
          title: 'Ramayana & Mahabharata Friezes',
          description: 'Pillars narrated with continuous cinematic narrative stone panels depicting scenes from the epics and Panchatantra.'
        },
        {
          title: 'Architect\'s Inscriptions (Gunda Anivaritachari)',
          description: 'Rare historical inscriptions naming the master architect who received the title "Tribhuvanachari" (Maker of the Three Worlds).'
        },
        {
          title: 'Monolithic Nandi Pavilion',
          description: 'A polished monolithic Nandi bull housed inside a square 4-pillared stone mantapa oriented towards the inner sanctum.'
        }
      ]
    },
    didYouKnow: [
      'The Rashtrakuta King Krishna I was so enamored with Pattadakal Virupaksha that he commissioned the rock-cut Kailasa temple at Ellora after this exact blueprint.',
      'The Malaprabha river flows northward (Uttara-vahini) at Pattadakal, making it sacred for royal Chalukyan coronation rituals.'
    ],
    epigraphs: [
      {
        language: 'Sanskrit in Old Kannada Script',
        text: 'ಶ್ರೀ ತ್ರಿಭುವನಾಚಾರಿ ಗುಣವಿದಗ್ಧ ಸಕಲ ಕಲಾ ಪ್ರವೀಣ...',
        translation: 'Bestowed upon the supreme architect, proficient in all arts, who built this holy sanctuary of Lokeshwara.'
      }
    ],
    nearbyAttractions: [
      { id: 'pattadakal-mallikarjuna', name: 'Mallikarjuna Temple', distance: '50 m' },
      { id: 'pattadakal-sangameshwara', name: 'Sangameshwara Temple', distance: '120 m' },
      { id: 'pattadakal-papanatha', name: 'Papanatha Temple (Nagara Style)', distance: '250 m' }
    ]
  },
  {
    id: 'aihole-durga-temple',
    name: 'Aihole Durga Temple Complex',
    aliases: ['Aryapura', 'Ayyavole', 'Durga Temple Aihole', 'Cradle of Temple Architecture', 'Aihole Apsidal Temple'],
    kannadaName: 'ಐಹೊಳೆ ದುರ್ಗಾ ದೇವಾಲಯ ಸಮುಚ್ಛಯ',
    location: 'Aihole, Bagalkote District',
    region: 'Aihole',
    category: 'Temples',
    coordinates: { lat: 16.0194, lng: 75.8817 },
    period: 'Early Chalukya Dynasty (c. 680 - 720 CE)',
    historicalSignificance: 'Regarded as the workshop and laboratory of ancient Indian temple design with over 120 stone temples; headquarters of the trans-continental "500 Lords of Ayyavole" medieval merchant guild.',
    distinctiveArchitecturalFeatures: [
      'Rare Gajaprishta (elephant back / apsidal) sanctum plan adapting Buddhist chaitya forms',
      'Open peristyle pillared ambulatory colonnade with sloping stone chhajja eaves',
      'High-relief outer pillar sculptures of Mahishasuramardini, Narasimha, and celestial couples',
      'Ruined northern Rekha-Nagara curvilinear shikhara atop an apsidal base'
    ],
    keyStructures: [
      'Durga Temple (Apsidal sanctum)',
      'Lad Khan Temple (Early cave-like stone mantapa)',
      'Ravana Phadi Rock-Cut Cave (Dancing Shiva relief)',
      'Meguti Jain Temple (634 CE Pulakeshin II & poet Ravikirti inscription)',
      'Huchimalli Gudi and Konti Gudi group'
    ],
    architecturalStyle: 'Gajaprishta (Apsidal) / Vesara Fusion',
    builder: 'Chalukyan Guild of Architects (Ayyavole 500)',
    image: 'https://images.unsplash.com/photo-1621258661644-8d9e680a6564?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1621258661644-8d9e680a6564?auto=format&fit=crop&w=600&q=80',
    tags: ['Cradle of Architecture', 'Apsidal Temple', 'Nagara Shikhara', 'Sun Temple'],
    isUnesco: false,
    audioGuide: {
      duration: '3 min 10 sec',
      title: 'The Cradle of Indian Temple Architecture',
      narrator: 'Dr. Sharada Hebbar',
      transcript: 'Aihole is universally hailed as the workshop and laboratory of ancient Indian temple design. The famous Durga Temple, with its rare horseshoe or elephant-back apsidal contour, was originally dedicated to Surya the Sun God, and served as an experimental synthesis between Buddhist chaitya halls and Hindu sanctums.'
    },
    about: 'With over 120 temples spanning 4th to 12th century CE, Aihole was the historic merchant and guild city of "Aryapura". The Durga Temple stands as its most iconic silhouette with its peristyle colonnade wrapping around the curving back.',
    architecture: {
      overview: 'Elevated moulded adhisthana plinth, apsidal sanctum surrounded by an open ambulatory pillared porch, surmounted by a ruined northern Rekha-Nagara tower.',
      highlights: [
        {
          title: 'Gajaprishta Apsidal Plan',
          description: 'Rounded rear plan mimicking an elephant\'s back, maximizing breeze and light across the pradakshinapatha.'
        },
        {
          title: 'Mahishasuramardini & Narasimha Sculptures',
          description: 'Superbly dynamic high-relief sculptures carved into the outer pillar niches depicting divine battles.'
        },
        {
          title: 'Open Peristyle Veranda',
          description: 'Airy outer walkway lined with sloped stone eaves (chhajja) protecting inner relief panels from monsoon weathering.'
        }
      ]
    },
    didYouKnow: [
      'The name "Durga" does not refer to Goddess Durga, but from the word "Durg" (fortress), as the temple was incorporated into a defensive bastion in medieval times.',
      'Aihole was the headquarters of the famous "500 Lords of Ayyavole", a trans-continental medieval trade guild spanning Southeast Asia.'
    ],
    epigraphs: [
      {
        language: 'Old Kannada',
        text: 'ಶ್ರೀ ಅಯ್ಯಾವೊಳೆ ಐನ್ನೂರ್ವರ್ ಪ್ರಭುಗಳ್...',
        translation: 'Under the covenant of the illustrious five-hundred merchants and trade masters of Ayyavole.'
      }
    ],
    nearbyAttractions: [
      { id: 'lad-khan-temple', name: 'Lad Khan Temple (Cave-Style Mantapa)', distance: '200 m' },
      { id: 'ravana-phadi', name: 'Ravana Phadi Rock-Cut Cave', distance: '900 m' },
      { id: 'huchimalli-temple', name: 'Huchimalli Gudi', distance: '1.2 km' }
    ]
  },
  {
    id: 'bhutanatha-temples',
    name: 'Bhutanatha Group of Temples',
    aliases: ['Bhutanatha Temple Badami', 'Agastya Lake Temple', 'East Lake Shrine'],
    kannadaName: 'ಭೂತನಾಥ ದೇವಾಲಯಗಳ ಸಮೂಹ',
    location: 'Agastya Lake, Badami, Bagalkote',
    region: 'Badami',
    category: 'Sacred Waters',
    coordinates: { lat: 15.9211, lng: 75.6869 },
    period: '7th – 11th Century CE (Chalukya & Kalyana Chalukya)',
    historicalSignificance: 'Scenic Shaivite lakeside complex built on the eastern edge of Agastya Teertha; showcases architectural transition from early Badami Chalukya style to later Western Chalukya open mantapa design.',
    distinctiveArchitecturalFeatures: [
      'Ashlar sandstone foundation extending directly into the waters of Agastya Lake',
      'Tiered Dravida pyramidal shikhara with open pillared hall facing the sunset',
      'Goddess Ganga and Yamuna guardian relief sculptures carved at the sanctum entrance',
      'Natural rock-face reliefs of Vishnu avatars and Jain figures carved on rear boulders'
    ],
    keyStructures: [
      'Main Bhutanatha Temple (Lakeside east cluster)',
      'Mallikarjuna Group (Northeast hillside cluster)',
      'Agastya Teertha Steps & Ghats',
      'Rock Relief Boulders'
    ],
    architecturalStyle: 'Dravida & Nagara Hybrid on Water Terrace',
    builder: 'Badami Chalukyas & Western Chalukyas',
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=600&q=80',
    tags: ['Sacred Waters', 'Lakefront', 'Shiva Sanctuary', 'Sunset Heritage'],
    isUnesco: false,
    audioGuide: {
      duration: '2 min 50 sec',
      title: 'Serenade of Sandstone over Agastya Lake',
      narrator: 'Venkatesh Murthy',
      transcript: 'Perched right at the water\'s edge on the eastern bank of Agastya Lake, the Bhutanatha Temple opens towards the sunset. During monsoon months, the lake water laps gently against the open pillared mantapa steps, creating an unforgettable tranquil sanctuary.'
    },
    about: 'The Bhutanatha temple complex extends directly into the emerald waters of Agastya Lake, surrounded by sheer red sandstone canyons. It represents two distinct eras of Chalukyan stone architecture.',
    architecture: {
      overview: 'The main shrine faces west with an open hall extending directly into the lake bed, featuring tiered pyramidal Dravida superstructure and stepped water access ghats.',
      highlights: [
        {
          title: 'Lake Water Plinth',
          description: 'Submerged foundations engineered with interlocking sandstone ashlar masonry that withstand centuries of water currents.'
        },
        {
          title: 'Ganga and Yamuna River Goddess Carvings',
          description: 'Delicate sentinel guardian sculptures carved flanking the sanctum doorway.'
        },
        {
          title: 'Boulder Carvings Behind Shrine',
          description: 'Rock reliefs of Vishnu\'s avatars and Jain icons carved directly into the natural cliffside boulders.'
        }
      ]
    },
    didYouKnow: [
      'Agastya Lake water was historically believed to possess healing mineral properties from surrounding sandstone and herbs.',
      'The temple is one of the most photographed heritage monuments in South India at dusk.'
    ],
    epigraphs: [
      {
        language: 'Sanskrit / Old Kannada',
        text: 'ಶ್ರೀ ಭೂತನಾಥ ದೇವಸ್ಯ ಅಮೃತಪಡಿ...',
        translation: 'Endowment of perpetual lamp and offerings dedicated to Lord Bhutanatha by royal devotees.'
      }
    ],
    nearbyAttractions: [
      { id: 'badami-cave-1', name: 'Badami Cave Temples', distance: '600 m' },
      { id: 'badami-fort', name: 'North Fort & Archaeological Museum', distance: '350 m' }
    ]
  },
  {
    id: 'mahakuta-complex',
    name: 'Mahakuta Temple Complex & Pushkarini',
    aliases: ['Makuta', 'Mahakuteshwara', 'Vishnu Pushkarini', 'Dakshina Kashi', 'Mahakuta Spring'],
    kannadaName: 'ಮಹಾಕೂಟ ದೇವಾಲಯ ಸಮುಚ್ಚಯ ಹಾಗೂ ಪುಷ್ಕರಣಿ',
    location: 'Mahakuta, near Badami, Bagalkote',
    region: 'Mahakuta',
    category: 'Sacred Waters',
    coordinates: { lat: 15.9333, lng: 75.7258 },
    period: 'Early Chalukya (Late 6th to 7th Century CE)',
    historicalSignificance: 'A prominent Shaivite pilgrimage and learning center surrounded by natural banyan groves; celebrated for the historical 602 CE Mahakuta Pillar Inscription of King Mangalesha establishing early Chalukya royal lineage.',
    distinctiveArchitecturalFeatures: [
      'Cluster of over 20 stone shrines demonstrating concurrent experiments in Nagara and Dravida shikharas',
      'Vishnu Pushkarini stone tank fed by perennial subterranean thermal mountain springs',
      'Panchamukha (five-faced) Shiva linga enshrined inside a submerged central pavilion in the pushkarini',
      'Pillared mantapas and ornate floral bracket stones'
    ],
    keyStructures: [
      'Mahakuteshwara Temple (Main Dravida shrine)',
      'Mallikarjuna Temple (Nagara tower)',
      'Vishnu Pushkarini (Sacred spring pool)',
      'Submerged Panchamukha Linga pavilion',
      'Original site of the Mangalesha Mahakuta Pillar'
    ],
    architecturalStyle: 'Early Nagara & Dravida Fusion / Temple Guild Hub',
    builder: 'Chalukya King Pulakeshin I & Mangalesha',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
    tags: ['Sacred Spring', 'Pushkarini', 'Epigraph Pillar', 'Living Temple'],
    isUnesco: false,
    audioGuide: {
      duration: '3 min 00 sec',
      title: 'Sacred Springs of Mahakuteshwara',
      narrator: 'Dr. Sharada Hebbar',
      transcript: 'Nestled in a verdant valley flanked by banyan trees, Mahakuta is a living Shaivite pilgrimage site fed by an ancient natural thermal spring. The Vishnu Pushkarini tank sits at the center with a submerged five-faced Shiva linga shrine.'
    },
    about: 'Mahakuta was an important religious learning hub for the Early Chalukyas, celebrated for the famous Mahakuta Pillar Inscription that records the lineage and conquests of the royal dynasty.',
    architecture: {
      overview: 'Over two dozen compact stone shrines arranged around the freshwater spring pool (Pushkarini), presenting side-by-side experiments in Nagara curvilinear towers and Dravida tiered roofs.',
      highlights: [
        {
          title: 'Vishnu Pushkarini Spring Pool',
          description: 'Pristine stone tank fed by subterranean natural mountain springs that maintain clear, warm water year-round.'
        },
        {
          title: 'Submerged Panchamukha Linga',
          description: 'Small carved shrine in the center of the tank with four exterior faces and one top face of Shiva.'
        },
        {
          title: 'Mahakuta Pillar Site',
          description: 'Location where the monumental sandstone pillar of King Mangalesha (dated 602 CE) was unearthed.'
        }
      ]
    },
    didYouKnow: [
      'The famous Mahakuta Pillar Inscription is now preserved in the Badami Archaeological Museum and is one of the most vital epigraphical records for early South Indian chronology.',
      'Pilgrims still bathe in the Pushkarini believing its natural spring water relieves skin ailments.'
    ],
    epigraphs: [
      {
        language: 'Sanskrit in Chalukyan Brahmi script',
        text: 'ಓಂ ನಮಃ ಶಿವಾಯ ಶ್ರೀ ಮಂಗಳೇಶಸ್ಯ ವಿಜಯ ರಾಜ್ಯ ಸಂವತ್ಸರೇ...',
        translation: 'In the victorious reign of King Mangalesha, endowments of ten villages were granted to Makuteshwaranatha.'
      }
    ],
    nearbyAttractions: [
      { id: 'badami-cave-1', name: 'Badami Caves', distance: '12 km' },
      { id: 'pattadakal-virupaksha', name: 'Pattadakal', distance: '14 km' }
    ]
  },
  {
    id: 'kudalasangama',
    name: 'Kudalasangama Sangameshwara Temple',
    aliases: ['Kudala Sangama', 'Sangameshwar', 'Aikya Mantapa', 'Krishna Malaprabha Confluence'],
    kannadaName: 'ಕೂಡಲಸಂಗಮ ಸಂಗಮೇಶ್ವರ ದೇವಾಲಯ ಹಾಗೂ ಐಕ್ಯ ಮಂಟಪ',
    location: 'Kudalasangama, Hungund Taluk, Bagalkote',
    region: 'Kudalasangama',
    category: 'Sacred Waters',
    coordinates: { lat: 16.2166, lng: 76.0833 },
    period: '12th Century CE (Kalyana Chalukya) & Modern Heritage Shrine',
    historicalSignificance: 'Sacred confluence of the Krishna and Malaprabha rivers; spiritual center of 12th-century philosopher-statesman Jagadguru Basaveshwara where he composed Vachana poetry and attained Aikya (divine union).',
    distinctiveArchitecturalFeatures: [
      'Kalyana Chalukya lathe-turned reflective black soapstone pillars in the navaranga',
      'Monumental 36-meter cylindrical concrete conservation well protecting the Aikya Mantapa from Almatti reservoir waters',
      'Classical Chalukyan sanctum and carved stone door jambs'
    ],
    keyStructures: [
      'Sangameshwara Temple (Chalukyan era)',
      'Basavanna Aikya Mantapa (Submerged well sanctuary)',
      'Vachana Mantapa and International Study Center',
      'Poojavana & Confluence Ghats'
    ],
    architecturalStyle: 'Chalukyan Pillar Hall & Protected Confluence Well',
    builder: 'Kalyana Chalukya Sovereigns & Basaveshwara Legacy',
    image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80',
    tags: ['Holy Confluence', 'Basavanna Aikya Mantapa', 'Krishna River', 'Philosophy Hub'],
    isUnesco: false,
    audioGuide: {
      duration: '3 min 30 sec',
      title: 'Confluence of Rivers and Revolutionary Thought',
      narrator: 'Venkatesh Murthy',
      transcript: 'Kudalasangama marks the sacred confluence of the Krishna and Malaprabha rivers. Here, the great 12th-century philosopher-statesman Jagadguru Basaveshwara composed his eternal Vachana poetry and attained divine union at the Aikya Mantapa.'
    },
    about: 'A world-renowned spiritual center where the rivers Krishna and Malaprabha unite in Bagalkote district. The complex features the ancient Chalukyan Sangameshwara temple and the cylindrical underwater conservation well safeguarding Basavanna\'s Aikya Mantapa.',
    architecture: {
      overview: 'Chalukya-era garbhagriha and navaranga with intricately lathe-turned black stone columns, complemented by modern engineering that shields the sacred shrine from reservoir waters.',
      highlights: [
        {
          title: 'Protected Aikya Mantapa Well',
          description: 'A massive 36-meter cylindrical concrete retaining wall preserving the sanctum amidst the backwaters of Almatti dam.'
        },
        {
          title: 'Lathe-Turned Soapstone Pillars',
          description: 'Mirror-polished reflective pillars inside the navaranga showcasing pinnacle Kalyana Chalukya lapidary precision.'
        },
        {
          title: 'Vachana Mantapa & Mahamane',
          description: 'Sprawling amphitheater and international center commemorating Sharana egalitarian literature.'
        }
      ]
    },
    didYouKnow: [
      'Basavanna founded the Anubhava Mantapa—the world\'s first recorded socio-spiritual parliament of equals—during this epoch.',
      'The confluence point is considered one of the highest spiritual pilgrimage destinations in Karnataka.'
    ],
    epigraphs: [
      {
        language: 'Kannada Vachana Inscription',
        text: 'ಉಳ್ಳವರು ಶಿವಾಲಯ ಮಾಡುವರು ನಾನೇನ ಮಾಡುವೆ ಬಡವನಯ್ಯಾ...',
        translation: 'The rich will make temples for Shiva; what shall I, a poor man, do? My legs are pillars, my body the shrine, my head the golden cupola.'
      }
    ],
    nearbyAttractions: [
      { id: 'almatti-dam', name: 'Almatti Dam & Rock Gardens', distance: '38 km' },
      { id: 'aihole-durga-temple', name: 'Aihole Heritage Complex', distance: '42 km' }
    ]
  },
  {
    id: 'banashankari-temple',
    name: 'Banashankari Amma Temple',
    aliases: ['Vanashankari', 'Shakambhari', 'Cholachagudda Temple', 'Haridra Tirtha Temple'],
    kannadaName: 'ಬನಶಂಕರಿ ಅಮ್ಮನವರ ದೇವಾಲಯ (ಚೋಳಚಗುಡ್ಡ)',
    location: 'Cholachagudda, Badami, Bagalkote',
    region: 'Banashankari',
    category: 'Temples',
    coordinates: { lat: 15.8778, lng: 75.6983 },
    period: '7th Century (Original Chalukya) & 18th Century Restoration',
    historicalSignificance: 'Tutelary deity (Kuladevata) of the Badami Chalukyas located in the ancient Tilakaranya forest grove; venerated since the 7th century CE as the guardian goddess of the forest.',
    distinctiveArchitecturalFeatures: [
      'Square Haridra Tirtha stone reservoir surrounded by continuous pillared cloisters',
      'Three colossal multi-tiered stone Deepa Stambha (lamp towers) around the tank',
      'Eight-armed deity idol sculpted in black chlorite schist riding a lion'
    ],
    keyStructures: [
      'Banashankari Devi Sanctum (Mukhamantapa and Garbhagriha)',
      'Haridra Tirtha Sacred Water Pool',
      'Triple Deepa Stambha Lamp Towers',
      'Stone Cloistered Corridors'
    ],
    architecturalStyle: 'Dravida with Vijayanagara & Maratha Layering',
    builder: 'Badami Chalukyas & Restored by Peshwa Chieftains',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    tags: ['Forest Goddess', 'Haridra Tirtha', 'Deepa Stambha', 'Annual Jatre'],
    isUnesco: false,
    audioGuide: {
      duration: '2 min 40 sec',
      title: 'Sanctuary of the Tilakaranya Forest Goddess',
      narrator: 'Dr. Sharada Hebbar',
      transcript: 'Located amidst the historic Tilakaranya coconut groves, Banashankari is the tutelary goddess (Kuladevata) of the Chalukya kings. The massive Haridra Tirtha tank is flanked on three sides by colossal tiered stone lamp towers that illuminate festive nights.'
    },
    about: 'Revered as the Mother of the Forest (Vanashankari), this temple has been a living center of Shakti worship since the 7th century CE. It features a square sacred tank with high stone cloistered corridors.',
    architecture: {
      overview: 'Sanctum housing the black stone eight-armed deity seated on a roaring lion, fronted by open corridors and monumental Deepa Stambha lamp pillars.',
      highlights: [
        {
          title: 'Haridra Tirtha Sacred Tank',
          description: 'A square stone reservoir enclosed by pillared porticos where pilgrims offer floating oil lamps.'
        },
        {
          title: 'Triple Tiered Lamp Towers',
          description: 'Imposing multi-tiered stone towers featuring hundreds of stone brackets designed for oil lamps during the Kartika festival.'
        },
        {
          title: 'Eight-Armed Devi Idol',
          description: 'Sculpted in chlorite schist, holding tridents, swords, and severed demon heads while trampling ignorance.'
        }
      ]
    },
    didYouKnow: [
      'The annual Banashankari Jatre (fair) in January-February is one of the largest traditional cultural gatherings in North Karnataka.',
      'The temple is mentioned in the Skanda Purana and Padma Purana as a prime Shakti sanctuary.'
    ],
    epigraphs: [
      {
        language: 'Old Kannada & Sanskrit',
        text: 'ಶ್ರೀ ವನಶಂಕರಿ ಮಹಾದೇವ್ಯೈ ನಮಃ...',
        translation: 'Salutations to the supreme goddess Vanashankari who protects the forest dwelling seekers.'
      }
    ],
    nearbyAttractions: [
      { id: 'badami-cave-1', name: 'Badami Cave Temples', distance: '5 km' },
      { id: 'mahakuta-complex', name: 'Mahakuta Spring Complex', distance: '10 km' }
    ]
  }
];

export const HERITAGE_CATEGORIES = [
  { id: 'all', label: 'All Monuments', icon: 'Sparkles' },
  { id: 'Cave Temples', label: 'Cave Temples', icon: 'Landmark' },
  { id: 'UNESCO World Heritage', label: 'UNESCO Sites', icon: 'Award' },
  { id: 'Temples', label: 'Temples & Guilds', icon: 'Crown' },
  { id: 'Sacred Waters', label: 'Sacred Waters', icon: 'Waves' },
];

export const BAGALKOTE_REGIONS = [
  'All Bagalkote',
  'Badami',
  'Pattadakal',
  'Aihole',
  'Mahakuta',
  'Kudalasangama',
  'Banashankari'
];

/**
 * Haversine formula to compute great-circle distance in kilometers
 */
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Knowledge Layer Helper: Selects trusted Bagalkote heritage context for AI identification
 * based on candidate hints, names, aliases, or GPS proximity.
 * 
 * @param {Object} queryOptions - { monumentHintId, latitude, longitude, query }
 * @returns {Object} { matchedMonument, candidateMonuments, promptContextText }
 */
export function getHeritageKnowledgeContext(queryOptions = {}) {
  const { monumentHintId, latitude, longitude, query } = queryOptions;

  let matched = null;

  // 1. Direct ID match
  if (monumentHintId) {
    matched = HERITAGE_MONUMENTS.find(m => m.id === monumentHintId);
  }

  // 2. Query or alias text match
  if (!matched && query) {
    const q = query.toLowerCase().trim();
    matched = HERITAGE_MONUMENTS.find(m => 
      m.name.toLowerCase().includes(q) ||
      m.id.toLowerCase() === q ||
      (m.aliases && m.aliases.some(a => a.toLowerCase().includes(q))) ||
      m.region.toLowerCase().includes(q)
    );
  }

  // 3. Proximity match if GPS coordinates provided (within Bagalkote region ~60km)
  if (!matched && typeof latitude === 'number' && typeof longitude === 'number') {
    let closestMonument = null;
    let minDistance = Infinity;

    for (const mon of HERITAGE_MONUMENTS) {
      const dist = calculateDistanceKm(latitude, longitude, mon.coordinates.lat, mon.coordinates.lng);
      if (dist < minDistance && dist <= 65) {
        minDistance = dist;
        closestMonument = mon;
      }
    }
    if (closestMonument) {
      matched = closestMonument;
    }
  }

  // Fallback to primary heritage reference
  matched = matched || HERITAGE_MONUMENTS[0];

  // Concise prompt-ready context string for future Gemini integration
  const promptContextText = [
    `Trusted Bagalkote Heritage Knowledge Context:`,
    `- Monument: ${matched.name} (Aliases: ${matched.aliases?.join(', ') || 'N/A'})`,
    `- Dynasty & Era: ${matched.period} | Patrons: ${matched.builder}`,
    `- Architectural Style: ${matched.architecturalStyle}`,
    `- Significance: ${matched.historicalSignificance}`,
    `- Distinctive Architectural Features: ${matched.distinctiveArchitecturalFeatures?.join('; ')}`,
    `- Key Structures in Cluster: ${matched.keyStructures?.join(', ')}`,
    `- Location: ${matched.location} (${matched.coordinates.lat}°N, ${matched.coordinates.lng}°E)`
  ].join('\n');

  return {
    matchedMonument: matched,
    allMonuments: HERITAGE_MONUMENTS,
    promptContextText
  };
}
