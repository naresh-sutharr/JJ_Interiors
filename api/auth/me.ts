import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyToken, parseCookies } from '../utils/auth';

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
