/* ============================================================
   Sections: Problem, Process, About(globe), Why(shield), Form, Footer, WA
   ============================================================ */
const { useState: useStateS, useRef: useRefS } = React;

/* ---------- PARTNER LOGOS ---------- */
const e_ = React.createElement;
function partnerLogo(name) {
  switch (name) {
    case "Facebook": return e_("svg", { viewBox: "0 0 24 24", className: "pl-ico" },
      e_("circle", { cx: 12, cy: 12, r: 12, fill: "#1877F2" }),
      e_("path", { d: "M15.4 12.6h-2.3V20h-2.9v-7.4H8.5V10h1.7V8.4c0-2 1-3.2 3.3-3.2h2v2.6h-1.3c-1 0-1.1.4-1.1 1.1V10h2.5l-.2 2.6z", fill: "#fff" }));
    case "Glassdoor": return e_("svg", { viewBox: "0 0 24 24", className: "pl-ico" },
      e_("path", { d: "M15.5 4.5v-2H8.7A3.2 3.2 0 0 0 5.5 5.7v12.6a3.2 3.2 0 0 0 3.2 3.2h6.8a3.2 3.2 0 0 0 3.2-3.2h-10V5.7c0-.7.5-1.2 1.2-1.2h5.6z", fill: "#0CAA41" }),
      e_("path", { d: "M18.7 8.5h-8.2v2h6.2v8.8h2V8.5z", fill: "#0CAA41" }));
    case "GoWork.it": return e_("svg", { viewBox: "0 0 24 24", className: "pl-ico" },
      e_("circle", { cx: 12, cy: 12, r: 12, fill: "#D42B1E" }),
      e_("path", { d: "M7 12h7m0 0l-2.6-2.6M14 12l-2.6 2.6", stroke: "#fff", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }));
    case "Indeed": return e_("svg", { viewBox: "0 0 24 24", className: "pl-ico" },
      e_("circle", { cx: 13.4, cy: 5.4, r: 2.6, fill: "#2557A7" }),
      e_("path", { d: "M11.2 10.3c1 .3 2.2.3 3.2 0V19a1.6 1.6 0 0 1-3.2 0v-8.7z", fill: "#2557A7" }),
      e_("path", { d: "M15.9 3.4C13.6 1.6 10 2 8 4.6a7.6 7.6 0 0 0-1.5 5c.6-2 1.6-3.6 3.3-4.7a6.6 6.6 0 0 1 6.1-.5c.4.2.6-.1.4-.4-.1-.2-.3-.4-.4-.6z", fill: "#2557A7" }));
    case "Google": return e_("svg", { viewBox: "0 0 24 24", className: "pl-ico" },
      e_("path", { d: "M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.6h3.2c1.9-1.8 3-4.3 3-7.5z", fill: "#4285F4" }),
      e_("path", { d: "M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1a5.9 5.9 0 0 1-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z", fill: "#34A853" }),
      e_("path", { d: "M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9l3.3-2.6z", fill: "#FBBC05" }),
      e_("path", { d: "M12 6a5.4 5.4 0 0 1 3.8 1.5l2.9-2.9A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.9 5.5l3.3 2.6A5.9 5.9 0 0 1 12 6z", fill: "#EA4335" }));
    case "Meta": return e_("svg", { viewBox: "0 0 24 24", className: "pl-ico" },
      e_("path", { d: "M6.9 7.5c-2 0-3.9 2.6-3.9 5.6 0 2 .9 3.4 2.5 3.4 1.5 0 2.4-1.2 3.8-3.8l1-1.8c1.6-2.9 2.9-3.4 4.2-3.4 2.1 0 3.9 2.7 3.9 5.7 0 1.9-.8 3.3-2.4 3.3-1 0-1.8-.6-2.9-2.2", stroke: "#0668E1", strokeWidth: 2, fill: "none", strokeLinecap: "round" }));
    case "Trustpilot": return e_("svg", { viewBox: "0 0 24 24", className: "pl-ico" },
      e_("path", { d: "M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2l-6.1 3.4 1.4-6.8L2.2 9.1l6.9-.8L12 2z", fill: "#00B67A" }));
    case "YouTube": return e_("svg", { viewBox: "0 0 24 24", className: "pl-ico" },
      e_("rect", { x: 1.5, y: 5, width: 21, height: 14, rx: 4, fill: "#FF0000" }),
      e_("path", { d: "M10 9l5.2 3L10 15V9z", fill: "#fff" }));
    case "VK": return e_("svg", { viewBox: "0 0 24 24", className: "pl-ico" },
      e_("rect", { x: 1, y: 1, width: 22, height: 22, rx: 6, fill: "#0077FF" }),
      e_("path", { d: "M12.8 16.6c-4.4 0-7-3-7.1-8h2.2c.1 3.7 1.7 5.2 3 5.5V8.6h2.1v3.2c1.3-.2 2.6-1.6 3-3.2h2.1a6.2 6.2 0 0 1-2.9 4.1 6.4 6.4 0 0 1 3.4 3.9h-2.3a4 4 0 0 0-3.3-2.9v2.9h-.2z", fill: "#fff" }));
    default: return null;
  }
}
function PartnerStrip() {
  const { t } = useT();
  const names = t.partners.names;
  const row = (key) => names.map((n, i) => React.createElement("span", { className: "partner-item", key: key + i }, partnerLogo(n), React.createElement("span", { className: "pl-name" }, n)));
  return React.createElement("div", { className: "partner-strip", "aria-label": t.partners.label },
    React.createElement("div", { className: "wrap partner-strip-head" },
      React.createElement("span", null, t.partners.label)),
    React.createElement("div", { className: "partner-strip-track-wrap" },
      React.createElement("div", { className: "partner-strip-track" }, row("a"), row("b"))));
}

