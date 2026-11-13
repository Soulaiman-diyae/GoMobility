/* ============================================================
   RÉGLAGES DE L'ENTREPRISE
   ============================================================ */
const AGENCY = {
  brand: "GoMobility",
  email: "",                        // laissez vide pour ne pas l'afficher
  defaultLang: "fr",                // fr | ar | en | es
};

/* Les deux agences. whatsapp : format international, sans + ni espaces. */
const AGENCIES = [
  { id: "oujda", city: "Oujda", phone: "+212 661 605 713", whatsapp: "212661605713" },
  { id: "rabat", city: "Rabat", phone: "+212 660 224 545", whatsapp: "212660224545" },
];

/* Villes desservies (noms en français ; traductions dans i18n.js, VALUES).
   free : livraison gratuite.  agency : agence qui livre cette ville.
   photo : image de la ville (crédits dans CITY_CREDITS plus bas). */
const CITIES = [
  { id: "fes",        name: "Fès",        agency: "rabat", photo: "photos/cities/fes.jpg" },
  { id: "meknes",     name: "Meknès",     agency: "rabat", photo: "photos/cities/meknes.jpg" },
  { id: "oujda",      name: "Oujda",      agency: "oujda", photo: "photos/cities/oujda.jpg", free: true },
  { id: "nador",      name: "Nador",      agency: "oujda", photo: "photos/cities/nador.jpg" },
  { id: "tanger",     name: "Tanger",     agency: "rabat", photo: "photos/cities/tanger.jpg" },
  { id: "tetouan",    name: "Tétouan",    agency: "rabat", photo: "photos/cities/tetouan.jpg" },
  { id: "rabat",      name: "Rabat",      agency: "rabat", photo: "photos/cities/rabat.jpg", free: true },
  { id: "kenitra",    name: "Kénitra",    agency: "rabat", photo: "photos/cities/kenitra.jpg" },
  { id: "casablanca", name: "Casablanca", agency: "rabat", photo: "photos/cities/casablanca.jpg" },
  { id: "marrakech",  name: "Marrakech",  agency: "rabat", photo: "photos/cities/marrakech.jpg" },
  { id: "alhoceima",  name: "Al Hoceïma", agency: "oujda", photo: "photos/cities/alhoceima.jpg" },
];

/* Flotte — ajoutez, retirez ou modifiez des voitures ici.
   cat, fuel, gear, color : en français (traduits automatiquement via i18n.js).
   photo : chemin de l'image. */
const CARS = [
  { id: "peugeot-208-grey",   brand: "Peugeot", model: "208",   color: "Gris",  year: 2026, cat: "Citadine", fuel: "Essence", gear: "Automatique", seats: 5, photo: "photos/peugeot-208-grey.webp" },
  { id: "peugeot-208-blue",   brand: "Peugeot", model: "208",   color: "Bleu",  year: 2026, cat: "Citadine", fuel: "Diesel",  gear: "Manuelle",    seats: 5, photo: "photos/peugeot-208-blue.webp" },
  { id: "peugeot-208-black",  brand: "Peugeot", model: "208",   color: "Noir",  year: 2026, cat: "Citadine", fuel: "Essence", gear: "Automatique", seats: 5, photo: "photos/peugeot-208-black.webp" },
  { id: "renault-clio-grey",  brand: "Renault", model: "Clio",  color: "Gris",  year: 2026, cat: "Citadine", fuel: "Essence", gear: "Automatique", seats: 5, photo: "photos/renault-clio-grey.webp" },
  { id: "renault-clio-white", brand: "Renault", model: "Clio",  color: "Blanc", year: 2026, cat: "Citadine", fuel: "Essence", gear: "Automatique", seats: 5, photo: "photos/renault-clio-white.webp" },
  { id: "dacia-logan-grey",   brand: "Dacia",   model: "Logan", color: "Gris",  year: 2026, cat: "Berline",  fuel: "Essence", gear: "Automatique", seats: 5, photo: "photos/dacia-logan-grey.webp" },
  { id: "dacia-logan-black",  brand: "Dacia",   model: "Logan", color: "Noir",  year: 2026, cat: "Berline",  fuel: "Essence", gear: "Automatique", seats: 5, photo: "photos/dacia-logan-black.webp" },
];

