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
    const { training_type } = req.query;

    let query = `
      SELECT 
        s.id,
        s.training_type,
        s.session_date,
        s.start_time,
        s.end_time,
        s.location,
        s.max_participants,
        s.description,
        COUNT(a.id) as registered_count,
        (s.max_participants - COUNT(a.id)) as available_spots
      FROM training_sessions s
      LEFT JOIN aanmeldingen a ON s.id = a.session_id
      WHERE s.status = 'open'
        AND s.session_date >= CURRENT_DATE
    `;

    const params = [];

    // Filter op training type indien opgegeven
    if (training_type) {
      params.push(training_type);
      query += ` AND s.training_type = $1`;
    }

    query += `
      GROUP BY s.id
      HAVING COUNT(a.id) < s.max_participants
      ORDER BY s.session_date ASC, s.start_time ASC
    `;

    const result = await client.query(query, params);

    return res.status(200).json({
      success: true,
      data: result.rows
    });

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
