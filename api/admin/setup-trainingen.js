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

  const databaseUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    return res.status(500).json({ error: 'Database URL niet gevonden' });
  }

  const sql = neon(databaseUrl);

  try {
    // Create trainingen table
    await sql`
      CREATE TABLE IF NOT EXISTS trainingen (
        id SERIAL PRIMARY KEY,
        naam VARCHAR(255) NOT NULL UNIQUE,
        beschrijving TEXT,
        heeft_sessies BOOLEAN DEFAULT false,
        toon_in_contact BOOLEAN DEFAULT false,
        actief BOOLEAN DEFAULT true,
        volgorde INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Insert default trainingen
    await sql`
      INSERT INTO trainingen (naam, beschrijving, heeft_sessies, toon_in_contact, volgorde)
      VALUES 
        ('Nederlands & Rekenen', 'Toetsing Nederlands en Rekenen (certificaat)', true, false, 1),
        ('Voertuigen', 'Training voor voertuigen en voertuigbeveiliging', false, true, 2),
        ('Niet-technisch personeel', 'Training voor niet-technisch personeel', false, true, 3),
        ('LLO', 'Luchthavenbeveiliging en Luchtvaartoperaties', false, true, 4)
      ON CONFLICT (naam) DO NOTHING
    `;

    return res.status(200).json({
      success: true,
      message: 'Trainingen tabel aangemaakt en standaard trainingen toegevoegd'
    });

  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({
      error: 'Database fout',
      details: error.message
    });
  }
}
