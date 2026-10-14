/* ==========================================================================
   Selvia Garden: configurazione e comportamenti
   Nessuna dipendenza, nessun tracking.
   ========================================================================== */

/* ---------- CONFIGURAZIONE: modifica qui i dati dell'attività ---------- */
const CONFIG = {
  businessName: "Selvia Garden di Ivan Bersan",
  vat: "04156850127",

  // DA CONFERMARE col titolare: altre directory riportano "Via Cirola 11" e Besano.
  addressLine: "Via Civelli 11",
  addressCity: "21100 Varese (VA)",

  phoneDisplay: "331 5264618",
  phoneIntl: "393315264618",            // formato internazionale senza "+" (per wa.me)
  whatsappMessage: "Buongiorno, vorrei un preventivo per il giardino",
  instagram: "https://www.instagram.com/selvia_garden/",
};

/* ---------- GALLERIA "I nostri lavori" ----------
   Metti le foto in assets/foto/ e aggiungi una riga per ciascuna.
   Finché l'elenco è vuoto, la sezione (e la voce di menu) restano nascoste.
   Esempio:
   { src: "assets/foto/siepe-prima.jpg", alt: "Siepe potata in un giardino privato", width: 1600, height: 1200, caption: "Potatura siepe" }
*/
const GALLERY = [];

/* ======================================================================== */

(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* --- Applica la configurazione a testi e link --- */
  const mapsQuery = encodeURIComponent(`${CONFIG.addressLine}, ${CONFIG.addressCity.replace(/\s*\(.*\)/, "")}`);
  const hrefs = {
    tel: `tel:+${CONFIG.phoneIntl}`,
    wa: `https://wa.me/${CONFIG.phoneIntl}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`,
    maps: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
    instagram: CONFIG.instagram,
  };
  $$("[data-cfg]").forEach((el) => {
    const v = CONFIG[el.dataset.cfg];
    if (v) el.textContent = v;
  });
  $$("[data-href]").forEach((el) => {
    const v = hrefs[el.dataset.href];
    if (v) el.setAttribute("href", v);
  });

  /* --- Menu mobile --- */
  const toggle = $(".menu-toggle");
  const nav = $("#menu");
  if (toggle && nav) {
    const mq = window.matchMedia("(min-width: 900px)");
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
      nav.hidden = !open;
    };
    const sync = () => setOpen(false);
    sync();
    mq.addEventListener("change", () => { nav.hidden = false; toggle.setAttribute("aria-expanded", "false"); if (!mq.matches) sync(); });
    if (mq.matches) nav.hidden = false;

    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => { if (e.target.closest("a") && !mq.matches) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* --- Galleria condizionale --- */
  const gallerySection = $("#lavori");
  const galleryGrid = $("#gallery-grid");
  if (gallerySection && galleryGrid && Array.isArray(GALLERY) && GALLERY.length) {
    GALLERY.forEach((p) => {
      const li = document.createElement("li");
      const fig = document.createElement("figure");
      const img = document.createElement("img");
      img.src = p.src;
      img.alt = p.alt || "";
      if (p.width) img.width = p.width;
      if (p.height) img.height = p.height;
      img.loading = "lazy";
      img.decoding = "async";
      fig.appendChild(img);
      if (p.caption) {
        const cap = document.createElement("figcaption");
        cap.textContent = p.caption;
        fig.appendChild(cap);
      }
      li.appendChild(fig);
      galleryGrid.appendChild(li);
    });
    gallerySection.hidden = false;
    const navItem = $("#nav-lavori");
    if (navItem) navItem.hidden = false;
  }

  /* --- Ingresso sobrio delle sezioni --- */
  const items = $$(".reveal");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduce) {
    items.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  }
})();
