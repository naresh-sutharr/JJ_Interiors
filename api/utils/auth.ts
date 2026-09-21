import crypto from 'crypto';

export function signToken(data: object): string {
  const secret = process.env.SESSION_SECRET || 'fallback-dev-secret-do-not-use-in-prod';
  const payload = Buffer.from(JSON.stringify(data)).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function verifyToken(token: string): any {
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

export function parseCookies(req: any): Record<string, string> {
  const list = {};
  const rc = req.headers.cookie;
  rc && rc.split(';').forEach(function(cookie: string) {
      const parts = cookie.split('=');
      list[parts.shift()?.trim() || ''] = decodeURI(parts.join('='));
  });
  return list;
}
