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

async function addRegistrationToggle() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Bezig met toevoegen van allow_public_registration kolom...');
    
    await client.query(`
      ALTER TABLE training_sessions 
      ADD COLUMN IF NOT EXISTS allow_public_registration BOOLEAN DEFAULT true;
    `);
    
    console.log('✅ allow_public_registration kolom toegevoegd!');
    
    // Update alle bestaande sessies naar true
    await client.query(`
      UPDATE training_sessions 
      SET allow_public_registration = true 
      WHERE allow_public_registration IS NULL;
    `);
    
    console.log('✅ Bestaande sessies updated naar "open voor inschrijving"');
    
    // Toon overzicht
    const result = await client.query(`
      SELECT id, training_type, session_date, status, allow_public_registration 
      FROM training_sessions 
      ORDER BY session_date
    `);
    
    console.log('\n📋 Sessies overzicht:');
    console.table(result.rows);
    
    console.log('\n🎉 Database update compleet!');
    
  } catch (error) {
    console.error('❌ Fout:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

addRegistrationToggle().catch(console.error);
