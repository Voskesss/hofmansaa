# Hofmans Automotive Academie React Applicatie

Dit is een moderne React-applicatie voor Hofmans Automotive Academie, oorspronkelijk een WordPress-website. De applicatie is opgezet met Vite voor snelle ontwikkeling en build-tijden, en gebruikt React Router voor navigatie. De UI is gebouwd met Material-UI componenten en Tailwind CSS voor styling.

## Installatie

1. Zorg ervoor dat je Node.js (versie >= 18.0.0) geïnstalleerd hebt.
2. Clone deze repository naar je lokale machine.
3. Navigeer naar de projectmap: `cd hofmans-automotive-academie`
4. Installeer de dependencies: `npm install`

## Ontwikkeling

- Start de ontwikkelingsserver: `npm start`
- De applicatie is beschikbaar op `http://localhost:5173` (standaardpoort van Vite).

## Build en Deployment

- Bouw de applicatie voor productie: `npm run build`
- Voor deployment naar GitHub Pages, zorg ervoor dat de `base` property in `vite.config.js` correct is ingesteld op jouw repository naam.
- Gebruik de `gh-pages` package of een vergelijkbare tool om de inhoud van de `dist` map te deployen naar GitHub Pages.

## Projectstructuur

- `src/main.jsx`: Hoofdingang van de applicatie.
- `src/App.jsx`: Hoofdcomponent met routing en thema-instellingen.
- `src/pages/`: Bevat de pagina-componenten zoals Home, Trainingen en Contact.
- `src/components/`: Bevat herbruikbare UI-componenten zoals Navbar en Footer.

## Base URL

De applicatie houdt rekening met verschillende base URL's:
- Lokaal: `/`
- GitHub Pages: `/hofmans-automotive-academie/`

Dit wordt dynamisch ingesteld in `vite.config.js` en `main.jsx`.

## Afbeeldingen

Afbeeldingen van de oorspronkelijke website zullen waar mogelijk worden hergebruikt. Zorg ervoor dat je de rechten hebt om deze afbeeldingen te gebruiken in de nieuwe applicatie.
