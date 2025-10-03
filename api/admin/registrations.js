import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken';

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
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Verify admin authentication
  const user = verifyToken(req);
  if (!user) {
    return res.status(401).json({ error: 'Niet geautoriseerd' });
  }

  const databaseUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    return res.status(500).json({ error: 'Database URL niet gevonden' });
  }

  const sql = neon(databaseUrl);

  try {
    // GET - Haal alle aanmeldingen op
    if (req.method === 'GET') {
      const aanmeldingen = await sql`
        SELECT 
          id,
          first_name,
          middle_name,
          last_name,
          birth_date,
          birth_place,
          email,
          phone,
          street,
          house_number,
          postal_code,
          city,
          country,
          org_name,
          contact_name,
          contact_email,
          trainings,
          message,
          status,
          session_id,
          created_at,
          updated_at
        FROM aanmeldingen
        ORDER BY created_at DESC
      `;

      return res.status(200).json({
        success: true,
        data: aanmeldingen
      });
    }

    // PUT - Update status
    if (req.method === 'PUT') {
      const { id, status } = req.body;

      if (!id || !status) {
        return res.status(400).json({ error: 'id en status zijn verplicht' });
      }

      await sql`
        UPDATE aanmeldingen
        SET status = ${status}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
      `;

      return res.status(200).json({
        success: true,
        message: 'Status bijgewerkt'
      });
    }

    // DELETE - Verwijder aanmelding
    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'id is verplicht' });
      }

      await sql`DELETE FROM aanmeldingen WHERE id = ${id}`;

      return res.status(200).json({
        success: true,
        message: 'Aanmelding verwijderd'
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({
      error: 'Database fout',
      details: error.message
    });
  }
}