/* ============================================================ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const uniq = k => [...new Set(CARS.map(c => c[k]))];
const agencyById = id => AGENCIES.find(a => a.id === id) || AGENCIES[0];
const cityById = id => CITIES.find(c => c.id === id);
const wa = (agency, text) => `https://wa.me/${agency.whatsapp}?text=${encodeURIComponent(text)}`;
const tel = agency => "tel:" + agency.phone.replace(/\s/g, "");

/* ---- langue ---- */
let lang = AGENCY.defaultLang;
try { const s = localStorage.getItem("lang"); if (s && T[s]) lang = s; } catch (e) {}
const t = (k, vars) => { let s = (T[lang] && T[lang][k]) ?? T.fr[k] ?? k; for (const v in vars) s = s.replace(`{${v}}`, vars[v]); return s; };
const tv = v => (VALUES[lang] && VALUES[lang][v]) || v;          // valeur (catégorie, couleur, ville...) traduite
const orig = new WeakMap();                                       // texte français d'origine du HTML

const name = c => `${c.brand} ${c.model}`;
const visual = c => `<img src="${esc(c.photo)}" alt="${esc(name(c) + ", " + tv(c.color))}" loading="lazy">`;
const badges = c => `<div class="badges"><span class="badge">${esc(tv(c.color))} · ${c.year}</span></div>`;
const carQuoteText = c => t("waCar", { car: `${name(c)} (${tv(c.color)}, ${c.year})` });

const WA_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .78.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.050 0 1.21.88 2.38 1 2.54.12.16 1.74 2.65 4.21 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.11-.22-.17-.47-.29Z"/></svg>`;
const ICON = {
  fuel: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M7 8h5M15 10h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V9l-3-3"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="5" cy="6" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="12" cy="18" r="2"/><path d="M5 8v8M12 8v8M19 8v4H5"/></svg>`,
  seat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="7" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1M16 4a3 3 0 0 1 0 6M21 20v-1a6 6 0 0 0-4-5.6"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`,
};

/* Bouton « Demander un devis » : ouvre le choix d'agence, puis WhatsApp avec le message pré-rempli */
const waBtn = c => `<button type="button" class="btn btn-wa" data-wa-msg="${esc(carQuoteText(c))}">${WA_ICON}${esc(t("quote"))}</button>`;

/* ---- cartes voitures ---- */
function card(c) {
  return `<article class="card rv" data-id="${c.id}" tabindex="0" role="button" aria-label="${esc(t("view") + " " + name(c) + " " + tv(c.color))}">
    <div class="card-img">${visual(c)}${badges(c)}</div>
    <div class="card-b">
      <span class="card-brand">${esc(c.brand)} · ${esc(tv(c.cat))}</span>
      <h3><bdi>${esc(name(c))}</bdi></h3>
      <ul class="specs">
        <li>${ICON.fuel}${esc(tv(c.fuel))}</li>
        <li>${ICON.gear}${esc(tv(c.gear))}</li>
        <li>${ICON.seat}${c.seats} ${esc(t("lSeats"))}</li>
      </ul>
      <div class="card-act">${waBtn(c)}<span class="btn btn-details">${esc(t("details"))}${ICON.arrow}</span></div>
    </div></article>`;
}

/* ---- agences ---- */
function drawAgencies() {
  $("#agencies").innerHTML = AGENCIES.map(a => {
    const city = cityById(a.id);
    return `<article class="agency rv">
      <div class="agency-img"><img src="${esc(city.photo)}" alt="${esc(tv(a.city))}" loading="lazy"><span class="pill-free">${esc(t("free"))}</span></div>
      <div class="agency-b">
        <p class="agency-k">${ICON.pin}${esc(t("agKicker"))}</p>
        <h3>${esc(t("agName", { c: tv(a.city) }))}</h3>
        <p class="agency-p">${esc(t("agFree", { c: tv(a.city) }))}</p>
        <a class="agency-tel" href="${tel(a)}" dir="ltr">${ICON.phone}${esc(a.phone)}</a>
        <div class="agency-act">
          <a class="btn btn-wa" href="${esc(wa(a, t("waHello")))}" target="_blank" rel="noopener">${WA_ICON}WhatsApp</a>
          <a class="btn btn-ghost" href="${tel(a)}">${ICON.phone}${esc(t("call"))}</a>
        </div>
      </div></article>`;
  }).join("");
}

