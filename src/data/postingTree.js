// ✅ SAHİBİNDEN TARZI TAM KATEGORİ AĞACI
// Bu dosya hem “İlan Ver” hem “Arama” ekranları için ana veri kaynağıdır.

export const postingTree = {

  // 🔹 EMLAK
  "emlak": {
    title: "Emlak",
    children: [
      { slug: "konut", title: "Konut" },
      { slug: "is-yeri", title: "İş Yeri" },
      { slug: "arsa", title: "Arsa" },
      { slug: "konut-projeleri", title: "Konut Projeleri" },
      { slug: "devremulk", title: "Devremülk" },
      { slug: "bina", title: "Bina" },
    ],
  },

  // 🏠 EMLAK › KONUT
  "emlak/konut": {
    title: "Emlak › Konut",
    children: [
      { slug: "satilik", title: "Satılık" },
      { slug: "kiralik", title: "Kiralık" },
      { slug: "gunluk-kiralik", title: "Günlük Kiralık" },
      { slug: "devren", title: "Devren" },
    ],
  },

  // 🏠 EMLAK › KONUT › SATILIK
  "emlak/konut/satilik": {
    title: "Emlak › Konut › Satılık",
    children: [
      { slug: "daire", title: "Daire" },
      { slug: "villa", title: "Villa" },
      { slug: "mustakil-ev", title: "Müstakil Ev" },
      { slug: "rezidans", title: "Rezidans" },
      { slug: "dublex", title: "Dublex" },
      { slug: "stüdyo", title: "Stüdyo" },
      { slug: "tiny-house", title: "Tiny House" },
    ],
  },

  // 🏢 EMLAK › İŞ YERİ
  "emlak/is-yeri": {
    title: "Emlak › İş Yeri",
    children: [
      { slug: "satilik", title: "Satılık" },
      { slug: "kiralik", title: "Kiralık" },
      { slug: "devren", title: "Devren Kiralık" },
    ],
  },

  "emlak/is-yeri/satilik": {
    title: "Emlak › İş Yeri › Satılık",
    children: [
      { slug: "ofis", title: "Ofis" },
      { slug: "dukkan", title: "Dükkan & Mağaza" },
      { slug: "depo", title: "Depo & Antrepo" },
      { slug: "fabrika", title: "Fabrika" },
    ],
  },

  // 🌿 EMLAK › ARSA
  "emlak/arsa": {
    title: "Emlak › Arsa",
    children: [
      { slug: "imarli", title: "İmarlı Arsa" },
      { slug: "tarla", title: "Tarla" },
      { slug: "ticari", title: "Ticari Arsa" },
      { slug: "sanayi", title: "Sanayi Arsası" },
    ],
  },

  // 🚗 VASITA
  "vasita": {
    title: "Vasıta",
    children: [
      { slug: "otomobil", title: "Otomobil" },
      { slug: "motosiklet", title: "Motosiklet" },
      { slug: "ticari-arac", title: "Ticari Araç" },
      { slug: "deniz-araclari", title: "Deniz Araçları" },
      { slug: "aksesuar-yedek", title: "Aksesuar & Yedek Parça" },
    ],
  },

  "vasita/otomobil": {
    title: "Vasıta › Otomobil",
    children: [
      { slug: "satilik", title: "Satılık" },
      { slug: "kiralik", title: "Kiralık" },
    ],
  },

  "vasita/otomobil/satilik": {
    title: "Vasıta › Otomobil › Satılık",
    children: [
      { slug: "sedan", title: "Sedan" },
      { slug: "hatchback", title: "Hatchback" },
      { slug: "suv", title: "SUV" },
      { slug: "cabrio", title: "Cabrio" },
      { slug: "coupe", title: "Coupe" },
    ],
  },

  "vasita/motosiklet": {
    title: "Vasıta › Motosiklet",
    children: [
      { slug: "scooter", title: "Scooter" },
      { slug: "enduro", title: "Enduro" },
      { slug: "naked", title: "Naked" },
      { slug: "cross", title: "Cross" },
    ],
  },

  // 💼 İŞ İLANLARI
  "is-ilanlari": {
    title: "İş İlanları",
    children: [
      { slug: "egitim", title: "Eğitim" },
      { slug: "saglik", title: "Sağlık" },
      { slug: "ofis-yonetim", title: "Ofis & Yönetim" },
      { slug: "satis-pazarlama", title: "Satış & Pazarlama" },
      { slug: "uretim-lojistik", title: "Üretim & Lojistik" },
      { slug: "bilisim", title: "Bilişim & Teknoloji" },
    ],
  },

  "is-ilanlari/egitim": {
    title: "İş İlanları › Eğitim",
    children: [
      { slug: "ogretmen", title: "Öğretmen" },
      { slug: "ozel-ders", title: "Özel Ders Öğretmeni" },
      { slug: "rehber", title: "Rehber Öğretmen" },
    ],
  },

  "is-ilanlari/saglik": {
    title: "İş İlanları › Sağlık",
    children: [
      { slug: "doktor", title: "Doktor" },
      { slug: "hemsire", title: "Hemşire" },
      { slug: "eczaci", title: "Eczacı" },
      { slug: "hasta-bakici", title: "Hasta Bakıcı" },
    ],
  },

  // 📘 ÖZEL DERS VERENLER
  "ozel-ders": {
    title: "Özel Ders Verenler",
    children: [
      { slug: "lise-universite", title: "Lise & Üniversite" },
      { slug: "ilkokul-ortaokul", title: "İlkokul & Ortaokul" },
      { slug: "yabanci-dil", title: "Yabancı Dil" },
      { slug: "hobi-sanat", title: "Hobi & Sanat" },
      { slug: "spor", title: "Spor" },
    ],
  },

  "ozel-ders/lise-universite": {
    title: "Özel Ders › Lise & Üniversite",
    children: [
      { slug: "matematik", title: "Matematik" },
      { slug: "fizik", title: "Fizik" },
      { slug: "kimya", title: "Kimya" },
      { slug: "edebiyat", title: "Edebiyat" },
    ],
  },

  // 🐾 HAYVANLAR ALEMİ
  "hayvanlar": {
    title: "Hayvanlar Alemi",
    children: [
      { slug: "kedi", title: "Kedi" },
      { slug: "kopek", title: "Köpek" },
      { slug: "kus", title: "Kuş" },
      { slug: "balik", title: "Balık" },
      { slug: "urunler", title: "Hayvan Ürünleri" },
    ],
  },

  "hayvanlar/kedi": {
    title: "Hayvanlar Alemi › Kedi",
    children: [
      { slug: "sahiplendirme", title: "Sahiplendirme" },
      { slug: "yavru", title: "Yavru" },
      { slug: "yetiskin", title: "Yetişkin" },
      { slug: "esya", title: "Kedi Ürünleri" },
    ],
  },

  // 👶 YARDIMCI ARAYANLAR
  "yardimci": {
    title: "Yardımcı Arayanlar",
    children: [
      { slug: "bebek-bakicisi", title: "Bebek Bakıcısı" },
      { slug: "yasli-bakicisi", title: "Yaşlı Bakıcısı" },
      { slug: "hasta-bakicisi", title: "Hasta Bakıcısı" },
      { slug: "ev-yardimcisi", title: "Ev İşlerine Yardımcı" },
      { slug: "asci", title: "Aşçı" },
      { slug: "sofor", title: "Şoför" },
    ],
  },

  "yardimci/bebek-bakicisi": {
    title: "Yardımcı Arayanlar › Bebek Bakıcısı",
    children: [
      { slug: "yatili", title: "Yatılı" },
      { slug: "gunduzlu", title: "Gündüzlü" },
      { slug: "yarim-gun", title: "Yarım Gün" },
    ],
  },

};
