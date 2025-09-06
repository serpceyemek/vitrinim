import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { writeLocalListings, getLocalListings } from "../services/localListings.js"; // Büyük L
import { categories } from "../data/categories.js";


export default function NewListing() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    categoryId: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const all = getLocalListings();
    const newItem = {
      id: Date.now(),                // basit benzersiz id
      title: form.title.trim(),
      price: Number(form.price) || 0,
      location: form.location.trim(),
      categoryId: form.categoryId || null,
      postedAt: new Date().toISOString(),
      isLocal: true,
      images: [],                    // istersek sonra formdan alırız
    };

    writeLocalListings([...all, newItem]);

    // kaydettikten sonra anasayfaya ya da ilan detayına yönlendirebiliriz
    nav(`/listing/${newItem.id}`);
  }

  return (
    <div className="container" style={{ maxWidth: 640, margin: "24px auto" }}>
      <h2>İlan Yayınla</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <label>
          Başlık
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            required
            className="input"
            placeholder="Örn: Tertemiz iPhone 12"
          />
        </label>

        <label>
          Fiyat
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={onChange}
            required
            className="input"
            placeholder="Örn: 12500"
          />
        </label>

        <label>
          Konum
          <input
            name="location"
            value={form.location}
            onChange={onChange}
            className="input"
            placeholder="Örn: Kadıköy, İstanbul"
          />
        </label>

        <label>
          Kategori
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={onChange}
            required
            className="input"
          >
            <option value="">Seçin…</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>

        <button type="submit" className="button">Yayınla</button>
      </form>
    </div>
  );
}
