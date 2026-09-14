// JWT Authentication utilities voor admin endpoints
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default-dev-secret-change-in-production';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme123';

// Genereer JWT token
export function generateToken(username) {
  return jwt.sign(
    { username, role: 'admin' },
    JWT_SECRET,
    { expiresIn: '7d' } // Token geldig voor 7 dagen
  );
}

// Verifieer JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Check admin credentials
export function validateAdminCredentials(username, password) {
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
