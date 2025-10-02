# GitHub Pages Deployment Guide

Deze handleiding bevat stap-voor-stap instructies voor het deployen van een React/Vite website naar GitHub Pages, inclusief het correct configureren van EmailJS.

## Inhoudsopgave
1. [GitHub Repository Setup](#1-github-repository-setup)
2. [GitHub Pages Configuratie](#2-github-pages-configuratie)
3. [EmailJS Configuratie](#3-emailjs-configuratie)
4. [Environment Variables](#4-environment-variables)
5. [GitHub Actions Workflow](#5-github-actions-workflow)
6. [Troubleshooting](#6-troubleshooting)

## 1. GitHub Repository Setup

### Optie A: Nieuwe Repository
1. Ga naar [GitHub](https://github.com) en klik op "New repository"
2. Geef je repository een naam (bijv. `mijn-website`)
3. Kies "Public" of "Private"
4. Klik op "Create repository"

### Optie B: Bestaande Repository
1. Zorg dat je code in een GitHub repository staat
2. Zorg dat je repository een `package.json` bevat met de juiste dependencies

## 2. GitHub Pages Configuratie

### Methode 1: Deployen vanaf `main` branch (aanbevolen)
1. Ga naar je repository → Settings → Pages
2. Bij "Source", selecteer "GitHub Actions"
3. Kies een workflow template (bijv. "Static HTML" of "React")
4. Pas de workflow aan naar jouw behoeften (zie sectie 5)

### Methode 2: Deployen vanaf `gh-pages` branch
1. Ga naar je repository → Settings → Pages
2. Bij "Source", selecteer "Deploy from a branch"
3. Kies de branch `gh-pages` en map `/` (root)
4. Klik op "Save"

> **Aanbeveling:** Gebruik Methode 1 (GitHub Actions) voor meer controle en automatisering.

## 3. EmailJS Configuratie

1. Maak een account aan op [EmailJS](https://www.emailjs.com/)
2. Voeg een Email Service toe (Gmail, Outlook, etc.)
3. Maak een Email Template aan
4. Noteer de volgende gegevens:
   - Service ID (bijv. `service_m87ypy9`)
   - Template ID (bijv. `template_hhpbyg3`)
   - Public Key (bijv. `rEq2RCCaocFAkpk72`)

## 4. Environment Variables

### Lokale Ontwikkeling
Maak een `.env.local` bestand in de root van je project:

```
VITE_EMAILJS_SERVICE_ID=jouw_service_id
VITE_EMAILJS_TEMPLATE_ID=jouw_template_id
VITE_EMAILJS_PUBLIC_KEY=jouw_public_key
```

### Productie (GitHub Pages)
Maak een `.env.production` bestand in de root van je project:

```
VITE_EMAILJS_SERVICE_ID=service_m87ypy9
VITE_EMAILJS_PUBLIC_KEY=rEq2RCCaocFAkpk72
```

> **BELANGRIJK:** Het `.env.production` bestand moet in je repository staan. Voor publieke keys is dit veilig. Voor geheime keys, gebruik GitHub Secrets.

## 5. GitHub Actions Workflow

Maak een bestand `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    environment: github-pages
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build project
        run: npm run build
        
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 6. Troubleshooting

### EmailJS werkt lokaal maar niet op GitHub Pages
1. **Controleer of `.env.production` correct is ingesteld**
   - Zorg dat dit bestand in je repository staat
   - Controleer of de IDs exact overeenkomen met je EmailJS account

2. **Controleer de browser console voor errors**
   - Open de browser console (F12) op je gedeployde site
   - Zoek naar errors gerelateerd aan EmailJS

3. **Voeg debug logging toe**
   ```javascript
   console.log('EmailJS Config:', {
     serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
     templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
     publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
   });
   ```

4. **Controleer je EmailJS account**
   - Ga naar je EmailJS dashboard
   - Controleer of er domain restrictions zijn ingesteld
   - Verifieer dat je account actief is

### Base URL problemen
Als je links of assets niet correct laden:

1. **Voeg `base` toe aan je `vite.config.js`**
   ```javascript
   export default defineConfig({
     base: '/repository-naam/',
     // andere configuratie
   });
   ```

2. **Gebruik relatieve paden**
   - Gebruik `/assets/image.jpg` in plaats van `assets/image.jpg`
   - Of gebruik `import.meta.env.BASE_URL + 'assets/image.jpg'`

## Conclusie

Door deze stappen te volgen, zou je een soepele deployment naar GitHub Pages moeten hebben, met werkende EmailJS integratie. Het belangrijkste is om te zorgen dat je `.env.production` bestand correct is ingesteld en in je repository staat.

Voor vragen of problemen, raadpleeg de [GitHub Pages documentatie](https://docs.github.com/en/pages) of de [EmailJS documentatie](https://www.emailjs.com/docs/).
