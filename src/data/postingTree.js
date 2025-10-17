// src/data/postingTree.js
export const postingTree = {
  // 🏠 ANA KATEGORİ: Emlak
  "emlak": {
    title: "Emlak",
    children: [
      { slug: "konut", title: "Konut" },
      { slug: "is-yeri", title: "İş Yeri" },
      { slug: "arsa", title: "Arsa" },
      { slug: "bina", title: "Bina" },
      { slug: "devre-mulk", title: "Devre Mülk" },
      { slug: "turistik-tesis", title: "Turistik Tesis" },
    ],
  },

  // Emlak > Konut
  "emlak/konut": {
    title: "Emlak › Konut",
    children: [
      { slug: "satilik", title: "Satılık" },
      { slug: "kiralik", title: "Kiralık" },
      { slug: "turistik-gunluk-kiralik", title: "Turistik Günlük Kiralık" },
      { slug: "devren-satilik-konut", title: "Devren Satılık Konut" },
    ],
  },

  // Emlak > Konut > Satılık
  "emlak/konut/satilik": {
    title: "Emlak › Konut › Satılık",
    children: [
      { slug: "daire", title: "Daire" },
      { slug: "rezidans", title: "Rezidans" },
      { slug: "mustakil-ev", title: "Müstakil Ev" },
      { slug: "villa", title: "Villa" },
      { slug: "ciftlik-evi", title: "Çiftlik Evi" },
      { slug: "kosk-konak", title: "Köşk & Konak" },
      { slug: "yali", title: "Yalı" },
      { slug: "yali-dairesi", title: "Yalı Dairesi" },
      { slug: "yazlik", title: "Yazlık" },
      { slug: "kooperatif", title: "Kooperatif" },
    ],
  },

  // 🏢 Emlak alt kategoriler (iskelet)
  "emlak/is-yeri": { title: "Emlak › İş Yeri", children: [] },
  "emlak/arsa": { title: "Emlak › Arsa", children: [] },
  "emlak/bina": { title: "Emlak › Bina", children: [] },

  // 🚗 ANA KATEGORİ: Vasıta
  "vasita": {
    title: "Vasıta",
    children: [
      { slug: "otomobil", title: "Otomobil" },
      { slug: "motosiklet", title: "Motosiklet" },
      { slug: "arazi-suv", title: "Arazi, SUV & Pickup" },
      { slug: "minivan", title: "Minivan & Panelvan" },
      { slug: "ticari-arac", title: "Ticari Araçlar" },
      { slug: "deniz-araci", title: "Deniz Araçları" },
      { slug: "hava-araci", title: "Hava Araçları" },
      { slug: "kiralik-arac", title: "Kiralık Araçlar" },
    ],
  },

  // Vasıta > Otomobil
  "vasita/otomobil": {
    title: "Vasıta › Otomobil",
    children: [
      { slug: "sedan", title: "Sedan" },
      { slug: "hatchback", title: "Hatchback" },
      { slug: "station-wagon", title: "Station Wagon" },
      { slug: "spor-arac", title: "Spor Araç" },
      { slug: "klasik", title: "Klasik" },
    ],
  },

  // 🧩 ANA KATEGORİ: Yedek Parça, Aksesuar & Tuning
  "yedek-parca-aksesuar-donanim-tuning": {
    title: "Yedek Parça, Aksesuar, Donanım & Tuning",
    children: [
      { slug: "otomobil-ekipmanlari", title: "Otomobil Ekipmanları" },
      { slug: "motosiklet-aksesuar", title: "Motosiklet Aksesuarları" },
      { slug: "jant-lastik", title: "Jant & Lastik" },
      { slug: "ses-sistemi", title: "Araç Ses Sistemleri" },
      { slug: "performans", title: "Performans Ürünleri" },
    ],
  },

  // 💼 ANA KATEGORİ: İş İlanları
  "is-ilanlari": {
    title: "İş İlanları",
    children: [
      { slug: "tam-zamanli", title: "Tam Zamanlı" },
      { slug: "yarı-zamanli", title: "Yarı Zamanlı" },
      { slug: "uzaktan-calisma", title: "Uzaktan Çalışma" },
      { slug: "freelance", title: "Freelance Projeler" },
      { slug: "staj", title: "Staj & Gönüllü" },
    ],
  },

  // 🎓 ANA KATEGORİ: Özel Ders Verenler
  "ozel-ders-verenler": {
    title: "Özel Ders Verenler",
    children: [
      { slug: "lise-universite", title: "Lise & Üniversite" },
      { slug: "ilkokul-ortaokul", title: "İlkokul & Ortaokul" },
      { slug: "yabanci-dil", title: "Yabancı Dil" },
      { slug: "muzik-spor", title: "Müzik & Spor" },
      { slug: "sinav-hazirlik", title: "Sınav Hazırlık" },
    ],
  },

  // 🐾 ANA KATEGORİ: Hayvanlar Alemi
  "hayvanlar-alemi": {
    title: "Hayvanlar Alemi",
    children: [
      { slug: "evcil-hayvanlar", title: "Evcil Hayvanlar" },
      { slug: "kuşlar", title: "Kuşlar" },
      { slug: "baliklar", title: "Akvaryum Balıkları" },
      { slug: "ciftlik-hayvanlari", title: "Çiftlik Hayvanları" },
      { slug: "aksesuarlar", title: "Aksesuar & Malzeme" },
    ],
  },

  // 👩‍🍼 ANA KATEGORİ: Yardımcı Arayanlar
  "yardimci-arayanlar": {
    title: "Yardımcı Arayanlar",
    children: [
      { slug: "bebek-bakicisi", title: "Bebek Bakıcısı" },
      { slug: "yasli-bakicisi", title: "Yaşlı Bakıcısı" },
      { slug: "ev-isleri", title: "Ev İşleri Yardımcısı" },
      { slug: "bahceci-sofor", title: "Bahçıvan & Şoför" },
      { slug: "gecici-yardim", title: "Geçici Yardımcı" },
    ],
  },
};
