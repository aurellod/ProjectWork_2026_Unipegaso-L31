# Caviro — Sostenibilità

Project Work — CdS Informatica per le Aziende Digitali (L-31)
Tema 3: *Tecnologia web per la sostenibilità d'impresa*
Traccia 17: *Sviluppo di una pagina web per il download dei report di sostenibilità di un'impresa del settore primario*

Pagina web statica dedicata al **Gruppo Caviro**, la più grande cooperativa vitivinicola d'Italia (Faenza, RA), realizzata per comunicare il suo modello di economia circolare e per consentire il download del Bilancio di Sostenibilità ufficiale.

## IMPORTANTE — Prima di aprire il sito

Il file PDF del Bilancio di Sostenibilità **non è incluso** in questo pacchetto (va scaricato dal sito ufficiale, essendo di proprietà di Caviro). Per attivare il pulsante di download:

1. Scarica il PDF da: https://www.caviro.com/wp-content/uploads/2026/06/BDS_Caviro_ITA_cop_D.pdf
2. Rinominalo esattamente `bilancio-sostenibilita-caviro.pdf`
3. Copialo dentro `assets/pdf/` (al momento vuota)

Senza questo passaggio, il bottone "Scarica il Bilancio" nella pagina restituirà un errore 404.

## Struttura del progetto

```
Caviro - PW/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── img/                 # placeholder locali (vedi nota sotto)
│   └── pdf/                 # qui va inserito il PDF del Bilancio (vedi sopra)
└── README.md
```

## Sezioni della pagina

1. **Hero** — con badge sulla VII edizione del Bilancio di Sostenibilità 2025
2. **Il Gruppo** — profilo aziendale + statistiche animate (fondazione 1966, 11.500+ viticoltori, 36.200 ettari, 90 paesi)
3. **Le tre R di Caviro** — Ritirare, Rigenerare, Restituire
4. **Economia circolare** — diagramma di flusso interattivo (vigna → uva → vino/derivati/prodotti nobili → scarti → bioenergia/fertilizzanti → torna alla vigna)
5. **Sostenibilità in numeri** — tre colonne (ambientale, sociale, economica) con contatori animati
6. **SDG ONU** — 13 Obiettivi Agenda 2030, focus su SDG 3
7. **Certificazioni** — timeline verticale delle principali certificazioni ottenute
8. **Download Bilancio** — call to action per il PDF ufficiale
9. **Footer** — contatti, social, newsletter (solo lato client)

## Animazioni e interattività

- Barra di avanzamento scroll in cima alla pagina
- Navbar che si restringe e scurisce durante lo scroll, con link attivo evidenziato in base alla sezione visibile
- Reveal-on-scroll (fade + traslazione) con effetto a cascata su quasi tutti gli elementi, via IntersectionObserver
- Contatori numerici animati (interi e decimali)
- Diagramma di economia circolare con hover interattivo sui nodi
- Timeline certificazioni con effetto hover
- Menu hamburger animato per mobile

## Tecnologie

HTML5 semantico, CSS3 (variabili, Grid, Flexbox, animazioni/transizioni, media query), JavaScript vanilla (nessuna libreria esterna).

## Nota sui contenuti

Dati e contenuti tratti da caviro.com (Home, Sostenibilità, Governance) e da comunicati stampa sulla settima edizione del Bilancio di Sostenibilità 2025 (presentato luglio 2026, primo redatto secondo lo standard europeo ESRS), consultati luglio/agosto 2026.

## Nota sulle immagini

Le immagini in `assets/img/` sono **segnaposto generati localmente** (stesso nome file, proporzioni coerenti) — il sandbox di lavoro non consente il download diretto da domini esterni arbitrari. Vanno sostituite con le foto ufficiali prima della pubblicazione.

## Nota sui colori e sui font

Palette e tipografia sono allineate al **"Manuale di Normazione Marchi Gruppo Caviro"** (Brand Manual 2023), fornito direttamente dall'azienda:

- **Colore primario** — rosso vinaccia Pantone 209C — `#6F263D` (RGB 111 38 61)
- **Variante scura** — Pantone 7645C — `#502B3A` (fondi e gradienti scuri)
- **Variante media** — Pantone 209C al 65% — `#A7707B` (hover, accenti)
- **Variante chiara** — Pantone 209C al 30% — `#D7BABF` (badge e dettagli su fondo scuro)
- **Grigio neutro** — "Nero" al 40% — `#B2B2B2` (di supporto)
- **Sfondi**: bianco, da privilegiare come da manuale (pag. 13 "Applicazione su fondi")

**Font**: Merriweather per i titoli, Lato per i testi (pag. 20-21 del manuale — "Tipografia consigliata", applicabile a sito web e materiali di comunicazione).

**Logo**: il logotipo di navbar e footer (`assets/img/caviro-logo-gruppo.png`) è stato estratto in alta risoluzione direttamente dal Brand Manual (marchio "Gruppo Caviro", solo logotipo, senza pittogramma — cfr. pag. 3). È disponibile anche `caviro-logo-sca.png` (marchio Caviro Sca, con pittogramma tricolore), non attualmente utilizzato in pagina.

## Autore

Daniel Faurello — Project Work, CdS Informatica per le Aziende Digitali (L-31)