/* ---------- PROBLEM ---------- */
function Problem() {
  const { t } = useT();
  const p = t.problem;
  return React.createElement("section", { className: "section scrim", id: "problem" },
    React.createElement("div", { className: "wrap" },
      React.createElement("div", { className: "section-head" },
        React.createElement(Reveal, { as: "div", className: "eyebrow" }, p.eyebrow),
        React.createElement(Reveal, { as: "h2", className: "h-xl", d: "1" }, p.title),
        p.lead && React.createElement(Reveal, { as: "p", className: "lead", d: "2" }, p.lead)),
      React.createElement("div", { className: "problem-grid" },
        p.items.map((it, i) =>
          React.createElement(Reveal, { as: "div", className: "problem-card", key: i, d: String((i % 2) + 1) },
            React.createElement("span", { className: "x-mark" }, React.createElement(Icon, { name: "x", size: 15 })),
            React.createElement("p", null, it.t)))),
      React.createElement(Reveal, { as: "div", className: "problem-foot", d: "1" },
        React.createElement("div", { className: "pf-stat" },
          React.createElement("span", { className: "pf-num" }, p.footNum),
          React.createElement("span", { className: "pf-unit" }, p.footUnit)),
        React.createElement("p", { className: "pf-line" }, p.footLine),
        React.createElement("a", { className: "btn btn-primary", href: "#contact" }, p.footCta, React.createElement(Icon, { name: "arrow", size: 16 }))),
      p.actions && React.createElement(Reveal, { as: "ul", className: "problem-actions", d: "2" },
        p.actions.map((a, i) => React.createElement("li", { key: i },
          React.createElement(Icon, { name: "check", size: 16 }), React.createElement("span", null, a))))));
}

/* ---------- SERVICES (premium grid) ---------- */
function Services() {
  const { t } = useT();
  const s = t.services;
  const icons = ["scale", "star", "bolt", "search", "check", "x"];
  return React.createElement("section", { className: "section scrim", id: "services" },
    React.createElement("div", { className: "wrap" },
      React.createElement("div", { className: "section-head" },
        React.createElement(Reveal, { as: "div", className: "eyebrow" }, s.eyebrow),
        React.createElement(Reveal, { as: "h2", className: "h-xl", d: "1" }, s.title)),
      React.createElement("div", { className: "services-grid" },
        s.items.map((it, i) =>
          React.createElement(Reveal, { as: "div", className: "service-card", key: i, d: String((i % 3) + 1) },
            React.createElement("span", { className: "service-ico" }, React.createElement(Icon, { name: icons[i] || "shield", size: 20 })),
            React.createElement("p", null, it)))),
      React.createElement(Reveal, { as: "div", className: "services-badge", d: "1" },
        React.createElement("div", { className: "sb-rating" },
          React.createElement("span", { className: "stars" }, [0, 1, 2, 3, 4].map((i) => React.createElement(Icon, { key: i, name: "star", size: 15 }))),
          React.createElement("div", null,
            React.createElement("b", null, s.badgeCases),
            React.createElement("span", null, s.badgeNote))),
        React.createElement("a", { className: "btn btn-primary", href: "#contact" }, s.cta, React.createElement(Icon, { name: "arrow", size: 16 })))));
}

