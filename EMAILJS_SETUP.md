# EmailJS Setup Instructies

## Stap 1: EmailJS Account Aanmaken
1. Ga naar [https://www.emailjs.com/](https://www.emailjs.com/)
2. Maak een gratis account aan
3. Verifieer je email adres

## Stap 2: Email Service Toevoegen
1. Ga naar "Email Services" in je EmailJS dashboard
2. Klik op "Add New Service"
3. Kies je email provider (bijv. Gmail, Outlook, etc.)
4. Volg de instructies om je email account te koppelen
5. Noteer je **Service ID**

## Stap 3: Email Template Maken
1. Ga naar "Email Templates" in je dashboard
2. Klik op "Create New Template"
3. Gebruik deze template content:

**Subject:** Nieuwe aanmelding van {{from_name}}

**Content:**
```
Hallo,

Je hebt een nieuwe aanmelding ontvangen via de website:

Naam: {{from_name}}
Email: {{from_email}}
Telefoon: {{phone}}
Geïnteresseerd in: {{selected_trainings}}

Bericht:
{{message}}

Met vriendelijke groet,
Website Contactformulier
```

4. Sla de template op en noteer je **Template ID**

## Stap 4: Public Key Ophalen
1. Ga naar "Account" in je dashboard
2. Kopieer je **Public Key**

## Stap 5: Configuratie in Code
Open `/src/pages/Contact.jsx` en vervang:
- `YOUR_SERVICE_ID` met je Service ID
- `YOUR_TEMPLATE_ID` met je Template ID  
- `YOUR_PUBLIC_KEY` met je Public Key
- `info@hofmansautomotiveacademie.nl` met je eigen email adres

## Stap 6: Auto-Reply Template (Optioneel)
Voor automatische bevestigingsemails aan klanten:
1. Maak een tweede template aan
2. Gebruik `{{from_email}}` als ontvanger
3. Voeg deze functionaliteit toe aan de handleSubmit functie

## Voordelen van EmailJS:
- ✅ Gratis tot 200 emails per maand
- ✅ Geen backend server nodig
- ✅ Werkt perfect met statische websites
- ✅ Spam bescherming ingebouwd
- ✅ Delivery tracking beschikbaar

## Alternatieve Oplossingen:
1. **Netlify Forms** (als je naar Netlify deployed)
2. **Formspree** (externe service)
3. **Web3Forms** (gratis alternatief)
