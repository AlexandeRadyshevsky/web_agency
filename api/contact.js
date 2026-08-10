// ============================================================
//  POST /api/contact  —  Vercel serverless function
//  Receives the audit form, validates, emails it via Resend.
//
//  Set these in Vercel → Project → Settings → Environment Variables:
//    RESEND_API_KEY   (required)  get a free key at resend.com
//    CONTACT_TO       (required)  where leads should land, e.g. you@webreputation.agency
//    CONTACT_FROM     (optional)  defaults to onboarding@resend.dev
//                                 (works with no domain setup; to send from your own
//                                  address, verify the domain in Resend first)
//  After adding/changing vars, redeploy once so they take effect.
// ============================================================

const ALLOWED_NEEDS = 12;

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").slice(0, 4000);
}
function looksLikeEmail(s) {
  return typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

module.exports = async function handler(req, res) {
  // CORS / preflight (same-origin in practice, but harmless to allow)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method_not_allowed" });

  // body may arrive parsed (Vercel) or as a raw string
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body || "{}"); } catch (e) { body = {}; } }
  body = body || {};

  const { name, email, phone, need, lang, company } = body;

  // honeypot: real users never fill "company"
  if (company) return res.status(200).json({ ok: true });

  // validation
  if (!name || String(name).trim().length < 2) return res.status(400).json({ ok: false, error: "name" });
  if (!looksLikeEmail(email)) return res.status(400).json({ ok: false, error: "email" });

  const TO = process.env.CONTACT_TO;
  const KEY = process.env.RESEND_API_KEY;
  const FROM = process.env.CONTACT_FROM || "RMA Website <onboarding@resend.dev>";

  if (!KEY || !TO) {
    // Backend reachable but not configured yet — log so nothing is lost,
    // and tell the client clearly instead of pretending it sent.
    console.error("[contact] missing env", { hasKey: !!KEY, hasTo: !!TO }, { name, email, phone, need, lang });
    return res.status(503).json({ ok: false, error: "not_configured" });
  }

  const when = new Date().toISOString();
  const subject = `New audit request — ${String(name).trim()}`;
  const html = `
    <div style="font-family:system-ui,Segoe UI,Helvetica,Arial,sans-serif;color:#0d1626">
      <h2 style="margin:0 0 14px">New reputation audit request</h2>
      <table style="border-collapse:collapse;font-size:15px">
        <tr><td style="padding:6px 14px 6px 0;color:#5b6678">Name</td><td><b>${esc(name)}</b></td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#5b6678">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#5b6678">Phone</td><td>${esc(phone) || "—"}</td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#5b6678">Need</td><td>${esc(need) || "—"}</td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#5b6678">Language</td><td>${esc(lang) || "—"}</td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#5b6678">Received</td><td>${esc(when)}</td></tr>
      </table>
    </div>`;
  const text = `New reputation audit request
Name: ${name}
Email: ${email}
Phone: ${phone || "—"}
Need: ${need || "—"}
Language: ${lang || "—"}
Received: ${when}`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": "Bearer " + KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject,
        html,
        text,
      }),
    });
    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      console.error("[contact] resend failed", r.status, detail);
      return res.status(502).json({ ok: false, error: "send_failed" });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[contact] exception", err);
    return res.status(500).json({ ok: false, error: "server" });
  }
};
