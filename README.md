# Selvia Garden: sito (bozza v1)

Sito statico di una pagina per **Selvia Garden di Ivan Bersan** (giardinaggio, Varese).
HTML + CSS + JS puro: nessun framework, nessuna build, nessuna dipendenza, nessun cookie né tracking.

> **Stato: PROPOSTA / BOZZA.** Non è il sito ufficiale e il titolare non ha ancora approvato nulla.
> Per questo la pagina ha `noindex, nofollow` e in cima c'è la striscia "VERSIONE DEMO" con link a Tramontis, su tutta la pagina c'è una filigrana "DEMO" e nel footer c'è la riga "Proposta di sito realizzata da [NOME AGENZIA]".

## Struttura

```
index.html            pagina unica (ancore nel menu)
privacy.html          informativa privacy
assets/css/style.css  stile (palette e variabili in cima, sotto :root)
assets/js/main.js     configurazione dati + menu mobile + galleria + animazioni
assets/img/           logo, favicon, immagine social, pattern foglie
assets/foto/          qui vanno le foto reali dei lavori (ora vuota)
```

## Provare in locale

```bash
python3 -m http.server 8000
# poi apri http://localhost:8000
```

## Modificare i dati

I dati dell'attività sono in cima a `assets/js/main.js`, nell'oggetto `CONFIG`:
indirizzo, telefono (visualizzato e formato internazionale per WhatsApp), messaggio WhatsApp, P.IVA, Instagram.
Il JS aggiorna da lì testi e link (`tel:`, `wa.me`, Google Maps, Instagram) in `index.html` e `privacy.html`.
Il valore scritto nell'HTML resta come copia di riserva se il JS non gira.

Se cambi indirizzo o telefono aggiorna a mano anche il blocco JSON-LD (`LocalBusiness`) nell'`<head>` di `index.html`.

> **Indirizzo da confermare:** qui è `Via Civelli 11, 21100 Varese (VA)`, ma altre directory riportano `Via Cirola 11` e Besano.

### Servizi

Sono in `index.html`, sezione `#servizi`. Le card sono i servizi **confermati** dal titolare.
L'elenco "Altri interventi" contiene servizi **da confermare** (sfalcio, siepi, pulizia, abbattimento, tree climbing):
toglili se il titolare non li offre.

## Aggiungere le foto

1. Metti le foto in `assets/foto/`: JPEG o WebP, larghezza massima ~1600 px, peso ragionevole (idealmente < 300 KB l'una).
2. In `assets/js/main.js` aggiungi una riga per foto nell'array `GALLERY`:
   ```js
   { src: "assets/foto/siepe.jpg", alt: "Siepe potata in un giardino privato", width: 1600, height: 1200, caption: "Potatura siepe" }
   ```
3. Finché `GALLERY` è vuoto la sezione "I nostri lavori" e la voce di menu non compaiono. Con almeno una foto appaiono da sole (le immagini hanno `loading="lazy"`).

Usa solo foto di lavori veri dell'attività: niente foto stock.

## Pubblicare su GitHub Pages

1. Fai il merge del branch sul ramo da pubblicare (quando il titolare approva la bozza).
2. Su GitHub: **Settings → Pages → Build and deployment → Deploy from a branch**, scegli il ramo e la cartella `/ (root)`.
3. Il sito sarà su `https://<utente>.github.io/selvia-garden/`. Tutti i percorsi sono relativi, quindi funziona anche in sottocartella.

## Da bozza a sito ufficiale

- [ ] Rimuovere `<meta name="robots" content="noindex, nofollow">` da `index.html` **e** da `privacy.html`.
- [ ] Rimuovere la striscia "VERSIONE DEMO" (`.demo-banner`) in cima a `index.html` e `privacy.html`, la classe `demo-watermark` dal `<body>` di entrambe (è la filigrana "DEMO") e, se vuoi, `assets/img/demo-watermark.svg`.
- [ ] Rimuovere il paragrafo `.draft-note` ("Proposta di sito realizzata da [NOME AGENZIA]") dal footer di `index.html`.
- [ ] Confermare l'indirizzo e i servizi "da confermare" con il titolare.
- [ ] Aggiungere il dominio: file `CNAME` nella radice (GitHub Pages) e impostazioni DNS.
- [ ] Rendere assoluti con il dominio definitivo gli URL `og:image` (e aggiungere `og:url`, `<link rel="canonical">`, `url`/`logo` nel JSON-LD).
- [ ] Aggiungere le foto vere dei lavori.
- [ ] Far verificare l'informativa `privacy.html` al titolare (è breve perché il sito non raccoglie dati: se aggiungi form, statistiche o mappe incorporate va rivista).
- [ ] Se serve, aggiungere `sitemap.xml` e `robots.txt`.
