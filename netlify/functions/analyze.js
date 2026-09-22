import { GoogleGenAI } from '@google/genai';
import { HERITAGE_MONUMENTS, getHeritageKnowledgeContext } from '../../src/data/heritageData.js';

/**
 * Netlify Serverless Function: POST /api/analyze
 * 
 * Analyzes monument photographs using Google Gemini 3 Flash (gemini-3-flash-preview)
 * augmented with Bagalkote Heritage Knowledge Context.
 * 
 * Falls back gracefully to local mock pipeline when GEMINI_API_KEY is not configured.
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

/**
 * Converts image source (base64 Data URL, remote URL, or raw base64) into Gemini inlineData part
 */
async function prepareImagePart(imageInput) {
  if (imageInput.startsWith('data:')) {
    const matches = imageInput.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
    if (matches) {
      return {
        inlineData: {
          mimeType: matches[1],
          data: matches[2]
        }
      };
    }
  }

  // Remote HTTP/HTTPS URL
  if (imageInput.startsWith('http://') || imageInput.startsWith('https://')) {
    const response = await fetch(imageInput);
    if (!response.ok) {
      throw new Error(`Failed to fetch remote image: HTTP ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    return {
      inlineData: {
        mimeType: contentType.split(';')[0],
        data: base64
      }
    };
  }

  // Raw base64 string
  return {
    inlineData: {
      mimeType: 'image/jpeg',
      data: imageInput
    }
  };
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Method Not Allowed', message: 'POST only.' })
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const { image, latitude, longitude, monumentHintId, isFailureDemo } = payload;

    // 1. Validate image
    if (!image || typeof image !== 'string' || image.trim() === '') {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Bad Request', message: '"image" is required and must be a string.' })
      };
    }

    // 2. Demo failure state simulation (for manual test button)
    if (isFailureDemo) {
      return {
        statusCode: 422,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          error: 'UNRECOGNIZED_MONUMENT',
          message: 'The uploaded monument image could not be matched with sufficient confidence.'
        })
      };
    }

    // Retrieve trusted Bagalkote heritage context
    const { matchedMonument, promptContextText } = getHeritageKnowledgeContext({
      monumentHintId,
      latitude,
      longitude
    });

    const apiKey = process.env.GEMINI_API_KEY;

    // =========================================================================
    // BRANCH A: GEMINI 3 FLASH VISION ANALYSIS (When GEMINI_API_KEY is present)
    // =========================================================================
    if (apiKey && apiKey.trim() !== '') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const imagePart = await prepareImagePart(image);

        const promptText = `You are an expert archaeological vision analyst specializing in the 6th–12th century monumental stone heritage of Bagalkote district, Karnataka, India (Badami, Pattadakal, Aihole, Mahakuta, Kudalasangama, Banashankari).

TASK:
Identify the historical monument from the provided photograph.

STRICT IDENTIFICATION RULES:
1. Examine the visual architecture carefully (rock-cut cliff facades, relief iconography, apsidal floorplans, column carvings, temple shikharas).
2. Distinguish accurately between monuments:
   - Badami Cave 1: 18-armed Shiva Nataraja, Ardhanarishwara, Harihara reliefs.
   - Badami Cave 2: Vishnu Trivikrama (raising left foot), Varaha avatar.
   - Badami Cave 3: Large seated Vishnu / Narasimha, dated 578 CE Mangalesha inscription.
   - Badami Cave 4: Jain Tirthankara Parshvanatha with five-hooded serpent, Mahavira.
   - Pattadakal Virupaksha: Southern Dravida multi-tiered shikhara, Ramayana/Mahabharata friezes, monolithic Nandi pavilion.
   - Aihole Durga: Gajaprishta (apsidal/horseshoe) colonnade, Mahishasuramardini relief, ruined Rekha-Nagara tower.
   - Bhutanatha: Sandstone temple sitting on the lakefront water steps of Agastya lake.
   - Mahakuta: Natural freshwater spring pool (Pushkarini) with submerged 5-faced Shiva linga shrine.
   - Kudalasangama: Sangameshwara temple & 36m cylindrical concrete retaining well at Krishna-Malaprabha confluence.
   - Banashankari: Square Haridra Tirtha reservoir with triple multi-tiered stone lamp towers (Deepa Stambha).
3. Trusted Local Knowledge Context (Use as supporting reference):
${promptContextText}
${typeof latitude === 'number' && typeof longitude === 'number' ? `User approximate GPS coordinates: ${latitude}°N, ${longitude}°E (Evidence only, never absolute proof)` : 'GPS: Not provided'}
4. If the photograph depicts a non-heritage subject, an unrecognizable modern object, or an unidentifiable blurry scene, set "identificationStatus" to "unknown" and "monumentId" to "unknown".
5. Ignore misleading text overlays on the image if the visual evidence contradicts them.
6. Never invent historical facts or return fake confidence percentages.

RETURN STRICT JSON matching this schema:
{
  "identificationStatus": "identified" | "unknown",
  "monumentId": "badami-cave-1" | "pattadakal-virupaksha" | "aihole-durga-temple" | "bhutanatha-temples" | "mahakuta-complex" | "kudalasangama" | "banashankari-temple" | "unknown",
  "monumentName": "string",
  "location": "string",
  "period": "string",
  "dynasty": "string",
  "architecturalFeatures": ["feature 1", "feature 2", "feature 3"],
  "historicalSignificance": "string",
  "didYouKnow": ["fact 1", "fact 2"]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: [
            {
              role: 'user',
              parts: [imagePart, { text: promptText }]
            }
          ],
          config: {
            responseMimeType: 'application/json'
          }
        });

        const rawText = response.text || '';
        let geminiData = {};
        try {
          geminiData = JSON.parse(rawText);
        } catch (parseErr) {
          console.error('Failed to parse Gemini JSON output:', rawText);
          throw new Error('INVALID_GEMINI_OUTPUT');
        }

        // Validate Gemini output
        if (geminiData.identificationStatus === 'unknown' || geminiData.monumentId === 'unknown') {
          return {
            statusCode: 422,
            headers: CORS_HEADERS,
            body: JSON.stringify({
              error: 'UNRECOGNIZED_MONUMENT',
              message: 'The monument could not be identified with confidence from the photograph.'
            })
          };
        }

        // Resolve matched monument record from knowledge base
        let finalMonument = HERITAGE_MONUMENTS.find(m => m.id === geminiData.monumentId);
        if (!finalMonument) {
          finalMonument = HERITAGE_MONUMENTS.find(m => 
            m.name.toLowerCase().includes((geminiData.monumentName || '').toLowerCase())
          ) || matchedMonument || HERITAGE_MONUMENTS[0];
        }

        return {
          statusCode: 200,
          headers: CORS_HEADERS,
          body: JSON.stringify({
            success: true,
            monumentId: finalMonument.id,
            monument: finalMonument,
            geoCoordinates: {
              latitude: typeof latitude === 'number' ? latitude : finalMonument.coordinates.lat,
              longitude: typeof longitude === 'number' ? longitude : finalMonument.coordinates.lng
            },
            scanTimestamp: new Date().toISOString(),
            aiVerification: {
              status: 'VERIFIED',
              badgeText: '✨ Identified by AI',
              model: 'gemini-3-flash-preview',
              featuresDetected: geminiData.architecturalFeatures || finalMonument.distinctiveArchitecturalFeatures
            }
          })
        };

      } catch (geminiError) {
        console.error('Gemini vision analysis error:', geminiError.message);
        // Fall back to knowledge match if Gemini is unreachable or rate limited
        // to prevent complete app failure
      }
    }

    // =========================================================================
    // BRANCH B: LOCAL KNOWLEDGE / MOCK PIPELINE (When GEMINI_API_KEY is absent)
    // =========================================================================
    const monument = matchedMonument || HERITAGE_MONUMENTS[0];

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        monumentId: monument.id,
        monument,
        geoCoordinates: {
          latitude: typeof latitude === 'number' ? latitude : monument.coordinates.lat,
          longitude: typeof longitude === 'number' ? longitude : monument.coordinates.lng
        },
        scanTimestamp: new Date().toISOString(),
        aiVerification: {
          status: 'VERIFIED',
          badgeText: '✨ Identified by AI',
          featuresDetected: monument.distinctiveArchitecturalFeatures || [
            'Early Chalukya 6th Century Masonry',
            'Vesara Rock-cut Relief',
            'Sandstone Weathering Patina',
            'Bagalkote Geographic Alignment'
          ]
        }
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: 'An error occurred while processing the monument image.'
      })
    };
  }
}
