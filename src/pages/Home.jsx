import React, { useState } from "react";
import { useNavigate, } from "react-router-dom";
import { categories } from "../data/categories";

export default function Home() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const handleSearchEnter = (e) => {
    if (e.key !== "Enter") return;
    const qv = e.currentTarget.value.trim().toLowerCase();
    if (!qv) { navigate("/kategori"); return; }
    const cat = categories.find((c) =>
      (c.title || c.name).toLowerCase().includes(qv)
    );
    navigate(cat ? `/kategori/${cat.path}` : "/kategori");
  };

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ marginBottom: 12 }}>Öne Çıkan İlanlar</h1>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <input
          type="search"
          placeholder="Ara..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={handleSearchEnter}
          style={{ flex: 1, padding: "10px 12px" }}
        />
        
      </div>
    </main>
  );
}
