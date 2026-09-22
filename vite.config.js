import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handler as analyzeHandler } from './netlify/functions/analyze.js';

/**
 * Local development middleware to route /api/analyze directly to Netlify function handler
 * during `npm run dev`, providing exact parity with Netlify Serverless environment.
 */
function localServerlessPlugin() {
  return {
    name: 'local-serverless-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/analyze' || req.url?.startsWith('/api/analyze?')) {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const result = await analyzeHandler({
                httpMethod: req.method,
                body: body,
                headers: req.headers
              }, {});

              res.statusCode = result.statusCode;
              for (const [key, value] of Object.entries(result.headers || {})) {
                res.setHeader(key, value);
              }
              res.end(result.body);
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
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
    open: false
  }
});
