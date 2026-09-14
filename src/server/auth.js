// JWT Authentication utilities voor admin endpoints
import jwt from 'jsonwebtoken';

// Bewust GEEN fallback-waarden: ontbreken de env vars, dan faalt auth
// gesloten (niemand kan inloggen) in plaats van open met bekende defaults.
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Genereer JWT token
export function generateToken(username) {
  if (!JWT_SECRET) throw new Error('JWT_SECRET ontbreekt');
  return jwt.sign(
    { username, role: 'admin' },
    JWT_SECRET,
    { expiresIn: '7d' } // Token geldig voor 7 dagen
  );
}

// Verifieer JWT token
export function verifyToken(token) {
  try {
    if (!JWT_SECRET) return null;
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Check admin credentials
export function validateAdminCredentials(username, password) {
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) return false;
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

// Middleware: Extract en verify token uit request
export function authenticateRequest(req) {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { authenticated: false, error: 'Geen token gevonden' };
  }

  const token = authHeader.substring(7); // Remove 'Bearer '
  const decoded = verifyToken(token);

  if (!decoded) {
    return { authenticated: false, error: 'Ongeldig of verlopen token' };
  }

  return { authenticated: true, user: decoded };
}