/* ---------- PROCESS ---------- */
function Process() {
  const { t } = useT();
  const pr = t.process;
  const icons = ["search", "bolt", "eye"];
  return React.createElement("section", { className: "section scrim", id: "process" },
    React.createElement("div", { className: "wrap" },
      React.createElement("div", { className: "section-head" },
        React.createElement(Reveal, { as: "div", className: "eyebrow" }, pr.eyebrow),
        React.createElement(Reveal, { as: "h2", className: "h-xl", d: "1" }, pr.title),
        React.createElement(Reveal, { as: "p", className: "lead", d: "2" }, pr.lead)),
      React.createElement("div", { className: "process" },
        pr.steps.map((s, i) =>
          React.createElement(Reveal, { as: "div", className: "step", key: i, d: String(i + 1) },
            React.createElement("div", { className: "step-ico" }, React.createElement(Icon, { name: icons[i], size: 22 })),
            React.createElement("div", { className: "step-num" }, React.createElement("span", { className: "n" }, s.n)),
            React.createElement("h3", { className: "h-l" }, s.t),
            React.createElement("ul", null,
              s.items.map((li, j) =>
                React.createElement("li", { key: j },
                  React.createElement(Icon, { name: "check", size: 16 }),
                  React.createElement("span", null, React.createElement("b", null, li[0]), li[1])))))))));
}

/* ---------- ABOUT (editorial two-column) ---------- */
function About() {
  const { t } = useT();
  const a = t.about;
  const paras = Array.isArray(a.lead) ? a.lead : [a.lead];
  return React.createElement("section", { className: "section scrim", id: "about" },
    React.createElement("div", { className: "wrap" },
      React.createElement("div", { className: "about-grid" },
        React.createElement("div", { className: "about-left" },
          React.createElement(Reveal, { as: "div", className: "eyebrow" }, a.eyebrow),
          React.createElement(Reveal, { as: "h2", className: "h-xl", d: "1", style: { marginTop: "22px" } }, a.title),
          React.createElement(Reveal, { as: "p", className: "about-leader", d: "2" }, a.leaderLine),
          React.createElement(Reveal, { as: "div", className: "tech-chips", d: "3" },
            ["CLEANSCAN AI", "NEUTRALIZER CORE", "TRUST ENGINE"].map((n) =>
              React.createElement("span", { className: "tech-chip", key: n }, React.createElement("span", { className: "tech-dot" }), n)))),
        React.createElement("div", { className: "about-right" },
          paras.map((p, i) => React.createElement(Reveal, { as: "p", className: "about-para", key: i, d: String(i + 1) }, p)),
          React.createElement(Reveal, { as: "p", className: "tech-lead", d: "3" }, React.createElement(Icon, { name: "bolt", size: 15, style: { color: "var(--accent-2)" } }), a.leadTech))),
      React.createElement(Reveal, { as: "div", className: "cases-stats cases-5", d: "2", style: { marginTop: "clamp(32px,5vw,52px)" } },
        a.stats.map((st, i) =>
          React.createElement("div", { className: "case-stat", key: i },
            React.createElement("div", { className: "n" }, st.n),
            React.createElement("div", { className: "l" }, st.l))))));
}

