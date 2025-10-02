-- Aanmeldingen tabel voor Hofmans Automotive Academie
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
);

-- Indexes voor sneller zoeken
CREATE INDEX IF NOT EXISTS idx_email ON aanmeldingen(email);
CREATE INDEX IF NOT EXISTS idx_status ON aanmeldingen(status);
CREATE INDEX IF NOT EXISTS idx_created_at ON aanmeldingen(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_trainings ON aanmeldingen USING GIN(trainings);

-- View voor admin dashboard
CREATE OR REPLACE VIEW aanmeldingen_overview AS
SELECT 
  id,
  first_name || ' ' || COALESCE(middle_name || ' ', '') || last_name as full_name,
  email,
  phone,
  array_to_string(trainings, ', ') as training_list,
  status,
  created_at
FROM aanmeldingen
ORDER BY created_at DESC;
