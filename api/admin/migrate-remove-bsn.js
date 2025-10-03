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
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify admin authentication
  const user = verifyToken(req);
  if (!user) {
    return res.status(401).json({ error: 'Niet geautoriseerd' });
  }

  const client = await pool.connect();

  try {
    // Check if column exists first
    const checkColumn = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'aanmeldingen' 
      AND column_name = 'bsn'
    `);

    if (checkColumn.rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'BSN kolom bestaat niet meer (al verwijderd)',
        alreadyRemoved: true
      });
    }

    // Remove BSN column
    await client.query(`
      ALTER TABLE aanmeldingen DROP COLUMN bsn
    `);

    console.log('✅ BSN kolom verwijderd uit database');

    return res.status(200).json({
      success: true,
      message: 'BSN kolom succesvol verwijderd uit database',
      alreadyRemoved: false
    });

  } catch (error) {
    console.error('Migration error:', error);
    return res.status(500).json({
      error: 'Database migratie fout',
      details: error.message
    });
  } finally {
    client.release();
  }
}