/* ---- destinations ---- */
function drawCities() {
  $("#cityGrid").innerHTML = CITIES.map(c => `<li>
    <a class="city rv" href="${esc(wa(agencyById(c.agency), t("waTile", { c: tv(c.name) })))}" target="_blank" rel="noopener" aria-label="${esc(t("tileAria", { c: tv(c.name) }))}">
      <img src="${esc(c.photo)}" alt="" loading="lazy">
      <span class="city-tag ${c.free ? "is-free" : ""}">${esc(t(c.free ? "free" : "paid"))}</span>
      <span class="city-name">${esc(tv(c.name))}</span>
    </a></li>`).join("");
  $("#cityCredits").innerHTML = `<summary>${esc(t("credits"))}</summary><ul>${CITY_CREDITS.map(r => `<li>${esc(tv(r[0]))} : <a href="${esc(r[1])}" target="_blank" rel="noopener">${esc(r[2])}</a>, ${esc(r[3])}</li>`).join("")}</ul>`;
}
/* [ville, page de la photo, auteur, licence] — photos de Wikimedia Commons */
const CITY_CREDITS = [
  ["Fès", "https://commons.wikimedia.org/wiki/File:Fes_Morocco_Medina_rooftops_Sept_2014_-_1_(15922382065).jpg", "Andrew Nash", "CC BY-SA 2.0"],
  ["Meknès", "https://commons.wikimedia.org/wiki/File:Bab_Mansour_gate.jpg", "Jerzy Strzelecki", "CC BY 3.0"],
  ["Oujda", "https://commons.wikimedia.org/wiki/File:Oujda_vue_g%C3%A9n%C3%A9rale_003.JPG", "Moonik", "CC BY-SA 3.0"],
  ["Nador", "https://commons.wikimedia.org/wiki/File:Nador_corniche_2.jpg", "Soufiane errami", "CC BY-SA 4.0"],
  ["Tanger", "https://commons.wikimedia.org/wiki/File:Tangier_Medina_04.jpg", "Hotel La Tangerina", "CC BY 2.0"],
  ["Tétouan", "https://commons.wikimedia.org/wiki/File:Tetouan.jpg", "M1abdelrahman", "CC BY-SA 4.0"],
  ["Rabat", "https://commons.wikimedia.org/wiki/File:Hassan_Tower_01.jpg", "Bernard Gagnon", "CC BY-SA 3.0"],
  ["Kénitra", "https://commons.wikimedia.org/wiki/File:Kenitra_main_pic.jpg", "Hakim Dahoune", "domaine public"],
  ["Casablanca", "https://commons.wikimedia.org/wiki/File:Sunshine_on_mosque_Hassan_II_in_Casablanca,_Morocco_-_Flickr_-_Milamber%27s_portfolio.jpg", "Milamber's portfolio", "CC BY 2.0"],
  ["Marrakech", "https://commons.wikimedia.org/wiki/File:Koutoubia_minaret_from_the_city.JPG", "Schorle", "CC BY-SA 4.0"],
  ["Al Hoceïma", "https://commons.wikimedia.org/wiki/File:DSC02882_a_sight_of_al_hoceima_beach_and_the_island_of_NEKOUR_(Spanish_colony).jpg", "Sami Azarouk", "CC BY-SA 4.0"],
];

