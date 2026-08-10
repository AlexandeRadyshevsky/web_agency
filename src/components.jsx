/* ============================================================
   UI primitives + Nav + Hero + Strip
   exports to window: Icon, Counter, useReveal, Reveal, useScene,
                      Nav, Hero, Strip
   ============================================================ */
const { useRef, useEffect: useEffectC, useState: useStateC } = React;

/* ---------- Icons ---------- */
const PATHS = {
  shield: "M12 2l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V5l7-3z",
  check: "M20 6L9 17l-5-5",
  x: "M18 6L6 18M6 6l12 12",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16zm10 2l-4.35-4.35",
  bolt: "M13 2L3 14h7l-1 8 10-12h-7l1-8z",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z",
  scale: "M12 3v18M5 7h14M7 7l-3 7h6l-3-7zm10 0l-3 7h6l-3-7zM8 21h8",
  doc: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm0 0v6h6",
  clock: "M12 22a10 10 0 100-20 10 10 0 000 20zm0-16v6l4 2",
  lock: "M5 11h14v10H5V11zm2 0V7a5 5 0 0110 0v4",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm14 10v-2a4 4 0 00-3-3.87M16 3.13A4 4 0 0116 11",
  phone: "M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z",
  arrow: "M5 12h14M12 5l7 7-7 7",
  globe: "M12 22a10 10 0 100-20 10 10 0 000 20zM2 12h20M12 2a15 15 0 010 20 15 15 0 010-20z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  mail: "M4 4h16v16H4zM4 6l8 6 8-6",
  pin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 13a3 3 0 100-6 3 3 0 000 6z",
  wa: "M17.5 14.4c-.3-.15-1.7-.85-2-.95-.25-.1-.45-.15-.65.15s-.75.95-.9 1.15-.32.22-.6.07a8 8 0 01-2.35-1.45 9 9 0 01-1.6-2c-.17-.3 0-.45.13-.6l.45-.52c.15-.17.2-.3.3-.5s.05-.37 0-.52-.65-1.57-.9-2.15c-.23-.56-.47-.48-.65-.49h-.55a1 1 0 00-.75.35 3.2 3.2 0 00-1 2.37 5.6 5.6 0 001.17 2.95 12.7 12.7 0 004.85 4.28c.68.3 1.2.47 1.62.6a3.9 3.9 0 001.78.11c.54-.08 1.7-.7 1.94-1.36s.24-1.27.17-1.36-.25-.17-.55-.32z M12 2a10 10 0 00-8.6 15.06L2 22l5.06-1.33A10 10 0 1012 2z",
  telegram: "M21.8 4.2L2.9 11.5c-.9.35-.9 1.3.05 1.55l4.7 1.46 1.8 5.6c.23.62.6.72 1.06.3l2.6-2.4 4.6 3.4c.55.35 1 .16 1.15-.6l2.9-13.6c.2-.9-.35-1.3-1.06-1.05zM8.9 14.1l9.1-5.7c.42-.26.8.06.5.35l-7.6 6.9-.3 3.1z",
};
function Icon({ name, size = 20, stroke = 2, fill = "none", style }) {
  const p = PATHS[name] || "";
  const filled = name === "star" || name === "wa" || name === "telegram";
  return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: filled ? "currentColor" : "none", stroke: filled ? "none" : "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round", style, "aria-hidden": "true" },
    React.createElement("path", { d: p }));
}

/* ---------- Reveal: animations removed — passthrough wrapper ---------- */
function Reveal({ children, d, as = "div", className = "", style, ...rest }) {
  return React.createElement(as, { className, style, ...rest }, children);
}

