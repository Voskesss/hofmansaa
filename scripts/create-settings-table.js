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

async function createSettingsTable() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Bezig met aanmaken van system_settings tabel...');
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS system_settings (
        id SERIAL PRIMARY KEY,
        setting_key VARCHAR(100) UNIQUE NOT NULL,
        setting_value TEXT NOT NULL,
        description TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('✅ system_settings tabel aangemaakt!');
    
    // Voeg default setting toe voor sessie selectie
    await client.query(`
      INSERT INTO system_settings (setting_key, setting_value, description)
      VALUES ('session_selection_enabled', 'false', 'Bepaalt of kandidaten een sessie moeten kiezen bij aanmelding')
      ON CONFLICT (setting_key) DO NOTHING;
    `);
    
    console.log('✅ Default sessie selectie setting toegevoegd (UIT)');
    
    // Toon overzicht
    const result = await client.query('SELECT * FROM system_settings');
    console.log('\n📋 Huidige settings:');
    console.table(result.rows);
    
    console.log('\n🎉 Settings tabel setup compleet!');
    
  } catch (error) {
    console.error('❌ Fout:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

createSettingsTable().catch(console.error);
