import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import { mkdir, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

interface EnquiryPayload {
  name?: unknown;
  email?: unknown;
  business?: unknown;
  message?: unknown;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  app.post('/api/discovery-call', async (req: Request, res: Response) => {
    const body = (req.body ?? {}) as EnquiryPayload;

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const business = typeof body.business === 'string' ? body.business.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    const fieldErrors: Record<string, string> = {};

    if (!name || name.length < 2) {
      fieldErrors.name = 'Please enter your name.';
    } else if (name.length > 120) {
      fieldErrors.name = 'Name must be 120 characters or fewer.';
    }

    if (!email || !EMAIL_PATTERN.test(email)) {
      fieldErrors.email = 'Please enter a valid work email address.';
    } else if (email.length > 180) {
      fieldErrors.email = 'Email must be 180 characters or fewer.';
    }

    if (!business || business.length < 2) {
      fieldErrors.business = 'Please share your business name or website.';
    } else if (business.length > 200) {
      fieldErrors.business = 'Business name or website must be 200 characters or fewer.';
    }

    if (!message || message.length < 10) {
      fieldErrors.message = 'Please share a brief note on what you would like help with (at least 10 characters).';
    } else if (message.length > 2500) {
      fieldErrors.message = 'Message must be 2,500 characters or fewer.';
    }

    if (Object.keys(fieldErrors).length > 0) {
      res.status(400).json({
        ok: false,
        error: 'Please check the highlighted fields and try again.',
        fieldErrors,
      });
      return;
    }

    const submission = {
      id: randomUUID(),
      name,
      email,
      business,
      message,
      receivedAt: new Date().toISOString(),
    };

    try {
      const dataDir = path.join(__dirname, 'data');
      await mkdir(dataDir, { recursive: true });
      await appendFile(
        path.join(dataDir, 'enquiries.ndjson'),
        `${JSON.stringify(submission)}\n`,
        'utf8'
      );

      const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
      if (webhookUrl) {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(submission),
        });

        if (!webhookResponse.ok) {
          throw new Error(`Webhook delivery returned status ${webhookResponse.status}`);
        }
      }

      res.status(201).json({
        ok: true,
        id: submission.id,
        receivedAt: submission.receivedAt,
      });
    } catch (err) {
      console.error('Failed to process discovery call submission:', err);
      res.status(502).json({
        ok: false,
        error: 'We could not deliver your request right now. Please email info@intentbureau.club directly.',
      });
    }
  });

  app.all('/api/*', (_req: Request, res: Response) => {
    res.status(404).json({ ok: false, error: 'Endpoint not found.' });
  });

  if (IS_PROD) {
    const distDir = path.join(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Intent Bureau server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
