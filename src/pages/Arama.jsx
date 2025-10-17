// src/pages/Arama.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Home,
  Car,
  Briefcase,
  Wrench,
  PawPrint,
  Users,
} from "lucide-react";

export default function Arama() {
  // ✅ useNavigate burada çağrılıyor
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  // Kategoriler (ikon + açıklama)
  const categories = [
    {
      name: "Emlak",
      desc: "Konut, İş Yeri, Arsa, Konut Projeleri",
      icon: <Home className="text-orange-500 w-6 h-6" />,
    },
    {
      name: "Vasıta",
      desc: "Otomobil, SUV & Pickup, Motosiklet",
      icon: <Car className="text-red-500 w-6 h-6" />,
    },
    {
      name: "İş İlanları",
      desc: "Avukatlık, Eğitim, Eğlence, Danışmanlık",
      icon: <Briefcase className="text-green-600 w-6 h-6" />,
    },
    {
      name: "Yedek Parça & Aksesuar",
      desc: "Otomotiv ekipmanları, Motosiklet aksesuarları",
      icon: <Wrench className="text-teal-600 w-6 h-6" />,
    },
    {
      name: "Hayvanlar Alemi",
      desc: "Evcil hayvanlar, akvaryum, kuşlar",
      icon: <PawPrint className="text-sky-500 w-6 h-6" />,
    },
    {
      name: "Yardımcı Arayanlar",
      desc: "Bebek, yaşlı, hasta bakıcısı ilanları",
      icon: <Users className="text-yellow-600 w-6 h-6" />,
    },
  ];

  // Arama kutusuna göre kategori filtresi
  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Örnek “ilgilenebileceğiniz” ve “son gezilen” ilanlar
  const suggestions = [
    {
      id: 1,
      title: "3+1 Araç Takaslı Fırsat Daire",
      price: "2.500.000 TL",
      img: "https://images.unsplash.com/photo-1560448075-bb4caa6a04a1?w=400",
      location: "İstanbul / Kadıköy",
    },
    {
      id: 2,
      title: "Satılık 2+1 Daire Tadilatı Yeni Yapılmış",
      price: "1.843.000 TL",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      location: "Ankara / Çankaya",
    },
    {
      id: 3,
      title: "Havuz Cepheli, Eşyalı, Masrafsız",
      price: "2.650.000 TL",
      img: "https://images.unsplash.com/photo-1600585154220-5ae3dc3c7b84?w=400",
      location: "Tekirdağ / Süleymanpaşa",
    },
  ];

  const recent = [
    {
      id: 4,
      title: "FUJITSU i5 7500 16GB RAM 512 SSD PC",
      price: "5.250 TL",
      location: "İstanbul / Pendik",
      img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    },
    {
      id: 5,
      title: "Gelibolu’da Satılık 300m² Yatırımlık Yer",
      price: "480.000 TL",
      location: "Çanakkale / Gelibolu",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400",
    },
  ];

  return (
    <section className="mx-auto max-w-screen-md px-4 pb-24 pt-4 sm:pt-6">
      {/* Başlık */}
      <header className="text-center mb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 mb-2">
          Arama
        </h1>
        <p className="text-gray-500 text-sm">
          Kategori veya ilan adı ile arama yapabilirsiniz
        </p>
      </header>

      {/* Arama kutusu */}
      <div className="flex items-center justify-center mb-5">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Kelime veya ilan no. ile ara"
          className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      {/* Kategori listesi (tıklayınca yönlenir) */}
      <ul className="divide-y divide-gray-200 bg-white rounded-2xl shadow-sm mb-8">
        {filtered.map((cat, idx) => {
          const path = `/kategori/${cat.name.toLowerCase().replace(/ /g, "-")}`;
          return (
            <li
              key={idx}
              onClick={() => navigate(path)}
              className="flex items-center justify-between p-4 hover:bg-orange-50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div>{cat.icon}</div>
                <div>
                  <p className="font-semibold text-gray-800">{cat.name}</p>
                  <p className="text-xs text-gray-500">{cat.desc}</p>
                </div>
              </div>
              <ChevronRight className="text-gray-400 w-5 h-5" />
            </li>
          );
        })}
      </ul>

      {/* İLGİLENEBİLECEĞİNİZ İLANLAR */}
      <h2 className="text-sm font-bold text-gray-600 uppercase mb-3 mt-10">
        İLGİLENEBİLECEĞİNİZ İLANLAR
      </h2>
      <div className="grid gap-4 mb-8">
        {suggestions.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-4"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="pl-3 flex-1">
              <p className="font-semibold text-gray-800 text-sm line-clamp-1">
                {item.title}
              </p>
              <p className="text-orange-600 font-semibold text-sm mt-1">
                {item.price}
              </p>
              <p className="text-xs text-gray-500">{item.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* SON GEZDİĞİNİZ İLANLAR */}
      <h2 className="text-sm font-bold text-gray-600 uppercase mb-3">
        SON GEZDİĞİNİZ İLANLAR
      </h2>
      <div className="space-y-3">
        {recent.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-2"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.img}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="font-semibold text-gray-700 text-sm line-clamp-1">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500">{item.location}</p>
              </div>
            </div>
            <p className="text-blue-700 font-semibold text-sm">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
