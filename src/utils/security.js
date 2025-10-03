// Security utilities voor formulieren

/**
 * Sanitize input om XSS attacks te voorkomen
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

/**
 * Sanitize alle fields in een object
 */
export const sanitizeFormData = (formData) => {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'string' ? sanitizeInput(item) : item
      );
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

/**
 * Client-side rate limiting met localStorage
 * @param {string} key - Unieke key voor de rate limit (bijv. 'contact-form')
 * @param {number} maxAttempts - Maximum aantal pogingen
 * @param {number} windowMs - Tijdvenster in milliseconden
 */
export const checkRateLimit = (key, maxAttempts = 3, windowMs = 60000) => {
  const storageKey = `rateLimit_${key}`;
  const now = Date.now();
  
  // Haal rate limit data op
  const data = localStorage.getItem(storageKey);
  let attempts = data ? JSON.parse(data) : [];
  
  // Filter oude pogingen buiten het tijdvenster
  attempts = attempts.filter(timestamp => now - timestamp < windowMs);
  
  // Check of limiet bereikt is
  if (attempts.length >= maxAttempts) {
    const oldestAttempt = Math.min(...attempts);
    const timeUntilReset = Math.ceil((windowMs - (now - oldestAttempt)) / 1000);
    
    return {
      allowed: false,
      message: `Te veel verzoeken. Probeer het over ${timeUntilReset} seconden opnieuw.`,
      timeUntilReset
    };
  }
  
  // Voeg nieuwe poging toe
  attempts.push(now);
  localStorage.setItem(storageKey, JSON.stringify(attempts));
  
  return {
    allowed: true,
    remaining: maxAttempts - attempts.length
  };
};

/**
 * Valideer email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valideer telefoonnummer (Nederlands formaat)
 */
export const isValidPhone = (phone) => {
  // Accepteer Nederlandse telefoonnummers in verschillende formaten
  const phoneRegex = /^(\+31|0)[1-9][0-9]{8}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  return phoneRegex.test(cleanPhone);
};

/**
 * Valideer postcode (Nederlands formaat)
 */
export const isValidPostalCode = (postalCode) => {
  const postalCodeRegex = /^[1-9][0-9]{3}\s?[A-Za-z]{2}$/;
  return postalCodeRegex.test(postalCode);
};
