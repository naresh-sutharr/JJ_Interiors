import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const isProd = process.env.NODE_ENV === 'production';
  // Clear the auth cookie by setting a past expiration date
  res.setHeader('Set-Cookie', `auth_token=; Path=/; HttpOnly; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT${isProd ? '; Secure' : ''}`);

  return res.status(200).json({ success: true });
}