/* ---------- Animated + ticking counter ---------- */
function Counter({ value, suffix = "", tick = false, locale = "en", eager = false }) {
  const ref = useRef(null);
  const [display, setDisplay] = useStateC(0);
  const startedRef = useRef(false);
  const curRef = useRef(0);
  const fmt = (n) => new Intl.NumberFormat(locale === "it" ? "it-IT" : "en-US").format(Math.floor(n));

  useEffectC(() => {
    const el = ref.current; if (!el) return;
    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const dur = 1700, t0 = performance.now();
      const ease = (x) => 1 - Math.pow(1 - x, 3);
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const v = value * ease(p);
        curRef.current = v; setDisplay(v);
        if (p < 1) requestAnimationFrame(step);
        else { curRef.current = value; setDisplay(value); }
      };
      requestAnimationFrame(step);
      // safety net: setTimeout fires even when rAF is throttled/paused,
      // so the number always reaches its final value
      setTimeout(() => { if (curRef.current < value) { curRef.current = value; setDisplay(value); } }, dur + 400);
    };
    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.92 && r.bottom > 0;
    };
    if (eager || inView()) { start(); return; }
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) start(); }, { threshold: 0.25, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    // fallback: if IO never reports (harness/odd viewports) but element is on screen, start anyway
    const fb = setTimeout(() => { if (!startedRef.current && inView()) start(); }, 1400);
    return () => { io.disconnect(); clearTimeout(fb); };
  }, [value]);

  // gentle live ticking
  useEffectC(() => {
    if (!tick) return;
    let id;
    const schedule = () => {
      id = setTimeout(() => {
        if (startedRef.current && curRef.current >= value) {
          curRef.current += Math.floor(Math.random() * 4) + 1;
          setDisplay(curRef.current);
        }
        schedule();
      }, 2200 + Math.random() * 2600);
    };
    schedule();
    return () => clearTimeout(id);
  }, [tick, value]);

  return React.createElement("span", { ref }, fmt(display), suffix && React.createElement("span", { className: "unit" }, suffix));
}

/* ---------- mount a Three scene to a canvas ---------- */
function useScene(sceneName) {
  const ref = useRef(null);
  useEffectC(() => {
    if (!ref.current || !window.Scenes || !window.THREE) return;
    let cleanup = () => {};
    try { cleanup = window.Scenes[sceneName](ref.current); } catch (e) { console.warn("scene", sceneName, e); }
    return () => { try { cleanup && cleanup(); } catch (e) {} };
  }, [sceneName]);
  return ref;
}

/* ============================================================
   NAV
   ============================================================ */
