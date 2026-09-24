import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handler as analyzeHandler } from './netlify/functions/analyze.js';
import { handler as ttsHandler } from './netlify/functions/tts.js';

/**
 * Local development middleware to route /api/analyze and /api/tts directly to Netlify function handlers
 * during `npm run dev`, providing exact parity with Netlify Serverless environment.
 */
function localServerlessPlugin() {
  return {
    name: 'local-serverless-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        const pathname = url.pathname;

        const isAnalyzeRoute = pathname === '/api/analyze' || pathname === '/.netlify/functions/analyze';
        const isTtsRoute = pathname === '/api/tts' || pathname === '/.netlify/functions/tts';

        if (isAnalyzeRoute || isTtsRoute) {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const queryParams = Object.fromEntries(url.searchParams.entries());
              const handler = isAnalyzeRoute ? analyzeHandler : ttsHandler;

              const result = await handler({
                httpMethod: req.method,
                body: body,
                queryStringParameters: queryParams,
                headers: req.headers
              }, {});

              res.statusCode = result.statusCode || 200;
              for (const [key, value] of Object.entries(result.headers || {})) {
                res.setHeader(key, value);
              }

              if (result.isBase64Encoded && result.body) {
                const buffer = Buffer.from(result.body, 'base64');
                res.end(buffer);
              } else {
                res.end(result.body || '');
              }
            } catch (err) {
              console.error('Serverless dev middleware error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Internal Server Error', message: err.message }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localServerlessPlugin()],
  server: {
    port: 3000,
    host: true,
    open: false
  }
});

