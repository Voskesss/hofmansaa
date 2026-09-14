import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const client = await pool.connect();

  try {
    const { key } = req.query;

    if (key) {
      // Haal specifieke setting op
      const result = await client.query(
        'SELECT * FROM system_settings WHERE setting_key = $1',
        [key]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Setting niet gevonden' });
      }

      return res.status(200).json({
        success: true,
        data: result.rows[0]
      });
    } else {
      // Haal alle settings op
      const result = await client.query('SELECT * FROM system_settings ORDER BY setting_key');

      return res.status(200).json({
        success: true,
        data: result.rows
      });
    }

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
