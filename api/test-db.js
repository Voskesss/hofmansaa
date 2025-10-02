// Test endpoint om database connectie te checken
import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // CORS headers voor development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Database URL ophalen (Vercel zet dit automatisch als je Neon connected)
    const databaseUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      return res.status(500).json({ 
        error: 'Database URL niet gevonden',
        hint: 'Voeg POSTGRES_URL toe aan environment variables'
      });
    }

    // Maak database connectie
    const sql = neon(databaseUrl);
    
    // Simpele test query
    const result = await sql`SELECT NOW() as current_time, version() as db_version`;
    
    // Check of tabel bestaat
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'aanmeldingen'
      ) as table_exists
    `;

    return res.status(200).json({
      success: true,
      message: 'Database connectie werkt! ✅',
      data: {
        currentTime: result[0].current_time,
        dbVersion: result[0].db_version,
        tableExists: tableCheck[0].table_exists,
        environment: process.env.VERCEL ? 'Vercel' : 'Local'
      }
    });

  } catch (error) {
    console.error('Database test error:', error);
    return res.status(500).json({
      error: 'Database connectie mislukt',
      message: error.message,
      hint: 'Check of POSTGRES_URL correct is ingesteld'
    });
  }
}
