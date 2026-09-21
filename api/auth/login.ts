import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { signToken } from '../utils/auth';
import { initialBusinessProfile } from '../../src/data/initialData';

// Basic memory rate limiting (resets on serverless cold starts)
const rateLimit = new Map<string, { count: number, timestamp: number }>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Rate Limiting Logic
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const ipStr = Array.isArray(ip) ? ip[0] : ip;
  const now = Date.now();
  const rate = rateLimit.get(ipStr);
  
  if (rate) {
    if (now - rate.timestamp < 60000) { // 1 minute window
      if (rate.count >= 5) {
        return res.status(429).json({ error: 'Too many login attempts. Please try again later.' });
      }
      rateLimit.set(ipStr, { count: rate.count + 1, timestamp: rate.timestamp });
    } else {
      rateLimit.set(ipStr, { count: 1, timestamp: now });
    }
  } else {
    rateLimit.set(ipStr, { count: 1, timestamp: now });
  }

  try {
    const { email, password } = req.body || {};
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Configured admin email (fallback to business profile if env is malformed/missing)
    const configuredEmail = process.env.ADMIN_EMAIL || initialBusinessProfile.email;
    const configuredHash = process.env.ADMIN_PASSWORD_HASH;

    if (!configuredHash) {
      console.error('CRITICAL: ADMIN_PASSWORD_HASH environment variable is missing.');
      return res.status(500).json({ error: 'Server authentication misconfigured.' });
    }

    if (email.toLowerCase() !== configuredEmail.toLowerCase()) {
      // Intentionally generic error
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Validate password using scrypt
    const [salt, key] = configuredHash.split(':');
    if (!salt || !key) {
      return res.status(500).json({ error: 'Server authentication hash malformed.' });
    }

    const hashedBuffer = crypto.scryptSync(password, salt, 64);
    const keyBuffer = Buffer.from(key, 'hex');
    const match = crypto.timingSafeEqual(hashedBuffer, keyBuffer);

    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Success! Generate token
    const user = {
      id: 'admin-1',
      email: configuredEmail,
      name: initialBusinessProfile.ownerName,
      role: 'Administrator'
    };
    
    const token = signToken({ user, exp: Date.now() + 1000 * 60 * 60 * 24 }); // 24 hours
    
    // Set HttpOnly Cookie
    const isProd = process.env.NODE_ENV === 'production';
    res.setHeader('Set-Cookie', `auth_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400${isProd ? '; Secure' : ''}`);

    // Do NOT return the password or hash
    return res.status(200).json({
      success: true,
      user
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