/* ---------- WHY / SHIELD ---------- */
function Why() {
  const { t } = useT();
  const wy = t.why;
  const canvasRef = useScene("shield");
  const icons = ["scale", "doc", "bolt", "lock", "users"];
  return React.createElement("section", { className: "section scrim", id: "why" },
    React.createElement("div", { className: "wrap" },
      React.createElement("div", { className: "why-grid" },
        React.createElement("div", { className: "why-copy" },
          React.createElement(Reveal, { as: "div", className: "eyebrow" }, wy.eyebrow),
          React.createElement(Reveal, { as: "h2", className: "h-xl", d: "1", style: { marginTop: "22px", marginBottom: "20px" } }, wy.title),
          React.createElement(Reveal, { as: "p", className: "lead", d: "2", style: { marginBottom: "22px" } }, wy.lead),
          wy.journey && React.createElement(Reveal, { as: "ol", className: "why-journey", d: "2" },
            wy.journey.map((j, i) => React.createElement("li", { key: i }, React.createElement("span", { className: "wj-n" }, i + 1), React.createElement("span", null, j)))),
          React.createElement("div", { className: "why-list" },
            wy.items.map((it, i) =>
              React.createElement(Reveal, { as: "div", className: "why-item", key: i, d: String((i % 3) + 1) },
                React.createElement("span", { className: "why-ico" }, React.createElement(Icon, { name: icons[i], size: 22 })),
                React.createElement("div", null,
                  React.createElement("h4", null, it.t),
                  React.createElement("p", null, it.d)))))),
        React.createElement(Reveal, { as: "div", className: "shield-wrap", d: "1" },
          React.createElement("canvas", { id: "shield-canvas", ref: canvasRef }),
          React.createElement("div", { className: "shield-badge" },
            React.createElement("div", { className: "big" }, wy.shieldBig),
            React.createElement("div", { className: "small" }, wy.shieldSmall))))));
}

/* ---------- FORM ---------- */
function FormSection() {
  const { t, lang } = useT();
  const f = t.form;
  // status: idle | sending | sent | error
  const [status, setStatus] = useStateS("idle");
  const formRef = useRefS(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(e.target);
    const payload = {
      name: (fd.get("name") || "").toString().trim(),
      email: (fd.get("email") || "").toString().trim(),
      phone: (fd.get("phone") || "").toString().trim(),
      need: (fd.get("need") || "").toString(),
      company: (fd.get("company") || "").toString(), // honeypot
      lang,
    };
    if (payload.name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) { setStatus("error"); return; }
    setStatus("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data && data.ok) { setStatus("sent"); if (formRef.current) formRef.current.reset(); }
      else setStatus("error");
    } catch (err) { setStatus("error"); }
  };

  const sending = status === "sending";
  return React.createElement("section", { className: "section form-sec scrim", id: "contact" },
    React.createElement("div", { className: "wrap" },
      React.createElement(Reveal, { as: "div", className: "glow-frame", d: "1" },
        React.createElement("div", { className: "form-card" },
        React.createElement("div", { className: "form-intro" },
          React.createElement("div", { className: "eyebrow" }, f.eyebrow),
          React.createElement("h2", { className: "h-xl", style: { marginTop: "20px" } }, f.title),
          React.createElement("p", { className: "lead", style: { marginTop: "16px" } }, f.lead),
          React.createElement("ul", { className: "form-perks" },
            f.perks.map((p, i) => React.createElement("li", { key: i }, React.createElement(Icon, { name: "check", size: 17 }), p)))),
        React.createElement("form", { className: "form-fields", onSubmit, noValidate: true, ref: formRef },
          React.createElement("div", { className: "field-row" },
            React.createElement("div", { className: "field" },
              React.createElement("label", null, f.name),
              React.createElement("input", { type: "text", name: "name", placeholder: f.namePh, required: true, autoComplete: "name" })),
            React.createElement("div", { className: "field" },
              React.createElement("label", null, f.phone),
              React.createElement("input", { type: "tel", name: "phone", placeholder: f.phonePh, autoComplete: "tel" }))),
          React.createElement("div", { className: "field" },
            React.createElement("label", null, f.email),
            React.createElement("input", { type: "email", name: "email", placeholder: f.emailPh, required: true, autoComplete: "email" })),
          React.createElement("div", { className: "field select-wrap" },
            React.createElement("label", null, f.need),
            React.createElement("select", { name: "need", defaultValue: "" },
              React.createElement("option", { value: "", disabled: true }, "—"),
              f.needOpts.map((o, i) => React.createElement("option", { key: i, value: o }, o)))),
          // honeypot (hidden from humans)
          React.createElement("div", { className: "hp-field", "aria-hidden": "true" },
            React.createElement("label", null, "Company",
              React.createElement("input", { type: "text", name: "company", tabIndex: -1, autoComplete: "off" }))),
          React.createElement("button", { type: "submit", className: "btn btn-primary btn-lg btn-block", style: { marginTop: "6px" }, disabled: sending },
            sending ? React.createElement("span", { className: "spinner" }) : React.createElement(Icon, { name: "shield", size: 18 }),
            sending ? f.sending : f.submit),
          React.createElement("p", { className: "form-note" }, React.createElement(Icon, { name: "clock", size: 13, style: { verticalAlign: "-2px", marginRight: "6px" } }), f.note),
          status === "sent" && React.createElement("div", { className: "form-success", style: { display: "block" } }, f.success),
          status === "error" && React.createElement("div", { className: "form-error", style: { display: "block" } }, f.error))))));
}

