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
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
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
    // GET - Haal deelnemers van specifieke sessie op
    if (req.method === 'GET') {
      const { sessionId } = req.query;

      if (!sessionId) {
        return res.status(400).json({ error: 'Session ID is verplicht' });
      }

      // Haal sessie info op
      const sessionResult = await client.query(`
        SELECT s.*, COUNT(a.id) as participant_count
        FROM training_sessions s
        LEFT JOIN aanmeldingen a ON s.id = a.session_id
        WHERE s.id = $1
        GROUP BY s.id
      `, [sessionId]);

      if (sessionResult.rows.length === 0) {
        return res.status(404).json({ error: 'Sessie niet gevonden' });
      }

      // Haal deelnemers op (ALLE velden voor Excel export)
      const participantsResult = await client.query(`
        SELECT 
          id, first_name, middle_name, last_name,
          birth_date, birth_place,
          email, phone,
          street, house_number, postal_code, city, country,
          org_name, contact_name, contact_email,
          trainings, message, status, session_id, created_at
        FROM aanmeldingen
        WHERE session_id = $1
        ORDER BY created_at DESC
      `, [sessionId]);

      return res.status(200).json({
        success: true,
        session: sessionResult.rows[0],
        participants: participantsResult.rows
      });
    }

    // PUT - Verplaats of dupliceer aanmeldingen
    if (req.method === 'PUT') {
      const { action, participantIds, targetSessionId } = req.body;

      if (!action || !participantIds || !Array.isArray(participantIds) || participantIds.length === 0) {
        return res.status(400).json({ 
          error: 'Action en participantIds (array) zijn verplicht' 
        });
      }

      if (!targetSessionId) {
        return res.status(400).json({ error: 'Target session ID is verplicht' });
      }

      if (action === 'move') {
        // VERPLAATSEN - Update session_id
        await client.query(`
          UPDATE aanmeldingen
          SET session_id = $1, updated_at = CURRENT_TIMESTAMP
          WHERE id = ANY($2)
        `, [targetSessionId, participantIds]);

        return res.status(200).json({
          success: true,
          message: `${participantIds.length} deelnemer(s) verplaatst naar nieuwe sessie`
        });

      } else if (action === 'duplicate') {
        // DUPLICEREN - Maak kopieën met nieuwe session_id
        const result = await client.query(`
          INSERT INTO aanmeldingen (
            first_name, middle_name, last_name,
            birth_date, birth_place,
            email, phone,
            street, house_number, postal_code, city, country,
            org_name, contact_name, contact_email,
            trainings, message,
            session_id, status
          )
          SELECT 
            first_name, middle_name, last_name,
            birth_date, birth_place,
            email, phone,
            street, house_number, postal_code, city, country,
            org_name, contact_name, contact_email,
            trainings, message,
            $1, status
          FROM aanmeldingen
          WHERE id = ANY($2)
          RETURNING id
        `, [targetSessionId, participantIds]);

        return res.status(200).json({
          success: true,
          message: `${result.rowCount} extra inschrijving(en) toegevoegd`,
          newIds: result.rows.map(r => r.id)
        });

      } else {
        return res.status(400).json({ error: 'Ongeldige action (moet "move" of "duplicate" zijn)' });
      }
    }

    // POST - Voeg handmatig nieuwe deelnemer toe aan sessie
    if (req.method === 'POST') {
      const {
        sessionId,
        firstName,
        middleName,
        lastName,
        birthDate,
        birthPlace,
        email,
        phone,
        street,
        houseNumber,
        postalCode,
        city,
        country,
        orgName,
        contactName,
        contactEmail,
        training,
        message
      } = req.body;

      if (!sessionId || !firstName || !lastName || !email) {
        return res.status(400).json({ 
          error: 'SessionId, firstName, lastName en email zijn verplicht' 
        });
      }

      // trainings moet een array zijn voor de database
      const trainingsArray = training ? [training] : ['Niet opgegeven'];

      const result = await client.query(`
        INSERT INTO aanmeldingen (
          first_name, middle_name, last_name,
          birth_date, birth_place,
          email, phone,
          street, house_number, postal_code, city, country,
          org_name, contact_name, contact_email,
          trainings, session_id, status, message
        ) VALUES (
          $1, $2, $3,
          $4, $5, $6,
          $7, $8,
          $9, $10, $11, $12, $13,
          $14, $15, $16,
          $17, $18, 'nieuw', $19
        )
        RETURNING id, created_at
      `, [
        firstName, 
        middleName || '', 
        lastName,
        birthDate || '2000-01-01', 
        birthPlace || 'Onbekend',
        email, 
        phone || '',
        street || 'n.v.t.', 
        houseNumber || '0', 
        postalCode || '0000AA', 
        city || 'Onbekend', 
        country || 'Nederland',
        orgName || null,
        contactName || null,
        contactEmail || null,
        trainingsArray, 
        sessionId, 
        message || 'Handmatig toegevoegd door admin'
      ]);

      return res.status(201).json({
        success: true,
        message: 'Deelnemer succesvol toegevoegd',
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
