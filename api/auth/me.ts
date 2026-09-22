import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

function verifyToken(token: string): any {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payload, signature] = parts;
  const secret = process.env.SESSION_SECRET || 'fallback-dev-secret-do-not-use-in-prod';
  const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    try {
      return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    } catch (e) {
      return null;
    }
  }
  return null;
}

function parseCookies(req: any): Record<string, string> {
  const list: Record<string, string> = {};
  const rc = req.headers.cookie;
  rc && rc.split(';').forEach(function(cookie: string) {
      const parts = cookie.split('=');
      const key = parts.shift()?.trim();
      if (key) list[key] = decodeURI(parts.join('='));
  });
  return list;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const cookies = parseCookies(req);
  const token = cookies.auth_token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const payload = verifyToken(token);

  if (!payload || !payload.user || payload.exp < Date.now()) {
    return res.status(401).json({ error: 'Unauthorized or session expired' });
  }

  return res.status(200).json({
    success: true,
    user: payload.user
  });
}
