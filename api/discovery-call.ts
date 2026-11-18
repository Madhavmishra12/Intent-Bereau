import { randomUUID } from 'node:crypto';

interface VercelRequest {
  method?: string;
  body?: unknown;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

interface EnquiryPayload {
  name?: unknown;
  email?: unknown;
  business?: unknown;
  message?: unknown;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ ok: false, error: 'Method not allowed.' });
    return;
  }

  let parsedBody = req.body;
  if (typeof parsedBody === 'string') {
    try {
      parsedBody = JSON.parse(parsedBody);
    } catch {
      parsedBody = {};
    }
  }

  const body = (parsedBody ?? {}) as EnquiryPayload;

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
    fieldErrors.message =
      'Please share a brief note on what you would like help with (at least 10 characters).';
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

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    res.status(503).json({
      ok: false,
      error:
        'Form delivery is not configured yet. Please email info@intentbureau.club directly.',
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

    res.status(201).json({
      ok: true,
      id: submission.id,
      receivedAt: submission.receivedAt,
    });
  } catch (err) {
    console.error('Failed to process discovery call submission:', err);
    res.status(502).json({
      ok: false,
      error:
        'We could not deliver your request right now. Please email info@intentbureau.club directly.',
    });
  }
}
