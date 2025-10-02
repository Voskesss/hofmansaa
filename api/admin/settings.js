import pg from 'pg';
import jwt from 'jsonwebtoken';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Verify JWT token
function verifyToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-this');
  } catch (error) {
    return null;
  }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Verify admin authentication
  const user = verifyToken(req);
  if (!user) {
    return res.status(401).json({ error: 'Niet geautoriseerd' });
  }

  const client = await pool.connect();

  try {
    // GET - Haal alle settings op
    if (req.method === 'GET') {
      const result = await client.query('SELECT * FROM system_settings ORDER BY setting_key');

      return res.status(200).json({
        success: true,
        data: result.rows
      });
    }

    // PUT - Update setting
    if (req.method === 'PUT') {
      const { setting_key, setting_value } = req.body;

      if (!setting_key || setting_value === undefined) {
        return res.status(400).json({ 
          error: 'setting_key en setting_value zijn verplicht' 
        });
      }

      const result = await client.query(`
        UPDATE system_settings
        SET setting_value = $1, updated_at = CURRENT_TIMESTAMP
        WHERE setting_key = $2
        RETURNING *
      `, [setting_value, setting_key]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Setting niet gevonden' });
      }

      return res.status(200).json({
        success: true,
        message: 'Setting succesvol bijgewerkt',
        data: result.rows[0]
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({
      error: 'Database fout',
      details: error.message
    });
  } finally {
    client.release();
  }
}
