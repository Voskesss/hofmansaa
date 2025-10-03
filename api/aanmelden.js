// POST /api/aanmelden - Aanmelding opslaan in database + email versturen
import { neon } from '@neondatabase/serverless';

// Server-side input sanitization
function sanitizeString(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
    .substring(0, 1000); // Max length voor security
}

function sanitizeFormData(data) {
  const sanitized = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'string' ? sanitizeString(item) : item
      );
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Alleen POST requests toegestaan' });
  }

  try {
    // Sanitize input eerst (server-side bescherming)
    const formData = sanitizeFormData(req.body);
    
    // Anti-bot check: honeypot field moet leeg zijn of niet bestaan
    if (formData.honeypot && formData.honeypot.trim() !== '') {
      console.warn('🤖 Bot detected via honeypot field');
      return res.status(400).json({ 
        error: 'Invalid submission',
        success: false 
      });
    }
    
    // Validatie: check required fields
    const requiredFields = [
      'firstName', 'lastName', 'birthDate', 'birthPlace',
      'email', 'phone', 'street', 'houseNumber', 'postalCode', 
      'city', 'country'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Verplichte velden ontbreken',
        missingFields 
      });
    }

    // Database connectie
    const databaseUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      console.warn('⚠️ Database URL niet gevonden - data wordt NIET opgeslagen');
      return res.status(200).json({
        success: true,
        warning: 'Database niet beschikbaar - alleen email verzonden',
        savedToDatabase: false,
        message: 'Gebruik EmailJS als fallback in frontend'
      });
    }

    const sql = neon(databaseUrl);

    // Training array formatteren voor Postgres
    const trainingsArray = Array.isArray(formData.training) 
      ? formData.training 
      : [formData.training];
    
    // Insert aanmelding in database
    const result = await sql`
      INSERT INTO aanmeldingen (
        first_name, middle_name, last_name,
        birth_date, birth_place,
        email, phone,
        street, house_number, postal_code, city, country,
        org_name, contact_name, contact_email,
        trainings, message, status, session_id
      ) VALUES (
        ${formData.firstName},
        ${formData.middleName || ''},
        ${formData.lastName},
        ${formData.birthDate},
        ${formData.birthPlace},
        ${formData.email},
        ${formData.phone},
        ${formData.street},
        ${formData.houseNumber},
        ${formData.postalCode},
        ${formData.city},
        ${formData.country},
        ${formData.orgName || null},
        ${formData.contactName || null},
        ${formData.contactEmail || null},
        ${trainingsArray},
        ${formData.message || null},
        'nieuw',
        ${formData.sessionId || null}
      )
      RETURNING id, created_at
    `;

    const insertedId = result[0].id;
    const createdAt = result[0].created_at;

    console.log(`✅ Aanmelding opgeslagen: ID ${insertedId}, ${formData.email}`);

    // NOTE: EmailJS wordt NIET hier aangeroepen
    // De frontend stuurt ZELF de email via EmailJS
    // Dit backend endpoint is alleen voor database opslag
    // Later kunnen we server-side email toevoegen (Resend, SendGrid, etc.)

    return res.status(201).json({
      success: true,
      message: 'Aanmelding succesvol opgeslagen! ✅',
      savedToDatabase: true,
      data: {
        id: insertedId,
        createdAt: createdAt,
        email: formData.email
      }
    });

  } catch (error) {
    console.error('❌ Aanmelden error:', error);
    
    // Als database faalt, return success maar met warning
    // Frontend kan dan zelf EmailJS gebruiken als fallback
    return res.status(200).json({
      success: true,
      warning: 'Database opslag mislukt - gebruik EmailJS fallback',
      savedToDatabase: false,
      error: error.message,
      message: 'Data niet opgeslagen, maar frontend kan email sturen'
    });
  }
}
