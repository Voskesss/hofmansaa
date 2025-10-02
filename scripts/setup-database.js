// Script om database tabel aan te maken
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL);

async function setupDatabase() {
  try {
    console.log('🔄 Creating aanmeldingen table...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS aanmeldingen (
        id SERIAL PRIMARY KEY,
        
        -- Persoonlijke gegevens
        first_name VARCHAR(100) NOT NULL,
        middle_name VARCHAR(50),
        last_name VARCHAR(100) NOT NULL,
        birth_date DATE NOT NULL,
        birth_place VARCHAR(100) NOT NULL,
        bsn VARCHAR(9) NOT NULL,
        
        -- Contact
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        
        -- Adres
        street VARCHAR(200) NOT NULL,
        house_number VARCHAR(20) NOT NULL,
        postal_code VARCHAR(10) NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        
        -- Organisatie (optioneel)
        org_name VARCHAR(200),
        contact_name VARCHAR(100),
        contact_email VARCHAR(255),
        
        -- Training
        trainings TEXT[] NOT NULL,
        message TEXT,
        
        -- Status en metadata
        status VARCHAR(50) DEFAULT 'nieuw',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    console.log('✅ Table aanmeldingen created!');
    
    // Create indexes
    console.log('🔄 Creating indexes...');
    
    await sql`CREATE INDEX IF NOT EXISTS idx_email ON aanmeldingen(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_status ON aanmeldingen(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_created_at ON aanmeldingen(created_at DESC)`;
    
    console.log('✅ Indexes created!');
    
    // Test query
    const result = await sql`SELECT COUNT(*) as count FROM aanmeldingen`;
    console.log(`✅ Database setup complete! Records: ${result[0].count}`);
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
