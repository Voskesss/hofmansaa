// PUT /api/admin/update-status - Update status van aanmelding (JWT required)
import { neon } from '@neondatabase/serverless';
import { authenticateRequest } from '../_lib/auth.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Alleen PUT toegestaan' });
  }

  // Authenticatie check
  const auth = authenticateRequest(req);
  if (!auth.authenticated) {
    return res.status(401).json({ error: auth.error || 'Niet geautoriseerd' });
  }

  try {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ error: 'ID en status zijn vereist' });
    }

    // Toegestane statussen
    const validStatuses = ['nieuw', 'in_behandeling', 'goedgekeurd', 'afgewezen', 'voltooid'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        error: 'Ongeldige status',
        validStatuses 
      });
    }

    const databaseUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      return res.status(500).json({ error: 'Database niet geconfigureerd' });
    }

    const sql = neon(databaseUrl);

    // Update status
    const result = await sql`
      UPDATE aanmeldingen
      SET 
        status = ${status},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, status, updated_at
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: 'Aanmelding niet gevonden' });
    }

    console.log(`✅ Status updated: ID ${id} → ${status} (by ${auth.user.username})`);

    return res.status(200).json({
      success: true,
      message: 'Status succesvol bijgewerkt',
      data: result[0]
    });

  } catch (error) {
    console.error('❌ Fout bij updaten status:', error);
    return res.status(500).json({ 
      error: 'Fout bij updaten status',
      message: error.message 
    });
  }
}
