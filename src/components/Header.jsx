import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="brand">
        <img src="/logo-192.png" alt="Vitrinim" width={24} height={24} />
        <strong>Vitrinim</strong>
      </div>

      <button className="burger" aria-label="Menüyü aç/kapat"
              onClick={() => setOpen(v => !v)}>
        ☰
      </button>

      <nav className={`topnav ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
        <NavLink to="/"          className="topnav-link">Anasayfa</NavLink>
        <NavLink to="/kategori"  className="topnav-link">Kategoriler</NavLink>
        <NavLink to="/login"     className="topnav-link">Giriş</NavLink>
        <NavLink to="/yeni"      className="topnav-link">İlan Yayınla</NavLink>
      </nav>
    </header>
  );
}
