// Vydá soubor aplikace jen s platným osobním klíčem: /api/file?p=index.html&k=...
import { list } from "@vercel/blob";
import { whoIs } from "./_auth.js";

let cache = { at: 0, files: null };
async function manifest() {
  if (cache.files && Date.now() - cache.at < 60000) return cache.files;
  const r = await list({ prefix: "app/manifest", limit: 10 });
  const latest = r.blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0];
  if (!latest) return null;
  const m = await (await fetch(latest.url, { cache: "no-store" })).json();
  cache = { at: Date.now(), files: m.files };
  return m.files;
}

export default async function handler(req, res) {
  const { p, k } = req.query;
  if (!whoIs(k)) { res.setHeader("Cache-Control", "no-store"); return res.status(403).send("Pro zobrazení otevři svůj osobní odkaz 💌"); }
  try {
    const files = await manifest();
    const url = files && files[p];
    if (!url) { res.setHeader("Cache-Control", "no-store"); return res.status(404).send("Nenalezeno"); }
    if (/\.(jpe?g|png|webp|gif)$/i.test(p)) {
      res.setHeader("Cache-Control", "private, max-age=3600");
      return res.redirect(302, url);
    }
    const r = await fetch(url, { cache: "no-store" });
    res.setHeader("Content-Type", r.headers.get("content-type") || "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(Buffer.from(await r.arrayBuffer()));
  } catch (e) {
    console.error(e);
    return res.status(500).send("Chyba");
  }
}
