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
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
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
    // GET - Haal alle sessies op
    if (req.method === 'GET') {
      const result = await client.query(`
        SELECT 
          s.*,
          COUNT(a.id) as registered_count
        FROM training_sessions s
        LEFT JOIN aanmeldingen a ON s.id = a.session_id
        GROUP BY s.id
        ORDER BY s.session_date ASC, s.start_time ASC
      `);

      return res.status(200).json({
        success: true,
        data: result.rows
      });
    }

    // POST - Maak nieuwe sessie aan
    if (req.method === 'POST') {
      const {
        training_type,
        session_date,
        start_time,
        end_time,
        location,
        max_participants,
        description
      } = req.body;

      // Validatie
      if (!training_type || !session_date || !start_time || !end_time || !location) {
        return res.status(400).json({
          error: 'Verplichte velden ontbreken: training_type, session_date, start_time, end_time, location'
        });
      }

      const result = await client.query(`
        INSERT INTO training_sessions 
          (training_type, session_date, start_time, end_time, location, max_participants, description, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, 'open')
        RETURNING *
      `, [training_type, session_date, start_time, end_time, location, max_participants || 12, description || '']);

      return res.status(201).json({
        success: true,
        message: 'Sessie succesvol aangemaakt',
        data: result.rows[0]
      });
    }

    // PUT - Update bestaande sessie
    if (req.method === 'PUT') {
      const {
        id,
        training_type,
        session_date,
        start_time,
        end_time,
        location,
        max_participants,
        status,
        description
      } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Sessie ID is verplicht' });
      }

      const result = await client.query(`
        UPDATE training_sessions
        SET 
          training_type = COALESCE($1, training_type),
          session_date = COALESCE($2, session_date),
          start_time = COALESCE($3, start_time),
          end_time = COALESCE($4, end_time),
          location = COALESCE($5, location),
          max_participants = COALESCE($6, max_participants),
          status = COALESCE($7, status),
          description = COALESCE($8, description),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $9
        RETURNING *
      `, [training_type, session_date, start_time, end_time, location, max_participants, status, description, id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Sessie niet gevonden' });
      }

      return res.status(200).json({
        success: true,
        message: 'Sessie succesvol bijgewerkt',
        data: result.rows[0]
      });
    }

    // DELETE - Verwijder sessie
    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Sessie ID is verplicht' });
      }

      // Check of er aanmeldingen zijn
      const checkResult = await client.query(
        'SELECT COUNT(*) as count FROM aanmeldingen WHERE session_id = $1',
        [id]
      );

      if (parseInt(checkResult.rows[0].count) > 0) {
        return res.status(400).json({
          error: 'Kan sessie niet verwijderen: er zijn nog aanmeldingen gekoppeld'
        });
      }

      await client.query('DELETE FROM training_sessions WHERE id = $1', [id]);

      return res.status(200).json({
        success: true,
        message: 'Sessie succesvol verwijderd'
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
