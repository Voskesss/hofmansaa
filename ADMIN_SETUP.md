# Admin Dashboard Setup

## 🔐 Admin Login Credentials

Voor lokale development en productie moet je admin credentials instellen.

### Environment Variables Toevoegen

Voeg deze toe aan je `.env` file (lokaal) en Vercel Environment Variables (productie):

```env
# Admin Login
ADMIN_USERNAME=jouw_admin_username
ADMIN_PASSWORD=jouw_sterke_wachtwoord_hier
JWT_SECRET=random_secret_key_minimaal_32_karakters

# Database (al geconfigureerd)
POSTGRES_URL=postgresql://...
```

### Vercel Environment Variables Configureren

1. Ga naar je Vercel project dashboard
2. Klik op **Settings** → **Environment Variables**
3. Voeg toe:

```
ADMIN_USERNAME = admin (of jouw keuze)
ADMIN_PASSWORD = [sterk wachtwoord]
JWT_SECRET = [random string, minimaal 32 chars]
```

**TIP:** Genereer een sterke JWT_SECRET met:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🚀 Admin Dashboard Gebruiken

### Login
1. Ga naar: `https://jouw-site.vercel.app/admin/login`
2. Log in met je admin credentials
3. Je wordt doorgestuurd naar het dashboard

### Dashboard Features
- ✅ **Overzicht alle aanmeldingen** - Sorteerbaar, nieuwste eerst
- ✅ **Status bijwerken** - Direct in de tabel wijzigen
- ✅ **Statistieken** - Totaal per status
- ✅ **Auto-refresh** - Ververs knop voor nieuwe data

### Status Opties
- **Nieuw** - Nieuwe aanmelding (standaard)
- **In Behandeling** - Wordt bekeken/verwerkt
- **Goedgekeurd** - Aanmelding geaccepteerd
- **Afgewezen** - Aanmelding afgekeurd
- **Voltooid** - Volledig afgehandeld

## 🔒 Beveiliging

### JWT Tokens
- Tokens zijn 7 dagen geldig
- Opgeslagen in browser localStorage
- Automatisch uitloggen bij verlopen token

### Password Security
⚠️ **BELANGRIJK:**
- Gebruik een **sterk wachtwoord** (min 12 chars, cijfers, symbols)
- Deel je credentials NOOIT in Git commits
- `.env` files staan in `.gitignore`

### Upgraden naar Kinde (later)
Voor meerdere admin gebruikers, 2FA, etc. kan je later upgraden naar Kinde Auth.

## 🧪 Testen

### Lokaal testen:
```bash
npm run dev:api
# Open http://localhost:3001/admin/login
```

### Productie:
```
https://jouw-site.vercel.app/admin/login
```

## 📊 API Endpoints

Alle admin endpoints vereisen JWT authenticatie:

```
POST   /api/admin/login              → Login, krijg JWT token
GET    /api/admin/aanmeldingen       → Haal alle aanmeldingen op
PUT    /api/admin/update-status      → Update status van aanmelding
```

## 🆘 Troubleshooting

**Probleem:** "Niet geautoriseerd" error
- Check of JWT_SECRET consistent is tussen local en Vercel
- Check of token niet verlopen is (max 7 dagen)
- Probeer opnieuw in te loggen

**Probleem:** Login werkt niet
- Check of ADMIN_USERNAME en ADMIN_PASSWORD correct zijn ingesteld
- Check Vercel logs: `vercel logs`

**Probleem:** Database data wordt niet getoond
- Check of POSTGRES_URL correct is in Vercel
- Test `/api/test-db` endpoint
