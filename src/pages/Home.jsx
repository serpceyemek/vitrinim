// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const handleSearchEnter = (e) => {
    if (e.key !== "Enter") return;
    const value = e.currentTarget.value.trim().toLowerCase();
    if (!value) {
      navigate("/kategori");
      return;
    }
    // Basit yönlendirme: kategori sayfasına git
    // (İsterseniz sonra value'yu path eşlemesiyle /kategori/:path yaparız)
    navigate(`/kategori/${encodeURIComponent(value)}`);
  };

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {/* Erişilebilir etiket (görsel olarak gizli) */}
        <label htmlFor="search" style={{ display: "block", fontSize: 12, marginBottom: 6 }}>
  Ara
 <label htmlFor="search" style={{position:'absolute',width:1,height:1,margin:-1,overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',border:0}}>
  Ara
</label>
 
</label>
<input
  id="search"            // ← eklendi
  name="search"          // ← eklendi
  aria-label="Ara"       // ← ekran okuyucu için
   type="text"
  placeholder="Ara..."
  autoComplete="off"
  enterKeyHint="search"
  value={q}
  onChange={(e) => setQ(e.target.value)}
  onKeyDown={handleSearchEnter}
  style={{ flex: 1, padding: "10px 12px" }}
/>
      </div>

      {/* Buradan sonrası: senin mevcut içeriklerin / kart grid'in vs. */}
      {/* <ListingGrid .../> ya da başka bileşenlerin burada kalabilir */}
    </main>
  );
}