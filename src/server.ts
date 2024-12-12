import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';
import bootstrap from './main.server';
import cors from 'cors';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

const app = express();
const commonEngine = new CommonEngine();

app.use(cors());
app.use(express.json());

app.post('/verify-recaptcha', (req, res) => {
  const { token } = req.body;
  const secretKey = '';
  console.log

  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  https.get(verificationUrl, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      const result = JSON.parse(data);
      if (result.success) {
        res.json({ success: true, score: result.score });
      } else {
        res.json({ success: false, error: result['error-codes'] });
      }
    });
  }).on('error', (error) => {
    res.status(500).json({ success: false, error: error.message });
  });
});

app.post('/verify-recaptcha-v3', (req, res) => {
  const { token } = req.body;
  const secretKeyV3 = ""
  console.log

  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKeyV3}&response=${token}`;

  https.get(verificationUrl, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      const result = JSON.parse(data);
      if (result.success) {
        res.json({ success: true, score: result.score });
      } else {
        res.json({ success: false, error: result['error-codes'] });
      }
    });
  }).on('error', (error) => {
    res.status(500).json({ success: false, error: error.message });
  });
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.get(
  '**',
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html'
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.get('**', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;

  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })
    .then((html) => res.send(html))
    .catch((err) => next(err));
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });

  app.use(cors());
}
