import { NavLink } from "react-router-dom";
import "./header.css";

export default function Header() {
  return (
    <header className="app-header">
      {/* Sadece logo – yazı yok, hamburger yok */}
      <NavLink to="/" className="brand" aria-label="Ana sayfa">
        <img src="/logo-192.png" alt="Vitrinim" width="28" height="28" />
      </NavLink>

      {/* Üst menü linkleri (istersen sonra gizleyebiliriz) */}
      <nav className="top-nav">
        <NavLink to="/">Anasayfa</NavLink>
        <NavLink to="/kategori">Kategoriler</NavLink>
        <NavLink to="/login">Giriş</NavLink>
        <NavLink to="/yeni" className="publish">İlan Yayınla</NavLink>
      </nav>
    </header>
  );
}
