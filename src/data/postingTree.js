// src/data/postingTree.js
export const postingTree = {
  // ANA KATEGORİ: emlak
  "emlak": {
    title: "Emlak",
    children: [
      { slug: "konut",        title: "Konut" },
      { slug: "is-yeri",      title: "İş Yeri" },
      { slug: "arsa",         title: "Arsa" },
      { slug: "bina",         title: "Bina" },
      { slug: "devre-mulk",   title: "Devre Mülk" },
      { slug: "turistik-tesis", title: "Turistik Tesis" },
    ]
  },

  // 2. seviye: emlak > konut
  "emlak/konut": {
    title: "Emlak › Konut",
    children: [
      { slug: "satilik",                 title: "Satılık" },
      { slug: "kiralik",                 title: "Kiralık" },
      { slug: "turistik-gunluk-kiralik", title: "Turistik Günlük Kiralık" },
      { slug: "devren-satilik-konut",    title: "Devren Satılık Konut" },
    ]
  },

  // 3. seviye: emlak > konut > satilik
  "emlak/konut/satilik": {
    title: "Emlak › Konut › Satılık",
    children: [
      { slug: "daire",            title: "Daire" },
      { slug: "rezidans",         title: "Rezidans" },
      { slug: "mustakil-ev",      title: "Müstakil Ev" },
      { slug: "villa",            title: "Villa" },
      { slug: "ciftlik-evi",      title: "Çiftlik Evi" },
      { slug: "kosk-konak",       title: "Köşk & Konak" },
      { slug: "yali",             title: "Yalı" },
      { slug: "yali-dairesi",     title: "Yalı Dairesi" },
      { slug: "yazlik",           title: "Yazlık" },
      { slug: "kooperatif",       title: "Kooperatif" },
    ]
  },

  // örnek: emlak > is-yeri (şimdilik iskelet)
  "emlak/is-yeri": { title: "Emlak › İş Yeri", children: [] },
  "emlak/arsa":    { title: "Emlak › Arsa",    children: [] },
  "emlak/bina":    { title: "Emlak › Bina",    children: [] },
};