/* ---- choix de l'agence (WhatsApp ou appel) ---- */
const picker = $("#picker");
function openPicker(kind, text) {
  $("#pickerTitle").textContent = t(kind === "tel" ? "pkCallT" : "pkT");
  $("#pickerSub").textContent = t(kind === "tel" ? "pkCallSub" : "pkSub");
  $("#pickerList").innerHTML = AGENCIES.map(a => kind === "tel"
    ? `<a class="pick" href="${tel(a)}"><span class="pick-ic">${ICON.phone}</span><span><b>${esc(t("agName", { c: tv(a.city) }))}</b><i dir="ltr">${esc(a.phone)}</i></span></a>`
    : `<a class="pick" href="${esc(wa(a, text))}" target="_blank" rel="noopener"><span class="pick-ic is-wa">${WA_ICON}</span><span><b>${esc(t("agName", { c: tv(a.city) }))}</b><i dir="ltr">${esc(a.phone)}</i></span></a>`).join("");
  picker.showModal();
}
picker.addEventListener("click", e => { if (e.target === picker || e.target.closest(".pick") || e.target.closest("#pickerX")) picker.close(); });

/* ---- filtres ---- */
const state = { model: "", q: "" };
const models = ["", ...new Set(CARS.map(name))];
function drawChips() {
  $("#chips").innerHTML = models.map(m => `<button class="chip" aria-pressed="${state.model === m}" data-model="${esc(m)}">${esc(m || t("allCars"))}</button>`).join("");
}
function fillSelect(id, options) {                                // garde la valeur choisie lors d'un changement de langue
  const el = $("#" + id), v = el.value;
  el.innerHTML = options.map(([val, label]) => `<option value="${esc(val)}">${esc(label)}</option>`).join("");
  el.value = v;
}
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const allLangs = v => [v, ...Object.values(VALUES).map(d => d[v])].filter(Boolean).join(" ");
function render() {
  const gear = $("#fGear").value, fuel = $("#fFuel").value;
  const words = norm(state.q).split(/\s+/).filter(Boolean);
  const list = CARS.filter(c => {
    const hay = norm([name(c), c.year, allLangs(c.cat), allLangs(c.fuel), allLangs(c.gear), allLangs(c.color)].join(" "));
    return (!state.model || name(c) === state.model) && (!gear || c.gear === gear) && (!fuel || c.fuel === fuel) && words.every(w => hay.includes(w));
  });
  $("#grid").innerHTML = list.map(card).join("");
  $("#empty").hidden = list.length > 0;
  $("#count").textContent = t("count", { n: list.length, t: CARS.length }) + (state.q ? t("countQ", { q: state.q }) : "");
  observe();
}
function resetFilters() {
  state.model = ""; state.q = ""; $("#q").value = "";
  $("#fGear").value = $("#fFuel").value = "";
  drawChips(); render();
}

