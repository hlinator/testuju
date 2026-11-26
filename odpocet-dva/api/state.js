// Společný stav odpočtu. Každé odškrtnutí = jeden malý soubor v Vercel Blob:
//   ticks/<osoba>/<YYYY-MM-DD>
// Díky tomu se zápisy obou lidí nikdy nepřepíšou navzájem.
import { put, del, list } from "@vercel/blob";

const START = "2026-11-25";
const TARGET = "2026-12-27";
const PEOPLE = ["on", "ona"];

function whoIs(k) {
  if (!k) return null;
  if (process.env.TOKEN_ON && k === process.env.TOKEN_ON) return "on";
  if (process.env.TOKEN_ONA && k === process.env.TOKEN_ONA) return "ona";
  return null;
}

async function readTicks() {
  const ticks = { on: [], ona: [] };
  let cursor;
  do {
    const r = await list({ prefix: "ticks/", cursor, limit: 1000 });
    for (const b of r.blobs) {
      const [, who, date] = b.pathname.split("/");
      if (PEOPLE.includes(who) && /^\d{4}-\d{2}-\d{2}$/.test(date)) ticks[who].push(date);
    }
    cursor = r.hasMore ? r.cursor : undefined;
  } while (cursor);
  ticks.on.sort(); ticks.ona.sort();
  return ticks;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const names = { on: process.env.NAME_ON || "On", ona: process.env.NAME_ONA || "Ona" };

  try {
    if (req.method === "GET") {
      const me = whoIs(req.query.k);
      return res.status(200).json({ me, names, ticks: await readTicks() });
    }

    if (req.method === "POST") {
      const { k, date, done } = req.body || {};
      const me = whoIs(k);
      if (!me) return res.status(403).json({ error: "Neplatný osobní odkaz." });
      if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) || date < START || date > TARGET) {
        return res.status(400).json({ error: "Neplatné datum." });
      }
      const path = `ticks/${me}/${date}`;
      if (done) {
        await put(path, new Date().toISOString(), {
          access: "public", addRandomSuffix: false, allowOverwrite: true, contentType: "text/plain",
        });
      } else {
        const r = await list({ prefix: path, limit: 5 });
        const urls = r.blobs.filter(b => b.pathname === path).map(b => b.url);
        if (urls.length) await del(urls);
      }
      return res.status(200).json({ me, names, ticks: await readTicks() });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Chyba úložiště." });
  }
}
