// ============================================================
//  VZKAZY A FOTKY — tenhle soubor si můžeš libovolně upravovat
// ============================================================
//  • Každý vzkaz je text v uvozovkách, oddělený čárkou.
//  • {oslo}  se nahradí náhodným oslovením (Myško, Koblížku, …)
//  • {dny}   se nahradí počtem dní do odletu (např. "12 dní")
//  • Fotky nahraj do složky  fotky/  a jejich názvy připiš níže.
// ============================================================

window.VZKAZY = {
  jmena: { on: "Ondra", ona: "Mája" },

  // Jak oslovuju ji
  osloveniOna: ["Myško 🐭", "Májo", "Koblížku 🍩", "Ptáčátko 🐣", "Medvídku 🐻", "Rošťáku 😜", "Puzzlíku 🧩"],

  // Jak oslovuje ona mě
  osloveniOn: ["Myšku 🐭", "Ondro"],

  // Vzkazy, které uvidí ONA po odškrtnutí dne (s náhodnou fotkou)
  proNi: [
    "{oslo}, miluju tě! ♥️",
    "Nemůžu se dočkat, až budeme spolu. Už jen {dny}! 🐭",
    "Myškuluju tě 🐭♥️",
    "{oslo}, každé ráno myslím jako první na tebe.",
    "Další den pryč — jsem zase o kousek blíž k tobě ✈️",
    "Ty a já jsme jak dva dílky puzzle 🧩 — patříme k sobě.",
    "{oslo}, už se těším, až tě obejmu a nepustím 🐻",
    "Miluju tvůj smích. A tebe celou. ♥️",
    "Ještě {dny} a budeš zase moje ptáčátko na dosah 🐣",
    "Myslím na tebe víc, než si myslíš. Miluju tě!",
    "{oslo}, jsi to nejlepší, co mě potkalo.",
    "Odpočítávám dny, hodiny i minuty. Nemůžu se dočkat! ⏳",
    "Koblížku můj 🍩, už brzy ti ukradnu všechny pusinky.",
    "Myškuluju tě až do Finska a zpátky 🐭✈️🇫🇮",
    "{oslo}, vydrž, už to bude! Jsi moje všechno ♥️",
    "Každý odškrtnutý den = o jeden den blíž k nám dvěma.",
    "Ty můj rošťáku 😜, chybíš mi každý den.",
    "Medvídku 🐻, už se těším na naše společné ráno.",
    "Miluju tě. Dneska, zítra a za {dny} osobně ♥️",
    "{oslo}, jsi důvod, proč se každé ráno usmívám.",
  ],

  // Vzkazy pro MĚ (když odškrtnu já)
  proNej: [
    "{oslo}, už jen {dny}! Mája se těší ♥️",
    "Další den za námi, {oslo}. Vydrž! ✈️",
    "{oslo}, tvoje myška na tebe čeká 🐭",
    "Ještě {dny} a budete spolu. Sbal si kufr! 🧳",
  ],

  // Extra vzkazy pro milníkové dny (počet dní do odletu → text)
  milniky: {
    30: "Už jen 30 dní! Měsíc a jsem u tebe, {oslo} 🎉",
    21: "Tři týdny! {oslo}, odpočítávání se zrychluje ♥️",
    14: "Už jen dva týdny! Nemůžu se dočkat, až budeme spolu 🐭🐻",
    10: "Jednociferné číslo se blíží… 10 dní, {oslo}! ✨",
    7:  "POSLEDNÍ TÝDEN! Myškuluju tě 🐭♥️",
    3:  "Tři dny! Už si balím kufr, {oslo} 🧳✈️",
    2:  "Pozítří! Už mi skoro nejde spát 🥰",
    1:  "ZÍTRA! Zítra tě obejmu, {oslo}! ♥️♥️♥️",
  },

  // Velké finále (27. 12.)
  finale: {
    nadpis: "Dnes se vidíme! ♥️",
    text: "Myško, odpočet skončil. Dnes tě konečně obejmu. Miluju tě! 🐭🧩🐣🐻♥️",
    // poznámky, které naskáčou u fotek ve finále (střídají se)
    poznamky: [
      "Tohle jsme my ♥️",
      "Už dnes zase spolu!",
      "Myškuluju tě 🐭",
      "Moje puzzle je kompletní 🧩",
      "Nemůžu se dočkat, až tě uvidím!",
      "Miluju tě, ptáčátko 🐣",
    ],
  },

  // Fotky — názvy souborů ve složce fotky/ (např. "fotky/spolu-praha.jpg")
  fotky: [
  ],

  // Společné fotky pro finále (když necháš prázdné, použijí se všechny fotky výše)
  spolecneFotky: [
  ],
};
