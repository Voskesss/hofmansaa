import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function createSessionsTable() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Bezig met aanmaken van training_sessions tabel...');
    
    // Maak training_sessions tabel
    await client.query(`
      CREATE TABLE IF NOT EXISTS training_sessions (
        id SERIAL PRIMARY KEY,
        training_type VARCHAR(100) NOT NULL,
        session_date DATE NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        location VARCHAR(255) NOT NULL,
        max_participants INTEGER NOT NULL DEFAULT 12,
        current_participants INTEGER NOT NULL DEFAULT 0,
        status VARCHAR(50) NOT NULL DEFAULT 'open',
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('✅ training_sessions tabel aangemaakt!');
    
    // Voeg session_id kolom toe aan aanmeldingen tabel
    console.log('🔄 Bezig met toevoegen van session_id kolom aan aanmeldingen...');
    
    await client.query(`
      ALTER TABLE aanmeldingen 
      ADD COLUMN IF NOT EXISTS session_id INTEGER REFERENCES training_sessions(id);
    `);
    
    console.log('✅ session_id kolom toegevoegd!');
    
    // Voeg index toe voor snellere queries
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_sessions_date ON training_sessions(session_date);
      CREATE INDEX IF NOT EXISTS idx_sessions_type ON training_sessions(training_type);
      CREATE INDEX IF NOT EXISTS idx_sessions_status ON training_sessions(status);
      CREATE INDEX IF NOT EXISTS idx_aanmeldingen_session ON aanmeldingen(session_id);
    `);
    
    console.log('✅ Indexen toegevoegd voor performance!');
    
    // Voeg test data toe
    console.log('🔄 Bezig met toevoegen van test sessies...');
    
    await client.query(`
      INSERT INTO training_sessions 
        (training_type, session_date, start_time, end_time, location, max_participants, description)
      VALUES 
        ('llo', '2025-11-15', '09:00', '17:00', 'Hofmans Academie Utrecht', 12, 'LLO Basis training - Volledige dag'),
        ('voertuigtechniek', '2025-11-20', '09:00', '16:00', 'Hofmans Academie Amsterdam', 10, 'Voertuigtechniek Niveau 2'),
        ('llo', '2025-12-01', '09:00', '17:00', 'Hofmans Academie Rotterdam', 15, 'LLO Gevorderd'),
        ('niet-technisch', '2025-12-10', '13:00', '17:00', 'Hofmans Academie Utrecht', 20, 'Niet-technische trainingen middag sessie')
      ON CONFLICT DO NOTHING;
    `);
    
    console.log('✅ Test sessies toegevoegd!');
    
    // Toon overzicht
    const result = await client.query('SELECT * FROM training_sessions ORDER BY session_date');
    console.log('\n📋 Huidige sessies:');
    console.table(result.rows);
    
    console.log('\n🎉 Database setup compleet!');
    
  } catch (error) {
    console.error('❌ Fout bij aanmaken tabel:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

createSessionsTable().catch(console.error);