/* ---------- FOOTER ---------- */
function Footer() {
  const { t } = useT();
  const fo = t.footer;
  const links = [["problem", "#problem"], ["process", "#process"], ["about", "#about"], ["why", "#why"], ["contact", "#contact"]];
  return React.createElement("footer", { className: "footer" },
    React.createElement("div", { className: "wrap" },
      React.createElement(Reveal, { as: "div", className: "footer-tagline" },
        fo.tagline[0], React.createElement("em", null, fo.tagline[1]), fo.tagline[2]),
      React.createElement("div", { className: "footer-grid", style: { marginTop: "56px" } },
        React.createElement("div", { className: "footer-brand" },
          React.createElement("a", { className: "brand", href: "#top" },
            React.createElement("span", { className: "brand-mark" }, React.createElement(Icon, { name: "shield", size: 21, style: { color: "var(--accent-2)" } })),
            React.createElement("span", { className: "brand-text" }, React.createElement("b", null, "RMA"), React.createElement("span", null, "webreputation.agency"))),
          React.createElement("p", null, fo.payoff),
          React.createElement("div", { style: { marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" } },
            React.createElement("p", { style: { display: "flex", gap: "10px", alignItems: "flex-start", color: "var(--ink-2)", fontSize: "14px", margin: 0, lineHeight: 1.5 } }, React.createElement(Icon, { name: "pin", size: 16, style: { color: "var(--accent-2)", flex: "none", marginTop: "2px" } }), "45 Berkeley Square, Mayfair, London W1J 5EB, United Kingdom"),
            React.createElement("a", { href: "mailto:mail@attoliniagency.com", style: { display: "flex", gap: "10px", alignItems: "center", color: "var(--ink-2)", fontSize: "14px" } }, React.createElement(Icon, { name: "mail", size: 16, style: { color: "var(--accent-2)", flex: "none" } }), "mail@attoliniagency.com"),
            React.createElement("a", { href: "https://t.me/Webreputationagency", target: "_blank", rel: "noopener", style: { display: "flex", gap: "10px", alignItems: "center", color: "var(--ink-2)", fontSize: "14px" } }, React.createElement(Icon, { name: "telegram", size: 16, style: { color: "var(--accent-2)", flex: "none" } }), "@Webreputationagency"))),
        React.createElement("div", { className: "footer-col" },
          React.createElement("h5", null, fo.colLinks),
          links.map(([k, h]) => React.createElement("a", { key: k, href: h }, t.nav[k])),
          React.createElement("a", { href: "blog.html" }, t.nav.blog)),
        React.createElement("div", { className: "footer-col" },
          React.createElement("h5", null, fo.colLegal),
          React.createElement("a", { href: "privacy.html" }, fo.privacy),
          React.createElement("a", { href: "#", onClick: (e) => { e.preventDefault(); window.dispatchEvent(new Event("open-cookie-settings")); } }, t.cookies.manage))),
      React.createElement("div", { className: "footer-bottom" },
        React.createElement("span", { className: "footer-owner" }, fo.owner, " ", React.createElement("a", { href: "https://attoliniagency.com", target: "_blank", rel: "noopener" }, fo.ownerLink)),
        React.createElement("div", { className: "legal" },
          React.createElement("span", null, "© ", new Date().getFullYear(), " RMA"),
          React.createElement("span", null, "Reg. 319784700118738"),
          React.createElement("span", null, "Tax ID 781315656060")))));
}

/* ---------- TELEGRAM FLOAT ---------- */
function WhatsApp() {
  const { t } = useT();
  return React.createElement("a", { className: "wa wa--tg", href: "https://t.me/Webreputationagency", target: "_blank", rel: "noopener", "aria-label": t.wa },
    React.createElement(Icon, { name: "telegram", size: 26 }),
    React.createElement("span", null, t.wa));
}

/* ---------- COOKIE CONSENT ---------- */
const COOKIE_KEY = "wra_cookie_consent";
function readConsent() {
  try { return JSON.parse(localStorage.getItem(COOKIE_KEY) || "null"); } catch (e) { return null; }
}
function writeConsent(c) {
  try {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(c));
    // also drop a real cookie so server/analytics can read the choice
    const v = encodeURIComponent(JSON.stringify(c));
    document.cookie = "wra_consent=" + v + ";path=/;max-age=" + (60 * 60 * 24 * 180) + ";SameSite=Lax";
  } catch (e) {}
}

function CookieBanner() {
  const { t } = useT();
  const c = t.cookies;
  const { useState: uS, useEffect: uE } = React;
  const [open, setOpen] = uS(false);
  const [details, setDetails] = uS(false);
  const [analytics, setAnalytics] = uS(true);
  const [marketing, setMarketing] = uS(true);

  uE(() => {
    if (!readConsent()) setOpen(true);
    const onManage = () => { setDetails(true); setOpen(true); };
    window.addEventListener("open-cookie-settings", onManage);
    return () => window.removeEventListener("open-cookie-settings", onManage);
  }, []);

  const decide = (consent) => { writeConsent(Object.assign({ necessary: true, ts: Date.now() }, consent)); setOpen(false); setDetails(false); };

  if (!open) return null;

  const toggle = (on, set, label, note, locked) =>
    React.createElement("label", { className: "ck-row" + (locked ? " locked" : ""), key: label },
      React.createElement("span", { className: "ck-row-txt" },
        React.createElement("b", null, label),
        React.createElement("span", null, note)),
      React.createElement("button", {
        type: "button", className: "ck-switch" + (on ? " on" : ""), role: "switch",
        "aria-checked": on, "aria-label": label, disabled: locked,
        onClick: locked ? undefined : () => set(!on),
      }, React.createElement("span", { className: "ck-knob" })));

  return React.createElement("div", { className: "ck-wrap", role: "dialog", "aria-label": c.title, "aria-modal": "false" },
    React.createElement("div", { className: "ck-card glow-frame" },
      React.createElement("div", { className: "ck-inner" },
        React.createElement("div", { className: "ck-head" },
          React.createElement("span", { className: "ck-ico" }, React.createElement(Icon, { name: "shield", size: 18 })),
          React.createElement("h4", null, c.title)),
        React.createElement("p", { className: "ck-text" }, c.text,
          " ", React.createElement("a", { href: "#", onClick: (e) => e.preventDefault(), className: "ck-link" }, t.footer.cookie)),
        details && React.createElement("div", { className: "ck-rows" },
          toggle(true, null, c.necessary, c.necessaryNote, true),
          toggle(analytics, setAnalytics, c.analytics, c.analyticsNote, false),
          toggle(marketing, setMarketing, c.marketing, c.marketingNote, false)),
        React.createElement("div", { className: "ck-actions" },
          !details && React.createElement("button", { className: "btn btn-ghost ck-btn", onClick: () => setDetails(true) }, c.settings),
          React.createElement("button", { className: "btn btn-ghost ck-btn", onClick: () => decide({ analytics: false, marketing: false }) }, c.reject),
          details
            ? React.createElement("button", { className: "btn btn-primary ck-btn", onClick: () => decide({ analytics, marketing }) }, c.save)
            : React.createElement("button", { className: "btn btn-primary ck-btn", onClick: () => decide({ analytics: true, marketing: true }) }, c.accept)))));
}

Object.assign(window, { PartnerStrip, Services, Problem, Process, About, Why, FormSection, Footer, WhatsApp, CookieBanner });
