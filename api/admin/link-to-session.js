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

  // Verify admin authentication
  const user = verifyToken(req);
  if (!user) {
    return res.status(401).json({ error: 'Niet geautoriseerd' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const client = await pool.connect();

  try {
    const { registrationIds, sessionIds, duplicateForMultiple } = req.body;

    if (!registrationIds || !Array.isArray(registrationIds) || registrationIds.length === 0) {
      return res.status(400).json({ error: 'registrationIds (array) is verplicht' });
    }

    if (!sessionIds || !Array.isArray(sessionIds) || sessionIds.length === 0) {
      return res.status(400).json({ error: 'sessionIds (array) is verplicht' });
    }

    if (sessionIds.length === 1) {
      // Enkele sessie - gewoon session_id updaten
      await client.query(`
        UPDATE aanmeldingen
        SET session_id = $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = ANY($2)
      `, [sessionIds[0], registrationIds]);

      return res.status(200).json({
        success: true,
        message: `${registrationIds.length} aanmelding(en) gekoppeld aan sessie`
      });

    } else if (duplicateForMultiple) {
      // Meerdere sessies - dupliceer aanmeldingen
      let totalCreated = 0;

      for (const sessionId of sessionIds) {
        const result = await client.query(`
          INSERT INTO aanmeldingen (
            first_name, middle_name, last_name,
            birth_date, birth_place, bsn,
            email, phone,
            street, house_number, postal_code, city, country,
            org_name, contact_name, contact_email,
            trainings, message,
            session_id, status
          )
          SELECT 
            first_name, middle_name, last_name,
            birth_date, birth_place, bsn,
            email, phone,
            street, house_number, postal_code, city, country,
            org_name, contact_name, contact_email,
            trainings, message,
            $1, status
          FROM aanmeldingen
          WHERE id = ANY($2)
          RETURNING id
        `, [sessionId, registrationIds]);

        totalCreated += result.rowCount;
      }

      // Verwijder originele aanmeldingen (nu gekoppeld aan sessies)
      await client.query(`
        DELETE FROM aanmeldingen WHERE id = ANY($1)
      `, [registrationIds]);

      return res.status(200).json({
        success: true,
        message: `${totalCreated} inschrijvingen aangemaakt over ${sessionIds.length} sessies`
      });

    } else {
      return res.status(400).json({ 
        error: 'Voor meerdere sessies moet duplicateForMultiple true zijn' 
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
