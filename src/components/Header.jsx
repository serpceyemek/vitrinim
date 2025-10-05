// src/components/Header.jsx
import { NavLink } from "react-router-dom";
import '../header.css';

export default function Header() {
  return (
    <header className="site-header">
      <div className="brand">
        <img src="/logo-192.png" alt="Vitrinim" width={24} height={24} />
        <strong>Vitrinim</strong>
      </div>

      <nav className="topnav">
        <NavLink to="/"         className="topnav-link">Anasayfa</NavLink>
        <NavLink to="/kategori" className="topnav-link">Kategoriler</NavLink>
        <NavLink to="/login"    className="topnav-link">Giriş</NavLink>
        <NavLink to="/yeni"     className="topnav-link">İlan Yayınla</NavLink>
      </nav>
    </header>
  );
}
