# Jak si upravit vzkazy a fotky 💌

Všechny texty a fotky jsou v jediném souboru: **`odpocet-dva/vzkazy.js`**.

## Úprava vzkazů (přímo na GitHubu, bez instalace čehokoli)

1. Otevři repozitář `hlinator/testuju` na GitHubu a přepni se na větev `claude/gracious-heisenberg-8rc5pu`.
2. Klikni na `odpocet-dva` → `vzkazy.js` → ikonka tužky ✏️ (Edit).
3. Uprav texty. Pravidla:
   - každý vzkaz je v uvozovkách `"…"` a končí čárkou,
   - `{oslo}` se nahradí náhodným oslovením (Myško 🐭, Koblížku 🍩, …),
   - `{dny}` se nahradí počtem dní do odletu („12 dní“).
4. Dole klikni **Commit changes**.
5. Hotovo — web si stránku, vzkazy i fotky načítá přímo z GitHubu, takže změna je živá do ~5 minut (pak obnov stránku). Nic dalšího nasazovat netřeba.

| Seznam | Kdo ho uvidí |
|---|---|
| `osloveniOna` | oslovení pro Máju (pozdrav nahoře + `{oslo}` v jejích vzkazech) |
| `osloveniOn` | oslovení pro tebe |
| `proNi` | vzkazy, které jí vyskočí s fotkou po odškrtnutí |
| `proNej` | vzkazy pro tebe |
| `milniky` | speciální vzkaz pro milníkové dny (30, 21, 14, 10, 7, 3, 2, 1 den do odletu) – lze přidat i jiná čísla |
| `finale` | nadpis, text a popisky fotek ve velkém finále 27. 12. |

## Přidání fotek

1. Fotky zmenši (ideálně do ~1200 px na delší straně, ať se rychle načítají v mobilu).
2. Na GitHubu otevři `odpocet-dva/fotky` → **Add file → Upload files** → přetáhni fotky → **Commit changes**.
   Názvy souborů nejlépe bez mezer a diakritiky (`nase-rande.jpg`).
3. V `vzkazy.js` je připiš do seznamu `fotky`:
   ```js
   fotky: [
     "fotky/nase-rande.jpg",
     "fotky/helsinky.jpg",
   ],
   ```
4. Pro finále můžeš vybrat jen společné fotky do `spolecneFotky` (prázdné = použijí se všechny).

## Vyzkoušení animací bez odškrtnutí

Za svůj osobní odkaz přidej:
- `&demo=den` – běžný den (ohňostroj + fotka),
- `&demo=milnik` – milník,
- `&demo=finale` – velké finále.

Demo nic neukládá.