function Nav() {
  const { t, lang, setLang } = useT();
  const [scrolled, setScrolled] = useStateC(false);
  const [menuOpen, setMenuOpen] = useStateC(false);
  useEffectC(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffectC(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);
  const Brand = React.createElement("a", { className: "brand", href: "#top", "aria-label": "Web Reputation Agency", onClick: () => setMenuOpen(false) },
    React.createElement("span", { className: "brand-mark" },
      React.createElement(Icon, { name: "shield", size: 21, style: { color: "var(--accent-2)" } })),
    React.createElement("span", { className: "brand-text" },
      React.createElement("b", null, "RMA"),
      React.createElement("span", null, "webreputation.agency")));
  const links = [["problem", "#problem"], ["process", "#process"], ["about", "#about"], ["why", "#why"], ["contact", "#contact"]];
  return React.createElement(React.Fragment, null,
    React.createElement("header", { className: "nav" + (scrolled || menuOpen ? " scrolled" : "") },
      React.createElement("div", { className: "wrap nav-inner" },
        Brand,
        React.createElement("nav", { className: "nav-links" },
          links.map(([k, h]) => React.createElement("a", { key: k, href: h }, t.nav[k])),
          React.createElement("a", { href: "blog.html" }, t.nav.blog)),
        React.createElement("div", { className: "nav-right" },
          React.createElement("div", { className: "lang", role: "group", "aria-label": "Language" },
            ["en", "it"].map((l) =>
              React.createElement("button", { key: l, className: lang === l ? "active" : "", onClick: () => setLang(l), "aria-pressed": lang === l }, window.I18N[l].code))),
          React.createElement("a", { className: "btn btn-primary nav-cta", href: "#contact" },
            React.createElement(Icon, { name: "phone", size: 16 }), t.nav.cta),
          React.createElement("button", { className: "nav-burger" + (menuOpen ? " open" : ""), onClick: () => setMenuOpen((v) => !v), "aria-label": "Menu", "aria-expanded": menuOpen },
            React.createElement("span", null), React.createElement("span", null), React.createElement("span", null))))),
    React.createElement("div", { className: "mobile-menu" + (menuOpen ? " open" : "") },
      links.map(([k, h]) => React.createElement("a", { key: k, className: "m-link", href: h, onClick: () => setMenuOpen(false) }, t.nav[k])),
      React.createElement("a", { className: "m-link", href: "blog.html", onClick: () => setMenuOpen(false) }, t.nav.blog),
      React.createElement("a", { className: "btn btn-primary btn-block btn-lg", href: "#contact", onClick: () => setMenuOpen(false) },
        React.createElement(Icon, { name: "phone", size: 16 }), t.nav.cta)));
}

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  const { t, lang } = useT();
  const h = t.hero;
  return React.createElement("section", { className: "hero", id: "top" },
    React.createElement("div", { className: "wrap" },
      React.createElement("div", { className: "hero-grid" },
        // left
        React.createElement("div", { className: "hero-left" },
          React.createElement(Reveal, { as: "div", className: "hero-payoff" },
            h.tag.map((x, i) => React.createElement(React.Fragment, { key: i }, i > 0 && React.createElement("i", null, "·"), React.createElement("span", null, x)))),
          React.createElement(Reveal, { as: "h1", className: "h-xxl", d: "1" },
            h.h1a, " ", React.createElement("em", null, h.h1b), " ", React.createElement("span", { className: "stroke" }, h.h1c),
            React.createElement("br", null), h.trust),
          React.createElement(Reveal, { as: "p", className: "hero-sub", d: "2" }, h.sub),
          React.createElement(Reveal, { as: "div", className: "hero-guarantee", d: "2" },
            React.createElement("span", { className: "pulse-dot" }),
            React.createElement("span", null, React.createElement("b", null, h.guarantee))),
          React.createElement(Reveal, { as: "div", className: "hero-ctas", d: "3" },
            React.createElement("a", { className: "btn btn-primary btn-lg", href: "#contact" },
              React.createElement(Icon, { name: "phone", size: 17 }), h.cta1),
            React.createElement("a", { className: "btn btn-ghost btn-lg", href: "#contact" },
              React.createElement(Icon, { name: "search", size: 17 }), h.cta2)),
          React.createElement(Reveal, { as: "div", className: "trust-badges", d: "4" },
            React.createElement("span", { className: "trust-badge" },
              React.createElement("span", { className: "stars" }, [0, 1, 2, 3, 4].map((i) => React.createElement(Icon, { key: i, name: "star", size: 14 }))),
              React.createElement("b", null, h.rating), " ", h.b_trustpilot),
            React.createElement("span", { className: "trust-badge" }, React.createElement(Icon, { name: "check", size: 15, style: { color: "var(--accent-2)" } }), React.createElement("b", null, h.b_casesNum), " ", h.b_cases),
            React.createElement("span", { className: "trust-badge" }, React.createElement(Icon, { name: "scale", size: 15, style: { color: "var(--accent-2)" } }), h.b_legal))),
        // right — stats panel (rotating glow border)
        React.createElement(Reveal, { as: "div", className: "glow-frame", d: "2" },
          React.createElement("div", { className: "hero-stats" },
            React.createElement("div", { className: "hero-stats-head" },
              React.createElement("span", null, h.statsTitle),
              React.createElement("span", { className: "live" }, h.live)),
            h.stats.map((s, i) =>
              React.createElement("div", { className: "stat", key: i },
                React.createElement("div", { className: "stat-num" }, React.createElement(Counter, { value: s.v, suffix: s.suffix, tick: !!s.tick, locale: lang, eager: true })),
                React.createElement("div", { className: "stat-label" }, s.l,
                  s.note && React.createElement("span", { className: "stat-tick" }, "● ", s.note)))),
            React.createElement("p", { className: "hero-tech" }, React.createElement(Icon, { name: "bolt", size: 14, style: { color: "var(--accent-2)" } }), h.techLine))))));
}

/* ============================================================
   SERVICES STRIP (marquee)
   ============================================================ */
function Strip() {
  const { t } = useT();
  const items = t.strip;
  const row = (keyPrefix) => items.map((s, i) => React.createElement("span", { className: "strip-item", key: keyPrefix + i },
    React.createElement("span", { className: "dot" }), React.createElement("b", null, s)));
  return React.createElement("div", { className: "strip", "aria-hidden": "true" },
    React.createElement("div", { className: "strip-track" }, row("a"), row("b")));
}

/* ---------- global galaxy background (fixed, behind whole site) ---------- */
function BgGalaxy() {
  const ref = useScene("nodeNetwork");
  return React.createElement("div", { className: "bg-stage", "aria-hidden": "true" },
    React.createElement("canvas", { id: "bg-canvas", ref }));
}

Object.assign(window, { Icon, Reveal, Counter, useScene, Nav, Hero, Strip, BgGalaxy });
