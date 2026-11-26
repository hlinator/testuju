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
  osloveniOna: ["Myško 🐭", "Májo", "Koblížku", "Ptáčátko 🐣", "Méďo", "Rošťáku", "Puzzlíčku 🧩"],

  // Jak oslovuje ona mě
  osloveniOn: ["Myšku 🐭", "Ondro"],

  // Vzkazy, které uvidí ONA po odškrtnutí dne (s náhodnou fotkou)
  proNi: [
    "{oslo}, miluju tě!♥️",
    "Nemůžu se dočkat, až budeme spolu. Už jen {dny}!🐭",
    "Myškuluju tě 🐭♥️",
    "{oslo}, každé ráno bychom se s tebou chtěli s Ellinkou pomazlit. UŽ BRZY PRĎOLO!!!",
    "Další den pryč myško — jsem zase o kousek blíž k tobě a asi tě umačkam!✈️",
    "Užívej ty můj puzzlíčku🧩 Už brzo tě tam budu otravovat.",
    "{oslo}, už se těším, až tě obejmu a nepustím🐻",
    "Miluju tvůj smích. A tebe celou.♥️",
    "Ještě {dny} a dáme si brutální sex..",
    "Myslím na tebe víc, než si dokážeš představit. Miluju tě!",
    "{oslo}, jsi to nejlepší, co mě potkalo.",
    "Odpočítávám dny, hodiny i minuty. Nemůžu se dočkat!⏳",
    "Koblížku můj, Ellince moc chybíš, přivezu ti aspoň tričko s jejím pachem.🐶",
    "Myškuluju tě až do Finska a zpátky🐭✈️🇫🇮",
    "{oslo}, vydrž, už to bude! A nezapomeň, jsi moje všechno♥️",
    "Už brzy tě umačkam láskou.",
    "Ty můj rošťáčku 😙, chybíš mi každej den víc a víc.",
    "Méďo, už se těším na naše společné ráno i usínání.💤♥️",
    "Miluju tě. Dneska, zítra a za {dny} osobně ♥️",
    "{oslo}, jsi důvod, proč se každý ráno usmívám i když jsi zrovna asi miliardu kiláků daleko.",
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
    2:  "Pozítří! Už nemůžu ani usnout, moc se těšim 🥰",
    1:  "ZÍTRA! Zítra tě obejmu, {oslo}! ♥️♥️♥️",
  },

  // Hravé tlačítko „OK" u fotky — každé další kliknutí na OK udělá další krok.
  //   toast = bublina s hláškou, ok = nový text tlačítka OK, okScale = velikost OK,
  //   loveScale = zvětšení „Taky tě miluju", flee = OK uteče jinam, love = OK se promění v „Taky tě miluju"
  okVtipy: [
    { toast: "Jenom OK? Za víc ti nestojim? 🥺", ok: "ok…", okScale: 0.8 },
    { toast: "Fakt jsi dala znovu OK????", ok: "ok?", okScale: 0.65, loveScale: 1.1 },
    { toast: "{oslo}, tohle mi nedělej", ok: "o.k.", okScale: 0.55, loveScale: 1.2 },
    { toast: "VEDLEEE", ok: "OK", okScale: 0.55, loveScale: 1.25, flee: true },
    { toast: "ŠPATNĚ, zkus to znova", ok: "OK", okScale: 0.5, loveScale: 1.3, flee: true },
    { toast: "Tlačítko OK odletělo do Finska 🇫🇮✈️", ok: "✈️", okScale: 0.45, loveScale: 1.35, flee: true },
    { toast: "Dobře, dobře, tak jak chceš", ok: "Taky tě miluju ♥️", okScale: 1, loveScale: 1.1, love: true },
  ],

  // Připomínky, když se blíží půlnoc a dnešek ještě není odškrtnutý.
  //   hodin = kolik hodin před půlnocí se začne ukazovat; {cas} = zbývající čas, {oslo} = oslovení
  pripominky: [
    { hodin: 6, text: "{oslo}, dnešek ještě není odškrtnutý 🙂" },
    { hodin: 3, text: "Tik tak… do půlnoci zbývá {cas} ⏳ Odškrtni mě!" },
    { hodin: 1, text: "Poslední hodina! Zbývá {cas} 🥺 Nenech mě smutnýho" },
    { hodin: 0.25, text: "POSLEDNÍCH {cas}!!! 🚨🐭 RYCHLE ODŠKRTNI!!!" },
  ],

  // Velké finále (27. 12.)
  finale: {
    nadpis: "Dnes se vidíme! ♥️",
    text: "Myško, odpočet skončil. Dnes tě konečně obejmu. Miluju tě! 🐭🧩🐣🐻♥️",
    // poznámky, které naskáčou u fotek ve finále (střídají se)
    poznamky: [
      "Tohle jsme my ♥️",
      "Už dnes zase spolu!",
      "Myškuluju tě 🐭",
      "Moje puzzle jsou komplet 🧩",
      "Nemůžu se dočkat, až tě uvidím!",
      "Miluju tě, ptáčátko 🐣",
      "Naše dobrodružství pokračují ✈️",
      "Medvídku, už jsem tady! 🐻",
      "Koblížku, konečně! 🍩",
      "Spolu je nám nejlíp, chápeš to?!?!?!!",
      "Myškuluju tě navždy a žádný reklamace🐭♥️",
      "Teď už se mě nezbavíš🤗",
    ],
  },

  // Odkud se fotky načítají (z GitHubu, takže nová fotka se ukáže hned po nahrání,
  // bez nového nasazení na Vercel). Nech být, pokud nevíš, co to dělá.
  zdrojFotek: "https://raw.githubusercontent.com/hlinator/testuju/refs/heads/claude/gracious-heisenberg-8rc5pu/odpocet-dva/",

  // Fotky — názvy souborů ve složce fotky/ (např. "fotky/spolu-praha.jpg")
  fotky: [
    "fotky/foto-01.jpg",
    "fotky/foto-02.jpg",
    "fotky/foto-03.jpg",
    "fotky/foto-04.jpg",
    "fotky/foto-05.jpg",
    "fotky/foto-06.jpg",
    "fotky/foto-07.jpg",
    "fotky/foto-08.jpg",
    "fotky/foto-09.jpg",
    "fotky/foto-10.jpg",
    "fotky/foto-11.jpg",
    "fotky/foto-12.jpg",
    "fotky/foto-13.jpg",
    "fotky/foto-14.jpg",
    "fotky/foto-15.jpg",
    "fotky/foto-16.jpg",
    "fotky/foto-17.jpg",
    "fotky/foto-18.jpg",
    "fotky/foto-19.jpg",
    "fotky/foto-20.jpg",
    "fotky/foto-21.jpg",
    "fotky/foto-22.jpg",
    "fotky/foto-23.jpg",
    "fotky/foto-24.jpg",
    "fotky/foto-25.jpg",
    "fotky/foto-26.jpg",
    "fotky/foto-27.jpg",
    "fotky/foto-28.jpg",
    "fotky/foto-29.jpg",
    "fotky/foto-30.jpg",
    "fotky/foto-31.jpg",
    "fotky/foto-32.jpg",
    "fotky/foto-33.jpg",
    "fotky/foto-34.jpg",
    "fotky/foto-35.jpg",
    "fotky/foto-36.jpg",
    "fotky/foto-37.jpg",
    "fotky/foto-38.jpg",
    "fotky/foto-39.jpg",
    "fotky/foto-40.jpg",
    "fotky/foto-41.jpg",
    "fotky/foto-42.jpg",
    "fotky/foto-43.jpg",
    "fotky/foto-44.jpg",
    "fotky/foto-45.jpg",
    "fotky/foto-46.jpg",
    "fotky/foto-47.jpg",
    "fotky/foto-48.jpg",
    "fotky/foto-49.jpg",
    "fotky/foto-50.jpg",
    "fotky/foto-51.jpg",
    "fotky/foto-52.jpg",
    "fotky/foto-53.jpg",
    "fotky/foto-54.jpg",
    "fotky/foto-55.jpg",
    "fotky/foto-56.jpg",
    "fotky/foto-57.jpg",
    "fotky/foto-58.jpg",
    "fotky/foto-59.jpg",
    "fotky/foto-60.jpg",
    "fotky/foto-61.jpg",
    "fotky/foto-62.jpg",
    "fotky/foto-63.jpg",
    "fotky/foto-64.jpg",
    "fotky/foto-65.jpg",
    "fotky/foto-66.jpg",
  ],

  // Společné fotky pro finále (když necháš prázdné, použijí se všechny fotky výše)
  spolecneFotky: [
    "fotky/foto-04.jpg",
    "fotky/foto-06.jpg",
    "fotky/foto-07.jpg",
    "fotky/foto-08.jpg",
    "fotky/foto-09.jpg",
    "fotky/foto-11.jpg",
    "fotky/foto-12.jpg",
    "fotky/foto-14.jpg",
    "fotky/foto-16.jpg",
    "fotky/foto-22.jpg",
    "fotky/foto-24.jpg",
    "fotky/foto-33.jpg",
    "fotky/foto-34.jpg",
    "fotky/foto-35.jpg",
    "fotky/foto-36.jpg",
    "fotky/foto-39.jpg",
    "fotky/foto-43.jpg",
    "fotky/foto-44.jpg",
    "fotky/foto-47.jpg",
    "fotky/foto-51.jpg",
    "fotky/foto-57.jpg",
    "fotky/foto-58.jpg",
    "fotky/foto-60.jpg",
    "fotky/foto-64.jpg",
  ],
};
