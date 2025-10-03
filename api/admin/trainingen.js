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
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const databaseUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    return res.status(500).json({ error: 'Database URL niet gevonden' });
  }

  const sql = neon(databaseUrl);

  try {
    // GET - Haal alle trainingen op (geen auth nodig voor publieke data)
    if (req.method === 'GET') {
      const { filter, setup } = req.query;

      // SETUP MODE - Maak tabel aan (admin only)
      if (setup === 'true') {
        const user = verifyToken(req);
        if (!user) {
          return res.status(401).json({ error: 'Niet geautoriseerd' });
        }

        // Create table
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

        // Insert defaults
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
          message: 'Trainingen tabel aangemaakt'
        });
      }

      let trainingen;
      
      if (filter === 'contact') {
        // Voor contactformulier: alleen trainingen die in contact getoond worden
        trainingen = await sql`
          SELECT id, naam, beschrijving
          FROM trainingen
          WHERE toon_in_contact = true AND actief = true
          ORDER BY volgorde, naam
        `;
      } else if (filter === 'sessies') {
        // Voor sessie aanmaken: alleen trainingen die sessies hebben
        trainingen = await sql`
          SELECT id, naam, beschrijving
          FROM trainingen
          WHERE heeft_sessies = true AND actief = true
          ORDER BY volgorde, naam
        `;
      } else {
        // Voor admin: alle trainingen
        trainingen = await sql`
          SELECT *
          FROM trainingen
          ORDER BY volgorde, naam
        `;
      }

      return res.status(200).json({
        success: true,
        data: trainingen
      });
    }

    // Voor alle andere methods: check admin auth
    const user = verifyToken(req);
    if (!user) {
      return res.status(401).json({ error: 'Niet geautoriseerd' });
    }

    // POST - Nieuwe training
    if (req.method === 'POST') {
      const { naam, beschrijving, heeft_sessies, toon_in_contact, volgorde } = req.body;

      if (!naam) {
        return res.status(400).json({ error: 'Naam is verplicht' });
      }

      const result = await sql`
        INSERT INTO trainingen (naam, beschrijving, heeft_sessies, toon_in_contact, volgorde)
        VALUES (${naam}, ${beschrijving || null}, ${heeft_sessies || false}, ${toon_in_contact || false}, ${volgorde || 0})
        RETURNING *
      `;

      return res.status(201).json({
        success: true,
        data: result[0],
        message: 'Training aangemaakt'
      });
    }

    // PUT - Update training
    if (req.method === 'PUT') {
      const { id, naam, beschrijving, heeft_sessies, toon_in_contact, actief, volgorde } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'ID is verplicht' });
      }

      const result = await sql`
        UPDATE trainingen
        SET 
          naam = COALESCE(${naam}, naam),
          beschrijving = COALESCE(${beschrijving}, beschrijving),
          heeft_sessies = COALESCE(${heeft_sessies}, heeft_sessies),
          toon_in_contact = COALESCE(${toon_in_contact}, toon_in_contact),
          actief = COALESCE(${actief}, actief),
          volgorde = COALESCE(${volgorde}, volgorde),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `;

      if (result.length === 0) {
        return res.status(404).json({ error: 'Training niet gevonden' });
      }

      return res.status(200).json({
        success: true,
        data: result[0],
        message: 'Training bijgewerkt'
      });
    }

    // DELETE - Verwijder training
    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'ID is verplicht' });
      }

      await sql`DELETE FROM trainingen WHERE id = ${id}`;

      return res.status(200).json({
        success: true,
        message: 'Training verwijderd'
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
