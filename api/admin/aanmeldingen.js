// GET /api/admin/aanmeldingen - Haal alle aanmeldingen op (JWT required)
import { neon } from '@neondatabase/serverless';
import { authenticateRequest } from '../_lib/auth.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Alleen GET toegestaan' });
  }

  // Authenticatie check
  const auth = authenticateRequest(req);
  if (!auth.authenticated) {
    return res.status(401).json({ error: auth.error || 'Niet geautoriseerd' });
  }

  try {
    const databaseUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      return res.status(500).json({ error: 'Database niet geconfigureerd' });
    }

    const sql = neon(databaseUrl);

    // Haal alle aanmeldingen op, nieuwste eerst
    const aanmeldingen = await sql`
      SELECT 
        id,
        first_name,
        middle_name,
        last_name,
        birth_date,
        birth_place,
        bsn,
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

    // Tel per status
    const stats = await sql`
      SELECT 
        status,
        COUNT(*) as count
      FROM aanmeldingen
      GROUP BY status
    `;

    const statusCounts = stats.reduce((acc, row) => {
      acc[row.status] = parseInt(row.count);
      return acc;
    }, {});

    console.log(`✅ Admin ophalen aanmeldingen: ${aanmeldingen.length} records`);

    return res.status(200).json({
      success: true,
      data: aanmeldingen,
      stats: {
        total: aanmeldingen.length,
        byStatus: statusCounts
      }
    });

  } catch (error) {
    console.error('❌ Fout bij ophalen aanmeldingen:', error);
    return res.status(500).json({ 
      error: 'Fout bij ophalen data',
      message: error.message 
    });
  }
}
