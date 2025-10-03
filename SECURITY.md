# 🔒 Security Documentatie

## Geïmplementeerde Beveiligingsmaatregelen

### 1. **HTTP Security Headers** (via Vercel)
Bescherming tegen XSS, clickjacking en content-type attacks.

**Wat is geïmplementeerd:**
- `X-Content-Type-Options: nosniff` - Voorkomt MIME-type sniffing
- `X-Frame-Options: DENY/SAMEORIGIN` - Beschermt tegen clickjacking
- `X-XSS-Protection: 1; mode=block` - Browser XSS filter
- `Referrer-Policy: strict-origin-when-cross-origin` - Controleert referrer informatie
- `Permissions-Policy` - Blokkeert toegang tot camera, microfoon, geolocation

**Configuratie:** `/vercel.json`

---

### 2. **Client-Side Rate Limiting**
Voorkomt spam en misbruik door aantal submissions te beperken.

**Contact formulier:**
- Maximum: 3 submissions per minuut
- Gebruikt localStorage om pogingen bij te houden

**Aanmelden formulier:**
- Maximum: 2 submissions per 2 minuten
- Strengere limiet vanwege gevoelige data

**Implementatie:** `/src/utils/security.js` - `checkRateLimit()`

---

### 3. **Input Sanitization**

#### Client-side (Frontend)
Alle gebruikersinput wordt geschoond voor XSS attacks:
- HTML tags worden geëscaped (`<` → `&lt;`, `>` → `&gt;`)
- Quotes worden geëscaped
- Slashes worden geëscaped
- Whitespace wordt getrimd

**Implementatie:** `/src/utils/security.js` - `sanitizeFormData()`

#### Server-side (Backend)
Dubbele beveiliging op backend API:
- Zelfde sanitization als client-side
- Maximum lengte van 1000 karakters per veld
- Beschermt tegen database injection en XSS

**Implementatie:** `/api/aanmelden.js` - `sanitizeFormData()`

---

### 4. **Honeypot Anti-Bot Fields**
Onzichtbare velden die alleen door bots worden ingevuld.

**Hoe het werkt:**
- Verborgen veld `honeypot` in beide formulieren
- Veld is onzichtbaar voor menselijke gebruikers (CSS: `position: absolute, left: -9999px`)
- Als veld is ingevuld → automatisch geblokkeerd (stil falen)
- Geen foutmelding aan bot (voorkomt aanpassing)

**Client-side check:** Beide formulieren
**Server-side check:** `/api/aanmelden.js`

---

### 5. **Input Validatie**

#### Email validatie
- Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Controleert geldig email format

#### Telefoonnummer validatie (NL)
- Regex: `/^(\+31|0)[1-9][0-9]{8}$/`
- Accepteert Nederlandse nummers: `0612345678` of `+31612345678`
- Spaties en streepjes worden verwijderd

#### Postcode validatie (NL)
- Regex: `/^[1-9][0-9]{3}\s?[A-Za-z]{2}$/`
- Format: `1234 AB` of `1234AB`

**Implementatie:** `/src/utils/security.js`

---

### 6. **CORS Configuratie**
Backend API's hebben CORS headers voor veilige cross-origin requests.

**Headers:**
```javascript
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

**Implementatie:** Alle API endpoints

---

## Formulier Beveiligingsflow

### Contact Formulier (`/src/pages/Contact.jsx`)

```
1. Gebruiker vult formulier in
   ↓
2. Submit → Honeypot check (stil falen bij bot)
   ↓
3. Rate limit check (max 3/minuut)
   ↓
4. Email format validatie
   ↓
5. Input sanitization (client-side)
   ↓
6. Verzenden via EmailJS
   ↓
7. Form reset + success melding
```

### Aanmelden Formulier (`/src/pages/Aanmelden.jsx`)

```
1. Gebruiker vult formulier in
   ↓
2. Submit → Honeypot check (stil falen bij bot)
   ↓
3. Rate limit check (max 2/2 minuten)
   ↓
4. Email validatie
   ↓
5. Telefoonnummer validatie
   ↓
6. Postcode validatie (alleen NL)
   ↓
7. Input sanitization (client-side)
   ↓
8. Backend API call → Server-side sanitization + honeypot check
   ↓
9. Database opslag (indien beschikbaar)
   ↓
10. EmailJS verzending
   ↓
11. Form reset + success melding
```

---

## Best Practices voor Verder Beheer

### ✅ Wat is veilig
- Alle formulieren hebben meerdere beveiligingslagen
- Zowel client-side als server-side validatie
- Rate limiting voorkomt spam
- Honeypot blokkeert simpele bots

### ⚠️ Aandachtspunten
- **Rate limiting is client-side** (localStorage) → Kan omzeild worden met browser reset
  - Voor productie: overweeg server-side rate limiting met IP tracking
- **EmailJS keys zijn zichtbaar in frontend** → Normaal voor EmailJS, maar beperkt gebruik via EmailJS dashboard
- **CORS is open (`*`)** → Overweeg beperking tot eigen domain voor productie

### 🔮 Toekomstige Verbeteringen
1. **Cloudflare Turnstile/reCAPTCHA** - Extra bot bescherming
2. **Server-side rate limiting** - IP-based throttling op Vercel
3. **Data encryptie** - Gevoelige velden (geboortedatum) encrypten in database
4. **CSRF tokens** - Extra bescherming tegen cross-site attacks
5. **Content Security Policy (CSP)** - Strengere browser beveiliging

---

## Testen

### Rate Limiting Testen
1. Ga naar Contact pagina
2. Probeer 4x snel achter elkaar te submitten
3. Verwachte uitkomst: 4e poging wordt geblokkeerd met timer melding

### Honeypot Testen (Developer Console)
```javascript
// Open browser console op Contact pagina
document.querySelector('input[name="honeypot"]').value = 'bot test';
// Submit formulier → Moet stil falen (geen feedback)
```

### Input Sanitization Testen
```javascript
// Test XSS input
const testInput = '<script>alert("XSS")</script>';
// Vul in veld → Submit → Check database/email
// Verwachte output: &lt;script&gt;alert("XSS")&lt;/script&gt;
```

---

## Incident Response

### Als spam/bot attack wordt gedetecteerd:
1. Check logs voor honeypot triggers
2. Verhoog rate limit (verlaag max attempts)
3. Overweeg tijdelijk formulier disable
4. Implementeer extra CAPTCHA als nodig

### Bij verdachte submissions:
1. Check `created_at` timestamp in database
2. Zoek naar patronen (zelfde IP, snel achter elkaar)
3. Review console logs voor bot detectie

---

## Contact voor Security Issues
Voor security gerelateerde vragen:
- Email: support@hofmansautomotiveacademie.nl
- Check altijd eerst deze documentatie

**Laatste update:** Oktober 2025