/* ---- modale : fiche + demande de devis ---- */
const modal = $("#modal");
function formHTML(subject) {
  const today = new Date().toISOString().slice(0, 10);
  const cityOpt = c => `<option value="${c.id}">${esc(tv(c.name))} · ${esc(t(c.free ? "free" : "paid"))}</option>`;
  return `<form class="form" id="quoteForm">
    <h4>${esc(t("fTitle"))}</h4>
    <input type="hidden" name="subject" value="${esc(subject)}">
    <label>${esc(t("fName"))}<input name="name" required autocomplete="name"></label>
    <label>${esc(t("fPhone"))}<input name="phone" type="tel" dir="ltr" required autocomplete="tel" placeholder="+212 ..."></label>
    <div class="two stack">
      <label>${esc(t("fCity"))}<select name="city">${CITIES.map(cityOpt).join("")}</select></label>
      <label>${esc(t("fAgency"))}<select name="agency">${AGENCIES.map(a => `<option value="${a.id}">${esc(tv(a.city))}</option>`).join("")}</select></label>
    </div>
    <div class="two">
      <label>${esc(t("fFrom"))}<input name="from" type="date" required min="${today}"></label>
      <label>${esc(t("fTo"))}<input name="to" type="date" required min="${today}"></label>
    </div>
    <label>${esc(t("fMsg"))}<textarea name="msg" rows="3" placeholder="${esc(t("fMsgPh"))}"></textarea></label>
    <button class="btn btn-wa" type="submit">${WA_ICON}${esc(t("fSend"))}</button>
    <p class="note">${esc(t("fNote"))}</p>
  </form>`;
}
function openCar(id) {
  const c = CARS.find(x => x.id === id); if (!c) return;
  const body = $("#modalBody"); body.className = "modal-body";
  const row = (k, v) => `<div><span>${esc(t(k))}</span><b>${esc(v)}</b></div>`;
  body.innerHTML = `<div class="m-info">
      <div class="card-img">${visual(c)}${badges(c)}</div>
      <span class="card-brand">${esc(tv(c.cat))} · ${esc(tv(c.gear))}</span>
      <h3 id="mTitle"><bdi>${esc(name(c))}</bdi></h3>
      <div class="m-quote">${waBtn(c)}</div>
      <div class="m-list">
        ${row("mYear", c.year)}${row("mColor", tv(c.color))}${row("mCat", tv(c.cat))}${row("mSeats", c.seats)}
        ${row("mFuel", tv(c.fuel))}${row("mGear", tv(c.gear))}${row("mDel", t("delVal"))}${row("mIncl", t("inclVal"))}
      </div></div>${formHTML(`${name(c)} (${tv(c.color)}, ${c.year})`)}`;
  syncAgency();
  modal.showModal();
}
function openQuote() {
  const body = $("#modalBody"); body.className = "modal-body solo";
  body.innerHTML = `<h3 id="mTitle" class="sr">${esc(t("fTitle"))}</h3>` + formHTML(t("defSubject"));
  syncAgency();
  modal.showModal();
}
/* l'agence suit la ville de livraison choisie (modifiable) */
function syncAgency() {
  const f = $("#quoteForm"); if (!f) return;
  f.agency.value = cityById(f.city.value).agency;
}
modal.addEventListener("change", e => { if (e.target.name === "city") syncAgency(); });
modal.addEventListener("submit", e => {
  if (e.target.id !== "quoteForm") return;
  e.preventDefault();
  const f = Object.fromEntries(new FormData(e.target));
  if (f.to < f.from) { e.target.to.setCustomValidity(t("fDateErr")); e.target.to.reportValidity(); return; }
  const city = cityById(f.city);
  const d = s => s.split("-").reverse().join("/");
  const line = (k, v) => `${t(k)} : ${v}`;
  const text = [t("waIntro"), line("waReq", f.subject), line("waName", f.name), line("waPhone", f.phone),
    line("waCity", `${tv(city.name)} (${t(city.free ? "free" : "paid")})`), t("waDates", { a: d(f.from), b: d(f.to) }), f.msg && line("waMsg", f.msg)].filter(Boolean).join("\n");
  /* un vrai lien plutôt que window.open : les navigateurs bloquent souvent les fenêtres ouvertes par script */
  const ag = agencyById(f.agency);
  e.target.innerHTML = `<div class="ready">
    <h4>${esc(t("fReady"))}</h4>
    <p>${esc(t("fReadySub", { c: t("agName", { c: tv(ag.city) }) }))}</p>
    <pre class="ready-msg">${esc(text)}</pre>
    <a class="btn btn-wa" href="${esc(wa(ag, text))}" target="_blank" rel="noopener">${WA_ICON}${esc(t("fSend"))}</a>
    <p class="note" dir="ltr">${esc(ag.phone)}</p>
  </div>`;
});
modal.addEventListener("input", e => e.target.name === "to" && e.target.setCustomValidity(""));
$("#modalX").onclick = () => modal.close();
modal.addEventListener("click", e => e.target === modal && modal.close());

