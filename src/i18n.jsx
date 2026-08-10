/* ============================================================
   i18n — EN (default) / IT  ·  copy restored to the original brief
   window.I18N + window.LangProvider + window.useT
   ============================================================ */
const { createContext, useContext, useState, useEffect } = React;

const I18N = {
  en: {
    code: "EN",
    nav: { problem: "Problem", process: "How it works", about: "About us", why: "Why us", blog: "Blog", contact: "Free audit", cta: "Book a call" },
    hero: {
      tag: ["Reputation Management Agency", "Est. 2010"],
      h1a: "Want to clean up and", h1b: "rebuild", h1c: "your online reputation?",
      trust: "Trust us.",
      sub: "We remove negative content from Google, forums and social media.",
      techLine: "3 new technologies that help us rebuild your online reputation.",
      guarantee: "Payment only after deletion is completed",
      cta1: "Book a free consultation now",
      cta2: "Free reputation analysis",
      rating: "4.9", b_trustpilot: "on Trustpilot",
      b_casesNum: "250+", b_cases: "cases resolved",
      b_legal: "Trustpilot raised from 2.2 to 4.0",
      statsTitle: "Track record", live: "Live",
      stats: [
        { v: 16, suffix: "", l: "Years of experience" },
        { v: 7500, suffix: "+", l: "Cases resolved" },
        { v: 82000, suffix: "", l: "Toxic links removed", note: "updating", tick: true },
        { v: 102459, suffix: "", l: "Positive content added", note: "updating", tick: true },
      ],
    },
    strip: ["Legal consultancy & removal", "Ethical hacking", "Trustpilot management", "Google Reviews management", "Related searches removal", "Negative Google suggestions removal"],
    partners: { label: "We work with", names: ["Facebook", "Glassdoor", "GoWork.it", "Indeed", "Google", "Meta", "Trustpilot", "YouTube", "VK"] },
    services: {
      eyebrow: "Premium services",
      title: "Our premium services",
      items: ["Legal consultancy & removal", "Google Reviews management", "Ethical hacking", "Related searches removal", "Trustpilot management", "Negative Google suggestions removal"],
      badgeCases: "250+ cases resolved",
      badgeNote: "Trustpilot raised from 2.2 to 4.0",
      cta: "Book a free consultation now",
    },
    problem: {
      eyebrow: "Problem · why you're here",
      title: "Do you have one of these problems?",
      lead: "",
      items: [
        { t: "Defamatory Google reviews that cost you clients" },
        { t: "Toxic Google suggestions tied to your company (e.g. \u201cCompany name + complaint\u201d)" },
        { t: "A former employee or partner posting negative content" },
        { t: "Toxic press articles ranking in the top results" },
        { t: "Forums or Facebook pages trashing you" },
        { t: "Competitors attacking you with fake accounts" },
        { t: "Haters flooding the web with toxic comments and reviews" },
      ],
      actions: ["We remove toxic Google suggestions", "We remove, downgrade or de-index Facebook groups that defame your company"],
      footNum: "11,000",
      footUnit: "negative items removed in the last 12 months",
      footLine: "If you have even one of these problems, we can help.",
      footCta: "Free reputation analysis",
    },
    process: {
      eyebrow: "How it works",
      title: "Three phases. One outcome.",
      lead: "You see what can be removed, what can be de-indexed and what it costs before we start.",
      steps: [
        { n: "01", t: "Analysis", items: [
          ["We map", " everything that shows up on Google for your name or company."],
          ["We identify", " what can be removed, what can't, and what can be de-indexed."],
          ["We send a report", " with costs and timelines."],
        ]},
        { n: "02", t: "Action", items: [
          ["Direct removal:", " hacking, formal disputes to Google, hosting providers, platforms."],
          ["Legal action:", " cease-and-desist to site owners, lawsuits if necessary."],
          ["De-indexing:", " content that can't be deleted gets pushed off the first page."],
          ["We rebuild", " your online reputation through a series of innovative, guaranteed methods."],
        ]},
        { n: "03", t: "Monitoring", items: [
          ["We check", " that no new negative content reappears."],
          ["We handle", " any new crisis."],
          ["Monthly report", " on the state of your reputation."],
        ]},
      ],
    },
    about: {
      eyebrow: "Web Reputation Management agency",
      title: "Who we are",
      lead: [
        "Webreputation.agency is a reputation management agency that helps professionals and businesses clean up and restructure their online image. We remove fake reviews, toxic articles and negative search suggestions from Google, forums and social networks.",
        "We combine proprietary technology with legal expertise, and guarantee concrete results: you pay only once a negative item has actually been deleted. We handle removals from Trustpilot and Google Reviews, clean up search suggestions, and act with legal notices and de-indexing techniques.",
        "Our goal is to bring back to the first page only what deserves to be seen, defending your name and your reputation. We rebuild your online reputation by building an ecosystem and a defence system able to withstand any future reputational crisis.",
      ],
      leadTech: "Three exclusive patented technologies: CLEANSCAN AI for digital diagnosis, NEUTRALIZER CORE for certified neutralisation of toxic content, and TRUST ENGINE for assisted rebuilding of online credibility.",
      leaderLine: "We are leaders in online reputation restructuring across Europe and Eastern Europe.",
      stats: [
        { n: "Free", l: "The audit is free" },
        { n: "Speed", l: "We reply within 3 hours" },
        { n: "Confidential", l: "Guaranteed by contract clauses" },
        { n: "Efficient", l: "Restructuring plan in 48 hours" },
        { n: "Guaranteed", l: "You pay only after deletion" },
      ],
      mapNote: "Active worldwide",
    },
    why: {
      eyebrow: "Why us",
      title: "Removing isn't the only thing that matters.",
      lead: "We don't just remove — we restructure and rebuild your brand. A team of professionals, not just technicians.",
      journey: ["First, we delete", "Then we de-index and bury", "Then we add and restructure", "Finally, we monitor"],
      items: [
        { t: "Legal consultancy included", d: "We're not just technicians — we have a team specialised in defamation, the right to be forgotten and legal reputation management." },
        { t: "Guaranteed results", d: "You pay only once removal or de-indexing has actually happened." },
        { t: "Cutting-edge technology", d: "Three exclusive technologies: CLEANSCAN AI for digital diagnosis, NEUTRALIZER CORE for certified neutralisation of toxic content, and TRUST ENGINE for assisted rebuilding of online credibility. All patented in-house." },
        { t: "Absolute privacy", d: "Our contracts are locked down by international confidentiality clauses." },
        { t: "Solid and professional", d: "A team of professionals ready to restructure and rebuild your brand — deletions alone are not enough." },
      ],
      shieldBig: "100%", shieldSmall: "Confidential",
    },
    form: {
      eyebrow: "Free consultation",
      title: "Find out what's really being said about you online.",
      lead: "A no-obligation audit of your online reputation.",
      perks: ["Free, confidential audit", "Costs and timelines up front", "Legal consultancy included", "Payment only after results"],
      name: "Name", namePh: "Your name",
      email: "Email", emailPh: "you@company.com",
      phone: "Phone", phonePh: "+39 …",
      need: "What do you need?",
      needOpts: ["Remove defamatory reviews", "Delete toxic articles", "Remove negative associations on Google", "Add positive content", "Other"],
      submit: "Free audit of your online reputation",
      sending: "Sending…",
      note: "We reply within a maximum of 3 working hours.",
      success: "Got it. We'll be in touch within 3 working hours.",
      error: "Something went wrong. Try again, or write to us on WhatsApp.",
    },
    footer: {
      tagline: ["We clean, we add, we ", "rebuild", "."],
      payoff: "Clean. Add. Restructure.",
      addr: "Address", addrV: "45 Berkeley Square, Mayfair, London W1J 5EB, UK",
      mail: "Mail", tel: "Phone",
      colLinks: "Navigation", colLegal: "Legal",
      privacy: "Privacy Policy", cookie: "Cookie Policy",
      owner: "WEB-REPUTATION.AGENCY is owned by", ownerLink: "Attolini Agency",
    },
    cookies: {
      title: "Cookies",
      text: "We use cookies to run the site and understand how it's used. You decide what we keep.",
      accept: "Accept all",
      reject: "Essential only",
      settings: "Settings",
      save: "Save choices",
      necessary: "Essential",
      necessaryNote: "Needed for the site to work. Always on.",
      analytics: "Analytics",
      analyticsNote: "Helps us see which pages get used.",
      marketing: "Marketing",
      marketingNote: "Lets us measure and target our ads.",
      manage: "Cookie settings",
    },
    wa: "Telegram",
  },

  it: {
    code: "IT",
    nav: { problem: "Problema", process: "Come funziona", about: "Chi siamo", why: "Perché noi", blog: "Blog", contact: "Audit gratis", cta: "Prenota" },
    hero: {
      tag: ["Reputation Management Agency", "Dal 2010"],
      h1a: "Vuoi ripulire e", h1b: "ristrutturare", h1c: "la tua reputazione online?",
      trust: "Affidati a noi.",
      sub: "Eliminiamo contenuti negativi da Google, forum e social.",
      techLine: "3 nuove tecnologie che ci aiutano a ristrutturare la tua reputazione online.",
      guarantee: "Pagamento solo a cancellazione avvenuta",
      cta1: "Prenota consulenza gratuita ora",
      cta2: "Analisi reputazione gratuita",
      rating: "4.9", b_trustpilot: "su Trustpilot",
      b_casesNum: "250+", b_cases: "casi risolti",
      b_legal: "Trustpilot portato da 2,2 a 4,0",
      statsTitle: "I nostri numeri", live: "Live",
      stats: [
        { v: 16, suffix: "", l: "Anni di esperienza" },
        { v: 7500, suffix: "+", l: "Casi risolti" },
        { v: 82000, suffix: "", l: "Link tossici eliminati", note: "in aggiornamento", tick: true },
        { v: 102459, suffix: "", l: "Contenuti positivi aggiunti", note: "in aggiornamento", tick: true },
      ],
    },
    strip: ["Consulenza ed eliminazione legale", "Ethical hacking", "Gestione Trustpilot", "Gestione Google Reviews", "Eliminazione ricerche correlate", "Eliminazione suggerimenti Google negativi"],
    partners: { label: "Lavoriamo con", names: ["Facebook", "Glassdoor", "GoWork.it", "Indeed", "Google", "Meta", "Trustpilot", "YouTube", "VK"] },
    services: {
      eyebrow: "Servizi premium",
      title: "I nostri servizi premium",
      items: ["Consulenza ed eliminazione legale", "Gestione Google Reviews", "Hacking", "Eliminazione ricerche correlate", "Gestione Trustpilot", "Eliminazione suggerimenti negativi Google"],
      badgeCases: "250+ casi risolti",
      badgeNote: "Trustpilot portato da 2,2 a 4,0",
      cta: "Prenota consulenza gratuita ora",
    },
    problem: {
      eyebrow: "Problema · perché sei qui",
      title: "Hai uno di questi problemi?",
      lead: "",
      items: [
        { t: "Recensioni diffamatorie su Google che ti fanno perdere clienti" },
        { t: "Suggerimenti di Google tossici associati alla tua azienda (es. \u201cNome azienda + denuncia\u201d)" },
        { t: "Un ex dipendente o collaboratore che scrive post negativi" },
        { t: "Articoli di stampa tossici che escono nei primi risultati" },
        { t: "Forum o pagine Facebook dove parlano male di te" },
        { t: "Concorrenti che ti attaccano con account fake" },
        { t: "Haters che inondano il web di commenti e recensioni tossiche" },
      ],
      actions: ["Eliminiamo suggerimenti tossici di Google", "Eliminiamo, declassiamo o deindicizziamo i gruppi Facebook che diffamano la tua azienda"],
      footNum: "11.000",
      footUnit: "contenuti negativi rimossi negli ultimi 12 mesi",
      footLine: "Se hai anche solo uno di questi problemi, possiamo aiutarti.",
      footCta: "Analisi reputazione gratuita",
    },
    process: {
      eyebrow: "Come funziona",
      title: "Tre fasi. Un risultato.",
      lead: "Vedi cosa si può rimuovere, cosa si può deindicizzare e quanto costa prima di iniziare.",
      steps: [
        { n: "01", t: "Analisi", items: [
          ["Mappiamo", " tutto quello che esce su Google digitando il tuo nome o azienda."],
          ["Identifichiamo", " cosa si può rimuovere, cosa no e cosa si può deindicizzare."],
          ["Ti mandiamo un report", " con costi e tempistiche."],
        ]},
        { n: "02", t: "Azione", items: [
          ["Rimozione diretta:", " hacking, contestazioni formali a Google, gestori hosting, piattaforme."],
          ["Azioni legali:", " diffide ai gestori dei siti, querele se necessario."],
          ["Deindicizzazione:", " i contenuti che non si possono cancellare li facciamo uscire dalla prima pagina."],
          ["Ricostruiamo", " la tua reputazione online attraverso una serie di metodi innovativi e garantiti."],
        ]},
        { n: "03", t: "Monitoraggio", items: [
          ["Controlliamo", " che non ricompaiano nuovi contenuti negativi."],
          ["Gestiamo", " eventuali nuove crisi."],
          ["Report mensile", " con lo stato della tua reputazione."],
        ]},
      ],
    },
    about: {
      eyebrow: "Agenzia di Web Reputation Management",
      title: "Chi siamo",
      lead: [
        "Webreputation.agency è un'agenzia specializzata nel Reputation Management che aiuta professionisti e aziende a ripulire e ristrutturare la propria immagine online. Eliminiamo recensioni false, articoli tossici e suggerimenti di ricerca negativi da Google, forum e social network.",
        "Operiamo con un approccio che unisce tecnologia proprietaria e competenze legali, garantendo risultati concreti: paghi solo quando un contenuto negativo viene effettivamente cancellato. Gestiamo la rimozione da Trustpilot e Google Reviews, la pulizia dei suggerimenti di ricerca, e interveniamo con diffide legali e tecniche di deindicizzazione.",
        "Il nostro obiettivo è riportare in prima pagina solo ciò che merita di essere visto, difendendo il tuo nome e la tua reputazione. Ricostruiamo la tua reputazione online attraverso la costruzione di un ecosistema e di un impianto di difesa in grado di superare qualsiasi altra successiva crisi reputazionale.",
      ],
      leadTech: "Tre tecnologie esclusive brevettate: CLEANSCAN AI per la diagnosi digitale, NEUTRALIZER CORE per la neutralizzazione certificata dei contenuti tossici e TRUST ENGINE per la ricostruzione assistita della credibilità online.",
      leaderLine: "Siamo leader nella ricostruzione della reputazione online in Europa ed Est Europa.",
      stats: [
        { n: "Gratis", l: "L'audit è gratis" },
        { n: "Velocità", l: "Rispondiamo entro 3 ore" },
        { n: "Riservatezza", l: "Garantita da clausole contrattuali" },
        { n: "Efficienza", l: "Piano di ristrutturazione in 48 ore" },
        { n: "Garanzia", l: "Paghi solo a cancellazione avvenuta" },
      ],
      mapNote: "Attivi nel mondo",
    },
    why: {
      eyebrow: "Perché noi",
      title: "Rimuovere non è l'unica cosa che conta.",
      lead: "Non rimuoviamo soltanto — ristrutturiamo e ricostruiamo il tuo brand. Una squadra di professionisti, non solo tecnici.",
      journey: ["Prima cancelliamo", "Poi deindicizziamo e seppelliamo", "Poi aggiungiamo e ristrutturiamo", "Infine monitoriamo"],
      items: [
        { t: "Consulenza legale inclusa", d: "Non siamo solo tecnici: abbiamo al nostro interno un team specializzato in diffamazione, diritto all'oblio e legal reputation management." },
        { t: "Risultati garantiti", d: "Paghi solo a eliminazione o deindicizzazione avvenuta." },
        { t: "Tecnologia all'avanguardia", d: "Tre tecnologie esclusive: CLEANSCAN AI per la diagnosi digitale, NEUTRALIZER CORE per la neutralizzazione certificata dei contenuti tossici, e TRUST ENGINE per la ricostruzione assistita della credibilità online. Tutte tecnologie brevettate da noi." },
        { t: "Privacy assoluta", d: "I nostri contratti sono blindati da clausole internazionali di riservatezza." },
        { t: "Solidità e professionalità", d: "Una squadra di professionisti pronta a ristrutturare e ricostruire il tuo brand — le cancellazioni da sole non bastano." },
      ],
      shieldBig: "100%", shieldSmall: "Riservato",
    },
    form: {
      eyebrow: "Consulenza gratuita",
      title: "Scopri cosa si dice davvero di te online.",
      lead: "Un audit della tua reputazione online, senza impegno.",
      perks: ["Audit gratuito e riservato", "Costi e tempistiche subito", "Consulenza legale inclusa", "Pagamento solo a risultato"],
      name: "Nome", namePh: "Il tuo nome",
      email: "Email", emailPh: "tu@azienda.com",
      phone: "Telefono", phonePh: "+39 …",
      need: "Di cosa hai bisogno?",
      needOpts: ["Rimuovere recensioni diffamatorie", "Cancellare articoli tossici", "Eliminare associazioni negative in Google", "Aggiungere contenuti positivi", "Altro"],
      submit: "Audit gratuito della tua reputazione online",
      sending: "Invio…",
      note: "Rispondiamo in massimo 3 ore lavorative.",
      success: "Ricevuto. Ti scriviamo entro 3 ore lavorative.",
      error: "Qualcosa è andato storto. Riprova, o scrivici su WhatsApp.",
    },
    footer: {
      tagline: ["Ripuliamo, aggiungiamo, ", "ristrutturiamo", "."],
      payoff: "Ripuliamo. Aggiungiamo. Ristrutturiamo.",
      addr: "Indirizzo", addrV: "45 Berkeley Square, Mayfair, London W1J 5EB, UK",
      mail: "Mail", tel: "Telefono",
      colLinks: "Navigazione", colLegal: "Note legali",
      privacy: "Privacy Policy", cookie: "Cookie Policy",
      owner: "WEB-REPUTATION.AGENCY è proprietà della", ownerLink: "Attolini Agency",
    },
    cookies: {
      title: "Cookie",
      text: "Usiamo i cookie per far funzionare il sito e capire come viene usato. Decidi tu cosa tenere.",
      accept: "Accetta tutti",
      reject: "Solo essenziali",
      settings: "Impostazioni",
      save: "Salva scelte",
      necessary: "Essenziali",
      necessaryNote: "Servono al funzionamento del sito. Sempre attivi.",
      analytics: "Analitici",
      analyticsNote: "Ci aiutano a vedere quali pagine vengono usate.",
      marketing: "Marketing",
      marketingNote: "Ci permettono di misurare e indirizzare gli annunci.",
      manage: "Impostazioni cookie",
    },
    wa: "Telegram",
  },
};

const LangContext = createContext({ lang: "en", t: I18N.en, setLang: () => {} });

function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = typeof localStorage !== "undefined" && localStorage.getItem("wra_lang");
    return (saved && I18N[saved]) ? saved : "en";
  });
  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem("wra_lang", l); } catch (e) {}
    document.documentElement.lang = l;
  };
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return React.createElement(LangContext.Provider, { value: { lang, t: I18N[lang], setLang } }, children);
}
function useT() { return useContext(LangContext); }

Object.assign(window, { I18N, LangContext, LangProvider, useT });
