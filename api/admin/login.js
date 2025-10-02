// POST /api/admin/login - Admin login met username/password
import { validateAdminCredentials, generateToken } from '../_lib/auth.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Alleen POST toegestaan' });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username en password vereist' });
    }

    // Valideer credentials
    const isValid = validateAdminCredentials(username, password);

    if (!isValid) {
      console.warn('❌ Failed login attempt:', username);
      return res.status(401).json({ error: 'Ongeldige inloggegevens' });
    }

    // Genereer JWT token
    const token = generateToken(username);

    console.log('✅ Admin login successful:', username);

    return res.status(200).json({
      success: true,
      message: 'Login succesvol',
      token,
      user: {
        username,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server fout bij login' });
  }
}
