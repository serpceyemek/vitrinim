// src/data/postingTree.js
export const postingTree = [
  {
    id: 1,
    name: "Emlak",
    children: [
      {
        id: 11,
        name: "Konut",
        children: [
          { id: 111, name: "Satılık Daire" },
          { id: 112, name: "Kiralık Daire" },
          { id: 113, name: "Rezidans" },
          { id: 114, name: "Yazlık" },
        ],
      },
      {
        id: 12,
        name: "İşyeri",
        children: [
          { id: 121, name: "Ofis" },
          { id: 122, name: "Dükkan" },
          { id: 123, name: "Depo & Atölye" },
        ],
      },
      {
        id: 13,
        name: "Arsa",
        children: [
          { id: 131, name: "İmarlı Arsa" },
          { id: 132, name: "Tarla" },
          { id: 133, name: "Bahçe" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Araç",
    children: [
      {
        id: 21,
        name: "Otomobil",
        children: [
          { id: 211, name: "Sedan" },
          { id: 212, name: "SUV" },
          { id: 213, name: "Hatchback" },
        ],
      },
      {
        id: 22,
        name: "Motosiklet",
        children: [
          { id: 221, name: "Scooter" },
          { id: 222, name: "Chopper" },
          { id: 223, name: "Enduro" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Elektronik",
    children: [
      {
        id: 31,
        name: "Telefon & Tablet",
        children: [
          { id: 311, name: "Akıllı Telefon" },
          { id: 312, name: "Tablet" },
        ],
      },
      {
        id: 32,
        name: "Bilgisayar",
        children: [
          { id: 321, name: "Laptop" },
          { id: 322, name: "Masaüstü" },
        ],
      },
    ],
  },
];
