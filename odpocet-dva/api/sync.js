// Zkopíruje aplikaci (index.html, vzkazy.js) a fotky z GitHubu do Vercel Blob.
// Spustí jen Ondra: /api/sync?k=<jeho klíč>. U soukromého repozitáře je potřeba
// proměnná GITHUB_TOKEN (fine-grained token jen pro čtení obsahu repozitáře).
import { put, del, list } from "@vercel/blob";
import { whoIs } from "./_auth.js";

export const config = { maxDuration: 120 };

const REPO = "hlinator/testuju";
const BRANCH = "claude/gracious-heisenberg-8rc5pu";
const DIR = "odpocet-dva";

async function gh(path) {
  const headers = { "User-Agent": "odpocet-sync" };
  let url;
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    headers.Accept = "application/vnd.github.raw";
    url = `https://api.github.com/repos/${REPO}/contents/${DIR}/${path.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(BRANCH)}`;
  } else {
    url = `https://raw.githubusercontent.com/${REPO}/refs/heads/${BRANCH}/${DIR}/${path}?t=${Date.now()}`;
  }
  const r = await fetch(url, { headers, cache: "no-store" });
  if (!r.ok) throw new Error(`${path}: GitHub ${r.status}`);
  return Buffer.from(await r.arrayBuffer());
}

const TYPES = { html: "text/html; charset=utf-8", js: "text/javascript; charset=utf-8", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" };
const typeOf = p => TYPES[p.split(".").pop().toLowerCase()] || "application/octet-stream";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (whoIs(req.query.k) !== "on") return res.status(403).json({ error: "Synchronizaci může spustit jen Ondra svým odkazem." });
  try {
    const old = [];
    let cursor;
    do { const r = await list({ prefix: "app/", cursor, limit: 1000 }); old.push(...r.blobs.map(b => b.url)); cursor = r.hasMore ? r.cursor : undefined; } while (cursor);

    const index = await gh("index.html");
    const vzkazy = await gh("vzkazy.js");
    const photos = [...new Set((vzkazy.toString("utf8").replace(/^\s*\/\/.*$/gm, "").match(/fotky\/[A-Za-z0-9._\-]+\.(?:jpe?g|png|webp|gif)/gi) || []))];

    const manifest = {};
    async function up(path, buf) {
      const b = await put(`app/${path}`, buf, { access: "public", addRandomSuffix: true, contentType: typeOf(path) });
      manifest[path] = b.url;
    }
    await up("index.html", index);
    await up("vzkazy.js", vzkazy);
    const failed = [];
    for (let i = 0; i < photos.length; i += 6) {
      await Promise.all(photos.slice(i, i + 6).map(async p => {
        try { await up(p, await gh(p)); } catch (e) { failed.push(p); }
      }));
    }
    await put("app/manifest.json", JSON.stringify({ at: new Date().toISOString(), files: manifest }), { access: "public", addRandomSuffix: true, contentType: "application/json" });
    if (old.length) await del(old);
    return res.status(200).json({ ok: true, fotek: photos.length - failed.length, selhalo: failed, zdroj: process.env.GITHUB_TOKEN ? "GitHub API (token)" : "veřejný GitHub" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: String(e.message || e) });
  }
}
