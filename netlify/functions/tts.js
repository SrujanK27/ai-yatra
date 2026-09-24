import https from 'https';

/**
 * High-definition server-side TTS proxy for Indian Regional Languages (Kannada, Indian English)
 * Proxies speech requests to Google's neural TTS engine without browser CORS or origin restrictions.
 */
export async function handler(event, context) {
  // Support GET and POST
  let text = '';
  let lang = 'kn';

  if (event.httpMethod === 'GET') {
    const params = event.queryStringParameters || {};
    text = params.text || '';
    lang = params.lang || 'kn';
  } else if (event.httpMethod === 'POST') {
    try {
      const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      text = body?.text || '';
      lang = body?.lang || 'kn';
    } catch (e) {
      text = '';
    }
  }

  if (!text || text.trim().length === 0) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Text parameter is required' })
    };
  }

  const cleanText = text.trim().slice(0, 200);
  const targetLang = (lang === 'KN' || lang === 'kn' || lang === 'kannada') ? 'kn' : (lang === 'EN' || lang === 'en' || lang === 'en-IN') ? 'en-IN' : lang;

  const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${targetLang}&client=tw-ob&q=${encodeURIComponent(cleanText)}`;

  try {
    const audioBuffer = await new Promise((resolve, reject) => {
      const req = https.get(ttsUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://translate.google.com/'
        },
        timeout: 8000
      }, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`TTS service returned status code ${res.statusCode}`));
          return;
        }

        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      });

      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('TTS request timed out'));
      });
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      isBase64Encoded: true,
      body: audioBuffer.toString('base64')
    };
  } catch (error) {
    console.error('TTS Proxy Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Failed to synthesize speech', details: error.message })
    };
  }
}