/* ---- application de la langue à toute la page ---- */
function applyLang(next) {
  if (next && T[next]) { lang = next; try { localStorage.setItem("lang", lang); } catch (e) {} }
  const root = document.documentElement;
  root.lang = lang; root.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = t("pageTitle", { brand: AGENCY.brand });

  const own = k => T[lang] && T[lang][k];
  $$("[data-i18n]").forEach(el => { if (!orig.has(el)) orig.set(el, el.innerHTML); el.innerHTML = own(el.dataset.i18n) ?? orig.get(el); });
  $$("[data-i18n-ph]").forEach(el => { if (!orig.has(el)) orig.set(el, el.placeholder); el.placeholder = own(el.dataset.i18nPh) ?? orig.get(el); });
  $$("[data-i18n-aria]").forEach(el => { if (!orig.has(el)) orig.set(el, el.getAttribute("aria-label")); el.setAttribute("aria-label", own(el.dataset.i18nAria) ?? orig.get(el)); });

  $$("[data-lang-switch]").forEach(el => el.innerHTML = LANGS.map(([code, label]) => `<button type="button" data-lang="${code}" lang="${code}" aria-pressed="${code === lang}">${label}</button>`).join(""));
  fillSelect("fGear", [["", t("optAllF")], ...uniq("gear").map(v => [v, tv(v)])]);
  fillSelect("fFuel", [["", t("optAllM")], ...uniq("fuel").map(v => [v, tv(v)])]);

  $("#heroCount").textContent = t("heroCount", { n: CARS.length });
  $("#footAgencies").innerHTML = AGENCIES.map(a => `<a href="${tel(a)}"><b>${esc(tv(a.city))}</b> · <span dir="ltr">${esc(a.phone)}</span></a>`).join("");
  if (modal.open) modal.close();
  if (picker.open) picker.close();
  drawAgencies(); drawCities(); drawChips(); render();
}

/* ---- événements ---- */
document.addEventListener("click", e => {
  const el = e.target;
  const w = el.closest("[data-wa-msg]"); if (w) { e.preventDefault(); openPicker("wa", w.dataset.waMsg || t("waHello")); return; }
  if (el.closest("[data-call]")) { e.preventDefault(); openPicker("tel"); return; }
  const lg = el.closest("[data-lang]"); if (lg) { applyLang(lg.dataset.lang); closeNav(); return; }
  if (el.closest("[data-quote]")) { openQuote(); return; }
  const chip = el.closest(".chip"); if (chip) { state.model = chip.dataset.model; drawChips(); render(); return; }
  const cd = el.closest(".card"); if (cd) { openCar(cd.dataset.id); return; }
  if (el.closest(".nav a")) closeNav();
});
document.addEventListener("keydown", e => {
  if ((e.key === "Enter" || e.key === " ") && e.target.classList?.contains("card")) { e.preventDefault(); openCar(e.target.dataset.id); }
});
["fGear", "fFuel"].forEach(id => $("#" + id).addEventListener("change", render));
$("#reset").onclick = resetFilters;
$("#heroSearch").addEventListener("submit", e => {
  e.preventDefault(); state.q = $("#q").value.trim(); render();
  $("#flotte").scrollIntoView({ behavior: "smooth" });
});

/* ---- menu mobile & en-tête ---- */
const burger = $("#burger"), nav = $("#nav");
function setNav(open) {
  nav.classList.toggle("open", open);
  document.body.classList.toggle("nav-open", open);
  burger.setAttribute("aria-expanded", String(open));
}
function closeNav() { setNav(false); }
burger.onclick = e => { e.stopPropagation(); setNav(!nav.classList.contains("open")); };
/* toucher en dehors du menu ou appuyer sur Échap le ferme */
document.addEventListener("click", e => { if (nav.classList.contains("open") && !e.target.closest("#nav, #burger")) closeNav(); }, true);
document.addEventListener("keydown", e => { if (e.key === "Escape" && nav.classList.contains("open")) { closeNav(); burger.focus(); } });
addEventListener("resize", () => { if (innerWidth > 1100 && nav.classList.contains("open")) closeNav(); });
const onScroll = () => $("#top").classList.toggle("solid", scrollY > 24);
addEventListener("scroll", onScroll, { passive: true }); onScroll();

/* ---- apparition au défilement ---- */
const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" }) : null;
function observe() { $$(".rv:not(.in)").forEach(el => io ? io.observe(el) : el.classList.add("in")); }

/* ---- initialisation ---- */
$$("[data-brand]").forEach(el => el.textContent = AGENCY.brand);
$$("[data-mail]").forEach(el => { if (!AGENCY.email) { el.remove(); return; } el.href = "mailto:" + AGENCY.email; el.textContent = AGENCY.email; });
$("#year").textContent = new Date().getFullYear();
$$(".sec .title, .sec .sub, .services article, .steps li, .stats-grid div").forEach(el => el.classList.add("rv"));
applyLang();
